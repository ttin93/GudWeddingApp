'use client'

import { Link } from '@/i18n/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { login } from '@/app/actions/auth'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'

function FieldInput({ label, id, type, placeholder, error, registration }: {
  label: string; id: string; type: string; placeholder: string; error?: string
  registration: ReturnType<ReturnType<typeof useForm<any>>['register']>
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
        onFocus={e => { setFocused(true); registration.onBlur?.(e as any) }}
        onBlur={e => { setFocused(false); registration.onBlur?.(e) }}
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
      {error && <span style={{ fontSize: 11, color: '#c0392b', letterSpacing: '0.04em' }}>{error}</span>}
    </div>
  )
}

export default function LoginPage() {
  const t = useTranslations('auth.login')
  const [serverError, setServerError] = useState('')
  const [hoveredBtn, setHoveredBtn] = useState(false)

  const schema = z.object({
    email: z.string().email(t('emailError')),
    password: z.string().min(6, t('passwordError')),
  })
  type FormData = z.infer<typeof schema>

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

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
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10.5, letterSpacing: '0.32em', color: MUTE, textTransform: 'uppercase', marginBottom: 20 }}>
          <span style={{ width: 24, height: 1, background: MUTE, display: 'inline-block' }} />
          {t('welcomeBack')}
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 48, lineHeight: 0.95, color: INK, letterSpacing: '-0.02em', marginBottom: 12 }}>
          {t('title')}
        </h1>
        <p style={{ fontSize: 13.5, color: MUTE, lineHeight: 1.6 }}>{t('subtitle')}</p>
      </div>

      <div style={{ position: 'relative', border: `1px solid ${RULE}`, background: '#FBFAF6', padding: '40px 36px' }}>
        {[
          { top: -4, left: -4, borderRight: 'none', borderBottom: 'none' },
          { top: -4, right: -4, borderLeft: 'none', borderBottom: 'none' },
          { bottom: -4, left: -4, borderRight: 'none', borderTop: 'none' },
          { bottom: -4, right: -4, borderLeft: 'none', borderTop: 'none' },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 12, height: 12, border: `1px solid ${ACC}`, ...s }} />
        ))}

        <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <FieldInput label={t('email')} id="email" type="email" placeholder={t('emailPlaceholder')} error={errors.email?.message} registration={register('email')} />
          <FieldInput label={t('password')} id="password" type="password" placeholder={t('passwordPlaceholder')} error={errors.password?.message} registration={register('password')} />

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
              {isSubmitting ? t('submitting') : t('submit')}
              {!isSubmitting && (
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <Link href="/forgot-password" style={{ fontSize: 12.5, color: MUTE, borderBottom: `1px solid ${RULE}`, paddingBottom: 1, textDecoration: 'none' }}>
          Forgot password?
        </Link>
      </div>

      <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13, color: MUTE }}>
        {t('noAccount')}{' '}
        <Link href="/register" style={{ color: INK, borderBottom: `1px solid ${RULE}`, paddingBottom: 1 }}>
          {t('createOne')}
        </Link>
      </div>
    </div>
  )
}
