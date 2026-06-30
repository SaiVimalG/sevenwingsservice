import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/unsubscribe')({
  head: () => ({
    meta: [
      { title: 'Unsubscribe — 7 Wings Immigration' },
      { name: 'robots', content: 'noindex,nofollow' },
    ],
  }),
  component: UnsubscribePage,
})

type State =
  | { status: 'validating' }
  | { status: 'ready' }
  | { status: 'already' }
  | { status: 'invalid' }
  | { status: 'submitting' }
  | { status: 'done' }
  | { status: 'error'; message: string }

function UnsubscribePage() {
  const [state, setState] = useState<State>({ status: 'validating' })
  const token =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('token')
      : null

  useEffect(() => {
    if (!token) {
      setState({ status: 'invalid' })
      return
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const body = await r.json().catch(() => ({}))
        if (!r.ok) return setState({ status: 'invalid' })
        if (body?.valid) return setState({ status: 'ready' })
        if (body?.reason === 'already_unsubscribed') return setState({ status: 'already' })
        setState({ status: 'invalid' })
      })
      .catch(() => setState({ status: 'invalid' }))
  }, [token])

  async function confirm() {
    if (!token) return
    setState({ status: 'submitting' })
    try {
      const r = await fetch('/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const body = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(body?.error || 'Failed to unsubscribe')
      if (body?.success) return setState({ status: 'done' })
      if (body?.reason === 'already_unsubscribed') return setState({ status: 'already' })
      throw new Error('Unexpected response')
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Failed to unsubscribe',
      })
    }
  }

  return (
    <div className="min-h-screen bg-cream/40 grid place-items-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-black/5 bg-white p-8 shadow-elegant text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
          7 Wings Immigration
        </p>
        <h1 className="mt-3 font-display text-2xl font-bold text-navy-deep">
          Email preferences
        </h1>

        {state.status === 'validating' && (
          <p className="mt-4 text-sm text-muted-foreground">Checking your link…</p>
        )}
        {state.status === 'invalid' && (
          <p className="mt-4 text-sm text-muted-foreground">
            This unsubscribe link is invalid or has expired.
          </p>
        )}
        {state.status === 'already' && (
          <p className="mt-4 text-sm text-muted-foreground">
            You're already unsubscribed. You won't receive further emails.
          </p>
        )}
        {state.status === 'ready' && (
          <>
            <p className="mt-4 text-sm text-muted-foreground">
              Confirm that you'd like to stop receiving emails from 7 Wings Immigration.
            </p>
            <button
              onClick={confirm}
              className="btn-gold btn-gold-hover mt-6 w-full justify-center"
            >
              Confirm unsubscribe
            </button>
          </>
        )}
        {state.status === 'submitting' && (
          <p className="mt-4 text-sm text-muted-foreground">Unsubscribing…</p>
        )}
        {state.status === 'done' && (
          <p className="mt-4 text-sm text-navy-deep">
            You've been unsubscribed. We're sorry to see you go.
          </p>
        )}
        {state.status === 'error' && (
          <p className="mt-4 text-sm text-red-600">{state.message}</p>
        )}
      </div>
    </div>
  )
}
