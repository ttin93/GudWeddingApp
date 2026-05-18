'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { useIsMobile } from '@/hooks/useIsMobile'
import { motion } from 'framer-motion'
import { TEMPLATES } from '@/types'
import type { TemplateConfig } from '@/types'
import { ArrowRight } from 'lucide-react'
import { SiteNav } from '@/components/ui/SiteNav'
import { SiteFooter } from '@/components/ui/SiteFooter'
import { useTranslations } from 'next-intl'
import { TemplateArt } from '@/components/ui/TemplateArt'

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

const GRAIN = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.10 0 0 0 0 0.08 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`

const CATS = ['all', 'romance', 'timeless', 'contemporary'] as const
type Cat = typeof CATS[number]


function TemplateCard({ template, index }: { template: TemplateConfig; index: number }) {
  const t = useTranslations('templates')
  const [hovered, setHovered] = useState(false)
  const isNew = ['riviera', 'coastal', 'darkgrid', 'gatsby', 'scandi', 'watercolor', 'azulejo', 'industrial'].includes(template.id)
  const isPopular = ['watercolor', 'riviera'].includes(template.id)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}>
      <Link href={`/templates/${template.id}`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
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
  const isMobile = useIsMobile()
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
      <section style={{ padding: isMobile ? '32px 20px 40px' : '56px 48px 64px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr .9fr', gap: isMobile ? 24 : 64, alignItems: 'end' }}>
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
      <div style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, padding: isMobile ? '0 20px' : '0 48px', position: 'sticky', top: isMobile ? 64 : 68, background: BG, zIndex: 10 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
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
      <section style={{ padding: isMobile ? '32px 20px 60px' : '56px 48px 100px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: isMobile ? '24px 12px' : '36px 28px' }}>
          {filtered.map((tmpl, i) => <TemplateCard key={tmpl.id} template={tmpl} index={i} />)}
          {cat === 'all' && <ComingSoonCard index={filtered.length} />}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? '0 20px 60px' : '0 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ background: NOIR, color: PAPER, borderRadius: 8, padding: isMobile ? '40px 24px' : '80px 64px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr .9fr', alignItems: 'center', gap: isMobile ? 28 : 48, position: 'relative', overflow: 'hidden' }}>
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
