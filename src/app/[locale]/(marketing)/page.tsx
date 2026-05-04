'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { PACKAGES, TEMPLATES } from '@/types'
import { CheckCircle2 } from 'lucide-react'
import { SiteNav } from '@/components/ui/SiteNav'
import { SiteFooter } from '@/components/ui/SiteFooter'
import { useTranslations } from 'next-intl'
import { TemplateArt } from '@/components/ui/TemplateArt'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const SOFT  = '#3a342e'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'
const RULES = '#d9d2c5'

function Grain() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100,
        mixBlendMode: 'multiply', opacity: 0.35,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.09 0 0 0 0 0.08 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        backgroundSize: '240px 240px',
      }}
    />
  )
}

function CTAButton({ label, href, small }: { label: string; href: string; small?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden', display: 'inline-flex',
        alignItems: 'center', gap: 12,
        padding: small ? '10px 20px' : '18px 28px',
        background: INK, color: CREAM,
        fontFamily: 'var(--font-instrument)', fontSize: 11,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        isolation: 'isolate',
        boxShadow: hovered ? '0 18px 40px -16px rgba(26,23,20,.5), 0 4px 8px -2px rgba(26,23,20,.2)' : '0 0 0 0 transparent',
        transition: 'box-shadow 0.4s ease',
        textDecoration: 'none',
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

function AnimatedHeadline({ text }: { text: string }) {
  const letters = text.split('')
  return (
    <h1 style={{
      fontFamily: 'var(--font-cormorant)', fontWeight: 400, fontStyle: 'italic',
      fontSize: 'clamp(80px, 13vw, 168px)', lineHeight: 0.9,
      letterSpacing: '-0.025em', color: INK, perspective: '1000px',
    }}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', transformOrigin: '50% 100%', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          initial={{ opacity: 0, y: 80, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.25 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </h1>
  )
}

function InvitationCard() {
  const [hovered, setHovered] = useState(false)
  const { scrollY } = useScroll()
  const rotateY = useTransform(scrollY, [0, 600], [0, 20])
  const rotateZ = useTransform(scrollY, [0, 600], [-3, 1])
  const translateY = useTransform(scrollY, [0, 600], [0, -40])

  return (
    <div style={{ perspective: '1400px', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ y: [0, -8, 0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ rotateY, rotateZ: hovered ? 0 : rotateZ, y: translateY, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.02 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative', width: 340, height: 480,
            background: '#FBFAF6', border: `1px solid ${RULE}`,
            boxShadow: '0 1px 1px rgba(26,23,20,.04),0 4px 8px -2px rgba(26,23,20,.07),0 12px 24px -8px rgba(26,23,20,.11),0 32px 60px -16px rgba(26,23,20,.18),0 60px 100px -30px rgba(26,23,20,.22)',
            transformStyle: 'preserve-3d',
          }}
        >
          {[['tl'],['tr'],['bl'],['br']].map(([k]) => (
            <div key={k} style={{
              position: 'absolute', width: 14, height: 14, border: `1px solid ${ACC}`,
              ...(k === 'tl' ? { top: -4, left: -4, borderRight: 'none', borderBottom: 'none' } : {}),
              ...(k === 'tr' ? { top: -4, right: -4, borderLeft: 'none', borderBottom: 'none' } : {}),
              ...(k === 'bl' ? { bottom: -4, left: -4, borderRight: 'none', borderTop: 'none' } : {}),
              ...(k === 'br' ? { bottom: -4, right: -4, borderLeft: 'none', borderTop: 'none' } : {}),
            }} />
          ))}
          <div style={{ position: 'absolute', inset: 20, border: `1px solid ${RULES}`, padding: '32px 24px 22px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 8.5, color: MUTE, marginBottom: 32, letterSpacing: '0.2em' }}>
              <span>—</span><span>TOGETHER WITH THEIR FAMILIES</span><span>—</span>
            </div>
            <div style={{ fontFamily: 'var(--font-pinyon)', fontSize: 50, lineHeight: 1.1, color: INK, display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 10 }}>
              <span>Lorena</span>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 30, color: ACC, fontWeight: 300 }}>&amp;</span>
              <span>Viktor</span>
            </div>
            <div style={{ width: 32, height: 1, background: ACC, margin: '14px 0 18px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', marginBottom: 'auto' }}>
              {[['DATE', '12.06.2026'], ['CEREMONY', '16:30'], ['VENUE', 'Villa Rosa']].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                  <span style={{ fontSize: 8.5, letterSpacing: '0.32em', color: MUTE }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 15, color: INK, letterSpacing: '0.04em' }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 8, letterSpacing: '0.28em', color: MUTE, marginTop: 20, paddingTop: 14, borderTop: `1px solid ${RULE}`, width: '100%', justifyContent: 'center' }}>
              <span>NO. 001</span><span>·</span><span>RSVP BY 01.05.2026</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function ScrollIndicator({ label }: { label: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 9.5, letterSpacing: '0.36em', color: MUTE, textTransform: 'uppercase' }}>{label}</span>
      <div style={{ position: 'relative', width: 1, height: 56, background: RULE, overflow: 'hidden' }}>
        <motion.div
          style={{ position: 'absolute', inset: 0, background: INK }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}

function SideRail() {
  return (
    <div style={{ position: 'absolute', left: 0, top: 60, bottom: 60, width: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, fontSize: 10, letterSpacing: '0.32em', color: MUTE, textTransform: 'uppercase' }}>
      <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 13, letterSpacing: '0.12em', color: INK }}>No. 001</span>
      <div style={{ flex: 1, width: 1, background: RULE }} />
      <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>EST. 2024</span>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, letterSpacing: '0.32em', color: MUTE, textTransform: 'uppercase', marginBottom: 48 }}>
      <span style={{ width: 28, height: 1, background: MUTE, display: 'inline-block' }} />
      {children}
    </div>
  )
}

function HeroSection() {
  const t = useTranslations('home')
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const timer = setTimeout(() => setMounted(true), 80); return () => clearTimeout(timer) }, [])

  return (
    <section style={{ position: 'relative', minHeight: 'calc(100vh - 85px)', padding: '36px 56px 100px', background: CREAM }}>
      <SideRail />
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'stretch', minHeight: 680, paddingLeft: 48 }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, letterSpacing: '0.32em', color: MUTE, textTransform: 'uppercase' }}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 12 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span style={{ width: 28, height: 1, background: MUTE, display: 'inline-block' }} />
            <span>{t('tagline')}</span>
          </motion.div>
          <div style={{ margin: '24px 0 0' }}>
            {mounted && <AnimatedHeadline text={t('headline')} />}
          </div>
          <motion.div
            style={{ maxWidth: 460, marginTop: 24 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 16 }}
            transition={{ duration: 0.9, delay: 1.2 }}
          >
            <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontWeight: 400, fontSize: 20, lineHeight: 1.4, color: INK, marginBottom: 14 }}>
              {t('subheadline')}
            </h2>
            <p style={{ fontSize: 13.5, lineHeight: 1.65, color: MUTE, maxWidth: 380 }}>
              {t('description')}
            </p>
          </motion.div>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 32 }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 16 }}
            transition={{ duration: 0.9, delay: 1.45 }}
          >
            <CTAButton label={t('createCta')} href="/register" />
            <Link href="/demo" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: INK, borderBottom: `1px solid ${RULES}`, paddingBottom: 6, transition: 'border-color .3s ease', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = INK)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = RULES)}
            >
              <span>{t('seeLive')}</span>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1" /></svg>
            </Link>
          </motion.div>
          <motion.div
            style={{ display: 'flex', gap: 48, marginTop: 48, paddingTop: 24, borderTop: `1px solid ${RULE}` }}
            initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 1.7 }}
          >
            {[['14,200', t('celebrations')], ['38', t('countries')], ['4.9', t('avgRating')]].map(([num, label]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 32, lineHeight: 1, color: INK, letterSpacing: '-0.01em' }}>{num}</span>
                <span style={{ fontSize: 10, letterSpacing: '0.24em', color: MUTE, textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div
          style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
        >
          <InvitationCard />
          <div style={{ position: 'absolute', bottom: 12, right: 0, display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, letterSpacing: '0.24em', color: MUTE, textTransform: 'uppercase' }}>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 13, letterSpacing: '0.05em', color: INK }}>FIG. 01</span>
            <span>{t('figCaption')}</span>
          </div>
        </motion.div>
      </div>
      <ScrollIndicator label={t('scroll')} />
    </section>
  )
}

function HowItWorksSection() {
  const t = useTranslations('home')
  const steps = [
    { n: '01', title: t('steps.1.title'), body: t('steps.1.body') },
    { n: '02', title: t('steps.2.title'), body: t('steps.2.body') },
    { n: '03', title: t('steps.3.title'), body: t('steps.3.body') },
    { n: '04', title: t('steps.4.title'), body: t('steps.4.body') },
  ]
  return (
    <section style={{ padding: '100px 56px', background: CREAM, borderTop: `1px solid ${RULE}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel>{t('howItWorks')}</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48 }}>
          {steps.map(({ n, title, body }, i) => (
            <motion.div key={n}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 48, color: RULE, lineHeight: 1, marginBottom: 20 }}>{n}</div>
              <div style={{ width: 28, height: 1, background: ACC, marginBottom: 18 }} />
              <h3 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 18, color: INK, marginBottom: 10, lineHeight: 1.3 }}>{title}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.65, color: MUTE }}>{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LandingTemplateCard({ id, name, category, index }: { id: string; name: string; category: string; index: number }) {
  const [hovered, setHovered] = useState(false)
  const isPopular = ['watercolor', 'riviera'].includes(id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: Math.min(index, 4) * 0.07 }}
      style={{ flexShrink: 0, width: 'clamp(260px, calc((100vw - 160px) / 3), 420px)' }}
    >
      <Link href={`/templates/${id}`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            aspectRatio: '3/4',
            overflow: 'hidden',
            border: `1px solid ${RULE}`,
            position: 'relative',
            transition: 'box-shadow .4s, transform .35s',
            boxShadow: hovered ? '0 30px 60px -28px rgba(28,24,20,.28)' : 'none',
            transform: hovered ? 'translateY(-4px)' : 'none',
          }}
        >
          <TemplateArt id={id} />
          {isPopular && (
            <div style={{ position: 'absolute', top: 12, left: 12, padding: '5px 11px', background: 'rgba(247,244,239,.92)', color: ACC, borderRadius: 99, fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 600, backdropFilter: 'blur(6px)' }}>
              ★ Popular
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,23,20,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transition: 'opacity .35s', backdropFilter: 'blur(2px)' }}>
            <span style={{ padding: '13px 22px', background: CREAM, color: INK, borderRadius: 99, fontSize: 12, letterSpacing: '.04em', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8, transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'transform .35s' }}>
              Poglej dizajn
              <svg width="13" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.2" /></svg>
            </span>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 10, letterSpacing: '.28em', color: MUTE, textTransform: 'uppercase', marginBottom: 5, fontWeight: 500 }}>{category}</div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 22, color: INK, letterSpacing: '-.005em' }}>{name}</div>
        </div>
      </Link>
    </motion.div>
  )
}

function TemplatesSection() {
  const t = useTranslations('home')
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const carousel = carouselRef.current
    if (!section || !carousel) return

    let active = false

    const io = new IntersectionObserver(
      ([entry]) => { active = entry.isIntersecting },
      { threshold: 0.3 }
    )
    io.observe(section)

    function onWheel(e: WheelEvent) {
      if (!active) return
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

      const atStart = carousel.scrollLeft <= 0
      const atEnd = carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1

      if (e.deltaY < 0 && atStart) return
      if (e.deltaY > 0 && atEnd) return

      e.preventDefault()
      carousel.scrollLeft += e.deltaY
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      io.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} style={{ padding: '100px 0', background: '#EFE9DD', borderTop: `1px solid ${RULE}` }}>
      {/* Header */}
      <div style={{ padding: '0 56px', marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <SectionLabel>{t('designs')}</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(42px,6vw,72px)', lineHeight: 0.95, color: INK, letterSpacing: '-0.02em' }}>
            {t('findStyle').split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}
          </h2>
        </div>
        <Link href="/templates" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: INK, borderBottom: `1px solid ${RULES}`, paddingBottom: 4, textDecoration: 'none', flexShrink: 0 }}>
          {t('allTemplates')}
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1" /></svg>
        </Link>
      </div>

      {/* Horizontal scroll carousel — scroll hijack via wheel event on section */}
      <div ref={carouselRef} className="no-scrollbar" style={{
        display: 'flex',
        overflowX: 'auto',
        gap: 24,
        padding: '0 56px 40px',
      }}>
        {TEMPLATES.map((tmpl, i) => (
          <LandingTemplateCard key={tmpl.id} id={tmpl.id} name={tmpl.name} category={tmpl.category} index={i} />
        ))}
      </div>
    </section>
  )
}

function PricingSection() {
  const t = useTranslations('home')
  const pkgs = Object.values(PACKAGES)
  return (
    <section id="pricing" style={{ padding: '100px 56px', background: CREAM, borderTop: `1px solid ${RULE}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel>{t('pricing')}</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(42px,5vw,64px)', lineHeight: 0.95, color: INK, letterSpacing: '-0.02em', marginBottom: 20 }}>
              {t('onePayment').split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}
            </h2>
            <p style={{ fontSize: 13.5, lineHeight: 1.65, color: MUTE }}>{t('pricingDesc')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {pkgs.map((pkg) => (
              <motion.div key={pkg.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ border: `1px solid ${pkg.popular ? ACC : RULE}`, padding: '32px 24px', position: 'relative', background: pkg.popular ? '#FBFAF6' : CREAM }}
              >
                {pkg.popular && (
                  <div style={{ position: 'absolute', top: -1, left: 24, background: ACC, color: CREAM, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', padding: '4px 10px' }}>
                    {t('mostPopular')}
                  </div>
                )}
                <div style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 20, color: INK, marginBottom: 4, marginTop: pkg.popular ? 12 : 0 }}>{pkg.name}</div>
                <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 44, color: INK, lineHeight: 1, marginBottom: 4 }}>€{pkg.price}</div>
                <div style={{ fontSize: 11, color: MUTE, marginBottom: 24, letterSpacing: '0.04em' }}>{t('oneTime')} · {pkg.duration} {t('months')}</div>
                <div style={{ height: 1, background: RULE, marginBottom: 24 }} />
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {pkg.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: SOFT, lineHeight: 1.4 }}>
                      <CheckCircle2 size={13} style={{ color: ACC, marginTop: 2, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/register?package=${pkg.id}`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px 20px', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', background: pkg.popular ? INK : 'transparent', color: pkg.popular ? CREAM : INK, border: `1px solid ${pkg.popular ? INK : RULE}`, transition: 'background .3s, color .3s', textDecoration: 'none' }}
                  onMouseEnter={e => { if (!pkg.popular) { (e.currentTarget as HTMLElement).style.background = INK; (e.currentTarget as HTMLElement).style.color = CREAM } }}
                  onMouseLeave={e => { if (!pkg.popular) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = INK } }}
                >
                  {t('getStarted')}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const t = useTranslations('home')
  const testimonials = [
    { couple: t('testimonials.1.couple'), loc: t('testimonials.1.loc'), quote: t('testimonials.1.quote') },
    { couple: t('testimonials.2.couple'), loc: t('testimonials.2.loc'), quote: t('testimonials.2.quote') },
    { couple: t('testimonials.3.couple'), loc: t('testimonials.3.loc'), quote: t('testimonials.3.quote') },
  ]
  return (
    <section style={{ padding: '100px 56px', background: INK, borderTop: `1px solid ${RULE}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, letterSpacing: '0.32em', color: '#6e6359', textTransform: 'uppercase', marginBottom: 64 }}>
          <span style={{ width: 28, height: 1, background: '#6e6359', display: 'inline-block' }} />
          {t('stories')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {testimonials.map(({ couple, loc, quote }, i) => (
            <motion.div key={couple}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{ borderTop: '1px solid #3a342e', paddingTop: 28 }}
            >
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#EFE9DD', fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', marginBottom: 24 }}>"{quote}"</p>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#F7F4EF' }}>{couple}</div>
              <div style={{ fontSize: 11, color: '#6e6359', letterSpacing: '0.08em', marginTop: 4 }}>{loc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const t = useTranslations('home')
  const [open, setOpen] = useState<number | null>(null)
  const faqs = [
    { q: t('faqs.q1'), a: t('faqs.a1') },
    { q: t('faqs.q2'), a: t('faqs.a2') },
    { q: t('faqs.q3'), a: t('faqs.a3') },
    { q: t('faqs.q4'), a: t('faqs.a4') },
    { q: t('faqs.q5'), a: t('faqs.a5') },
  ]
  return (
    <section style={{ padding: '100px 56px', background: CREAM, borderTop: `1px solid ${RULE}` }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <SectionLabel>{t('questions')}</SectionLabel>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(36px,5vw,56px)', lineHeight: 0.95, color: INK, letterSpacing: '-0.02em', marginBottom: 56 }}>
          {t('frequentlyAsked')}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqs.map(({ q, a }, i) => (
            <div key={i} style={{ borderTop: `1px solid ${RULE}` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', textAlign: 'left', fontSize: 15, color: INK, fontFamily: 'var(--font-instrument)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span>{q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.3 }} style={{ fontSize: 20, color: ACC, flexShrink: 0, marginLeft: 16 }}>+</motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: 13.5, lineHeight: 1.7, color: MUTE, paddingBottom: 20 }}>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div style={{ height: 1, background: RULE }} />
        </div>
      </div>
    </section>
  )
}

function CTABanner() {
  const t = useTranslations('home')
  return (
    <section style={{ padding: '100px 56px', background: '#EFE9DD', borderTop: `1px solid ${RULE}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 64 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-pinyon)', fontSize: 56, color: ACC, lineHeight: 1, marginBottom: 16 }}>{t('beginStory')}</div>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(32px,4vw,52px)', color: INK, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            {t('invitationAway').split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
          <CTAButton label={t('createFrom', { price: '69' })} href="/register" />
          <p style={{ fontSize: 11, color: MUTE, letterSpacing: '0.04em' }}>{t('oneTimePayment')}</p>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div style={{ background: CREAM, minHeight: '100vh' }}>
      <Grain />
      <SiteNav transparent />
      <HeroSection />
      <HowItWorksSection />
      <TemplatesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTABanner />
      <SiteFooter />
    </div>
  )
}
