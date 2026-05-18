'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, Link } from '@/i18n/navigation'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { NajinDanWordmark } from './NajinDanLogo'
import { useIsMobile } from '@/hooks/useIsMobile'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const SOFT  = '#3a342e'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'
const BG    = '#F7F4EF'

function LanguageSwitcher({ onSelect }: { onSelect?: () => void }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const currentLocale = (params?.locale as string) ?? 'sl'

  const locales = [
    { code: 'sl', label: 'SL' },
    { code: 'hr', label: 'HR' },
    { code: 'en', label: 'EN' },
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {locales.map(({ code, label }, i) => (
        <span key={code} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button
            onClick={() => { router.replace(pathname, { locale: code }); onSelect?.() }}
            style={{
              fontSize: 10, letterSpacing: '0.16em',
              color: currentLocale === code ? INK : '#a89f96',
              fontWeight: currentLocale === code ? 600 : 400,
              background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0',
              fontFamily: 'var(--font-instrument)',
              borderBottom: currentLocale === code ? `1px solid ${INK}` : '1px solid transparent',
              transition: 'color .2s',
            }}
          >
            {label}
          </button>
          {i < locales.length - 1 && (
            <span style={{ fontSize: 9, color: '#d4cfc9' }}>·</span>
          )}
        </span>
      ))}
    </div>
  )
}

function CTAButton({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href="/register"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden', display: 'inline-flex',
        alignItems: 'center', gap: 10,
        padding: '10px 20px',
        background: INK, color: CREAM,
        fontFamily: 'var(--font-instrument)',
        fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
        isolation: 'isolate', textDecoration: 'none',
        boxShadow: hovered ? '0 18px 40px -16px rgba(26,23,20,.5)' : 'none',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      <motion.span
        style={{ position: 'absolute', inset: 0, background: ACC, zIndex: 0 }}
        initial={false}
        animate={{ x: hovered ? '0%' : '-101%' }}
        transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex' }}>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1" />
        </svg>
      </span>
    </Link>
  )
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
      <motion.rect x="0" y="0" width="22" height="1.5" fill={INK} rx="1"
        animate={open ? { rotate: 45, y: 7.25 } : { rotate: 0, y: 0 }}
        style={{ originX: '11px', originY: '0.75px' }}
        transition={{ duration: 0.3 }}
      />
      <motion.rect x="0" y="7.25" width="22" height="1.5" fill={INK} rx="1"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.rect x="0" y="14.5" width="22" height="1.5" fill={INK} rx="1"
        animate={open ? { rotate: -45, y: -7.25 } : { rotate: 0, y: 0 }}
        style={{ originX: '11px', originY: '15.25px' }}
        transition={{ duration: 0.3 }}
      />
    </svg>
  )
}

export function SiteNav({ transparent = false }: { transparent?: boolean }) {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useIsMobile()

  const LINKS = [
    { label: t('designs'), href: '/templates' as const },
    { label: t('pricing'),  href: '/pricing' as const },
    { label: t('demo'),     href: '/demo' as const },
    { label: t('signIn'),   href: '/login' as const },
  ]

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const showBg = !transparent || scrolled

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: isMobile ? 64 : 84,
        padding: isMobile ? '0 20px' : '0 56px',
        background: (showBg || menuOpen) ? 'rgba(247,244,239,0.97)' : 'transparent',
        backdropFilter: (showBg || menuOpen) ? 'blur(8px)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <NajinDanWordmark size={isMobile ? 20 : 22} />
        </Link>

        {isMobile ? (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 40, fontSize: 12.5, letterSpacing: '0.04em' }}>
            {LINKS.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    color: active ? INK : SOFT,
                    textDecoration: 'none',
                    fontWeight: active ? 500 : 400,
                    transition: 'color .2s',
                    borderBottom: active ? `1px solid ${INK}` : '1px solid transparent',
                    paddingBottom: 2,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = INK)}
                  onMouseLeave={e => (e.currentTarget.style.color = active ? INK : SOFT)}
                >
                  {label}
                </Link>
              )
            })}
            <LanguageSwitcher />
            <CTAButton label={t('createInvitation')} />
          </div>
        )}
      </nav>
      <div style={{ height: isMobile ? 64 : 84 }} />
      <div style={{ height: 1, background: RULE }} />

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', top: 65, left: 0, right: 0, zIndex: 49,
              background: BG, borderBottom: `1px solid ${RULE}`,
              padding: '24px 24px 32px',
              display: 'flex', flexDirection: 'column', gap: 0,
            }}
          >
            {LINKS.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '16px 0',
                    borderBottom: `1px solid ${RULE}`,
                    color: active ? INK : SOFT,
                    fontFamily: 'var(--font-instrument)',
                    fontSize: 15, letterSpacing: '0.04em',
                    fontWeight: active ? 600 : 400,
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  {label}
                </Link>
              )
            })}
            <div style={{ paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <LanguageSwitcher onSelect={() => setMenuOpen(false)} />
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '11px 20px',
                  background: INK, color: CREAM,
                  fontFamily: 'var(--font-instrument)',
                  fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8,
                }}
              >
                {t('createInvitation')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
