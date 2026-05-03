'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { forgotPassword } from '@/app/actions/auth'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const result = await forgotPassword(fd)
    setLoading(false)
    if (result?.error) {
      setError(result.error)
    } else {
      setSent(true)
    }
  }

  return (
    <div style={{ maxWidth: 440, margin: '0 auto' }}>
      <Link href="/login" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
        color: MUTE, textDecoration: 'none', marginBottom: 40,
      }}>
        <ArrowLeft size={13} /> Back to login
      </Link>

      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 10 }}>
          Account
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 44, lineHeight: 0.95, color: INK, letterSpacing: '-0.02em' }}>
          Reset password
        </h1>
      </div>

      {sent ? (
        <div style={{ border: `1px solid ${RULE}`, background: '#f6faf6', padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
          <CheckCircle2 size={32} style={{ color: '#4caf50' }} />
          <p style={{ fontSize: 14, color: INK, fontWeight: 500 }}>Check your email</p>
          <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.6 }}>
            We sent a password reset link. Check your inbox and follow the instructions.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <p style={{ fontSize: 13.5, color: MUTE, lineHeight: 1.6 }}>
            Enter your email and we'll send you a link to reset your password.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label htmlFor="email" style={{ fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTE }}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              style={{
                padding: '12px 14px', border: `1px solid ${RULE}`, background: CREAM,
                fontSize: 14, color: INK, outline: 'none',
              }}
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
            {loading ? '…' : 'Send reset link'}
          </button>
        </form>
      )}
    </div>
  )
}
