'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ChevronDown, ChevronUp, ArrowRight, Star } from 'lucide-react'
import { PACKAGES } from '@/types'

const BG     = '#F6F1E8'
const BG2    = '#EFE7D5'
const PAPER  = '#FBF7EE'
const INK    = '#1C1814'
const INK2   = '#3a342b'
const MUTE   = '#7d7466'
const LINE   = '#E2D7BF'
const ACC    = '#9C6B3D'
const ACC2   = '#C99563'
const ACCS   = '#E8D4B8'
const NOIR   = '#15110B'
const NOIR2  = '#1F1A12'

const fraunces = 'var(--font-fraunces), "Fraunces", Georgia, serif'
const sans = 'var(--font-instrument), "Inter", sans-serif'

const GRAIN = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.10 0 0 0 0 0.08 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`

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
      height: 68, padding: '0 48px',
      background: scrolled ? 'rgba(246,241,232,0.96)' : BG,
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      borderBottom: `1px solid ${LINE}`,
      transition: 'background .3s',
      fontFamily: sans,
    }}>
      <Link href="/" style={{ fontFamily: fraunces, fontSize: 22, color: INK, textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 0 }}>
        <span style={{ fontStyle: 'italic' }}>Invitia</span>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36, fontSize: 13.5, color: INK2 }}>
        <Link href="/templates" style={{ textDecoration: 'none', color: INK2 }}>Designs</Link>
        <Link href="/pricing" style={{ color: ACC, fontWeight: 500, textDecoration: 'none', position: 'relative' }}>
          Pricing
          <span style={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: 1, background: ACC }} />
        </Link>
        <Link href="/demo" style={{ textDecoration: 'none', color: INK2 }}>Demo</Link>
        <Link href="/login" style={{ textDecoration: 'none', color: INK2 }}>Sign in</Link>
        <Link href="/register" style={{
          padding: '10px 22px', background: INK, color: PAPER,
          borderRadius: 99, fontSize: 12.5, letterSpacing: '.04em', textDecoration: 'none',
        }}>
          Begin →
        </Link>
      </div>
    </nav>
  )
}

// ─── Comparison data ──────────────────────────────────────────────────────────
const COMPARE = [
  {
    group: 'Core',
    rows: [
      { label: 'Digital invitation page', e: true, el: true, s: true },
      { label: 'RSVP (Yes / No)', e: true, el: true, s: true },
      { label: 'QR code sharing', e: true, el: true, s: true },
      { label: 'Analytics & view count', e: true, el: true, s: true },
    ],
  },
  {
    group: 'RSVP & Guests',
    rows: [
      { label: 'Menu preference', e: false, el: true, s: true },
      { label: 'Guest count (adults + children)', e: false, el: false, s: true },
      { label: 'Allergies field', e: false, el: false, s: true },
      { label: 'Guest message', e: false, el: true, s: true },
      { label: 'Export guests CSV', e: false, el: true, s: true },
    ],
  },
  {
    group: 'Content & Details',
    rows: [
      { label: 'Google Maps integration', e: false, el: true, s: true },
      { label: 'Event timeline / program', e: false, el: true, s: true },
      { label: 'Dress code section', e: false, el: true, s: true },
      { label: 'Accommodation & transport', e: false, el: true, s: true },
      { label: 'Gift registry links', e: false, el: true, s: true },
      { label: 'FAQ section', e: false, el: true, s: true },
      { label: 'Wedding hashtag', e: false, el: true, s: true },
    ],
  },
  {
    group: 'Gallery & Features',
    rows: [
      { label: 'Photo gallery', e: false, el: '10 photos', s: '20 photos' },
      { label: 'Wedding countdown', e: false, el: true, s: true },
      { label: 'Languages', e: '1', el: '2', s: '3' },
      { label: 'Template change', e: false, el: false, s: true },
      { label: 'Add to calendar', e: false, el: false, s: true },
      { label: 'Priority support', e: false, el: false, s: true },
      { label: 'Active period', e: '6 months', el: '12 months', s: '12 months' },
    ],
  },
]

const FAQ_ITEMS = [
  { q: 'How quickly does the invitation go live?', a: 'Instantly — as soon as you complete the wizard and payment, your invitation is published and shareable immediately.' },
  { q: 'Is this a one-time payment?', a: 'Yes, a single payment covering the full active period. No subscriptions, no recurring fees, no hidden charges.' },
  { q: 'Can I edit the invitation after publishing?', a: 'Absolutely. All fields can be updated anytime from your dashboard — names, dates, venue, timeline, everything.' },
  { q: 'Can I change the template after purchase?', a: 'Signature plan includes a free template change. Essential and Elegance keep the template chosen at creation.' },
  { q: 'What happens when the active period ends?', a: 'The invitation page becomes inactive but all your data is retained. You can reactivate with a new plan at any time.' },
  { q: 'Can I upgrade my plan later?', a: 'Yes — contact us anytime before your wedding and we will credit the remaining period toward the upgrade.' },
]

function FAQRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${LINE}` }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '28px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
          fontFamily: fraunces,
        }}
      >
        <span style={{ fontSize: 20, color: INK, fontWeight: 400, letterSpacing: '-.005em', lineHeight: 1.3 }}>{q}</span>
        <span style={{
          width: 36, height: 36, border: `1px solid ${open ? INK : LINE}`, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginLeft: 24,
          background: open ? INK : 'transparent', color: open ? PAPER : INK2,
          transition: 'all .25s',
        }}>
          <span style={{ display: 'block', fontSize: 14, lineHeight: 1, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .25s' }}>+</span>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ paddingBottom: 28, fontSize: 15, color: INK2, lineHeight: 1.7, maxWidth: 680, fontFamily: sans }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Cell({ val }: { val: boolean | string }) {
  if (val === false) return <X size={17} style={{ color: LINE }} />
  if (val === true) return <Check size={17} style={{ color: ACC }} />
  return <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 17, color: INK }}>{val}</span>
}

export default function PricingPage() {
  return (
    <div style={{ background: BG, color: INK, minHeight: '100vh', fontFamily: sans, position: 'relative' }}>
      {/* Grain overlay */}
      <div aria-hidden style={{
        position: 'fixed', inset: 0, zIndex: 200, pointerEvents: 'none',
        opacity: .4, mixBlendMode: 'multiply',
        backgroundImage: GRAIN, backgroundSize: '240px 240px',
      }} />

      <Navbar />
      <div style={{ height: 68 }} />

      {/* ── HERO ── */}
      <section style={{ padding: '96px 48px 64px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 24 }}>
            — Paketi & cene —
          </div>
          <h1 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(52px,8vw,108px)', lineHeight: 1.02, letterSpacing: '-.022em', marginBottom: 28 }}>
            Vaša zgodba,{' '}
            <span style={{ fontStyle: 'italic', color: ACC }}>vaša stran.</span>
            <br />Brez kompromisov.
          </h1>
          <p style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,2vw,22px)', color: INK2, maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.55 }}>
            Izberite paket, ki ustreza vašemu posebnemu dnevu — od elegantnega povabila do popolnoma personalizirane poročne strani z RSVP, galerijo in odštevalnikom.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', fontSize: 13, color: MUTE }}>
            {['Takoj aktivno', 'Enkratno plačilo', 'Hosting in domena vključena'].map((t, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Check size={13} style={{ color: ACC }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section id="pricing" style={{ padding: '32px 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, alignItems: 'start' }}>

          {/* Essential */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6,
              padding: '48px 36px 40px', display: 'flex', flexDirection: 'column',
              transition: 'transform .35s, box-shadow .35s',
            }}
            whileHover={{ y: -4, boxShadow: `0 30px 60px -30px rgba(28,24,20,.2)` }}
          >
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 8 }}>Essential</div>
            <h3 style={{ fontFamily: fraunces, fontWeight: 400, fontSize: 32, letterSpacing: '-.01em', color: INK, marginBottom: 8 }}>
              Za <span style={{ fontStyle: 'italic', color: ACC }}>intimne</span> praznike
            </h3>
            <p style={{ fontSize: 13.5, color: MUTE, lineHeight: 1.55, marginBottom: 0 }}>Vse osnovno — elegantno povabilo, RSVP in odštevalnik.</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '24px 0', borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, margin: '24px 0 28px' }}>
              <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 24, color: MUTE, lineHeight: 1 }}>€</span>
              <span style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 80, lineHeight: .95, letterSpacing: '-.02em', color: INK }}>{PACKAGES.essential.price}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginLeft: 6 }}>
                <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 12, color: MUTE }}>enkratno</span>
                <span style={{ fontSize: 12, color: MUTE, textDecoration: 'line-through' }}>€99</span>
              </div>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32, flex: 1 }}>
              {PACKAGES.essential.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: INK2, lineHeight: 1.5 }}>
                  <Check size={16} style={{ color: ACC, flexShrink: 0, marginTop: 2 }} />
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/register?plan=essential" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '16px 24px', border: `1px solid ${INK}`, borderRadius: 99,
              background: 'transparent', color: INK,
              fontSize: 13.5, fontWeight: 500, letterSpacing: '.04em', textDecoration: 'none',
              transition: 'all .3s',
            }}>
              Izberi Essential <ArrowRight size={14} />
            </Link>
            <div style={{ marginTop: 14, textAlign: 'center', fontFamily: fraunces, fontStyle: 'italic', fontSize: 11.5, color: MUTE }}>
              Aktivno {PACKAGES.essential.duration} mesecev
            </div>
          </motion.div>

          {/* Elegance — featured */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              background: NOIR, color: PAPER, border: `1px solid ${NOIR}`, borderRadius: 6,
              padding: '48px 36px 40px', display: 'flex', flexDirection: 'column',
              position: 'relative', transform: 'translateY(-12px)',
              boxShadow: `0 40px 80px -30px rgba(28,24,20,.4)`,
            }}
          >
            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', padding: '8px 20px', background: ACC, color: PAPER, borderRadius: 99, fontSize: 10.5, letterSpacing: '.32em', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap', display: 'flex', gap: 6, alignItems: 'center', boxShadow: `0 12px 28px -8px rgba(156,107,61,.5)` }}>
              <Star size={11} fill="currentColor" />
              Najpopularnejši
            </div>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 6, background: 'radial-gradient(140% 80% at 50% 0%,rgba(201,149,99,.18),transparent 60%)', pointerEvents: 'none' }} />

            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC2, fontWeight: 500, marginBottom: 8, position: 'relative' }}>Elegance</div>
            <h3 style={{ fontFamily: fraunces, fontWeight: 400, fontSize: 32, letterSpacing: '-.01em', color: PAPER, marginBottom: 8, position: 'relative' }}>
              Najboljša <span style={{ fontStyle: 'italic', color: ACC2 }}>izbira</span>
            </h3>
            <p style={{ fontSize: 13.5, color: ACCS, lineHeight: 1.55, marginBottom: 0, position: 'relative' }}>Kompletna stran z zgodbo, programom, galerijo in hashtagom.</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '24px 0', borderTop: `1px solid rgba(232,212,184,.15)`, borderBottom: `1px solid rgba(232,212,184,.15)`, margin: '24px 0 28px', position: 'relative' }}>
              <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 24, color: ACCS, lineHeight: 1 }}>€</span>
              <span style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 80, lineHeight: .95, letterSpacing: '-.02em', color: PAPER }}>{PACKAGES.elegance.price}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginLeft: 6 }}>
                <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 12, color: ACCS }}>enkratno</span>
                <span style={{ fontSize: 12, color: ACCS, textDecoration: 'line-through' }}>€119</span>
              </div>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32, flex: 1, position: 'relative' }}>
              {PACKAGES.elegance.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: ACCS, lineHeight: 1.5 }}>
                  <Check size={16} style={{ color: ACC2, flexShrink: 0, marginTop: 2 }} />
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/register?plan=elegance" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '16px 24px', border: `1px solid ${ACC}`, borderRadius: 99,
              background: ACC, color: PAPER,
              fontSize: 13.5, fontWeight: 500, letterSpacing: '.04em', textDecoration: 'none',
              position: 'relative',
            }}>
              Izberi Elegance <ArrowRight size={14} />
            </Link>
            <div style={{ marginTop: 14, textAlign: 'center', fontFamily: fraunces, fontStyle: 'italic', fontSize: 11.5, color: ACCS, position: 'relative' }}>
              Aktivno {PACKAGES.elegance.duration} mesecev
            </div>
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6,
              padding: '48px 36px 40px', display: 'flex', flexDirection: 'column',
            }}
            whileHover={{ y: -4, boxShadow: `0 30px 60px -30px rgba(28,24,20,.2)` }}
          >
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 8 }}>Signature</div>
            <h3 style={{ fontFamily: fraunces, fontWeight: 400, fontSize: 32, letterSpacing: '-.01em', color: INK, marginBottom: 8 }}>
              Popolnoma <span style={{ fontStyle: 'italic', color: ACC }}>personalizirano</span>
            </h3>
            <p style={{ fontSize: 13.5, color: MUTE, lineHeight: 1.55, marginBottom: 0 }}>Maksimalen nadzor: gostje, meniji, otroci, prednostna podpora.</p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '24px 0', borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, margin: '24px 0 28px' }}>
              <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 24, color: MUTE, lineHeight: 1 }}>€</span>
              <span style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 80, lineHeight: .95, letterSpacing: '-.02em', color: INK }}>{PACKAGES.signature.price}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginLeft: 6 }}>
                <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 12, color: MUTE }}>enkratno</span>
                <span style={{ fontSize: 12, color: MUTE, textDecoration: 'line-through' }}>€149</span>
              </div>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32, flex: 1 }}>
              {PACKAGES.signature.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: INK2, lineHeight: 1.5 }}>
                  <Check size={16} style={{ color: ACC, flexShrink: 0, marginTop: 2 }} />
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/register?plan=signature" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '16px 24px', border: `1px solid ${INK}`, borderRadius: 99,
              background: 'transparent', color: INK,
              fontSize: 13.5, fontWeight: 500, letterSpacing: '.04em', textDecoration: 'none',
            }}>
              Izberi Signature <ArrowRight size={14} />
            </Link>
            <div style={{ marginTop: 14, textAlign: 'center', fontFamily: fraunces, fontStyle: 'italic', fontSize: 11.5, color: MUTE }}>
              Aktivno {PACKAGES.signature.duration} mesecev
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT / WHITE GLOVE ── */}
      <section style={{ padding: '0 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{
            position: 'relative', background: NOIR, color: PAPER, borderRadius: 8,
            padding: '80px 64px', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 48, alignItems: 'center', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 100% at 100% 50%,rgba(201,149,99,.16),transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: -40, bottom: -80, fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 320, lineHeight: 1, color: 'rgba(232,212,184,.04)', pointerEvents: 'none' }}>∞</div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: 11, letterSpacing: '.36em', color: ACC2, textTransform: 'uppercase', marginBottom: 18, fontWeight: 500 }}>— Po meri · White Glove —</div>
              <h2 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(36px,5vw,60px)', letterSpacing: '-.015em', lineHeight: 1.05, marginBottom: 20 }}>
                Popolnoma <span style={{ fontStyle: 'italic', color: ACC2 }}>personalizirano.</span><br />Brez predlog.
              </h2>
              <p style={{ fontSize: 15, color: ACCS, lineHeight: 1.65, maxWidth: 520, marginBottom: 32 }}>
                Noben paket ne ustreza vaši viziji? Naš studio ustvari spletno stran od nič — vaše barve, vaše pisave, vaše animacije. Pogovorimo se o vaši ideji.
              </p>
              <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 36, maxWidth: 480 }}>
                {['Custom dizajn studio', 'Animacije in 3D efekti', 'Večjezično (SL/EN/DE)', 'Live streaming integracija'].map((t, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: PAPER }}>
                    <Check size={14} style={{ color: ACC2, flexShrink: 0 }} />
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="mailto:studio@invitia.si" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '18px 32px', background: ACC, color: PAPER, borderRadius: 99,
                fontSize: 13.5, fontWeight: 500, letterSpacing: '.04em', textDecoration: 'none',
              }}>
                Zahtevaj ponudbo <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ background: 'rgba(251,247,238,.04)', border: `1px solid rgba(232,212,184,.12)`, borderRadius: 6, padding: 32 }}>
                <h4 style={{ fontFamily: fraunces, fontWeight: 400, fontSize: 24, marginBottom: 6 }}>Direkten kontakt</h4>
                <div style={{ fontFamily: fraunces, fontStyle: 'italic', color: ACCS, marginBottom: 24, fontSize: 14 }}>Odgovorimo v 24 urah.</div>
                {[
                  { icon: '✉', label: 'E-mail', val: 'studio@invitia.si' },
                  { icon: '☏', label: 'Telefon', val: '+386 41 123 456' },
                  { icon: '◎', label: 'Studio', val: 'Ljubljana · Maribor' },
                ].map(({ icon, label, val }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderTop: `1px solid rgba(232,212,184,.1)` }}>
                    <div style={{ width: 36, height: 36, border: `1px solid ${ACC2}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACC2, flexShrink: 0, fontSize: 14 }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 10.5, letterSpacing: '.24em', color: MUTE, textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 17, color: PAPER }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section id="compare" style={{ padding: '0 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 8 }}>— Primerjava —</div>
            <h2 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(36px,5.5vw,64px)', letterSpacing: '-.015em', lineHeight: 1.05, marginBottom: 16 }}>
              Podrobna <span style={{ fontStyle: 'italic', color: ACC }}>primerjava</span> paketov
            </h2>
            <p style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 18, color: INK2, maxWidth: 520, margin: '0 auto' }}>Vse, kar je vključeno v vsakem paketu, na enem mestu.</p>
          </div>

          <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: BG2, borderBottom: `1px solid ${LINE}` }}>
              <div style={{ padding: '24px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 18, color: INK2 }}>Možnost</span>
              </div>
              {[
                { name: 'Essential', price: `€${PACKAGES.essential.price}`, featured: false },
                { name: 'Elegance ★', price: `€${PACKAGES.elegance.price}`, featured: true },
                { name: 'Signature', price: `€${PACKAGES.signature.price}`, featured: false },
              ].map(({ name, price, featured }) => (
                <div key={name} style={{
                  padding: 24, textAlign: 'center',
                  background: featured ? NOIR : 'transparent',
                  color: featured ? PAPER : INK,
                  borderLeft: `1px solid ${LINE}`,
                }}>
                  <div style={{ fontFamily: fraunces, fontWeight: 400, fontSize: 22, marginBottom: 4, color: featured ? PAPER : INK }}>
                    {name.includes('★') ? <>{name.replace(' ★', '')} <span style={{ fontStyle: 'italic', color: ACC2 }}>★</span></> : name}
                  </div>
                  <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 14, color: featured ? ACCS : MUTE }}>{price}</div>
                </div>
              ))}
            </div>

            {COMPARE.map((section, si) => (
              <div key={si} style={{ borderBottom: `1px solid ${LINE}` }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
                  <div style={{ gridColumn: '1/-1', padding: '20px 24px', background: BG2, fontFamily: fraunces, fontStyle: 'italic', fontSize: 15, color: ACC, letterSpacing: '.04em', borderBottom: `1px solid ${LINE}` }}>
                    {section.group}
                  </div>
                </div>
                {section.rows.map((row, ri) => (
                  <div key={ri} style={{
                    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    borderBottom: ri < section.rows.length - 1 ? `1px solid rgba(226,215,191,.5)` : 'none',
                    transition: 'background .2s',
                  }}>
                    <div style={{ padding: '18px 24px', fontSize: 14, color: INK, fontWeight: 500, borderRight: `1px solid rgba(226,215,191,.5)` }}>{row.label}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: `1px solid rgba(226,215,191,.5)` }}>
                      <Cell val={row.e} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(232,212,184,.22)', borderRight: `1px solid rgba(226,215,191,.5)` }}>
                      <Cell val={row.el} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Cell val={row.s} />
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* CTA row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: BG2 }}>
              <div style={{ padding: '24px', display: 'flex', alignItems: 'center', fontFamily: fraunces, fontStyle: 'italic', color: MUTE, fontSize: 14 }}>
                Pripravljeni za izbiro?
              </div>
              {[
                { href: '/register?plan=essential', label: 'Izberi', featured: false },
                { href: '/register?plan=elegance', label: 'Izberi', featured: true },
                { href: '/register?plan=signature', label: 'Izberi', featured: false },
              ].map(({ href, label, featured }) => (
                <div key={href} style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: `1px solid ${LINE}` }}>
                  <Link href={href} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '11px 20px', borderRadius: 99,
                    background: featured ? ACC : 'transparent',
                    border: `1px solid ${featured ? ACC : INK}`,
                    color: featured ? PAPER : INK,
                    fontSize: 12.5, fontWeight: 500, textDecoration: 'none',
                    transition: 'all .25s',
                  }}>
                    {label} <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHICH PLAN ── */}
      <section style={{ padding: '0 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 8 }}>— Vodnik —</div>
            <h2 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(36px,5.5vw,64px)', letterSpacing: '-.015em', lineHeight: 1.05, marginBottom: 16 }}>
              Kateri paket <span style={{ fontStyle: 'italic', color: ACC }}>izbrati?</span>
            </h2>
            <p style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 18, color: INK2, maxWidth: 560, margin: '0 auto' }}>Trije tipični scenariji za tri tipe parov. Prepoznajte se.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {[
              {
                num: 'i.', plan: 'Essential', title: 'Manj, intimno, hitro.',
                desc: 'Planirate poroko z manj kot 60 gosti in želite lepo povabilo z osnovnim RSVP-om? Essential je za vas.',
                items: ['30 — 60 gostov', 'Hiter datum (1 — 3 mes.)', 'Preddefinirani dizajn', 'Manjši proračun'],
                featured: false,
              },
              {
                num: 'ii.', plan: 'Elegance', title: 'Klasika za večino parov.',
                desc: 'Pravo ravnovesje — kompletna stran z zgodbo, programom in hashtagom, dovolj prilagodljivosti za personalizacijo.',
                items: ['60 — 200 gostov', 'Datum 6 — 18 mes. vnaprej', '8+ elegantnih predlog', 'Najboljša vrednost'],
                featured: true,
              },
              {
                num: 'iii.', plan: 'Signature', title: 'Brez kompromisov.',
                desc: 'Vaša poroka je dogodek — destinacijska, večdnevna, večjezična. Potrebujete stran, ki zgleda profesionalno.',
                items: ['200+ gostov ali destinacija', 'Datum 12+ mes. vnaprej', 'Napredni RSVP z meniji', 'Prednostna podpora'],
                featured: false,
              },
            ].map(({ num, plan, title, desc, items, featured }) => (
              <motion.div
                key={plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                  padding: '40px 32px', background: PAPER,
                  border: `1px solid ${featured ? ACC : LINE}`, borderRadius: 6,
                  boxShadow: featured ? `0 24px 48px -28px rgba(156,107,61,.3)` : 'none',
                  transition: 'transform .3s, border-color .3s',
                }}
                whileHover={{ y: -4 }}
              >
                <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 36, color: ACC, marginBottom: 18, lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 600, marginBottom: 18 }}>{plan}</div>
                <h3 style={{ fontFamily: fraunces, fontWeight: 400, fontSize: 24, letterSpacing: '-.005em', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: INK2, lineHeight: 1.65, marginBottom: 18 }}>{desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: MUTE }}>
                      <span style={{ width: 4, height: 4, background: ACC, borderRadius: '50%', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: '0 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 8 }}>— Vprašanja —</div>
            <h2 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(36px,5.5vw,64px)', letterSpacing: '-.015em', lineHeight: 1.05 }}>
              Pogosto zastavljena <span style={{ fontStyle: 'italic', color: ACC }}>vprašanja</span>
            </h2>
          </div>
          <div style={{ borderTop: `1px solid ${LINE}` }}>
            {FAQ_ITEMS.map((item, i) => (
              <FAQRow key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{ padding: '0 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: '64px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -150, left: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(201,149,99,.18),transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -150, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(201,149,99,.18),transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 14, position: 'relative' }}>— Pripravljeni? —</div>
            <h3 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(32px,4.5vw,52px)', letterSpacing: '-.015em', lineHeight: 1.1, marginBottom: 16, position: 'relative' }}>
              Ustvarimo vašo <span style={{ fontStyle: 'italic', color: ACC }}>popolno stran.</span>
            </h3>
            <p style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 18, color: INK2, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px', position: 'relative' }}>
              Odprite svojo spletno stran danes — odštevalnik do "da" se začne zdaj.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Link href="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '16px 28px', borderRadius: 99, background: INK, color: PAPER,
                fontSize: 13.5, fontWeight: 500, textDecoration: 'none', border: `1px solid ${INK}`,
              }}>
                Začni zdaj <ArrowRight size={14} />
              </Link>
              <Link href="/templates" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '16px 28px', borderRadius: 99, background: 'transparent', color: INK,
                fontSize: 13.5, fontWeight: 500, textDecoration: 'none', border: `1px solid ${INK}`,
              }}>
                Poglej dizajne
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: NOIR, color: ACCS, padding: '80px 48px 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 56, paddingBottom: 60, borderBottom: `1px solid rgba(232,212,184,.1)` }}>
            <div>
              <div style={{ fontFamily: fraunces, fontSize: 24, color: PAPER, marginBottom: 16, display: 'flex', alignItems: 'baseline', gap: 0 }}>
                <span style={{ fontStyle: 'italic' }}>Invitia</span>
              </div>
              <p style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 15, color: ACCS, marginBottom: 24, lineHeight: 1.55, maxWidth: 280 }}>
                Elegantna poročna povabila za pare, ki želijo, da se njun dan zapomni — tudi online.
              </p>
            </div>
            {[
              { title: 'Produkt', links: [['Cenik', '/pricing'], ['Dizajni', '/templates'], ['Demo', '/demo']] },
              { title: 'Studio', links: [['O nas', '#'], ['Kontakt', '#'], ['Blog', '#']] },
              { title: 'Pravno', links: [['Pogoji', '/terms'], ['Zasebnost', '/privacy'], ['Piškotki', '#']] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h5 style={{ fontSize: 11, letterSpacing: '.32em', color: ACC2, textTransform: 'uppercase', marginBottom: 18, fontWeight: 600 }}>{title}</h5>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {links.map(([label, href]) => (
                    <li key={label}><Link href={href} style={{ fontSize: 14, color: ACCS, textDecoration: 'none' }}>{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 32, fontSize: 12, color: MUTE, flexWrap: 'wrap', gap: 16 }}>
            <span>© 2026 Invitia · Made with care in Ljubljana, SI</span>
            <div style={{ display: 'flex', gap: 24 }}>
              <Link href="mailto:studio@invitia.si" style={{ color: MUTE, textDecoration: 'none' }}>studio@invitia.si</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
