'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TEMPLATES } from '@/types'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const SOFT  = '#3a342e'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const DEEP  = '#EFE9DD'
const RULE  = '#E8E2D9'
const RULES = '#d9d2c5'

const CATEGORIES = ['all', 'timeless', 'contemporary', 'romance'] as const
type Cat = (typeof CATEGORIES)[number]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 72, padding: '0 56px',
      background: scrolled ? 'rgba(247,244,239,0.96)' : CREAM,
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      borderBottom: `1px solid ${RULE}`,
      transition: 'background .4s ease',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-dm-serif)', fontSize: 18, color: INK, textDecoration: 'none' }}>
        <span style={{ fontSize: 9, color: ACC }}>◉</span>
        Invitia
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, fontSize: 12, letterSpacing: '0.06em', color: SOFT }}>
        <Link href="/templates" style={{ color: INK, fontWeight: 500, textDecoration: 'none' }}>Designs</Link>
        <Link href="/#pricing" style={{ textDecoration: 'none', color: SOFT }}>Pricing</Link>
        <Link href="/login" style={{ textDecoration: 'none', color: SOFT }}>Sign in</Link>
        <Link href="/register" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '9px 18px', background: INK, color: CREAM,
          fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
        }}>
          Create invitation
        </Link>
      </div>
    </nav>
  )
}

// Mini template preview card rendered from colors + fonts
function TemplateCard({ template, index }: { template: typeof TEMPLATES[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const c = template.colors
  const isDark = parseInt(c.background.slice(1, 3), 16) < 80

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
    >
      <Link href={`/templates/${template.id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            aspectRatio: '3/4',
            background: c.background,
            border: `1px solid ${hovered ? c.primary : RULE}`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'space-between',
            padding: '28px 20px',
            position: 'relative', overflow: 'hidden',
            transition: 'transform .35s ease, box-shadow .35s ease, border-color .2s',
            transform: hovered ? 'translateY(-4px)' : 'none',
            boxShadow: hovered ? `0 20px 48px -12px ${c.primary}55` : '0 1px 4px rgba(0,0,0,.06)',
          }}
        >
          {/* Category badge */}
          <div style={{
            alignSelf: 'flex-start',
            fontSize: 8.5, letterSpacing: '0.36em', textTransform: 'uppercase',
            color: isDark ? c.textMuted : MUTE,
            opacity: 0.8,
          }}>
            {template.category}
          </div>

          {/* Center content */}
          <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '16px 0' }}>
            <div style={{
              fontFamily: 'var(--font-pinyon)',
              fontSize: 40, lineHeight: 1.15,
              color: c.primary,
            }}>
              Lorena
            </div>
            <div style={{
              fontFamily: 'var(--font-cormorant)',
              fontStyle: 'italic',
              fontSize: 18, color: c.accent, fontWeight: 300,
              margin: '4px 0',
            }}>
              &amp;
            </div>
            <div style={{
              fontFamily: 'var(--font-pinyon)',
              fontSize: 40, lineHeight: 1.15,
              color: c.primary,
            }}>
              Viktor
            </div>

            <div style={{ width: 28, height: 1, background: c.accent, margin: '14px auto' }} />

            <div style={{ fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: c.textMuted }}>
              12.09.2026
            </div>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', color: c.textMuted, marginTop: 4 }}>
              Villa Rosa · Tuscany
            </div>
          </div>

          {/* Bottom */}
          <div style={{
            alignSelf: 'stretch',
            paddingTop: 14, borderTop: `1px solid ${isDark ? c.accent + '30' : RULES}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            fontSize: 8.5, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: isDark ? c.textMuted : MUTE,
          }}>
            View design
            <svg width="10" height="8" viewBox="0 0 14 10" fill="none">
              <path d="M0 5H13M13 5L9 1M13 5L9 9" stroke={isDark ? c.textMuted : MUTE} strokeWidth="1" />
            </svg>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: INK }}>{template.name}</div>
          <div style={{ fontSize: 11, color: MUTE, textTransform: 'capitalize', marginTop: 2 }}>{template.category}</div>
        </div>
      </Link>
    </motion.div>
  )
}

// Coming soon placeholder card
function ComingSoonCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
    >
      <div style={{ aspectRatio: '3/4', position: 'relative' }}>
        <div style={{
          width: '100%', height: '100%',
          background: DEEP,
          border: `1px dashed ${RULES}`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 24, textAlign: 'center',
          opacity: 0.7,
        }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 22, color: MUTE, lineHeight: 1.3, marginBottom: 12 }}>
            New designs<br />in progress
          </div>
          <div style={{ width: 28, height: 1, background: RULES, marginBottom: 12 }} />
          <div style={{ fontSize: 9.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: MUTE }}>
            Coming soon
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: MUTE, opacity: 0.6 }}>Untitled</div>
        <div style={{ fontSize: 11, color: MUTE, opacity: 0.5, marginTop: 2 }}>Coming soon</div>
      </div>
    </motion.div>
  )
}

export default function TemplatesPage() {
  const [cat, setCat] = useState<Cat>('all')
  const filtered = cat === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.category === cat)

  return (
    <div style={{ background: CREAM, minHeight: '100vh' }}>
      <Navbar />
      <div style={{ height: 72 }} />

      {/* Hero strip */}
      <div style={{ padding: '64px 56px 48px', borderBottom: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10.5, letterSpacing: '0.32em', color: MUTE, textTransform: 'uppercase', marginBottom: 20 }}>
            <span style={{ width: 28, height: 1, background: MUTE, display: 'inline-block' }} />
            Template designs
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40 }}>
            <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(48px,7vw,88px)', lineHeight: 0.93, color: INK, letterSpacing: '-0.025em' }}>
              Find your<br />perfect style
            </h1>
            <p style={{ fontSize: 13.5, color: MUTE, maxWidth: 320, lineHeight: 1.65 }}>
              Every template is fully customisable — your names, your date, your message. Click any design to preview it with real data.
            </p>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ borderBottom: `1px solid ${RULE}`, padding: '0 56px', background: CREAM }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 0 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '14px 20px',
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: cat === c ? INK : MUTE,
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: cat === c ? `2px solid ${INK}` : '2px solid transparent',
              marginBottom: -1, transition: 'color .2s',
            }}>
              {c === 'all' ? `All (${TEMPLATES.length})` : c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: '56px 56px 100px', maxWidth: 1100 + 112, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '28px 20px' }}>
          {filtered.map((t, i) => (
            <TemplateCard key={t.id} template={t} index={i} />
          ))}
          {cat === 'all' && <ComingSoonCard index={filtered.length} />}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ borderTop: `1px solid ${RULE}`, background: DEEP, padding: '64px 56px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-pinyon)', fontSize: 40, color: ACC, lineHeight: 1, marginBottom: 10 }}>
              Begin your story
            </div>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(28px,4vw,44px)', color: INK, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Your invitation, from €69
            </h2>
          </div>
          <Link href="/register" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '16px 28px',
            background: INK, color: CREAM,
            fontFamily: 'var(--font-instrument)', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            Create invitation
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
