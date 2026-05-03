'use client'

import { useState } from 'react'
import { resetPassword } from '@/app/actions/auth'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('password') !== fd.get('confirm')) {
      setError("Passwords don't match")
      return
    }
    setLoading(true)
    setError(null)
    const result = await resetPassword(fd)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
    // on success, resetPassword redirects to /dashboard
  }

  return (
    <div style={{ maxWidth: 440, margin: '0 auto' }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 10 }}>
          Account
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 44, lineHeight: 0.95, color: INK, letterSpacing: '-0.02em' }}>
          New password
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="password" style={{ fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTE }}>
            New password
          </label>
          <input
            id="password" name="password" type="password" required minLength={8}
            placeholder="Minimum 8 characters"
            style={{ padding: '12px 14px', border: `1px solid ${RULE}`, background: CREAM, fontSize: 14, color: INK, outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="confirm" style={{ fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTE }}>
            Confirm password
          </label>
          <input
            id="confirm" name="confirm" type="password" required minLength={8}
            placeholder="Repeat password"
            style={{ padding: '12px 14px', border: `1px solid ${RULE}`, background: CREAM, fontSize: 14, color: INK, outline: 'none' }}
          />
        </div>

        {error && (
          <p style={{ fontSize: 12.5, color: '#c62828', padding: '10px 14px', background: '#fdecea', border: '1px solid #f5c6c6' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '14px 24px', background: INK, color: CREAM,
            border: 'none', cursor: loading ? 'wait' : 'pointer',
            fontFamily: 'var(--font-instrument)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? '…' : 'Set new password'}
        </button>
      </form>
    </div>
  )
}
