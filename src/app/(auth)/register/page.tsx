'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'
import { register as registerAction } from '@/app/actions/auth'
import { PACKAGES } from '@/types'
import { CheckCircle2 } from 'lucide-react'
import { Suspense } from 'react'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
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

function RegisterForm() {
  const searchParams = useSearchParams()
  const selectedPackage = searchParams.get('package') as keyof typeof PACKAGES | null
  const pkg = selectedPackage ? PACKAGES[selectedPackage] : null

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
    if (selectedPackage) fd.set('package', selectedPackage)
    const result = await registerAction(fd)
    if (result?.error) setServerError(result.error)
  }

  return (
    <div style={{ width: '100%', maxWidth: 440 }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10.5, letterSpacing: '0.32em', color: MUTE, textTransform: 'uppercase', marginBottom: 20 }}>
          <span style={{ width: 24, height: 1, background: MUTE, display: 'inline-block' }} />
          New account
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 48, lineHeight: 0.95, color: INK, letterSpacing: '-0.02em', marginBottom: 12 }}>
          Begin your story
        </h1>
        <p style={{ fontSize: 13.5, color: MUTE, lineHeight: 1.6 }}>
          Create your account and start crafting your perfect invitation.
        </p>
      </div>

      {/* Selected package callout */}
      {pkg && (
        <div style={{ border: `1px solid ${ACC}`, background: '#FBFAF6', padding: '20px 24px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <span style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 16, color: INK }}>{pkg.name}</span>
              <span style={{ marginLeft: 10, fontSize: 11, color: MUTE, letterSpacing: '0.08em' }}>selected</span>
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 28, color: INK, lineHeight: 1 }}>
              €{pkg.price}
            </div>
          </div>
          <div style={{ height: 1, background: RULE, marginBottom: 14 }} />
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
            {pkg.features.slice(0, 3).map((f) => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: MUTE }}>
                <CheckCircle2 size={12} style={{ color: ACC, flexShrink: 0 }} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Form card */}
      <div style={{ position: 'relative', border: `1px solid ${RULE}`, background: '#FBFAF6', padding: '40px 36px' }}>
        {/* Corner accents */}
        {[
          { top: -4, left: -4, borderRight: 'none', borderBottom: 'none' },
          { top: -4, right: -4, borderLeft: 'none', borderBottom: 'none' },
          { bottom: -4, left: -4, borderRight: 'none', borderTop: 'none' },
          { bottom: -4, right: -4, borderLeft: 'none', borderTop: 'none' },
        ].map((style, i) => (
          <div key={i} style={{ position: 'absolute', width: 12, height: 12, border: `1px solid ${ACC}`, ...style }} />
        ))}

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <FieldInput label="Email" id="email" type="email" placeholder="you@example.com" error={errors.email?.message} registration={register('email')} />
          <FieldInput label="Password" id="password" type="password" placeholder="Min. 8 characters" error={errors.password?.message} registration={register('password')} />
          <FieldInput label="Confirm password" id="confirmPassword" type="password" placeholder="Repeat password" error={errors.confirmPassword?.message} registration={register('confirmPassword')} />

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
              {isSubmitting ? 'Creating account…' : 'Create account'}
              {!isSubmitting && (
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1" />
                </svg>
              )}
            </button>
          </div>

          <p style={{ fontSize: 11.5, textAlign: 'center', color: MUTE }}>
            By creating an account you agree to our{' '}
            <Link href="/terms" style={{ color: INK, borderBottom: `1px solid ${RULE}`, paddingBottom: 1 }}>Terms</Link>{' '}
            and{' '}
            <Link href="/privacy" style={{ color: INK, borderBottom: `1px solid ${RULE}`, paddingBottom: 1 }}>Privacy Policy</Link>.
          </p>
        </form>
      </div>

      <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: MUTE }}>
        Already have an account?{' '}
        <Link href="/login" style={{ color: INK, borderBottom: `1px solid ${RULE}`, paddingBottom: 1, transition: 'border-color .2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = INK)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = RULE)}
        >
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}
