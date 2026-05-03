'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ArrowRight, Star } from 'lucide-react'
import { PACKAGES } from '@/types'
import { SiteNav } from '@/components/ui/SiteNav'
import { SiteFooter } from '@/components/ui/SiteFooter'
import { PlanButton } from '@/components/pricing/PlanButton'
import { useTranslations } from 'next-intl'

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

const fraunces = 'var(--font-fraunces), "Fraunces", Georgia, serif'
const sans = 'var(--font-instrument), "Inter", sans-serif'

const GRAIN = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.10 0 0 0 0 0.08 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`

const COMPARE = [
  { group: 'Core', rows: [
    { label: 'Digital invitation page', e: true, el: true, s: true },
    { label: 'RSVP (Yes / No)', e: true, el: true, s: true },
    { label: 'QR code sharing', e: true, el: true, s: true },
    { label: 'Analytics & view count', e: true, el: true, s: true },
  ]},
  { group: 'RSVP & Guests', rows: [
    { label: 'Menu preference', e: false, el: true, s: true },
    { label: 'Guest count (adults + children)', e: false, el: false, s: true },
    { label: 'Allergies field', e: false, el: false, s: true },
    { label: 'Guest message', e: false, el: true, s: true },
    { label: 'Export guests CSV', e: false, el: true, s: true },
  ]},
  { group: 'Content & Details', rows: [
    { label: 'Google Maps integration', e: false, el: true, s: true },
    { label: 'Event timeline / program', e: false, el: true, s: true },
    { label: 'Dress code section', e: false, el: true, s: true },
    { label: 'Accommodation & transport', e: false, el: true, s: true },
    { label: 'Gift registry links', e: false, el: true, s: true },
    { label: 'FAQ section', e: false, el: true, s: true },
    { label: 'Wedding hashtag', e: false, el: true, s: true },
  ]},
  { group: 'Gallery & Features', rows: [
    { label: 'Photo gallery', e: false, el: '10 photos', s: '20 photos' },
    { label: 'Wedding countdown', e: false, el: true, s: true },
    { label: 'Languages', e: '1', el: '2', s: '3' },
    { label: 'Template change', e: false, el: false, s: true },
    { label: 'Add to calendar', e: false, el: false, s: true },
    { label: 'Priority support', e: false, el: false, s: true },
    { label: 'Active period', e: '6 months', el: '12 months', s: '12 months' },
  ]},
]

function FAQRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${LINE}` }}>
      <button onClick={() => setOpen(v => !v)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: fraunces }}>
        <span style={{ fontSize: 20, color: INK, fontWeight: 400, letterSpacing: '-.005em', lineHeight: 1.3 }}>{q}</span>
        <span style={{ width: 36, height: 36, border: `1px solid ${open ? INK : LINE}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 24, background: open ? INK : 'transparent', color: open ? PAPER : INK2, transition: 'all .25s' }}>
          <span style={{ display: 'block', fontSize: 14, lineHeight: 1, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .25s' }}>+</span>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
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
  const t = useTranslations('pricing')

  const faqItems = [
    { q: t('faqs.q1'), a: t('faqs.a1') },
    { q: t('faqs.q2'), a: t('faqs.a2') },
    { q: t('faqs.q3'), a: t('faqs.a3') },
    { q: t('faqs.q4'), a: t('faqs.a4') },
    { q: t('faqs.q5'), a: t('faqs.a5') },
    { q: t('faqs.q6'), a: t('faqs.a6') },
  ]

  const guidePlans = (t.raw('guide.plans') as any[])

  return (
    <div style={{ background: BG, color: INK, minHeight: '100vh', fontFamily: sans, position: 'relative' }}>
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 200, pointerEvents: 'none', opacity: .4, mixBlendMode: 'multiply', backgroundImage: GRAIN, backgroundSize: '240px 240px' }} />

      <SiteNav />

      {/* HERO */}
      <section style={{ padding: '96px 48px 64px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 24 }}>— {t('label')} —</div>
          <h1 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(52px,8vw,108px)', lineHeight: 1.02, letterSpacing: '-.022em', marginBottom: 28 }}>
            {t('headline1')}{' '}
            <span style={{ fontStyle: 'italic', color: ACC }}>{t('headline2')}</span>
            <br />{t('headline3')}
          </h1>
          <p style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,2vw,22px)', color: INK2, maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.55 }}>
            {t('sub')}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', fontSize: 13, color: MUTE }}>
            {[t('badge1'), t('badge2'), t('badge3')].map((badge, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Check size={13} style={{ color: ACC }} />{badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section id="pricing" style={{ padding: '32px 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, alignItems: 'start' }}>

          {/* Essential */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: '48px 36px 40px', display: 'flex', flexDirection: 'column' }}
            whileHover={{ y: -4, boxShadow: `0 30px 60px -30px rgba(28,24,20,.2)` }}>
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 8 }}>Essential</div>
            <h3 style={{ fontFamily: fraunces, fontWeight: 400, fontSize: 32, letterSpacing: '-.01em', color: INK, marginBottom: 8 }}>
              {t('essential.title').split(' ').slice(0,1).join(' ')} <span style={{ fontStyle: 'italic', color: ACC }}>{t('essential.title').split(' ').slice(1).join(' ')}</span>
            </h3>
            <p style={{ fontSize: 13.5, color: MUTE, lineHeight: 1.55, marginBottom: 0 }}>{t('essential.desc')}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '24px 0', borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, margin: '24px 0 28px' }}>
              <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 24, color: MUTE, lineHeight: 1 }}>€</span>
              <span style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 80, lineHeight: .95, letterSpacing: '-.02em', color: INK }}>{PACKAGES.essential.price}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginLeft: 6 }}>
                <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 12, color: MUTE }}>{t('oneTime')}</span>
              </div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32, flex: 1 }}>
              {PACKAGES.essential.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: INK2, lineHeight: 1.5 }}>
                  <Check size={16} style={{ color: ACC, flexShrink: 0, marginTop: 2 }} />{f}
                </li>
              ))}
            </ul>
            <PlanButton plan="essential" label={`${t('choose')} Essential`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 24px', border: `1px solid ${INK}`, borderRadius: 99, background: 'transparent', color: INK, fontSize: 13.5, fontWeight: 500, letterSpacing: '.04em', width: '100%' }} />
            <div style={{ marginTop: 14, textAlign: 'center', fontFamily: fraunces, fontStyle: 'italic', fontSize: 11.5, color: MUTE }}>
              {t('activeFor', { n: PACKAGES.essential.duration })}
            </div>
          </motion.div>

          {/* Elegance */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ background: NOIR, color: PAPER, border: `1px solid ${NOIR}`, borderRadius: 6, padding: '48px 36px 40px', display: 'flex', flexDirection: 'column', position: 'relative', transform: 'translateY(-12px)', boxShadow: `0 40px 80px -30px rgba(28,24,20,.4)` }}>
            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', padding: '8px 20px', background: ACC, color: PAPER, borderRadius: 99, fontSize: 10.5, letterSpacing: '.32em', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap', display: 'flex', gap: 6, alignItems: 'center', boxShadow: `0 12px 28px -8px rgba(156,107,61,.5)` }}>
              <Star size={11} fill="currentColor" />{t('mostPopular')}
            </div>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 6, background: 'radial-gradient(140% 80% at 50% 0%,rgba(201,149,99,.18),transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC2, fontWeight: 500, marginBottom: 8, position: 'relative' }}>Elegance</div>
            <h3 style={{ fontFamily: fraunces, fontWeight: 400, fontSize: 32, letterSpacing: '-.01em', color: PAPER, marginBottom: 8, position: 'relative' }}>
              {t('elegance.title').split(' ').slice(0,1).join(' ')} <span style={{ fontStyle: 'italic', color: ACC2 }}>{t('elegance.title').split(' ').slice(1).join(' ')}</span>
            </h3>
            <p style={{ fontSize: 13.5, color: ACCS, lineHeight: 1.55, marginBottom: 0, position: 'relative' }}>{t('elegance.desc')}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '24px 0', borderTop: `1px solid rgba(232,212,184,.15)`, borderBottom: `1px solid rgba(232,212,184,.15)`, margin: '24px 0 28px', position: 'relative' }}>
              <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 24, color: ACCS, lineHeight: 1 }}>€</span>
              <span style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 80, lineHeight: .95, letterSpacing: '-.02em', color: PAPER }}>{PACKAGES.elegance.price}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginLeft: 6 }}>
                <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 12, color: ACCS }}>{t('oneTime')}</span>
              </div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32, flex: 1, position: 'relative' }}>
              {PACKAGES.elegance.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: ACCS, lineHeight: 1.5 }}>
                  <Check size={16} style={{ color: ACC2, flexShrink: 0, marginTop: 2 }} />{f}
                </li>
              ))}
            </ul>
            <PlanButton plan="elegance" label={`${t('choose')} Elegance`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 24px', border: `1px solid ${ACC}`, borderRadius: 99, background: ACC, color: PAPER, fontSize: 13.5, fontWeight: 500, letterSpacing: '.04em', position: 'relative', width: '100%' }} />
            <div style={{ marginTop: 14, textAlign: 'center', fontFamily: fraunces, fontStyle: 'italic', fontSize: 11.5, color: ACCS, position: 'relative' }}>
              {t('activeFor', { n: PACKAGES.elegance.duration })}
            </div>
          </motion.div>

          {/* Signature */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: '48px 36px 40px', display: 'flex', flexDirection: 'column' }}
            whileHover={{ y: -4, boxShadow: `0 30px 60px -30px rgba(28,24,20,.2)` }}>
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 8 }}>Signature</div>
            <h3 style={{ fontFamily: fraunces, fontWeight: 400, fontSize: 32, letterSpacing: '-.01em', color: INK, marginBottom: 8 }}>
              {t('signature.title').split(' ').slice(0,1).join(' ')} <span style={{ fontStyle: 'italic', color: ACC }}>{t('signature.title').split(' ').slice(1).join(' ')}</span>
            </h3>
            <p style={{ fontSize: 13.5, color: MUTE, lineHeight: 1.55, marginBottom: 0 }}>{t('signature.desc')}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '24px 0', borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, margin: '24px 0 28px' }}>
              <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 24, color: MUTE, lineHeight: 1 }}>€</span>
              <span style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 80, lineHeight: .95, letterSpacing: '-.02em', color: INK }}>{PACKAGES.signature.price}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginLeft: 6 }}>
                <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 12, color: MUTE }}>{t('oneTime')}</span>
              </div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32, flex: 1 }}>
              {PACKAGES.signature.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: INK2, lineHeight: 1.5 }}>
                  <Check size={16} style={{ color: ACC, flexShrink: 0, marginTop: 2 }} />{f}
                </li>
              ))}
            </ul>
            <PlanButton plan="signature" label={`${t('choose')} Signature`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 24px', border: `1px solid ${INK}`, borderRadius: 99, background: 'transparent', color: INK, fontSize: 13.5, fontWeight: 500, letterSpacing: '.04em', width: '100%' }} />
            <div style={{ marginTop: 14, textAlign: 'center', fontFamily: fraunces, fontStyle: 'italic', fontSize: 11.5, color: MUTE }}>
              {t('activeFor', { n: PACKAGES.signature.duration })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHITE GLOVE */}
      <section style={{ padding: '0 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ position: 'relative', background: NOIR, color: PAPER, borderRadius: 8, padding: '80px 64px', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 48, alignItems: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 100% at 100% 50%,rgba(201,149,99,.16),transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: -40, bottom: -80, fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 320, lineHeight: 1, color: 'rgba(232,212,184,.04)', pointerEvents: 'none' }}>∞</div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: 11, letterSpacing: '.36em', color: ACC2, textTransform: 'uppercase', marginBottom: 18, fontWeight: 500 }}>— {t('whiteGlove.label')} —</div>
              <h2 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(36px,5vw,60px)', letterSpacing: '-.015em', lineHeight: 1.05, marginBottom: 20 }}>
                {t('whiteGlove.headline1')} <span style={{ fontStyle: 'italic', color: ACC2 }}>{t('whiteGlove.headline2')}</span><br />{t('whiteGlove.headline3')}
              </h2>
              <p style={{ fontSize: 15, color: ACCS, lineHeight: 1.65, maxWidth: 520, marginBottom: 32 }}>{t('whiteGlove.desc')}</p>
              <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 36, maxWidth: 480 }}>
                {(t.raw('whiteGlove.features') as string[]).map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: PAPER }}>
                    <Check size={14} style={{ color: ACC2, flexShrink: 0 }} />{feat}
                  </li>
                ))}
              </ul>
              <Link href="mailto:studio@invitia.si" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 32px', background: ACC, color: PAPER, borderRadius: 99, fontSize: 13.5, fontWeight: 500, letterSpacing: '.04em', textDecoration: 'none' }}>
                {t('whiteGlove.cta')} <ArrowRight size={14} />
              </Link>
            </div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ background: 'rgba(251,247,238,.04)', border: `1px solid rgba(232,212,184,.12)`, borderRadius: 6, padding: 32 }}>
                <h4 style={{ fontFamily: fraunces, fontWeight: 400, fontSize: 24, marginBottom: 6 }}>{t('whiteGlove.contactTitle')}</h4>
                <div style={{ fontFamily: fraunces, fontStyle: 'italic', color: ACCS, marginBottom: 24, fontSize: 14 }}>{t('whiteGlove.contactSub')}</div>
                {[
                  { icon: '✉', label: t('whiteGlove.email'), val: 'studio@invitia.si' },
                  { icon: '☏', label: t('whiteGlove.phone'), val: '+386 41 123 456' },
                  { icon: '◎', label: t('whiteGlove.studio'), val: 'Ljubljana · Maribor' },
                ].map(({ icon, label, val }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderTop: `1px solid rgba(232,212,184,.1)` }}>
                    <div style={{ width: 36, height: 36, border: `1px solid ${ACC2}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACC2, flexShrink: 0, fontSize: 14 }}>{icon}</div>
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

      {/* COMPARISON TABLE */}
      <section id="compare" style={{ padding: '0 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 8 }}>— {t('compare.label')} —</div>
            <h2 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(36px,5.5vw,64px)', letterSpacing: '-.015em', lineHeight: 1.05, marginBottom: 16 }}>
              {t('compare.headline1')} <span style={{ fontStyle: 'italic', color: ACC }}>{t('compare.headline2')}</span> {t('compare.headline3')}
            </h2>
            <p style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 18, color: INK2, maxWidth: 520, margin: '0 auto' }}>{t('compare.sub')}</p>
          </div>
          <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: BG2, borderBottom: `1px solid ${LINE}` }}>
              <div style={{ padding: '24px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 18, color: INK2 }}>{t('compare.feature')}</span>
              </div>
              {[
                { name: 'Essential', price: `€${PACKAGES.essential.price}`, featured: false },
                { name: 'Elegance ★', price: `€${PACKAGES.elegance.price}`, featured: true },
                { name: 'Signature', price: `€${PACKAGES.signature.price}`, featured: false },
              ].map(({ name, price, featured }) => (
                <div key={name} style={{ padding: 24, textAlign: 'center', background: featured ? NOIR : 'transparent', color: featured ? PAPER : INK, borderLeft: `1px solid ${LINE}` }}>
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
                  <div style={{ gridColumn: '1/-1', padding: '20px 24px', background: BG2, fontFamily: fraunces, fontStyle: 'italic', fontSize: 15, color: ACC, letterSpacing: '.04em', borderBottom: `1px solid ${LINE}` }}>{section.group}</div>
                </div>
                {section.rows.map((row, ri) => (
                  <div key={ri} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', borderBottom: ri < section.rows.length - 1 ? `1px solid rgba(226,215,191,.5)` : 'none' }}>
                    <div style={{ padding: '18px 24px', fontSize: 14, color: INK, fontWeight: 500, borderRight: `1px solid rgba(226,215,191,.5)` }}>{row.label}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: `1px solid rgba(226,215,191,.5)` }}><Cell val={row.e} /></div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(232,212,184,.22)', borderRight: `1px solid rgba(226,215,191,.5)` }}><Cell val={row.el} /></div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Cell val={row.s} /></div>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: BG2 }}>
              <div style={{ padding: '24px', display: 'flex', alignItems: 'center', fontFamily: fraunces, fontStyle: 'italic', color: MUTE, fontSize: 14 }}>{t('compare.ready')}</div>
              {([
                { plan: 'essential' as const, featured: false },
                { plan: 'elegance' as const, featured: true },
                { plan: 'signature' as const, featured: false },
              ]).map(({ plan, featured }) => (
                <div key={plan} style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: `1px solid ${LINE}` }}>
                  <PlanButton plan={plan} label={t('choose')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 20px', borderRadius: 99, background: featured ? ACC : 'transparent', border: `1px solid ${featured ? ACC : INK}`, color: featured ? PAPER : INK, fontSize: 12.5, fontWeight: 500 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHICH PLAN */}
      <section style={{ padding: '0 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 8 }}>— {t('guide.label')} —</div>
            <h2 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(36px,5.5vw,64px)', letterSpacing: '-.015em', lineHeight: 1.05, marginBottom: 16 }}>
              {t('guide.headline1')} <span style={{ fontStyle: 'italic', color: ACC }}>{t('guide.headline2')}</span>
            </h2>
            <p style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 18, color: INK2, maxWidth: 560, margin: '0 auto' }}>{t('guide.sub')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {guidePlans.map(({ num, plan, title, desc, items }: any, idx: number) => (
              <motion.div key={plan} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ padding: '40px 32px', background: PAPER, border: `1px solid ${idx === 1 ? ACC : LINE}`, borderRadius: 6, boxShadow: idx === 1 ? `0 24px 48px -28px rgba(156,107,61,.3)` : 'none' }}
                whileHover={{ y: -4 }}>
                <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 36, color: ACC, marginBottom: 18, lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 600, marginBottom: 18 }}>{plan}</div>
                <h3 style={{ fontFamily: fraunces, fontWeight: 400, fontSize: 24, letterSpacing: '-.005em', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: INK2, lineHeight: 1.65, marginBottom: 18 }}>{desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(items as string[]).map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: MUTE }}>
                      <span style={{ width: 4, height: 4, background: ACC, borderRadius: '50%', flexShrink: 0 }} />{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '0 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 8 }}>— {t('faqLabel')} —</div>
            <h2 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(36px,5.5vw,64px)', letterSpacing: '-.015em', lineHeight: 1.05 }}>
              {t('faqHeadline1')} <span style={{ fontStyle: 'italic', color: ACC }}>{t('faqHeadline2')}</span>
            </h2>
          </div>
          <div style={{ borderTop: `1px solid ${LINE}` }}>
            {faqItems.map((item, i) => <FAQRow key={i} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section style={{ padding: '0 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 6, padding: '64px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -150, left: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(201,149,99,.18),transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -150, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(201,149,99,.18),transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 14, position: 'relative' }}>— {t('ctaLabel')} —</div>
            <h3 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(32px,4.5vw,52px)', letterSpacing: '-.015em', lineHeight: 1.1, marginBottom: 16, position: 'relative' }}>
              {t('ctaHeadline1')} <span style={{ fontStyle: 'italic', color: ACC }}>{t('ctaHeadline2')}</span>
            </h3>
            <p style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 18, color: INK2, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px', position: 'relative' }}>{t('ctaSub')}</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 28px', borderRadius: 99, background: INK, color: PAPER, fontSize: 13.5, fontWeight: 500, textDecoration: 'none', border: `1px solid ${INK}` }}>
                {t('startNow')} <ArrowRight size={14} />
              </Link>
              <Link href="/templates" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 28px', borderRadius: 99, background: 'transparent', color: INK, fontSize: 13.5, fontWeight: 500, textDecoration: 'none', border: `1px solid ${INK}` }}>
                {t('viewDesigns')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
