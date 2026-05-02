'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { login } from '@/app/actions/auth'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const SOFT  = '#3a342e'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
type FormData = z.infer<typeof schema>

function FieldInput({ label, id, type, placeholder, error, registration }: {
  label: string; id: string; type: string; placeholder: string; error?: string; registration: ReturnType<ReturnType<typeof useForm<FormData>>['register']>
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor={id} style={{ fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTE }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...registration}
        onFocus={e => { setFocused(true); registration.onBlur && registration.onBlur(e as any) }}
        onBlur={e => { setFocused(false); registration.onBlur && registration.onBlur(e) }}
        style={{
          width: '100%', padding: '12px 16px',
          background: focused ? '#FBFAF6' : CREAM,
          border: `1px solid ${error ? '#c0392b' : focused ? INK : RULE}`,
          fontSize: 13.5, color: INK,
          fontFamily: 'var(--font-instrument)',
          outline: 'none',
          transition: 'border-color .2s, background .2s',
        }}
      />
      {error && (
        <span style={{ fontSize: 11, color: '#c0392b', letterSpacing: '0.04em' }}>{error}</span>
      )}
    </div>
  )
}

export default function LoginPage() {
  const [serverError, setServerError] = useState('')
  const [hoveredBtn, setHoveredBtn] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema as any) })

  async function onSubmit(data: FormData) {
    setServerError('')
    const fd = new FormData()
    fd.set('email', data.email)
    fd.set('password', data.password)
    const result = await login(fd)
    if (result?.error) setServerError(result.error)
  }

  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10.5, letterSpacing: '0.32em', color: MUTE, textTransform: 'uppercase', marginBottom: 20 }}>
          <span style={{ width: 24, height: 1, background: MUTE, display: 'inline-block' }} />
          Welcome back
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 48, lineHeight: 0.95, color: INK, letterSpacing: '-0.02em', marginBottom: 12 }}>
          Sign in
        </h1>
        <p style={{ fontSize: 13.5, color: MUTE, lineHeight: 1.6 }}>
          Continue crafting your perfect invitation.
        </p>
      </div>

      {/* Form card */}
      <div style={{ border: `1px solid ${RULE}`, background: '#FBFAF6', padding: '40px 36px' }}>
        {/* Corner accents */}
        {[
          { top: -4, left: -4, borderRight: 'none', borderBottom: 'none' },
          { top: -4, right: -4, borderLeft: 'none', borderBottom: 'none' },
          { bottom: -4, left: -4, borderRight: 'none', borderTop: 'none' },
          { bottom: -4, right: -4, borderLeft: 'none', borderTop: 'none' },
        ].map((style, i) => (
          <div key={i} style={{ position: 'absolute', width: 12, height: 12, border: `1px solid ${ACC}`, ...style }} />
        ))}

        <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <FieldInput label="Email" id="email" type="email" placeholder="you@example.com" error={errors.email?.message} registration={register('email')} />
          <FieldInput label="Password" id="password" type="password" placeholder="••••••••" error={errors.password?.message} registration={register('password')} />

          {serverError && (
            <div style={{ fontSize: 12.5, color: '#c0392b', background: '#fdf0ee', border: '1px solid #f5c6c0', padding: '10px 14px' }}>
              {serverError}
            </div>
          )}

          <div style={{ paddingTop: 8 }}>
            <button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={() => setHoveredBtn(true)}
              onMouseLeave={() => setHoveredBtn(false)}
              style={{
                width: '100%', padding: '15px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: hoveredBtn ? ACC : INK, color: CREAM,
                fontFamily: 'var(--font-instrument)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
                border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                transition: 'background .3s ease',
              }}
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
              {!isSubmitting && (
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: MUTE }}>
        Don&apos;t have an account?{' '}
        <Link href="/register" style={{ color: INK, borderBottom: `1px solid ${RULE}`, paddingBottom: 1, transition: 'border-color .2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = INK)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = RULE)}
        >
          Create one
        </Link>
      </div>
    </div>
  )
}
