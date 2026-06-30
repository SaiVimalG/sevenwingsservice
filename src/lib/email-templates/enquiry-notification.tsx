import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  phone?: string
  country?: string
  message?: string
  source?: string
  formId?: string
  preferredDate?: string
  preferredTime?: string
  currentStatus?: string
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <Section style={row}>
      <Text style={rowLabel}>{label}</Text>
      <Text style={rowValue}>{value}</Text>
    </Section>
  )
}

const Email = ({
  name,
  email,
  phone,
  country,
  message,
  source,
  formId,
  preferredDate,
  preferredTime,
  currentStatus,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New enquiry from {name || 'website visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New website enquiry</Heading>
        <Text style={lead}>
          A new enquiry just came in from the 7 Wings Immigration website.
        </Text>
        <Hr style={hr} />
        <Row label="Name" value={name} />
        <Row label="Email" value={email} />
        <Row label="Phone" value={phone} />
        <Row label="Country of interest" value={country} />
        <Row label="Preferred date" value={preferredDate} />
        <Row label="Preferred time" value={preferredTime} />
        <Row label="Current status" value={currentStatus} />
        <Row label="Source" value={source} />
        <Row label="Form ID" value={formId} />
        {message ? (
          <>
            <Hr style={hr} />
            <Text style={rowLabel}>Message</Text>
            <Text style={messageBox}>{message}</Text>
          </>
        ) : null}
        <Hr style={hr} />
        <Text style={footer}>
          Reply directly to this email to respond to {name || 'the enquirer'}.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `New enquiry — ${data?.name || 'Website'}${data?.country ? ` (${data.country})` : ''}`,
  displayName: 'Internal: New Enquiry Notification',
  previewData: {
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    phone: '+91 90000 00000',
    country: 'Germany',
    message: 'Looking for guidance on the Opportunity Card.',
    source: 'contact_page',
    formId: '7WFI-CU-XXXX-YYYY',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = {
  padding: '28px 28px 32px',
  maxWidth: '560px',
  margin: '0 auto',
}
const h1 = {
  color: '#0D2E7D',
  fontSize: '22px',
  fontWeight: '700' as const,
  margin: '0 0 8px',
}
const lead = { color: '#334155', fontSize: '14px', margin: '0 0 16px' }
const hr = { borderColor: '#E5E7EB', margin: '16px 0' }
const row = { margin: '0 0 10px' }
const rowLabel = {
  color: '#64748B',
  fontSize: '11px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  margin: '0 0 2px',
  fontWeight: '600' as const,
}
const rowValue = { color: '#0F172A', fontSize: '14px', margin: '0' }
const messageBox = {
  color: '#0F172A',
  fontSize: '14px',
  whiteSpace: 'pre-wrap' as const,
  background: '#F8FAFC',
  padding: '12px 14px',
  borderRadius: '8px',
  margin: '0',
}
const footer = { color: '#64748B', fontSize: '12px', margin: '0' }
