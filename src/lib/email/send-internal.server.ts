import * as React from 'react'
import { render } from 'react-email'
import { TEMPLATES } from '@/lib/email-templates/registry'

// Internal email sender for server-side flows that don't have a user JWT
// (e.g. public contact form submissions). Uses the service role client and
// the same enqueue_email RPC the public /lovable/email/transactional/send
// route uses.

const SITE_NAME = '7 Wings Immigration'
const SENDER_DOMAIN = 'notify.www.7wingsimmigration.com'
const FROM_ADDRESS = 'info@7wingsimmigration.com'

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export interface InternalEmailRequest {
  templateName: string
  recipientEmail?: string
  idempotencyKey?: string
  templateData?: Record<string, any>
  /** Override the From address for this send. Defaults to info@... */
  fromAddress?: string
  /** Optional Reply-To header (e.g. the enquirer's email on internal notifications). */
  replyTo?: string
}

export async function sendInternalEmail(req: InternalEmailRequest) {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server')

  const template = TEMPLATES[req.templateName]
  if (!template) {
    console.error('[email] template not found', { templateName: req.templateName })
    return { ok: false, reason: 'template_not_found' as const }
  }

  const effectiveRecipient = template.to || req.recipientEmail
  if (!effectiveRecipient) {
    return { ok: false, reason: 'missing_recipient' as const }
  }

  const messageId = crypto.randomUUID()
  const idempotencyKey = req.idempotencyKey || messageId
  const normalizedEmail = effectiveRecipient.toLowerCase()

  // Suppression check
  const { data: suppressed } = await supabaseAdmin
    .from('suppressed_emails')
    .select('id')
    .eq('email', normalizedEmail)
    .maybeSingle()

  if (suppressed) {
    await supabaseAdmin.from('email_send_log').insert({
      message_id: messageId,
      template_name: req.templateName,
      recipient_email: effectiveRecipient,
      status: 'suppressed',
    })
    return { ok: false, reason: 'suppressed' as const }
  }

  // Unsubscribe token (one per email)
  let unsubscribeToken: string
  const { data: existingToken } = await supabaseAdmin
    .from('email_unsubscribe_tokens')
    .select('token, used_at')
    .eq('email', normalizedEmail)
    .maybeSingle()

  if (existingToken && !existingToken.used_at) {
    unsubscribeToken = existingToken.token
  } else if (!existingToken) {
    unsubscribeToken = generateToken()
    await supabaseAdmin
      .from('email_unsubscribe_tokens')
      .upsert(
        { token: unsubscribeToken, email: normalizedEmail },
        { onConflict: 'email', ignoreDuplicates: true },
      )
    const { data: stored } = await supabaseAdmin
      .from('email_unsubscribe_tokens')
      .select('token')
      .eq('email', normalizedEmail)
      .maybeSingle()
    unsubscribeToken = stored?.token || unsubscribeToken
  } else {
    return { ok: false, reason: 'suppressed' as const }
  }

  const element = React.createElement(template.component, req.templateData || {})
  const html = await render(element)
  const text = await render(element, { plainText: true })
  const subject =
    typeof template.subject === 'function'
      ? template.subject(req.templateData || {})
      : template.subject

  const from = `${SITE_NAME} <${req.fromAddress || FROM_ADDRESS}>`

  await supabaseAdmin.from('email_send_log').insert({
    message_id: messageId,
    template_name: req.templateName,
    recipient_email: effectiveRecipient,
    status: 'pending',
  })

  const payload: Record<string, any> = {
    message_id: messageId,
    to: effectiveRecipient,
    from,
    sender_domain: SENDER_DOMAIN,
    subject,
    html,
    text,
    purpose: 'transactional',
    label: req.templateName,
    idempotency_key: idempotencyKey,
    unsubscribe_token: unsubscribeToken,
    queued_at: new Date().toISOString(),
  }
  if (req.replyTo) payload.reply_to = req.replyTo

  const { error } = await supabaseAdmin.rpc('enqueue_email', {
    queue_name: 'transactional_emails',
    payload,
  })

  if (error) {
    console.error('[email] enqueue failed', { templateName: req.templateName, error })
    await supabaseAdmin.from('email_send_log').insert({
      message_id: messageId,
      template_name: req.templateName,
      recipient_email: effectiveRecipient,
      status: 'failed',
      error_message: 'Failed to enqueue email',
    })
    return { ok: false, reason: 'enqueue_failed' as const }
  }

  return { ok: true as const, messageId }
}
