'use client'

import { Link } from '@/i18n/navigation'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PACKAGES, TEMPLATES } from '@/types'
import { SiteNav } from '@/components/ui/SiteNav'
import { SiteFooter } from '@/components/ui/SiteFooter'
import { useTranslations } from 'next-intl'
import { TemplateArt } from '@/components/ui/TemplateArt'
import { useIsMobile } from '@/hooks/useIsMobile'

// ── Palette ──────────────────────────────────────────────────────────────────
const BG    = '#F6F1E8'
const BG2   = '#EFE7D5'
const PAPER = '#FBF7EE'
const PAPER_W = '#F2EBD9'
const INK   = '#1C1814'
const INK2  = '#3a342b'
const MUTE  = '#7d7466'
const LINE  = '#E2D7BF'
const ACC   = '#9C6B3D'
const ACC2  = '#C99563'
const ACCS  = '#E8D4B8'
const NOIR  = '#15110B'
const SAGE  = '#7C8C6F'

const fran = 'var(--font-fraunces), Georgia, serif'
const sans = 'var(--font-instrument), "Helvetica Neue", sans-serif'

// ── Card deck ─────────────────────────────────────────────────────────────────
const HERO_IDS = ['riviera', 'watercolor', 'darkgrid', 'coastal'] as const
type HeroId = typeof HERO_IDS[number]

const DECK_POS = [
  { x: -12, y: -8,  rotate: -3,   z: 4 },
  { x:   0, y:  0,  rotate:  0,   z: 3 },
  { x:   8, y:  8,  rotate:  2.4, z: 2 },
  { x:  16, y: 16,  rotate:  4.5, z: 1 },
]

// ── Grain ─────────────────────────────────────────────────────────────────────
function Grain() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100,
        mixBlendMode: 'multiply', opacity: 0.42,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.10 0 0 0 0 0.08 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        backgroundSize: '240px 240px',
      }}
    />
  )
}

// ── Name popup ────────────────────────────────────────────────────────────────
function NamePopup({ onConfirm, initialP1 = '', initialP2 = '' }: { onConfirm: (p1: string, p2: string) => void; initialP1?: string; initialP2?: string }) {
  const [v1, setV1] = useState(initialP1)
  const [v2, setV2] = useState(initialP2)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100) }, [])

  function handleSubmit() {
    onConfirm(v1.trim() || 'Lorena', v2.trim() || 'Viktor')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(28,24,20,.55)', backdropFilter: 'blur(8px)' }}
        onClick={handleSubmit}
      />
      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 1, background: PAPER, border: `1px solid ${LINE}`, padding: '52px 44px 44px', maxWidth: 460, width: '100%', textAlign: 'center' }}
      >
        {/* Corners */}
        {[['tl'],['tr'],['bl'],['br']].map(([k]) => (
          <span key={k} style={{ position: 'absolute', width: 14, height: 14, border: `1px solid ${ACC}`,
            ...(k === 'tl' ? { top: -3, left: -3, borderRight: 'none', borderBottom: 'none' } : {}),
            ...(k === 'tr' ? { top: -3, right: -3, borderLeft: 'none', borderBottom: 'none' } : {}),
            ...(k === 'bl' ? { bottom: -3, left: -3, borderRight: 'none', borderTop: 'none' } : {}),
            ...(k === 'br' ? { bottom: -3, right: -3, borderLeft: 'none', borderTop: 'none' } : {}),
          }} />
        ))}
        <div style={{ fontSize: 10, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, fontFamily: sans, marginBottom: 20 }}>— Personalizujte predogled —</div>
        <h2 style={{ fontFamily: fran, fontWeight: 300, fontSize: 'clamp(28px,4vw,36px)', lineHeight: 1.1, color: INK, marginBottom: 8 }}>
          Kako se imenujeta?
        </h2>
        <p style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 15, color: MUTE, marginBottom: 32, lineHeight: 1.5 }}>
          Vaši imeni se pojavita na predogledih vabil.
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
          <input
            ref={inputRef}
            value={v1}
            onChange={e => setV1(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Ženin"
            style={{ flex: 1, minWidth: 0, padding: '13px 16px', background: 'transparent', border: `1px solid ${LINE}`, color: INK, fontFamily: sans, fontSize: 14, outline: 'none', borderRadius: 3 }}
            onFocus={e => (e.target.style.borderColor = ACC)}
            onBlur={e => (e.target.style.borderColor = LINE)}
          />
          <span style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 26, color: ACC2, flexShrink: 0, lineHeight: 1 }}>&amp;</span>
          <input
            value={v2}
            onChange={e => setV2(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Nevesta"
            style={{ flex: 1, minWidth: 0, padding: '13px 16px', background: 'transparent', border: `1px solid ${LINE}`, color: INK, fontFamily: sans, fontSize: 14, outline: 'none', borderRadius: 3 }}
            onFocus={e => (e.target.style.borderColor = ACC)}
            onBlur={e => (e.target.style.borderColor = LINE)}
          />
        </div>
        <button
          onClick={handleSubmit}
          style={{ width: '100%', padding: '15px 28px', background: INK, color: PAPER, fontFamily: sans, fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 500, borderRadius: 99, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, border: 'none' }}
        >
          Ustvari predogled
          <svg width="13" height="9" viewBox="0 0 14 10" fill="none"><path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.2" /></svg>
        </button>
        <button
          onClick={handleSubmit}
          style={{ marginTop: 14, fontSize: 12, color: MUTE, fontFamily: sans, letterSpacing: '.08em', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textDecorationColor: LINE }}
        >
          Preskoči
        </button>
      </motion.div>
    </motion.div>
  )
}

// ── Hero card deck (stacked, page-flip animation) ─────────────────────────────
function HeroCardDeck({ p1, p2 }: { p1: string; p2: string }) {
  const [order, setOrder] = useState<HeroId[]>([...HERO_IDS])
  const [exitingId, setExitingId] = useState<string | null>(null)
  const [returnedId, setReturnedId] = useState<string | null>(null)
  const isBusy = useRef(false)
  const stateRef = useRef(order)
  stateRef.current = order

  const doAdvance = useCallback(() => {
    if (isBusy.current) return
    isBusy.current = true
    const frontId = stateRef.current[0]
    setExitingId(frontId)
    const t1 = setTimeout(() => {
      setExitingId(null)
      setReturnedId(frontId)
      setOrder(prev => [...prev.slice(1), prev[0]] as HeroId[])
      const t2 = setTimeout(() => { setReturnedId(null); isBusy.current = false }, 80)
      return () => clearTimeout(t2)
    }, 800)
    return () => clearTimeout(t1)
  }, [])

  const advanceRef = useRef(doAdvance)
  advanceRef.current = doAdvance

  useEffect(() => {
    const id = setInterval(() => advanceRef.current(), 4200)
    return () => clearInterval(id)
  }, [])

  const frontId = order[0]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      {/* Deck */}
      <div style={{ position: 'relative', width: 340, height: 480, perspective: 1600, perspectiveOrigin: '50% 50%' }}>
        {/* Shadow */}
        <div style={{ position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)', width: 320, height: 28, background: 'radial-gradient(ellipse,rgba(28,24,20,.18),transparent 70%)', filter: 'blur(6px)', zIndex: 0 }} />
        {order.map((templateId, pos) => {
          const isExiting = exitingId === templateId
          const isReturning = returnedId === templateId
          const dp = DECK_POS[pos]
          return (
            <motion.div
              key={templateId}
              style={{
                position: 'absolute', inset: 0,
                zIndex: isExiting ? 5 : dp.z,
                transformOrigin: 'left center',
                overflow: 'hidden',
                border: `1px solid ${LINE}`,
                cursor: 'pointer',
                boxShadow: pos === 0 && !isExiting
                  ? '0 1px 1px rgba(28,24,20,.04),0 12px 24px -8px rgba(28,24,20,.1),0 32px 60px -16px rgba(28,24,20,.18),0 60px 100px -30px rgba(28,24,20,.22)'
                  : 'none',
              }}
              animate={isExiting
                ? { x: -260, y: -20, rotate: -12, rotateY: -78, opacity: 0 }
                : { x: dp.x, y: dp.y, rotate: dp.rotate, rotateY: 0, opacity: 1 }
              }
              transition={isReturning ? { duration: 0 } : { duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
              onClick={() => window.open(`/templates/${templateId}`, '_blank')}
            >
              <TemplateArt id={templateId} p1={p1} p2={p2} />
            </motion.div>
          )
        })}
      </div>
      {/* Caption + dots */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 340, paddingTop: 4 }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={frontId}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ fontSize: 11, letterSpacing: '.2em', color: MUTE, textTransform: 'uppercase', fontFamily: sans }}
          >
            <span style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 13, color: INK, letterSpacing: '.04em', textTransform: 'none' }}>Fig. {String(HERO_IDS.indexOf(frontId) + 1).padStart(2, '0')}</span>
            {' · '}
            {TEMPLATES.find(t => t.id === frontId)?.name ?? frontId} Edition
          </motion.span>
        </AnimatePresence>
        <div style={{ display: 'flex', gap: 6 }}>
          {HERO_IDS.map(id => (
            <button
              key={id}
              onClick={() => {
                if (!isBusy.current) {
                  // Rotate until this id is at front
                  const currentPos = order.indexOf(id)
                  if (currentPos > 0) {
                    isBusy.current = true
                    setExitingId(order[0])
                    setTimeout(() => {
                      setExitingId(null)
                      setReturnedId(order[0])
                      setOrder(prev => {
                        const arr = [...prev]
                        const [removed] = arr.splice(0, 1)
                        arr.push(removed)
                        return arr as HeroId[]
                      })
                      setTimeout(() => { setReturnedId(null); isBusy.current = false }, 80)
                    }, 800)
                  }
                }
              }}
              aria-label={`Show ${id}`}
              style={{ width: order[0] === id ? 18 : 6, height: 4, borderRadius: 99, background: order[0] === id ? ACC : LINE, border: 'none', cursor: 'pointer', transition: 'all .4s ease', padding: 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection({ p1, p2, isMobile }: { p1: string; p2: string; isMobile: boolean }) {
  const t = useTranslations('home')
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const id = setTimeout(() => setMounted(true), 60); return () => clearTimeout(id) }, [])

  return (
    <section style={{ background: BG, position: 'relative', zIndex: 1, padding: isMobile ? '32px 20px 0' : '48px 56px 0', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '42px 1.05fr .95fr', gap: isMobile ? 32 : 48, alignItems: 'center', minHeight: isMobile ? 'auto' : 'calc(100vh - 84px)', maxWidth: 1440, margin: '0 auto' }}>

        {/* Rail — hidden on mobile */}
        {!isMobile && (
        <aside style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, fontSize: 10, letterSpacing: '.32em', color: MUTE, textTransform: 'uppercase', height: '100%', justifyContent: 'center' }}>
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: fran, fontStyle: 'italic', fontSize: 13, letterSpacing: '.12em', color: INK }}>No. 001</span>
          <div style={{ flex: 1, width: 1, background: LINE, maxHeight: 160 }} />
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>A DIGITAL STUDIO</span>
        </aside>
        )}

        {/* Copy */}
        <div style={{ padding: isMobile ? '24px 0 0' : '48px 0', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, letterSpacing: '.32em', color: MUTE, textTransform: 'uppercase', marginBottom: 28 }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 10 }}
            transition={{ duration: 0.7, delay: 0.06 }}
          >
            <span style={{ width: 28, height: 1, background: MUTE, display: 'inline-block' }} />
            Digitalna poročna vabila · Slovenija &amp; Hrvaška
          </motion.div>

          <motion.h1
            style={{ fontFamily: fran, fontWeight: 300, fontSize: 'clamp(64px, 9vw, 120px)', lineHeight: 0.92, letterSpacing: '-.025em', color: INK, marginBottom: 32 }}
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 28 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            Vajin dan,<br />
            <em style={{ fontStyle: 'italic', color: ACC }}>v eni povezavi.</em>
          </motion.h1>

          <motion.p
            style={{ fontFamily: fran, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(17px,1.5vw,21px)', lineHeight: 1.55, color: INK2, maxWidth: 520, marginBottom: 36 }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 14 }}
            transition={{ duration: 0.8, delay: 0.34 }}
          >
            Eleganten, popolnoma personaliziran spletni vabilnik —
            z RSVP, programom dneva, lokacijo in galerijo.
            Brez papirja, brez izgubljenih kuvert.
          </motion.p>

          <motion.div
            style={{ display: 'flex', gap: isMobile ? 12 : 18, alignItems: 'center', flexWrap: 'wrap', marginBottom: isMobile ? 32 : 56, flexDirection: isMobile ? 'column' : 'row' }}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 12 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Link href="/register"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px 28px', background: INK, color: PAPER, fontFamily: sans, fontSize: 12.5, letterSpacing: '.06em', fontWeight: 500, borderRadius: 99, textDecoration: 'none', transition: 'background .3s', width: isMobile ? '100%' : 'auto' }}
              onMouseEnter={e => ((e.target as HTMLElement).style.background = ACC)}
              onMouseLeave={e => ((e.target as HTMLElement).style.background = INK)}
            >
              {t('createCta')}
              <svg viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2" width="14" height="10"><path d="M0 5h13M9 1l4 4-4 4" /></svg>
            </Link>
            <Link href="/templates"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 28px', background: 'transparent', color: INK, fontFamily: sans, fontSize: 12.5, letterSpacing: '.06em', fontWeight: 500, borderRadius: 99, border: `1px solid ${INK}`, textDecoration: 'none', transition: 'all .3s', width: isMobile ? '100%' : 'auto' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = INK; (e.currentTarget as HTMLElement).style.color = PAPER }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = INK }}
            >
              Poglej {TEMPLATES.length} dizajnov
            </Link>
          </motion.div>

          {!isMobile && (
          <motion.ul
            style={{ listStyle: 'none', display: 'flex', gap: 48, paddingTop: 32, borderTop: `1px solid ${LINE}`, maxWidth: 520 }}
            initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          >
            {[['600+', 'izdelanih vabil'], ['48h', 'do oddaje vabila'], ['4.9', 'povprečna ocena']].map(([num, label]) => (
              <li key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontFamily: fran, fontStyle: 'italic', fontWeight: 300, fontSize: 38, lineHeight: 1, color: INK, letterSpacing: '-.02em' }}>{num}</span>
                <span style={{ fontSize: 10, letterSpacing: '.24em', color: MUTE, textTransform: 'uppercase', fontFamily: sans }}>{label}</span>
              </li>
            ))}
          </motion.ul>
          )}
        </div>

        {/* Stage */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingBottom: isMobile ? 32 : 0 }}
          initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <HeroCardDeck p1={p1} p2={p2} />
        </motion.div>
      </div>

      {/* Ticker strip */}
      {!isMobile && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', padding: '20px 56px', fontSize: 10.5, letterSpacing: '.28em', color: MUTE, textTransform: 'uppercase', borderTop: `1px solid ${LINE}`, marginTop: 28, maxWidth: 1440, margin: '28px auto 0', fontFamily: sans, gap: 0 }}>
        {['Vse na enem mestu', 'RSVP v živo', 'Lastna domena', 'Brez naročnine', 'Slovenščina · English · Hrvatski', 'Online v 48 urah'].map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            {item}
            {i < 5 && <span style={{ color: LINE, margin: '0 16px' }}>·</span>}
          </span>
        ))}
      </div>}
    </section>
  )
}

// ── Benefits ──────────────────────────────────────────────────────────────────
const BENEFITS = [
  { n: 'i.',   t: 'Vse na enem mestu',  p: 'Vabilo, program, lokacija, registry in foto galerija — eno polje za posodobitev, in vsi gostje vidijo novo.' },
  { n: 'ii.',  t: 'RSVP v živo',        p: 'Gostje potrdijo prihod z enim klikom. Izbirajo med jedmi, dodajo pesem za parket, sporočijo alergije.' },
  { n: 'iii.', t: 'Trije jeziki',       p: 'Slovenščina, angleščina in hrvaščina — gostje pristanejo na svoji jezikovni različici samodejno.' },
  { n: 'iv.',  t: 'Obvestila z enim klikom', p: 'Spremenili ste lokacijo teden pred poroko? En klik — in vsi gostje, ki so potrdili prihod, dobijo e-mail obvestilo. Brez Instagrama, brez telefoniranja.' },
  { n: 'v.',   t: 'Vajna povezava',      p: 'lorena-in-viktor.najindan.si — elegantna, osebna povezava, ki jo pošljeta gostom in ostane aktivna ves čas.' },
  { n: 'vi.',  t: 'Online v 10 minutah', p: 'Izbereta dizajn, vneseta podatke — takoj ko je plačano, je vabilo živo brez vodnih žigov. Spremembe kadarkoli, sami.' },
]

function BenefitsSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ padding: isMobile ? '60px 20px' : '120px 56px', maxWidth: 1440, margin: '0 auto' }}>
      <div style={{ maxWidth: 780, margin: isMobile ? '0 0 40px' : '0 auto 64px', textAlign: isMobile ? 'left' : 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, fontFamily: sans, marginBottom: 16 }}>— Zakaj digitalno —</div>
        <h2 style={{ fontFamily: fran, fontWeight: 300, fontSize: 'clamp(36px,5.5vw,68px)', lineHeight: 1.02, letterSpacing: '-.022em', color: INK, marginBottom: 20 }}>
          Vse, kar lahko papir,<br />
          <em style={{ fontStyle: 'italic', color: ACC }}>in še mnogo več.</em>
        </h2>
        <p style={{ fontFamily: fran, fontStyle: 'italic', fontWeight: 300, fontSize: 18, color: INK2, lineHeight: 1.55 }}>
          En sam vabilnik za celo zgodbo. Goste posodobiš v sekundi, oni pa
          odgovorijo z enim klikom — kjerkoli na svetu.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '1px', background: LINE, border: `1px solid ${LINE}` }}>
        {BENEFITS.map(({ n, t, p }, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            style={{ background: PAPER, padding: '48px 36px', display: 'flex', flexDirection: 'column', gap: 14, transition: 'background .4s', cursor: 'default' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = PAPER_W)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = PAPER)}
          >
            <span style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 30, color: ACC, lineHeight: 1, marginBottom: 8 }}>{n}</span>
            <h3 style={{ fontFamily: fran, fontWeight: 400, fontSize: 24, letterSpacing: '-.005em', color: INK, margin: 0 }}>{t}</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: INK2, fontFamily: sans, margin: 0 }}>{p}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── How it works ──────────────────────────────────────────────────────────────
const HOW = [
  { n: '01', t: 'Izberita dizajn',     p: 'Prebrskajta naše dizajne in izberita tistega, ki vama najbolj ustreza. Barve, tipografija in fotografije — vse prilagodljivo.' },
  { n: '02', t: 'Vneseta podatke',     p: 'Sami izpolnita besedila, datum, lokacijo in vse posebnosti. Naložita fotografiji in prilagodita vabilo po svojem okusu.' },
  { n: '03', t: 'Vabilo je živo',      p: 'Takoj po plačilu je vabilo online brez vodnih žigov — delite povezavo z gosti. Spremembe kadarkoli, brez doplačila.' },
]

function HowSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ padding: isMobile ? '60px 20px' : '120px 56px', background: BG2, maxWidth: 'none', margin: 0 }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ maxWidth: 780, margin: isMobile ? '0 0 40px' : '0 auto 64px', textAlign: isMobile ? 'left' : 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, fontFamily: sans, marginBottom: 16 }}>— Postopek —</div>
          <h2 style={{ fontFamily: fran, fontWeight: 300, fontSize: 'clamp(36px,5.5vw,68px)', lineHeight: 1.02, letterSpacing: '-.022em', color: INK, margin: 0 }}>
            Trije koraki<br />
            <em style={{ fontStyle: 'italic', color: ACC }}>do vajnega vabila.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 16 : 32 }}>
          {HOW.map(({ n, t, p }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ background: PAPER, border: `1px solid ${LINE}`, padding: '48px 36px 40px', borderRadius: 4, transition: 'transform .35s, box-shadow .35s', cursor: 'default' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 30px 60px -28px rgba(28,24,20,.18)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div style={{ fontFamily: fran, fontStyle: 'italic', fontWeight: 300, fontSize: 54, color: ACC, lineHeight: 1, letterSpacing: '-.02em', marginBottom: 6 }}>{n}</div>
              <div style={{ width: 48, height: 1, background: ACC, margin: '18px 0 22px' }} />
              <h3 style={{ fontFamily: fran, fontWeight: 400, fontSize: 26, letterSpacing: '-.005em', marginBottom: 12, margin: '0 0 12px' }}>{t}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: INK2, fontFamily: sans, margin: 0 }}>{p}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Templates preview ─────────────────────────────────────────────────────────
function TemplateCard({ id, name, category, index, p1, p2 }: { id: string; name: string; category: string; index: number; p1: string; p2: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07 }}
    >
      <Link href={`/templates/${id}`} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ aspectRatio: '3/4', overflow: 'hidden', border: `1px solid ${LINE}`, borderRadius: 3, position: 'relative', transition: 'box-shadow .4s, transform .35s', boxShadow: hovered ? '0 24px 48px -22px rgba(28,24,20,.28)' : 'none', transform: hovered ? 'translateY(-4px)' : 'none', cursor: 'pointer' }}
        >
          <TemplateArt id={id} p1={p1 || 'Lorena'} p2={p2 || 'Viktor'} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,23,20,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transition: 'opacity .35s', backdropFilter: 'blur(2px)' }}>
            <span style={{ padding: '12px 22px', background: PAPER, color: INK, borderRadius: 99, fontSize: 12, letterSpacing: '.04em', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8, transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'transform .35s', fontFamily: sans }}>
              Poglej dizajn
              <svg width="12" height="9" viewBox="0 0 14 10" fill="none"><path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.2" /></svg>
            </span>
          </div>
        </div>
        <div style={{ paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div>
            <div style={{ fontSize: 9.5, letterSpacing: '.28em', color: MUTE, textTransform: 'uppercase', marginBottom: 4, fontFamily: sans }}>{category}</div>
            <div style={{ fontFamily: fran, fontWeight: 400, fontSize: 17, letterSpacing: '-.005em', color: INK }}>
              {name} <em style={{ fontStyle: 'italic', color: ACC }}>Edition</em>
            </div>
          </div>
          <div style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 13, color: MUTE, whiteSpace: 'nowrap', paddingTop: 14 }}>€89+</div>
        </div>
      </Link>
    </motion.div>
  )
}

function TemplatesSection({ p1, p2, isMobile }: { p1: string; p2: string; isMobile: boolean }) {
  const preview = TEMPLATES.slice(0, isMobile ? 4 : 8)
  return (
    <section style={{ padding: isMobile ? '60px 20px' : '120px 56px', maxWidth: 1440, margin: '0 auto' }} id="templates">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: isMobile ? 32 : 56 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, fontFamily: sans, marginBottom: 16 }}>— Naša kolekcija —</div>
          <h2 style={{ fontFamily: fran, fontWeight: 300, fontSize: 'clamp(36px,5.5vw,68px)', lineHeight: 1.02, letterSpacing: '-.022em', color: INK, margin: 0 }}>
            {TEMPLATES.length}+ dizajnov,<br />
            <em style={{ fontStyle: 'italic', color: ACC }}>en savšeni dan.</em>
          </h2>
        </div>
        {!isMobile && <p style={{ fontFamily: fran, fontStyle: 'italic', fontWeight: 300, fontSize: 18, color: INK2, maxWidth: 360, lineHeight: 1.55, textAlign: 'right' }}>
          Skrbno izbrani templati — od minimalnih do razkošnih.
          Vsak dizajn prilagodita po svojih barvah in tipografiji.
        </p>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? '20px 12px' : '32px 22px' }}>
        {preview.map((tmpl, i) => (
          <TemplateCard key={tmpl.id} id={tmpl.id} name={tmpl.name} category={tmpl.category} index={i} p1={p1} p2={p2} />
        ))}
      </div>
      <div style={{ marginTop: isMobile ? 28 : 56, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, paddingTop: 28, borderTop: `1px solid ${LINE}`, flexWrap: 'wrap' }}>
        {!isMobile && <p style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 14, color: INK2, maxWidth: 520, lineHeight: 1.6, margin: 0 }}>
          Vse predloge so popolnoma personalizirane. Tipografija, barve, fotografije in besedila — vse prilagojeno vajini zgodbi.
        </p>}
        <Link href="/templates"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px 28px', background: INK, color: PAPER, fontFamily: sans, fontSize: 12.5, letterSpacing: '.06em', fontWeight: 500, borderRadius: 99, textDecoration: 'none', transition: 'background .3s', flexShrink: 0, width: isMobile ? '100%' : 'auto' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = ACC)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = INK)}
        >
          Poglej vsa vabila
          <svg viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2" width="14" height="10"><path d="M0 5h13M9 1l4 4-4 4" /></svg>
        </Link>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTS = [
  { q: 'Iskreno, nisva pričakovala, da bo tako lepo. Mama me je poklicala s solzami v očeh — rekla je, da je kot iz revije. Tega nisva pričakovala od spletnega vabila.', name: 'Lorena & Viktor', meta: 'Rovinj · 06.2026' },
  { q: 'Najin brat iz Avstralije je rekel, da je vabilo lepše od marsikaterega tiskanega. Potrdil je prihod kar z mobitela med kosilom. Niti enega klica nisva potrebovala.', name: 'Sara & Tilen', meta: 'Bled · 09.2025' },
  { q: 'Teden pred poroko smo spremenili uro obreda. V petih minutah sem posodobila vabilo in vsi gostje so dobili obvestilo. Pri tiskanem bi bila katastrofa.', name: 'Ana & Marko', meta: 'Piran · 07.2025' },
]

function TestimonialsSection({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ padding: isMobile ? '60px 20px' : '120px 56px', background: BG2 }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ maxWidth: 780, margin: isMobile ? '0 0 40px' : '0 auto 64px', textAlign: isMobile ? 'left' : 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, fontFamily: sans, marginBottom: 16 }}>— Pari pravijo —</div>
          <h2 style={{ fontFamily: fran, fontWeight: 300, fontSize: 'clamp(36px,5.5vw,68px)', lineHeight: 1.02, letterSpacing: '-.022em', color: INK, margin: 0 }}>
            Najlepši<br /><em style={{ fontStyle: 'italic', color: ACC }}>odzivi.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 16 : 32 }}>
          {TESTS.map(({ q, name, meta }, i) => (
            <motion.figure
              key={name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{ background: PAPER, border: `1px solid ${LINE}`, padding: '40px 32px', position: 'relative', margin: 0 }}
            >
              <div style={{ position: 'absolute', top: 8, left: 24, fontFamily: fran, fontStyle: 'italic', fontSize: 80, lineHeight: 1, color: ACCS }}>&#8220;</div>
              <blockquote style={{ position: 'relative', fontFamily: fran, fontWeight: 300, fontSize: 18, lineHeight: 1.55, color: INK, margin: '20px 0 24px' }}>{q}</blockquote>
              <figcaption style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 16, borderTop: `1px solid ${LINE}` }}>
                <span style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 17, color: ACC }}>{name}</span>
                <span style={{ fontSize: 11, letterSpacing: '.18em', color: MUTE, textTransform: 'uppercase', fontFamily: sans }}>{meta}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, fontSize: 12, color: INK2, flexWrap: 'wrap', fontFamily: sans }}>
          <span style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 18, color: ACC, letterSpacing: '.18em' }}>★ ★ ★ ★ ★</span>
          <span>4.9 / 5 povprečna ocena</span>
          <span style={{ color: LINE }}>·</span>
          <span>na osnovi 187 ocen parov</span>
        </div>
      </div>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────────────
function PricingSection({ isMobile }: { isMobile: boolean }) {
  const t = useTranslations('home')
  const pkgs = Object.values(PACKAGES)
  return (
    <section style={{ padding: isMobile ? '60px 20px' : '120px 56px', maxWidth: 1440, margin: '0 auto' }} id="pricing">
      <div style={{ maxWidth: 780, margin: isMobile ? '0 0 40px' : '0 auto 64px', textAlign: isMobile ? 'left' : 'center' }}>
        <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, fontFamily: sans, marginBottom: 16 }}>— Paketi —</div>
        <h2 style={{ fontFamily: fran, fontWeight: 300, fontSize: 'clamp(36px,5.5vw,68px)', lineHeight: 1.02, letterSpacing: '-.022em', color: INK, marginBottom: 20, margin: '0 0 20px' }}>
          Lepota,<br /><em style={{ fontStyle: 'italic', color: ACC }}>brez kompromisa.</em>
        </h2>
        <p style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 18, color: INK2, lineHeight: 1.55 }}>
          {t('pricingDesc')}
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 20 : 24, marginBottom: isMobile ? 40 : 80, alignItems: 'stretch' }}>
        {pkgs.map((pkg) => (
          <motion.article
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{
              background: pkg.popular ? NOIR : PAPER,
              border: `1px solid ${pkg.popular ? NOIR : LINE}`,
              borderRadius: 4, padding: '40px 32px 32px',
              display: 'flex', flexDirection: 'column',
              position: 'relative',
              transform: pkg.popular ? 'translateY(-12px)' : 'none',
              boxShadow: pkg.popular ? '0 40px 80px -30px rgba(28,24,20,.4)' : 'none',
              transition: 'transform .35s, box-shadow .35s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = pkg.popular ? 'translateY(-16px)' : 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = pkg.popular ? '0 40px 80px -30px rgba(28,24,20,.4)' : '0 30px 60px -30px rgba(28,24,20,.22)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = pkg.popular ? 'translateY(-12px)' : 'none'; (e.currentTarget as HTMLElement).style.boxShadow = pkg.popular ? '0 40px 80px -30px rgba(28,24,20,.4)' : 'none' }}
          >
            {pkg.popular && (
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: ACC, color: PAPER, padding: '8px 18px', borderRadius: 99, fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', fontWeight: 600, display: 'inline-flex', gap: 6, alignItems: 'center', boxShadow: '0 12px 28px -8px rgba(156,107,61,.5)', whiteSpace: 'nowrap', fontFamily: sans }}>
                ★ Najpopularnejši
              </div>
            )}
            <header style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: pkg.popular ? ACC2 : ACC, fontWeight: 500, fontFamily: sans }}>{pkg.name}</div>
              <h3 style={{ fontFamily: fran, fontWeight: 400, fontSize: 26, marginTop: 6, lineHeight: 1.2, letterSpacing: '-.005em', color: pkg.popular ? PAPER : INK }}>{pkg.popular ? 'Najboljša ' : ''}<em style={{ fontStyle: 'italic', color: pkg.popular ? ACC2 : ACC }}>{pkg.popular ? 'izbira' : 'paket'}</em>{pkg.popular ? ' za večino.' : ''}</h3>
            </header>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '20px 0', borderTop: `1px solid ${pkg.popular ? 'rgba(232,212,184,.18)' : LINE}`, borderBottom: `1px solid ${pkg.popular ? 'rgba(232,212,184,.18)' : LINE}`, marginBottom: 24 }}>
              <span style={{ fontFamily: fran, fontStyle: 'italic', fontWeight: 300, fontSize: 24, color: MUTE }}>€</span>
              <span style={{ fontFamily: fran, fontWeight: 300, fontSize: 72, lineHeight: .95, letterSpacing: '-.02em', color: pkg.popular ? PAPER : INK }}>{pkg.price}</span>
              <span style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 13, color: MUTE, marginLeft: 'auto' }}>{t('oneTime')}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              {pkg.features.map(f => (
                <li key={f} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: pkg.popular ? ACCS : INK2, lineHeight: 1.5, alignItems: 'flex-start', fontFamily: sans }}>
                  <span style={{ color: pkg.popular ? ACC2 : ACC, fontSize: 13, fontWeight: 600, flexShrink: 0, marginTop: 1 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href={`/register?package=${pkg.id}`}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px 20px', fontSize: 12, letterSpacing: '.06em', fontWeight: 500, background: pkg.popular ? ACC : 'transparent', color: pkg.popular ? PAPER : INK, border: `1px solid ${pkg.popular ? ACC : LINE}`, borderRadius: 99, transition: 'all .3s', textDecoration: 'none', fontFamily: sans }}
              onMouseEnter={e => { if (!pkg.popular) { (e.currentTarget as HTMLElement).style.background = INK; (e.currentTarget as HTMLElement).style.color = PAPER } }}
              onMouseLeave={e => { if (!pkg.popular) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = INK } }}
            >
              {pkg.popular ? 'Izberi ta paket' : t('getStarted')}
              <svg viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2" width="13" height="9"><path d="M0 5h13M9 1l4 4-4 4" /></svg>
            </Link>
            <p style={{ marginTop: 14, textAlign: 'center', fontSize: 11.5, color: pkg.popular ? ACCS : MUTE, fontFamily: fran, fontStyle: 'italic' }}>
              Aktivno {pkg.duration} mesecev
            </p>
          </motion.article>
        ))}
      </div>
      {/* Custom banner */}
      <div style={{ background: NOIR, color: PAPER, borderRadius: 8, padding: isMobile ? '40px 24px' : '72px 56px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr .8fr', gap: isMobile ? 28 : 48, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(80% 100% at 100% 50%,rgba(201,149,99,.16),transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: -30, bottom: -100, fontFamily: fran, fontStyle: 'italic', fontWeight: 300, fontSize: 340, lineHeight: 1, color: 'rgba(232,212,184,.05)', pointerEvents: 'none', userSelect: 'none' }}>&amp;</div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC2, fontWeight: 500, fontFamily: sans, marginBottom: 16 }}>— White Glove · brez predlog —</div>
          <h3 style={{ fontFamily: fran, fontWeight: 300, fontSize: 'clamp(32px,4vw,50px)', letterSpacing: '-.018em', lineHeight: 1.05, margin: '0 0 18px' }}>
            Ne najdeta svojega okusa?<br />
            <em style={{ fontStyle: 'italic', color: ACC2 }}>Naredimo ga skupaj.</em>
          </h3>
          <p style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 17, color: ACCS, lineHeight: 1.55, maxWidth: 560, marginBottom: 24 }}>
            Naš studio izdela vajino spletno vabilo od bele strani — vajini brendi, vajine barve, vajine animacije, vajina pisava.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, maxWidth: 520 }}>
            {['Custom dizajn studio', 'Animacije & 3D efekti', 'Trije jeziki', 'Personalni vodja projekta'].map(item => (
              <li key={item} style={{ fontSize: 13.5, color: PAPER, display: 'flex', gap: 8, alignItems: 'center', fontFamily: sans }}>
                <span style={{ color: ACC2, fontSize: 8 }}>◆</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
          <blockquote style={{ fontFamily: fran, fontStyle: 'italic', fontWeight: 300, fontSize: 22, lineHeight: 1.4, color: ACCS, paddingLeft: 18, borderLeft: `1px solid ${ACC2}` }}>
            "Vajina priča je premočna za polje z 99-tih izbir. Pišita nama."
          </blockquote>
          <Link href="mailto:studio@invitia.si"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 28px', background: ACC, color: PAPER, borderRadius: 99, fontSize: 12.5, letterSpacing: '.06em', fontWeight: 500, textDecoration: 'none', fontFamily: sans, transition: 'background .3s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = ACC2)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = ACC)}
          >
            Zaprosi za ponudbo
            <svg viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2" width="14" height="10"><path d="M0 5h13M9 1l4 4-4 4" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: 'Kako hitro je vabilo živo?', a: 'Takoj po plačilu. Izbereta dizajn, vneseta podatke in vabilo je online brez vodnih žigov — v večini primerov v manj kot 10 minutah.' },
  { q: 'Lahko sama urejava vsebino po objavi?', a: 'Da. Vsi paketi vključujejo preprost admin vmesnik, kjer lahko dodajata fotografije, posodobita program in spremljata RSVP odgovore — brez tehničnega znanja.' },
  { q: 'Kaj se zgodi z vabilom po poroki?', a: 'Vabilo ostane živo glede na trajanje paketa. Po izteku imate 14 dni da ga podaljšate — drugače gre offline in se po 14 dneh samodejno izbriše.' },
  { q: 'Kateri jeziki so podprti?', a: 'Privzeto slovenščina, angleščina in hrvaščina. V Signature paketu lahko dodamo poljuben jezik (italijanščina, nemščina, srbščina, francoščina ...).' },
  { q: 'Kaj če potrebujeva nujno spremembo zadnji teden?', a: 'Ni problema. Vsebino urejata sami kadarkoli — spremenita datum, uro, lokacijo ali karkoli drugega. Ko posodobite, z enim gumbom pošljete e-mail obvestilo vsem gostom, ki so potrdili prihod.' },
  { q: 'Kako poteka plačilo?', a: 'Vabilo ustvarite brezplačno in ga urejate s predogledom. Ko ste zadovoljni, plačate z bančno kartico prek Stripe — in vabilo je takoj živo, brez vodnih žigov.' },
  { q: 'Ali imajo starejši gostje težave z digitalnim vabilom?', a: 'Večina ne — vabilo odprete z enim klikom na telefonski povezavi. Za goste brez pametnega telefona pa preprosto natisnete QR kodo ali samo URL, ki ga vpišejo na računalniku.' },
  { q: 'Kako pošljeva vabilo gostom?', a: 'Preprosto delita povezavo — prek WhatsAppa, SMS-a, e-pošte ali kjerkoli. Vsak gost jo odpre na svojem telefonu, brez aplikacij in prijav.' },
]

function FAQSection({ isMobile }: { isMobile: boolean }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section style={{ padding: isMobile ? '60px 20px' : '120px 56px', background: BG2 }} id="faq">
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ maxWidth: 780, margin: isMobile ? '0 0 40px' : '0 auto 64px', textAlign: isMobile ? 'left' : 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, fontFamily: sans, marginBottom: 16 }}>— Pogosta vprašanja —</div>
          <h2 style={{ fontFamily: fran, fontWeight: 300, fontSize: 'clamp(40px,5.5vw,68px)', lineHeight: 1.02, letterSpacing: '-.022em', color: INK, margin: 0 }}>
            Imate vprašanja?<br /><em style={{ fontStyle: 'italic', color: ACC }}>Imamo odgovore.</em>
          </h2>
        </div>
        <div style={{ maxWidth: 880, margin: '0 auto', borderTop: `1px solid ${LINE}` }}>
          {FAQS.map(({ q, a }, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${LINE}` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', textAlign: 'left', fontFamily: fran, fontWeight: 400, fontSize: 20, letterSpacing: '-.005em', color: open === i ? ACC : INK, background: 'none', border: 'none', cursor: 'pointer', transition: 'color .25s' }}
              >
                <span>{q}</span>
                <span style={{ width: 32, height: 32, border: `1px solid ${open === i ? INK : LINE}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 24, background: open === i ? INK : 'transparent', transition: 'all .3s', position: 'relative' }}>
                  <span style={{ position: 'absolute', width: 10, height: 1, background: open === i ? PAPER : INK2 }} />
                  <span style={{ position: 'absolute', width: 1, height: 10, background: open === i ? PAPER : INK2, transform: open === i ? 'rotate(90deg)' : 'none', transition: 'transform .3s' }} />
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} style={{ overflow: 'hidden' }}>
                    <p style={{ paddingBottom: 28, paddingRight: 60, fontSize: 14.5, lineHeight: 1.75, color: INK2, fontFamily: sans, margin: 0 }}>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactSection({ isMobile }: { isMobile: boolean }) {
  const [sent, setSent] = useState(false)
  return (
    <section style={{ padding: isMobile ? '60px 20px' : '120px 56px', maxWidth: 1440, margin: '0 auto' }} id="contact">
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr', gap: isMobile ? 40 : 64, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: ACC, fontWeight: 500, fontFamily: sans, marginBottom: 16 }}>— Pišita nama —</div>
          <h2 style={{ fontFamily: fran, fontWeight: 300, fontSize: 'clamp(40px,5vw,60px)', lineHeight: 1.02, letterSpacing: '-.022em', marginBottom: 24, color: INK }}>
            Imata vprašanje<br /><em style={{ fontStyle: 'italic', color: ACC }}>o vajinem vabilu?</em>
          </h2>
          <p style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 18, color: INK2, maxWidth: 460, lineHeight: 1.55, marginBottom: 32 }}>
            Pišita nama nekaj besed o vajini ideji — datumu, številu gostov, želenem stilu. Odgovorim osebno v 24 urah.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${LINE}` }}>
            {[['E-pošta', 'studio@invitia.si'], ['Odzivni čas', 'običajno do 24 h'], ['Studio', 'Ljubljana · Zagreb · Rovinj']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: `1px solid ${LINE}`, gap: 16 }}>
                <span style={{ fontSize: 10.5, letterSpacing: '.28em', color: MUTE, textTransform: 'uppercase', fontFamily: sans }}>{k}</span>
                <span style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 17, color: INK }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: PAPER, border: `1px solid ${LINE}`, padding: 40, borderRadius: 4, position: 'relative' }}>
          {sent ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: 40, gap: 14, minHeight: 400 }}>
              <span style={{ fontFamily: fran, fontStyle: 'italic', fontWeight: 300, fontSize: 48, color: ACC }}>Hvala!</span>
              <p style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 18, color: INK2, maxWidth: 320, lineHeight: 1.5 }}>Sporočilo je oddano. Oglasim se najkasneje v 24 urah.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true) }} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                {[['Vajini imeni', 'Lorena & Viktor', 'text'], ['E-pošta', 'lorena@example.com', 'email']].map(([label, ph, type]) => (
                  <label key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontSize: 11, letterSpacing: '.18em', color: MUTE, textTransform: 'uppercase', fontWeight: 500, fontFamily: sans }}>{label}</span>
                    <input required type={type} placeholder={ph} style={{ padding: '14px 16px', background: 'transparent', border: `1px solid ${LINE}`, borderRadius: 3, fontFamily: sans, fontSize: 14, color: INK, transition: 'border-color .25s', outline: 'none' }} onFocus={e => (e.target.style.borderColor = ACC)} onBlur={e => (e.target.style.borderColor = LINE)} />
                  </label>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontSize: 11, letterSpacing: '.18em', color: MUTE, textTransform: 'uppercase', fontWeight: 500, fontFamily: sans }}>Datum poroke</span>
                  <input type="text" placeholder="12. junij 2026" style={{ padding: '14px 16px', background: 'transparent', border: `1px solid ${LINE}`, borderRadius: 3, fontFamily: sans, fontSize: 14, color: INK, outline: 'none', transition: 'border-color .25s' }} onFocus={e => (e.target.style.borderColor = ACC)} onBlur={e => (e.target.style.borderColor = LINE)} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontSize: 11, letterSpacing: '.18em', color: MUTE, textTransform: 'uppercase', fontWeight: 500, fontFamily: sans }}>Zanima naju</span>
                  <select style={{ padding: '14px 16px', background: 'transparent', border: `1px solid ${LINE}`, borderRadius: 3, fontFamily: sans, fontSize: 14, color: INK, outline: 'none', appearance: 'none', transition: 'border-color .25s' }} onFocus={e => (e.target.style.borderColor = ACC)} onBlur={e => (e.target.style.borderColor = LINE)}>
                    <option>— Izberita paket —</option>
                    {Object.values(PACKAGES).map(p => <option key={p.id}>{p.name} · €{p.price}</option>)}
                    <option>Custom — po meri</option>
                  </select>
                </label>
              </div>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 11, letterSpacing: '.18em', color: MUTE, textTransform: 'uppercase', fontWeight: 500, fontFamily: sans }}>Sporočilo</span>
                <textarea rows={5} placeholder="Povejta nama nekaj besed o vajini ideji ..." style={{ padding: '14px 16px', background: 'transparent', border: `1px solid ${LINE}`, borderRadius: 3, fontFamily: sans, fontSize: 14, color: INK, resize: 'vertical', minHeight: 120, outline: 'none', transition: 'border-color .25s' }} onFocus={e => (e.target.style.borderColor = ACC)} onBlur={e => (e.target.style.borderColor = LINE)} />
              </label>
              <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px 28px', background: INK, color: PAPER, fontFamily: sans, fontSize: 12.5, letterSpacing: '.06em', fontWeight: 500, border: 'none', borderRadius: 99, cursor: 'pointer', transition: 'background .3s' }} onMouseEnter={e => ((e.target as HTMLElement).style.background = ACC)} onMouseLeave={e => ((e.target as HTMLElement).style.background = INK)}>
                Pošlji povpraševanje
                <svg viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2" width="14" height="10"><path d="M0 5h13M9 1l4 4-4 4" /></svg>
              </button>
              <p style={{ fontSize: 12, color: MUTE, textAlign: 'center', fontFamily: fran, fontStyle: 'italic', margin: 0 }}>Z oddajo se strinjata, da vaju kontaktiramo. Brez spama.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [p1, setP1] = useState('Lorena')
  const [p2, setP2] = useState('Viktor')
  const [showPopup, setShowPopup] = useState(false)
  const [namesSet, setNamesSet] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('weddingNames')
      if (saved) {
        const { p1: s1, p2: s2 } = JSON.parse(saved)
        if (s1) setP1(s1)
        if (s2) setP2(s2)
        setNamesSet(true)
        return
      }
      // Migration: old key from previous version
      if (sessionStorage.getItem('namePopupSeen')) {
        setNamesSet(false)
        return
      }
      setShowPopup(true)
    } catch {
      setShowPopup(true)
    }
  }, [])

  function handlePopupConfirm(name1: string, name2: string) {
    setP1(name1)
    setP2(name2)
    setNamesSet(true)
    setShowPopup(false)
    sessionStorage.setItem('weddingNames', JSON.stringify({ p1: name1, p2: name2 }))
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: sans }}>
      <Grain />

      <AnimatePresence>
        {showPopup && (
          <NamePopup
            onConfirm={handlePopupConfirm}
            initialP1={namesSet ? p1 : ''}
            initialP2={namesSet ? p2 : ''}
          />
        )}
      </AnimatePresence>

      {/* Floating "Prilagodi imena" button */}
      <AnimatePresence>
        {!showPopup && (
          <motion.button
            key="prilagodi"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            onClick={() => setShowPopup(true)}
            style={{
              position: 'fixed', bottom: isMobile ? 16 : 28, right: isMobile ? 16 : 28, zIndex: 400,
              background: PAPER, border: `1px solid ${LINE}`, borderRadius: 99,
              padding: isMobile ? '8px 14px' : '10px 18px', display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: sans, fontSize: isMobile ? 10 : 11, letterSpacing: '.14em', textTransform: 'uppercase',
              color: ACC, cursor: 'pointer',
              boxShadow: '0 4px 20px -6px rgba(28,24,20,.16)',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M9.5 1.5l3 3L4 13H1v-3L9.5 1.5z" />
            </svg>
            Prilagodi imena
          </motion.button>
        )}
      </AnimatePresence>

      <SiteNav transparent />
      <HeroSection p1={p1} p2={p2} isMobile={isMobile} />
      <BenefitsSection isMobile={isMobile} />
      <HowSection isMobile={isMobile} />
      <TemplatesSection p1={p1} p2={p2} isMobile={isMobile} />
      <TestimonialsSection isMobile={isMobile} />
      <PricingSection isMobile={isMobile} />
      <FAQSection isMobile={isMobile} />
      <ContactSection isMobile={isMobile} />
      <SiteFooter />
    </div>
  )
}
