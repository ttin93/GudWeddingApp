'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Minus, ChevronDown, ChevronUp } from 'lucide-react'
import { PACKAGES } from '@/types'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const SOFT  = '#3a342e'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'
const RULES = '#d9d2c5'
const DEEP  = '#EFE9DD'
const RED   = '#c8553d'

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
        <Link href="/templates" style={{ textDecoration: 'none', color: SOFT }}>Designs</Link>
        <Link href="/pricing" style={{ color: INK, fontWeight: 500, textDecoration: 'none' }}>Pricing</Link>
        <Link href="/demo" style={{ textDecoration: 'none', color: SOFT }}>Demo</Link>
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

// ─── Comparison table data ─────────────────────────────────────────────────────
const TABLE_SECTIONS = [
  {
    title: 'Core',
    rows: [
      { label: 'Digital invitation page', essential: true, elegance: true, signature: true },
      { label: 'RSVP (Yes / No)', essential: true, elegance: true, signature: true },
      { label: 'QR code sharing', essential: true, elegance: true, signature: true },
      { label: 'Analytics & view count', essential: true, elegance: true, signature: true },
    ],
  },
  {
    title: 'RSVP',
    rows: [
      { label: 'Menu preference', essential: false, elegance: true, signature: true },
      { label: 'Guest count (adults)', essential: false, elegance: false, signature: true },
      { label: 'Guest count (children)', essential: false, elegance: false, signature: true },
      { label: 'Allergies field', essential: false, elegance: false, signature: true },
      { label: 'Guest message', essential: false, elegance: true, signature: true },
      { label: 'Export guests CSV', essential: false, elegance: true, signature: true },
    ],
  },
  {
    title: 'Content & Details',
    rows: [
      { label: 'Google Maps integration', essential: false, elegance: true, signature: true },
      { label: 'Dress code section', essential: false, elegance: true, signature: true },
      { label: 'Event timeline / program', essential: false, elegance: true, signature: true },
      { label: 'Transport notes', essential: false, elegance: true, signature: true },
      { label: 'Accommodation section', essential: false, elegance: true, signature: true },
      { label: 'Gift registry links', essential: false, elegance: true, signature: true },
      { label: 'FAQ section', essential: false, elegance: true, signature: true },
      { label: 'Wedding hashtag', essential: false, elegance: true, signature: true },
      { label: 'Music playlist link', essential: false, elegance: true, signature: true },
    ],
  },
  {
    title: 'Gallery',
    rows: [
      { label: 'Photo gallery', essential: false, elegance: '10 photos', signature: '20 photos' },
      { label: 'Wedding countdown', essential: false, elegance: true, signature: true },
    ],
  },
  {
    title: 'Other',
    rows: [
      { label: 'Languages', essential: '1', elegance: '2', signature: '3' },
      { label: 'Add to calendar', essential: false, elegance: false, signature: true },
      { label: 'Template change', essential: false, elegance: false, signature: true },
      { label: 'Priority support', essential: false, elegance: false, signature: true },
      { label: 'Active period', essential: '6 months', elegance: '12 months', signature: '12 months' },
    ],
  },
]

const FAQ_ITEMS = [
  {
    q: 'Do I need an app to view the invitation?',
    a: 'No — the invitation is a regular webpage. Guests open it in any browser, no download required.',
  },
  {
    q: 'Is the payment one-time?',
    a: 'Yes, a single payment that covers the full active period (6 or 12 months). No recurring fees.',
  },
  {
    q: 'Can I change templates later?',
    a: 'Signature plan includes a free template change. Essential and Elegance plans use the template chosen at creation.',
  },
  {
    q: 'What happens after the active period?',
    a: 'The invitation page becomes inactive. All your data is retained — you can reactivate with a new plan purchase.',
  },
  {
    q: 'Can I upgrade my plan?',
    a: 'Yes — contact us and we will credit your remaining period toward the upgrade.',
  },
  {
    q: 'How long until my invitation is live?',
    a: 'Instantly. Once you complete the wizard and make payment, your invitation is published immediately.',
  },
]

function CellValue({ val }: { val: boolean | string }) {
  if (val === false) return <Minus size={14} style={{ color: RULES }} />
  if (val === true) return <Check size={14} style={{ color: '#2D6A4F' }} />
  return <span style={{ fontSize: 12, color: INK }}>{val}</span>
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${RULE}` }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 15, color: INK, fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>{q}</span>
        {open ? <ChevronUp size={16} style={{ color: MUTE, flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: MUTE, flexShrink: 0 }} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ paddingBottom: 20, fontSize: 14, color: MUTE, lineHeight: 1.7 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function PricingPage() {
  return (
    <div style={{ background: CREAM, color: INK, minHeight: '100vh' }}>
      <Navbar />
      <div style={{ height: 72 }} />

      {/* ── HERO ── */}
      <div style={{ padding: '80px 56px 64px', borderBottom: `1px solid ${RULE}`, textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10.5, letterSpacing: '0.32em', color: MUTE, textTransform: 'uppercase', marginBottom: 24, justifyContent: 'center' }}>
            <span style={{ width: 28, height: 1, background: MUTE, display: 'inline-block' }} />
            Packages & Pricing
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(48px,7vw,80px)', lineHeight: 1, color: INK, marginBottom: 20 }}>
            One link.<br />Everything they need.
          </h1>
          <p style={{ fontSize: 15, color: MUTE, lineHeight: 1.7, marginBottom: 36 }}>
            A single page for RSVP, directions, timeline, and all the details —<br />
            beautifully composed, without any technical setup.
          </p>
          <Link href="/register" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 28px', background: INK, color: CREAM,
            fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none',
          }}>
            Start your invitation
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── PRICING CARDS ── */}
      <div style={{ padding: '72px 56px', borderBottom: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, alignItems: 'stretch' }}>

          {/* Essential */}
          <div style={{ background: CREAM, border: `1px solid ${RULE}`, padding: '40px 32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 9.5, letterSpacing: '0.4em', textTransform: 'uppercase', color: MUTE, marginBottom: 12 }}>Essential</div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 13, color: MUTE, marginBottom: 24, lineHeight: 1.4 }}>
              For sharing the essentials, without complexity
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 56, lineHeight: 1, color: INK }}>€{PACKAGES.essential.price}</span>
              <span style={{ fontSize: 11, color: MUTE }}>/once</span>
            </div>
            <div style={{ fontSize: 11, color: MUTE, marginBottom: 32 }}>Active {PACKAGES.essential.duration} months</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {PACKAGES.essential.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Check size={13} style={{ color: ACC, marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: SOFT, lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/register?plan=essential" style={{
              display: 'block', textAlign: 'center', padding: '13px',
              border: `1px solid ${INK}`, color: INK,
              fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none',
              transition: 'background .2s',
            }}>
              Choose Essential
            </Link>
          </div>

          {/* Elegance — popular */}
          <div style={{ background: INK, border: `1px solid ${INK}`, padding: '40px 32px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: RED, color: 'white', fontSize: 8.5, letterSpacing: '0.3em', padding: '5px 14px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Most popular
            </div>
            <div style={{ fontSize: 9.5, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#A09080', marginBottom: 12 }}>Elegance</div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 13, color: '#A09080', marginBottom: 24, lineHeight: 1.4 }}>
              Everything you need for a complete invitation
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 56, lineHeight: 1, color: CREAM }}>€{PACKAGES.elegance.price}</span>
              <span style={{ fontSize: 11, color: '#A09080' }}>/once</span>
            </div>
            <div style={{ fontSize: 11, color: '#A09080', marginBottom: 32 }}>Active {PACKAGES.elegance.duration} months</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {PACKAGES.elegance.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Check size={13} style={{ color: ACC, marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#D4C8B8', lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/register?plan=elegance" style={{
              display: 'block', textAlign: 'center', padding: '13px',
              background: CREAM, color: INK,
              fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none',
            }}>
              Choose Elegance
            </Link>
          </div>

          {/* Signature */}
          <div style={{ background: CREAM, border: `1px solid ${RULE}`, padding: '40px 32px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 9.5, letterSpacing: '0.4em', textTransform: 'uppercase', color: MUTE, marginBottom: 12 }}>Signature</div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 13, color: MUTE, marginBottom: 24, lineHeight: 1.4 }}>
              Premium luxury for every detail
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 56, lineHeight: 1, color: INK }}>€{PACKAGES.signature.price}</span>
              <span style={{ fontSize: 11, color: MUTE }}>/once</span>
            </div>
            <div style={{ fontSize: 11, color: MUTE, marginBottom: 32 }}>Active {PACKAGES.signature.duration} months</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {PACKAGES.signature.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Check size={13} style={{ color: ACC, marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: SOFT, lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/register?plan=signature" style={{
              display: 'block', textAlign: 'center', padding: '13px',
              border: `1px solid ${INK}`, color: INK,
              fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none',
            }}>
              Choose Signature
            </Link>
          </div>
        </div>
      </div>

      {/* ── COMPARISON TABLE ── */}
      <div style={{ padding: '80px 56px', borderBottom: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 10.5, letterSpacing: '0.32em', textTransform: 'uppercase', color: MUTE, marginBottom: 16 }}>Full comparison</div>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 40, color: INK }}>
              Detailed package overview
            </h2>
          </div>

          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 120px', gap: 0, marginBottom: 0 }}>
            <div />
            {['Essential', 'Elegance', 'Signature'].map((name, i) => (
              <div key={name} style={{
                textAlign: 'center', padding: '16px 8px',
                background: i === 1 ? INK : SOFT,
                fontSize: 9.5, letterSpacing: '0.3em', textTransform: 'uppercase',
                color: i === 1 ? CREAM : CREAM,
              }}>
                {name}
              </div>
            ))}
          </div>

          {TABLE_SECTIONS.map((section) => (
            <div key={section.title}>
              {/* Section header */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 120px' }}>
                <div style={{ padding: '12px 0', fontSize: 9, letterSpacing: '0.36em', textTransform: 'uppercase', color: MUTE, borderTop: `1px solid ${RULE}`, marginTop: 8 }}>
                  {section.title}
                </div>
                <div style={{ borderTop: `1px solid ${RULE}`, marginTop: 8 }} />
                <div style={{ borderTop: `1px solid ${RULE}`, marginTop: 8 }} />
                <div style={{ borderTop: `1px solid ${RULE}`, marginTop: 8 }} />
              </div>
              {section.rows.map((row, ri) => (
                <div key={ri} style={{
                  display: 'grid', gridTemplateColumns: '1fr 120px 120px 120px',
                  background: ri % 2 === 0 ? 'transparent' : DEEP + '44',
                  borderBottom: `1px solid ${RULE}`,
                }}>
                  <div style={{ padding: '12px 0', fontSize: 13, color: SOFT }}>{row.label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CellValue val={row.essential} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${INK}08` }}>
                    <CellValue val={row.elegance} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CellValue val={row.signature} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── WHICH PLAN ── */}
      <div style={{ padding: '80px 56px', borderBottom: `1px solid ${RULE}`, background: DEEP }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 40, color: INK }}>
              Which plan is right for you?
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {[
              {
                want: 'I want simplicity',
                desc: 'A beautiful digital invitation with basic RSVP — no extras, no fuss.',
                plan: 'Essential',
                href: '/register?plan=essential',
              },
              {
                want: 'I want full organisation',
                desc: 'The complete package: maps, timeline, gallery, menu RSVP, multilingual.',
                plan: 'Elegance',
                href: '/register?plan=elegance',
              },
              {
                want: 'I want premium',
                desc: 'Maximum control: guest details, children count, calendar, priority support.',
                plan: 'Signature',
                href: '/register?plan=signature',
              },
            ].map(({ want, desc, plan, href }) => (
              <div key={plan} style={{ background: CREAM, border: `1px solid ${RULE}`, padding: '32px 28px' }}>
                <div style={{ fontSize: 9.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: MUTE, marginBottom: 12 }}>
                  {want}
                </div>
                <p style={{ fontSize: 13.5, color: SOFT, lineHeight: 1.6, marginBottom: 20 }}>{desc}</p>
                <Link href={href} style={{ fontSize: 11, color: INK, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                  → {plan}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ padding: '80px 56px', borderBottom: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 40, color: INK }}>
              Frequently asked questions
            </h2>
          </div>
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ padding: '80px 56px', background: INK, textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-pinyon)', fontSize: 52, color: ACC, lineHeight: 1, marginBottom: 16 }}>
            Begin your story
          </div>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(28px,4vw,42px)', color: CREAM, lineHeight: 1.1, marginBottom: 32 }}>
            From €{PACKAGES.essential.price} — active in minutes
          </h2>
          <Link href="/register" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '16px 32px', background: CREAM, color: INK,
            fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none',
          }}>
            Create your invitation
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
