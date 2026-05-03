'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { TEMPLATES } from '@/types'
import type { TemplateConfig } from '@/types'
import { ArrowRight } from 'lucide-react'
import { SiteNav } from '@/components/ui/SiteNav'
import { SiteFooter } from '@/components/ui/SiteFooter'
import { useTranslations } from 'next-intl'

const BG    = '#F6F1E8'
const BG2   = '#EFE7D5'
const PAPER = '#FBF7EE'
const INK   = '#1C1814'
const INK2  = '#3a342b'
const MUTE  = '#7d7466'
const LINE  = '#E2D7BF'
const ACC   = '#9C6B3D'
const ACC2  = '#C99563'
const ACCS  = '#E8D4B8'
const NOIR  = '#15110B'

const fraunces = 'var(--font-fraunces), "Fraunces", Georgia, serif'
const sans = 'var(--font-instrument), "Inter", sans-serif'
const parisienne = 'var(--font-parisienne), "Parisienne", cursive'
const limelight = 'var(--font-limelight), "Limelight", cursive'

const GRAIN = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.10 0 0 0 0 0.08 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`

const CATS = ['all', 'romance', 'timeless', 'contemporary'] as const
type Cat = typeof CATS[number]

function TemplateArt({ id, p1 = 'Lorena', p2 = 'Viktor' }: { id: string; p1?: string; p2?: string }) {
  switch (id) {
    case 'riviera': return (
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg,#F0E2C7,#E8C9A4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#5A2D1F', textAlign: 'center', fontFamily: fraunces, position: 'relative', padding: '20px' }}>
        <div style={{ position: 'absolute', inset: 18, border: '1px solid rgba(90,45,31,.25)' }} />
        <div style={{ fontSize: 8, letterSpacing: '.36em', textTransform: 'uppercase', marginBottom: 12, color: '#A24A2A' }}>— Wedding Invitation —</div>
        <div style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 44, lineHeight: 1.05, position: 'relative', zIndex: 2 }}>{p1}</div>
        <div style={{ fontFamily: parisienne, fontSize: 38, color: '#A24A2A', margin: '-2px 0', position: 'relative', zIndex: 2 }}>&amp;</div>
        <div style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 44, lineHeight: 1.05, position: 'relative', zIndex: 2 }}>{p2}</div>
        <div style={{ marginTop: 20, fontStyle: 'italic', fontSize: 10, letterSpacing: '.18em', color: '#7B3B22', position: 'relative', zIndex: 2 }}>12 · 09 · 2026 · Portorož</div>
      </div>
    )
    case 'coastal': return (
      <div style={{ width: '100%', height: '100%', background: '#EBE6DC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '20px 18px 48px', textAlign: 'center', color: '#3F4A3A', fontFamily: fraunces, position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '38%', maxWidth: 130, color: '#7B8568', opacity: .85 }} viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <path d="M50 58 V20"/><path d="M50 30 C40 25 30 24 25 18 C30 22 40 26 50 28"/><path d="M50 26 C60 21 70 20 75 14 C70 18 60 22 50 24"/><ellipse cx="50" cy="14" rx="6" ry="9"/><ellipse cx="46" cy="13" rx="3" ry="5" transform="rotate(-25 46 13)"/><ellipse cx="54" cy="13" rx="3" ry="5" transform="rotate(25 54 13)"/>
        </svg>
        <div style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 32, color: '#3F4A3A', lineHeight: 1.1, position: 'relative', zIndex: 2 }}>{p1}<span style={{ display: 'block' }}>&amp; {p2}</span></div>
        <div style={{ fontSize: 8, letterSpacing: '.32em', textTransform: 'uppercase', marginTop: 28, color: '#9B6B7A', position: 'relative', zIndex: 2 }}>— Save the Date —</div>
        <div style={{ fontFamily: parisienne, fontSize: 18, color: '#9B6B7A', marginTop: 6, position: 'relative', zIndex: 2 }}>12 · 09 · 26</div>
      </div>
    )
    case 'darkgrid': return (
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg,#0E0C09,#1B1611)', position: 'relative', overflow: 'hidden', color: '#E5D2A8', fontFamily: fraunces, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px 18px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(229,210,168,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(229,210,168,.06) 1px,transparent 1px)`, backgroundSize: '32px 32px' }} />
        <div style={{ fontSize: 7.5, letterSpacing: '.36em', textTransform: 'uppercase', color: '#B89055', position: 'relative', textAlign: 'center' }}>— Wedding Invitation —</div>
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ fontWeight: 400, fontSize: 26, letterSpacing: '.04em', lineHeight: 1.15 }}>{p1.toUpperCase()}</div>
          <div style={{ fontStyle: 'italic', color: '#B89055', fontSize: 22, margin: '2px 0' }}>&amp;</div>
          <div style={{ fontWeight: 400, fontSize: 26, letterSpacing: '.04em', lineHeight: 1.15 }}>{p2.toUpperCase()}</div>
        </div>
        <div style={{ fontSize: 7.5, letterSpacing: '.32em', textTransform: 'uppercase', textAlign: 'center', color: '#9B7E55', position: 'relative' }}>12 · 09 · 2026 · Portorož</div>
      </div>
    )
    case 'gatsby': return (
      <div style={{ width: '100%', height: '100%', background: '#0A0805', color: '#D4AF6A', fontFamily: limelight, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 14, border: '2px double #B8924A' }} />
        <div style={{ position: 'absolute', inset: 22, border: '1px solid #6B5430' }} />
        <div style={{ fontSize: 14, letterSpacing: '.18em', lineHeight: 1.3, position: 'relative', zIndex: 2, marginTop: 8 }}>{p1.toUpperCase()}</div>
        <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 26, margin: '6px 0', color: '#E5C885', position: 'relative', zIndex: 2 }}>&amp;</div>
        <div style={{ fontSize: 14, letterSpacing: '.18em', lineHeight: 1.3, position: 'relative', zIndex: 2 }}>{p2.toUpperCase()}</div>
        <div style={{ fontFamily: limelight, fontSize: 26, letterSpacing: '.18em', color: '#D4AF6A', marginTop: 14, position: 'relative', zIndex: 2 }}>2026</div>
      </div>
    )
    case 'scandi': return (
      <div style={{ width: '100%', height: '100%', background: '#F8F5EE', color: '#2A2825', fontFamily: fraunces, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '28px 18px', textAlign: 'center', position: 'relative' }}>
        <div style={{ width: 30, height: 1, background: '#8AA08A', margin: '0 auto' }} />
        <div style={{ fontSize: 7.5, letterSpacing: '.4em', textTransform: 'uppercase', color: '#8AA08A', margin: '14px 0' }}>Save the date</div>
        <div style={{ fontWeight: 300, fontSize: 32, lineHeight: 1.1, letterSpacing: '-.005em' }}>{p1}<span style={{ fontStyle: 'italic', color: '#8AA08A', display: 'block', fontSize: 20, margin: '4px 0' }}>and</span>{p2}</div>
        <div style={{ fontSize: 8, letterSpacing: '.32em', textTransform: 'uppercase', color: '#8AA08A', margin: '14px 0' }}>12 · 09 · 2026</div>
        <div style={{ width: 30, height: 1, background: '#8AA08A', margin: '0 auto' }} />
      </div>
    )
    case 'watercolor': return (
      <div style={{ width: '100%', height: '100%', background: 'radial-gradient(ellipse at 30% 20%,#F5D8D8,#EFD3DE 35%,#DCC9E0 70%,#C9BBD5)', color: '#7A4D5A', fontFamily: parisienne, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '24px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 70%,rgba(255,255,255,.4),transparent 50%)' }} />
        <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: '#9B6677', position: 'relative', zIndex: 2 }}>— Save the date —</div>
        <div style={{ fontSize: 44, lineHeight: 1, color: '#5C3A4B', position: 'relative', zIndex: 2, margin: '12px 0' }}>{p1}</div>
        <div style={{ fontFamily: fraunces, fontWeight: 300, fontStyle: 'italic', fontSize: 30, color: '#9B6677', position: 'relative', zIndex: 2 }}>&amp;</div>
        <div style={{ fontSize: 44, lineHeight: 1, color: '#5C3A4B', position: 'relative', zIndex: 2, margin: '4px 0 12px' }}>{p2}</div>
        <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 12, color: '#9B6677', position: 'relative', zIndex: 2 }}>12 · 09 · 2026</div>
      </div>
    )
    case 'azulejo': return (
      <div style={{ width: '100%', height: '100%', backgroundImage: 'repeating-conic-gradient(#1E3A5F 0deg 90deg,#FBF7EE 90deg 180deg)', backgroundSize: '22px 22px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 28, background: '#FBF7EE', border: '1px solid #1E3A5F' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#1E3A5F', fontFamily: fraunces }}>
          <div style={{ fontSize: 7.5, letterSpacing: '.36em', textTransform: 'uppercase', color: '#C7553D', marginBottom: 12 }}>— Wedding —</div>
          <div style={{ fontWeight: 300, fontStyle: 'italic', fontSize: 28, lineHeight: 1.1 }}>{p1}<span style={{ fontFamily: parisienne, fontStyle: 'normal', color: '#C7553D', fontSize: 24, margin: '0 6px', display: 'inline-block' }}>&amp;</span>{p2}</div>
          <div style={{ fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: '#1E3A5F', marginTop: 12 }}>12 · 09 · 2026</div>
        </div>
      </div>
    )
    case 'industrial': return (
      <div style={{ width: '100%', height: '100%', background: '#23231F', color: '#D9D2BD', fontFamily: fraunces, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '18px', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(45deg,rgba(217,210,189,.04) 25%,transparent 25%),linear-gradient(-45deg,rgba(217,210,189,.04) 25%,transparent 25%)', backgroundSize: '8px 8px' }} />
        <div style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 80, lineHeight: 1, color: '#A8623A', position: 'absolute', right: 10, top: 10, letterSpacing: '-.04em' }}>12</div>
        <div style={{ fontSize: 7.5, letterSpacing: '.36em', textTransform: 'uppercase', color: '#8A9268', position: 'relative', zIndex: 2, marginBottom: 6 }}>— Wedding · Sept 2026 —</div>
        <div style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 28, lineHeight: 1.05, color: '#D9D2BD', position: 'relative', zIndex: 2 }}>{p1}<br /><span style={{ fontStyle: 'italic' }}>&amp; {p2}</span></div>
        <div style={{ fontSize: 7.5, letterSpacing: '.32em', textTransform: 'uppercase', color: '#A8623A', marginTop: 12, position: 'relative', zIndex: 2 }}>Portorož · Slovenia</div>
      </div>
    )
    default: {
      const tmpl = TEMPLATES.find(x => x.id === id)
      if (!tmpl) return null
      const c = tmpl.colors
      const dark = parseInt(c.background.slice(1, 3), 16) < 80
      return (
        <div style={{ width: '100%', height: '100%', background: c.background, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', position: 'relative' }}>
          {dark && <div style={{ position: 'absolute', inset: 0, opacity: .03, background: `repeating-linear-gradient(45deg, ${c.text} 0px, ${c.text} 1px, transparent 1px, transparent 8px)` }} />}
          <div style={{ fontSize: 8, letterSpacing: '.3em', textTransform: 'uppercase', color: c.textMuted, marginBottom: 16 }}>Wedding Invitation</div>
          <div style={{ fontFamily: parisienne, fontSize: 40, lineHeight: 1.1, color: c.primary }}>{p1}</div>
          <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 18, color: c.accent, margin: '4px 0', fontWeight: 300 }}>&amp;</div>
          <div style={{ fontFamily: parisienne, fontSize: 40, lineHeight: 1.1, color: c.primary }}>{p2}</div>
          <div style={{ width: 28, height: 1, background: c.accent, margin: '14px auto' }} />
          <div style={{ fontSize: 8, letterSpacing: '.22em', textTransform: 'uppercase', color: c.textMuted }}>12.09.2026 · Portorož</div>
        </div>
      )
    }
  }
}

function TemplateCard({ template, index }: { template: TemplateConfig; index: number }) {
  const t = useTranslations('templates')
  const [hovered, setHovered] = useState(false)
  const isNew = ['riviera', 'coastal', 'darkgrid', 'gatsby', 'scandi', 'watercolor', 'azulejo', 'industrial'].includes(template.id)
  const isPopular = ['watercolor', 'riviera'].includes(template.id)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}>
      <Link href={`/templates/${template.id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ aspectRatio: '3/4', borderRadius: 4, overflow: 'hidden', border: `1px solid ${LINE}`, position: 'relative', transition: 'box-shadow .4s, transform .35s', boxShadow: hovered ? `0 30px 60px -28px rgba(28,24,20,.32)` : 'none', transform: hovered ? 'translateY(-4px)' : 'none' }}
        >
          <TemplateArt id={template.id} />
          {isPopular && (
            <div style={{ position: 'absolute', top: 12, left: 12, padding: '5px 11px', background: 'rgba(251,247,238,.92)', color: ACC, borderRadius: 99, fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 600, backdropFilter: 'blur(6px)', display: 'inline-flex', gap: 4, alignItems: 'center' }}>
              ★ {t('popular')}
            </div>
          )}
          {isNew && !isPopular && (
            <div style={{ position: 'absolute', top: 12, right: 12, padding: '5px 11px', background: NOIR, color: PAPER, borderRadius: 99, fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 600 }}>
              {t('new')}
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,24,20,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transition: 'opacity .35s', backdropFilter: 'blur(2px)' }}>
            <span style={{ padding: '14px 24px', background: PAPER, color: INK, borderRadius: 99, fontSize: 12.5, letterSpacing: '.04em', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8, transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'transform .35s' }}>
              {t('view')} <ArrowRight size={13} />
            </span>
          </div>
        </div>
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div style={{ fontSize: 10.5, letterSpacing: '.3em', color: MUTE, textTransform: 'uppercase', marginBottom: 6, fontWeight: 500 }}>{template.category}</div>
            <div style={{ fontFamily: fraunces, fontWeight: 400, fontSize: 21, color: INK, letterSpacing: '-.005em', lineHeight: 1.2 }}>
              {template.name} <span style={{ fontStyle: 'italic', color: ACC }}>{t('edition')}</span>
            </div>
          </div>
          <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 14, color: MUTE, whiteSpace: 'nowrap', paddingTop: 18 }}>€89+</div>
        </div>
      </Link>
    </motion.div>
  )
}

function ComingSoonCard({ index }: { index: number }) {
  const t = useTranslations('templates')
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}>
      <div style={{ aspectRatio: '3/4', position: 'relative' }}>
        <div style={{ width: '100%', height: '100%', background: BG2, border: `1px dashed ${LINE}`, borderRadius: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center', opacity: .7 }}>
          <div style={{ width: 42, height: 42, border: `1px solid ${ACC}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACC, marginBottom: 18, fontSize: 18 }}>⏱</div>
          <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 24, color: INK, marginBottom: 8, lineHeight: 1.3 }}>{t('comingSoon')}</div>
          <div style={{ fontSize: 12, color: MUTE, maxWidth: 180, lineHeight: 1.5, marginBottom: 14 }}>{t('comingSoonDesc')}</div>
          <div style={{ fontSize: 10.5, letterSpacing: '.24em', textTransform: 'uppercase', color: ACC, fontWeight: 600 }}>@invitia</div>
        </div>
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 10.5, letterSpacing: '.3em', color: MUTE, textTransform: 'uppercase', marginBottom: 6 }}>{t('inPrep')}</div>
        <div style={{ fontFamily: fraunces, fontWeight: 400, fontSize: 21, color: MUTE }}>Coming <span style={{ fontStyle: 'italic', color: ACC }}>soon</span></div>
      </div>
    </motion.div>
  )
}

export default function TemplatesPage() {
  const t = useTranslations('templates')
  const [cat, setCat] = useState<Cat>('all')
  const filtered = cat === 'all' ? TEMPLATES : TEMPLATES.filter(tmpl => tmpl.category === cat)
  const counts = {
    all: TEMPLATES.length,
    romance: TEMPLATES.filter(tmpl => tmpl.category === 'romance').length,
    timeless: TEMPLATES.filter(tmpl => tmpl.category === 'timeless').length,
    contemporary: TEMPLATES.filter(tmpl => tmpl.category === 'contemporary').length,
  }

  const CAT_LABELS: Record<Cat, string> = {
    all: t('all'),
    romance: t('romance'),
    timeless: t('timeless'),
    contemporary: t('contemporary'),
  }

  return (
    <div style={{ background: BG, color: INK, minHeight: '100vh', fontFamily: sans, position: 'relative' }}>
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 200, pointerEvents: 'none', opacity: .4, mixBlendMode: 'multiply', backgroundImage: GRAIN, backgroundSize: '240px 240px' }} />

      <SiteNav />

      {/* HERO */}
      <section style={{ padding: '56px 48px 64px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr .9fr', gap: 64, alignItems: 'end' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, marginBottom: 20 }}>— {t('label')} —</div>
            <h1 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(52px,7.5vw,108px)', lineHeight: 1.0, letterSpacing: '-.022em', marginBottom: 24 }}>
              {t('headline1', { n: TEMPLATES.length })} <span style={{ fontStyle: 'italic', color: ACC }}>{t('headline2')}</span>
            </h1>
            <p style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 19, color: INK2, maxWidth: 500, lineHeight: 1.55 }}>
              {t('sub')}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 64, lineHeight: 1, color: ACC, letterSpacing: '-.02em' }}>{TEMPLATES.length}</div>
              <div style={{ fontSize: 11, letterSpacing: '.28em', color: MUTE, textTransform: 'uppercase', marginTop: 6 }}>{t('templates')}</div>
            </div>
            <div style={{ width: 80, height: 1, background: LINE, margin: '8px 0' }} />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 64, lineHeight: 1, color: ACC, letterSpacing: '-.02em' }}>∞</div>
              <div style={{ fontSize: 11, letterSpacing: '.28em', color: MUTE, textTransform: 'uppercase', marginTop: 6 }}>{t('customizations')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <div style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, padding: '0 48px', position: 'sticky', top: 68, background: BG, zIndex: 10 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{ padding: '10px 20px', border: `1px solid ${cat === c ? INK : LINE}`, borderRadius: 99, fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: cat === c ? PAPER : INK2, background: cat === c ? INK : 'transparent', cursor: 'pointer', fontFamily: sans, transition: 'all .25s', fontWeight: 500 }}>
                {CAT_LABELS[c]} <span style={{ opacity: cat === c ? .8 : .6, fontSize: 10, marginLeft: 6 }}>{String(counts[c]).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 12.5, color: MUTE, fontFamily: fraunces, fontStyle: 'italic' }}>
            {filtered.length} {filtered.length === 1 ? t('singular') : t('plural')}
          </div>
        </div>
      </div>

      {/* GRID */}
      <section style={{ padding: '56px 48px 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '36px 28px' }}>
          {filtered.map((tmpl, i) => <TemplateCard key={tmpl.id} template={tmpl} index={i} />)}
          {cat === 'all' && <ComingSoonCard index={filtered.length} />}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ background: NOIR, color: PAPER, borderRadius: 8, padding: '80px 64px', display: 'grid', gridTemplateColumns: '1.3fr .9fr', alignItems: 'center', gap: 48, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 100% at 100% 50%,rgba(201,149,99,.16),transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: 60, bottom: -90, fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 320, color: 'rgba(232,212,184,.04)', lineHeight: 1, pointerEvents: 'none' }}>&amp;</div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: 11, letterSpacing: '.36em', textTransform: 'uppercase', color: ACC2, marginBottom: 18, fontWeight: 500 }}>— {t('ctaLabel')} —</div>
              <h3 style={{ fontFamily: fraunces, fontWeight: 300, fontSize: 'clamp(36px,4.5vw,56px)', letterSpacing: '-.015em', lineHeight: 1.05, marginBottom: 16 }}>
                {t('ctaHeadline1')} <span style={{ fontStyle: 'italic', color: ACC2 }}>{t('ctaHeadline2')}</span>
              </h3>
              <p style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 17, color: ACCS, maxWidth: 460, lineHeight: 1.55 }}>{t('ctaSub')}</p>
            </div>
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '20px 28px', background: ACC, color: PAPER, borderRadius: 99, fontSize: 14, fontWeight: 500, letterSpacing: '.04em', textDecoration: 'none' }}>
                {t('viewPackages')} <ArrowRight size={14} />
              </Link>
              <Link href="mailto:studio@invitia.si" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, padding: '20px 28px', background: 'transparent', border: `1px solid rgba(232,212,184,.3)`, color: PAPER, borderRadius: 99, fontSize: 14, fontWeight: 500, letterSpacing: '.04em', textDecoration: 'none' }}>
                {t('requestCustom')} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
