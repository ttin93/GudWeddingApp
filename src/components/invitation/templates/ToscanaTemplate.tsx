'use client'

import { useState, useEffect } from 'react'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import { RSVPForm } from '../RSVPForm'
import type { Invitation, RSVPResponse } from '@/types'
import { SharedSections, DirectContactCard, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'
import { AnimateSection } from '../AnimateSection'

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  paper:    '#f4ede0',
  paper2:   '#efe6d3',
  paper3:   '#e8dcc4',
  ink:      '#1c1813',
  ink2:     '#3a312a',
  muted:    '#7a6e5f',
  sage:     '#5a7860',
  sage2:    '#8aab8c',
  sage3:    '#3e5942',
  terra:    '#c4653b',
  line:     'rgba(28,24,19,.18)',
  lineSoft: 'rgba(28,24,19,.10)',
  shadow:   '0 30px 60px -30px rgba(28,24,19,.22), 0 8px 20px -10px rgba(28,24,19,.10)',
}

const display = 'var(--font-italiana), Georgia, serif'
const script  = 'var(--font-pinyon), cursive'
const serif   = 'var(--font-cormorant), "Times New Roman", serif'


// ─── Corner botanical ornament ────────────────────────────────────────────────
function CornerOrnament() {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke={C.sage} width="100%" height="100%" aria-hidden="true">
      <path d="M10,140 C10,80 60,30 130,20" strokeWidth="1"/>
      <ellipse cx="30" cy="110" rx="10" ry="3" transform="rotate(-30 30 110)" fill={C.sage} fillOpacity=".45" stroke="none"/>
      <ellipse cx="48" cy="82" rx="10" ry="3" transform="rotate(-50 48 82)" fill={C.sage} fillOpacity=".45" stroke="none"/>
      <ellipse cx="72" cy="58" rx="10" ry="3" transform="rotate(-65 72 58)" fill={C.sage} fillOpacity=".45" stroke="none"/>
      <ellipse cx="102" cy="38" rx="10" ry="3" transform="rotate(-78 102 38)" fill={C.sage} fillOpacity=".45" stroke="none"/>
      <ellipse cx="138" cy="26" rx="10" ry="3" transform="rotate(-90 138 26)" fill={C.sage} fillOpacity=".45" stroke="none"/>
      <circle cx="160" cy="22" r="3" fill={C.terra} stroke="none"/>
    </svg>
  )
}

// ─── Botanical divider ────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
      <svg viewBox="0 0 180 32" fill="none" stroke={C.sage} width="160" height="28" aria-hidden="true">
        <path d="M0,16 L60,16" strokeWidth="1"/>
        <path d="M120,16 L180,16" strokeWidth="1"/>
        <circle cx="90" cy="16" r="3" fill={C.sage} stroke="none"/>
        <circle cx="74" cy="16" r="1.4" fill={C.sage} stroke="none"/>
        <circle cx="106" cy="16" r="1.4" fill={C.sage} stroke="none"/>
        <ellipse cx="68" cy="10" rx="6" ry="2" transform="rotate(-25 68 10)" fill={C.sage} fillOpacity=".4" stroke="none"/>
        <ellipse cx="68" cy="22" rx="6" ry="2" transform="rotate(25 68 22)" fill={C.sage} fillOpacity=".4" stroke="none"/>
        <ellipse cx="112" cy="10" rx="6" ry="2" transform="rotate(25 112 10)" fill={C.sage} fillOpacity=".4" stroke="none"/>
        <ellipse cx="112" cy="22" rx="6" ry="2" transform="rotate(-25 112 22)" fill={C.sage} fillOpacity=".4" stroke="none"/>
      </svg>
    </div>
  )
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 52 }}>
      <div style={{ fontFamily: serif, fontSize: 10.5, letterSpacing: '.32em', textTransform: 'uppercase', color: C.sage3 }}>
        {eyebrow}
      </div>
      <h2 style={{ fontFamily: display, fontSize: 'clamp(36px,5vw,58px)', fontWeight: 400, margin: '12px 0 16px', lineHeight: 1.05, color: C.ink }}>
        {title}
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, color: C.sage3 }}>
        <div style={{ width: 40, height: 1, background: C.sage3, opacity: .5 }} />
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="2.5" fill={C.sage3}/></svg>
        <div style={{ width: 40, height: 1, background: C.sage3, opacity: .5 }} />
      </div>
    </div>
  )
}

// ─── Live countdown ───────────────────────────────────────────────────────────
function calcT(weddingDate: string) {
  const diff = new Date(weddingDate).getTime() - Date.now()
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
  return { d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) }
}

function Countdown({ weddingDate }: { weddingDate: string }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    setT(calcT(weddingDate))
    const id = setInterval(() => setT(calcT(weddingDate)), 1000)
    return () => clearInterval(id)
  }, [weddingDate])

  const units = [{ val: t.d, lbl: 'Dni' }, { val: t.h, lbl: 'Ur' }, { val: t.m, lbl: 'Minut' }, { val: t.s, lbl: 'Sekund' }]
  return (
    <div style={{ display: 'flex', borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, padding: '16px 0', marginTop: 40, width: '100%' }}>
      {units.map((u, i) => (
        <div key={u.lbl} style={{ flex: 1, padding: '8px 12px', borderRight: i < 3 ? `1px solid ${C.lineSoft}` : 'none', textAlign: 'center', minWidth: 0 }}>
          <div style={{ fontFamily: display, fontSize: 'clamp(28px,5vw,50px)', lineHeight: 1, color: C.ink }}>{String(u.val).padStart(2, '0')}</div>
          <div style={{ fontFamily: serif, fontSize: 9.5, letterSpacing: '.28em', textTransform: 'uppercase', color: C.muted, marginTop: 6 }}>{u.lbl}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  invitation: Invitation
  existingRSVP?: RSVPResponse | null
}

// ─── Main template ────────────────────────────────────────────────────────────
export function ToscanaTemplate({ invitation, existingRSVP }: Props) {
  const labels = getEffectiveLabels(invitation)
  const days   = daysUntilWedding(invitation.wedding_date)

  const theme: SectionTheme = {
    bg:     C.paper,
    bgAlt:  C.paper2,
    text:   C.ink,
    muted:  C.muted,
    accent: C.terra,
    rule:   C.line,
    card:   C.paper,
  }

  return (
    <div style={{ background: C.paper, color: C.ink, fontFamily: serif }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100dvh',
        background: C.paper,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: 'clamp(100px,14vw,140px) 24px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* corner ornaments */}
        <div style={{ position: 'absolute', width: 200, height: 200, top: 56, left: 20, opacity: .65, pointerEvents: 'none' }}>
          <CornerOrnament />
        </div>
        <div style={{ position: 'absolute', width: 200, height: 200, top: 56, right: 20, opacity: .65, pointerEvents: 'none', transform: 'scaleX(-1)' }}>
          <CornerOrnament />
        </div>
        <div style={{ position: 'absolute', width: 170, height: 170, bottom: 20, left: 20, opacity: .4, pointerEvents: 'none', transform: 'scaleY(-1)' }}>
          <CornerOrnament />
        </div>
        <div style={{ position: 'absolute', width: 170, height: 170, bottom: 20, right: 20, opacity: .4, pointerEvents: 'none', transform: 'scale(-1,-1)' }}>
          <CornerOrnament />
        </div>

        {/* eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: C.sage3, marginBottom: 20, position: 'relative', zIndex: 2 }}>
          <div style={{ width: 32, height: 1, background: C.sage3, opacity: .5 }} />
          <span style={{ fontFamily: serif, fontSize: 10.5, letterSpacing: '.32em', textTransform: 'uppercase' }}>
            {invitation.venue_name ?? 'Vabljeni'}
          </span>
          <div style={{ width: 32, height: 1, background: C.sage3, opacity: .5 }} />
        </div>

        {/* names */}
        <h1 style={{ fontFamily: display, fontSize: 'clamp(52px,10vw,150px)', fontWeight: 400, lineHeight: .92, letterSpacing: '-.005em', margin: '0 0 6px', position: 'relative', zIndex: 2, color: C.ink }}>
          {invitation.partner1_name}
          <span style={{ fontFamily: script, fontSize: '.56em', display: 'inline-block', margin: '0 .04em', color: C.terra, transform: 'translateY(-.10em)' }}>
            &amp;
          </span>
          {invitation.partner2_name}
        </h1>

        {/* personal message as tagline */}
        {invitation.personal_message && (
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 18, color: C.ink2, marginTop: 20, maxWidth: 480, lineHeight: 1.55, position: 'relative', zIndex: 2 }}>
            {invitation.personal_message}
          </p>
        )}

        {/* date / time / venue row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, marginTop: 36, flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: serif, fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: C.muted }}>Datum</div>
            <div style={{ fontFamily: display, fontSize: 22, marginTop: 5 }}>{formatDate(invitation.wedding_date, 'd. MMMM yyyy')}</div>
          </div>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.terra, opacity: .7 }} />
          {invitation.ceremony_time && <>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: serif, fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: C.muted }}>Ura</div>
              <div style={{ fontFamily: display, fontSize: 22, marginTop: 5 }}>{formatTime(invitation.ceremony_time)}</div>
            </div>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.terra, opacity: .7 }} />
          </>}
          {invitation.venue_name && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: serif, fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: C.muted }}>Kraj</div>
              <div style={{ fontFamily: display, fontSize: 22, marginTop: 5 }}>{invitation.venue_name}</div>
            </div>
          )}
        </div>

        {/* countdown */}
        {invitation.show_countdown && days > 0 && (
          <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 560 }}>
            <Countdown weddingDate={invitation.wedding_date} />
          </div>
        )}

        {/* scroll cue */}
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, pointerEvents: 'none' }}>
          <span style={{ fontFamily: serif, fontSize: 9.5, letterSpacing: '.30em', textTransform: 'uppercase', color: C.muted }}>Pomakni</span>
          <div style={{ width: 1, height: 50, background: `linear-gradient(180deg, ${C.line}, transparent)` }} />
        </div>
      </section>

      <Divider />

      {/* ── PROGRAM ── */}
      {invitation.show_program !== false && invitation.timeline.length > 0 && (
        <section style={{ background: `linear-gradient(180deg, transparent, rgba(232,220,196,.45) 30%, rgba(232,220,196,.45) 70%, transparent)`, padding: 'clamp(64px,9vw,100px) 24px' }}>
          <AnimateSection as="div" style={{ maxWidth: 840, margin: '0 auto' }}>
            <SectionHead eyebrow={labels.program} title="Program dneva" />

            {/* framed card */}
            <div style={{ background: C.paper, border: `1px solid ${C.lineSoft}`, padding: 'clamp(24px,4vw,48px)', boxShadow: C.shadow, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 12, border: `1px solid ${C.lineSoft}`, pointerEvents: 'none' }} aria-hidden="true" />

              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div style={{ fontFamily: serif, fontSize: 10, letterSpacing: '.30em', textTransform: 'uppercase', color: C.sage3 }}>
                  {formatDate(invitation.wedding_date, 'd. MMMM yyyy')}
                </div>
                <h3 style={{ fontFamily: display, fontSize: 38, fontWeight: 400, marginTop: 8, color: C.ink }}>
                  Poročni dan
                </h3>
                <div style={{ fontFamily: script, color: C.terra, fontSize: 26, marginTop: 4 }}>
                  {invitation.partner1_name} &amp; {invitation.partner2_name}
                </div>
              </div>

              {invitation.timeline.map((event, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '90px 44px 1fr',
                  alignItems: 'center', gap: 'clamp(12px,2vw,20px)',
                  padding: 'clamp(14px,2vw,20px) 4px',
                  borderTop: i > 0 ? `1px solid ${C.lineSoft}` : 'none',
                }}>
                  <div style={{ fontFamily: display, fontSize: 'clamp(20px,3vw,26px)', color: C.ink, textAlign: 'right' }}>
                    {event.time}
                  </div>
                  <div style={{ width: 40, height: 40, border: `1px solid ${C.line}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, margin: '0 auto' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.sage3 }} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: display, fontSize: 20, fontWeight: 400, marginBottom: 2, color: C.ink }}>{event.title}</h4>
                    {event.description && <p style={{ fontFamily: serif, color: C.ink2, fontSize: 15, lineHeight: 1.5 }}>{event.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </AnimateSection>
        </section>
      )}

      <Divider />

      {/* ── VENUE ── */}
      {invitation.venue_name && (
        <AnimateSection style={{ padding: 'clamp(64px,9vw,100px) 24px', background: C.paper }}>
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <SectionHead eyebrow={labels.venue} title={invitation.venue_name} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(28px,5vw,48px)', alignItems: 'center' }}>
              {/* illustrated venue art */}
              <div style={{ background: 'linear-gradient(180deg, #ede2c8, #ddd0b0)', aspectRatio: '4/3', borderRadius: 2, boxShadow: C.shadow, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 400 300" fill="none" width="90%" height="90%" aria-hidden="true">
                  <defs>
                    <linearGradient id="toscana-sky" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c8d8c0" stopOpacity=".6"/>
                      <stop offset="100%" stopColor="#e0d4b4" stopOpacity=".1"/>
                    </linearGradient>
                  </defs>
                  <rect width="400" height="300" fill="url(#toscana-sky)"/>
                  <ellipse cx="200" cy="295" rx="260" ry="70" fill={C.sage2} fillOpacity=".3"/>
                  <ellipse cx="70" cy="270" rx="110" ry="45" fill={C.sage} fillOpacity=".2"/>
                  {/* chapel */}
                  <rect x="168" y="172" width="64" height="76" fill={C.paper2} stroke={C.line} strokeWidth="1"/>
                  <polygon points="168,172 200,144 232,172" fill={C.paper3} stroke={C.line} strokeWidth="1"/>
                  <rect x="188" y="214" width="24" height="34" fill={C.paper3} stroke={C.line} strokeWidth=".8"/>
                  <rect x="174" y="185" width="16" height="20" fill={C.paper} stroke={C.line} strokeWidth=".8"/>
                  <rect x="210" y="185" width="16" height="20" fill={C.paper} stroke={C.line} strokeWidth=".8"/>
                  <line x1="200" y1="144" x2="200" y2="134" stroke={C.line} strokeWidth="1"/>
                  <circle cx="200" cy="131" r="3.5" fill={C.terra} stroke="none"/>
                  {/* trees */}
                  <ellipse cx="132" cy="205" rx="18" ry="30" fill={C.sage} fillOpacity=".55"/>
                  <line x1="132" y1="235" x2="132" y2="250" stroke={C.sage3} strokeWidth="1.5"/>
                  <ellipse cx="268" cy="202" rx="16" ry="28" fill={C.sage} fillOpacity=".55"/>
                  <line x1="268" y1="230" x2="268" y2="250" stroke={C.sage3} strokeWidth="1.5"/>
                  <ellipse cx="152" cy="215" rx="12" ry="22" fill={C.sage2} fillOpacity=".45"/>
                  <ellipse cx="252" cy="213" rx="12" ry="22" fill={C.sage2} fillOpacity=".45"/>
                </svg>
                <div style={{ position: 'absolute', top: 12, left: 12, fontFamily: serif, fontSize: 9.5, letterSpacing: '.28em', textTransform: 'uppercase', color: C.ink, opacity: .7, background: 'rgba(244,237,224,.75)', padding: '5px 10px', border: `1px solid ${C.lineSoft}` }}>
                  {invitation.venue_name}
                </div>
              </div>

              {/* venue details */}
              <div>
                <h3 style={{ fontFamily: display, fontSize: 36, fontWeight: 400, lineHeight: 1.05, marginBottom: 6, color: C.ink }}>{invitation.venue_name}</h3>
                {invitation.venue_address && (
                  <div style={{ fontFamily: script, color: C.terra, fontSize: 22, marginBottom: 14 }}>{invitation.venue_address}</div>
                )}
                {invitation.ceremony_time && (
                  <p style={{ fontFamily: serif, color: C.ink2, marginBottom: 8, fontSize: 16, lineHeight: 1.6 }}>
                    {labels.ceremony}: {formatTime(invitation.ceremony_time)}
                  </p>
                )}
                {invitation.reception_time && (
                  <p style={{ fontFamily: serif, color: C.ink2, marginBottom: 8, fontSize: 16, lineHeight: 1.6 }}>
                    {labels.reception}: {formatTime(invitation.reception_time)}
                  </p>
                )}
                {invitation.venue_address && (
                  <div style={{ borderTop: `1px solid ${C.lineSoft}`, borderBottom: `1px solid ${C.lineSoft}`, padding: '16px 0', margin: '18px 0' }}>
                    <p style={{ fontFamily: serif, color: C.muted, fontSize: 15, lineHeight: 1.6 }}>{invitation.venue_address}</p>
                  </div>
                )}
                {invitation.venue_lat && invitation.venue_lng && (
                  <a
                    href={`https://www.google.com/maps?q=${invitation.venue_lat},${invitation.venue_lng}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 20px', border: `1px solid ${C.ink}`, background: 'transparent', color: C.ink, fontFamily: serif, fontSize: 10.5, letterSpacing: '.28em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2, transition: 'all .25s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.ink; el.style.color = C.paper }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = C.ink }}
                  >
                    {labels.google_maps} →
                  </a>
                )}
              </div>
            </div>
          </div>
        </AnimateSection>
      )}

      {/* ── SHARED SECTIONS (story, gallery, transport, accommodation, gifts, FAQ, etc.) ── */}
      <SharedSections invitation={invitation} theme={theme} labels={labels} />

      <Divider />

      {/* ── RSVP ── */}
      {invitation.rsvp_mode !== 'contact' && (
        <section id="rsvp" style={{ padding: 'clamp(64px,9vw,100px) 24px', background: C.paper2 }}>
          <AnimateSection as="div" style={{ maxWidth: 780, margin: '0 auto' }}>
            <SectionHead eyebrow="RSVP" title={labels.rsvp_title} />

            <div style={{ background: C.paper, border: `1px solid ${C.line}`, padding: 'clamp(24px,4vw,48px)', boxShadow: C.shadow, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 12, border: `1px solid ${C.lineSoft}`, pointerEvents: 'none' }} aria-hidden="true" />
              {invitation.rsvp_deadline && (
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontFamily: serif, fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: C.muted, borderBottom: `1px solid ${C.lineSoft}`, paddingBottom: 16, marginBottom: 28 }}>
                  <span>{labels.rsvp_deadline_prefix}</span>
                  <strong style={{ color: C.terra }}>{formatDate(invitation.rsvp_deadline!)}</strong>
                </div>
              )}
              <RSVPForm
                invitationId={invitation.id}
                packageType={invitation.package}
                existingRSVP={existingRSVP}
                accentColor={C.terra}
                bgColor={C.paper}
                textColor={C.ink}
                labels={labels}
              />
            </div>
          </AnimateSection>
        </section>
      )}

      {/* direct contact card */}
      {(invitation.rsvp_mode === 'contact' || invitation.rsvp_mode === 'both') && (
        <section style={{ padding: 'clamp(48px,7vw,80px) 24px', background: C.paper }}>
          <AnimateSection as="div" style={{ maxWidth: 600, margin: '0 auto' }}>
            <DirectContactCard invitation={invitation} theme={theme} labels={labels} />
          </AnimateSection>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ textAlign: 'center', padding: 'clamp(64px,10vw,100px) 24px 52px', background: `linear-gradient(180deg, transparent, rgba(232,220,196,.55) 30%)`, position: 'relative', overflow: 'hidden' }}>
        <AnimateSection as="div">
          <div style={{ fontFamily: script, fontSize: 'clamp(56px,10vw,140px)', lineHeight: 1, color: C.terra, transform: 'rotate(-2deg)', display: 'inline-block' }}>
            {invitation.partner1_name} &amp; {invitation.partner2_name}
          </div>
          {invitation.show_hashtag !== false && invitation.hashtag && (
            <div style={{ marginTop: 24, fontFamily: display, fontSize: 20, letterSpacing: '.12em', color: C.ink }}>
              <span style={{ color: C.sage3 }}>#</span>{invitation.hashtag}
            </div>
          )}
          <Divider />
          <p style={{ fontFamily: serif, fontSize: 9.5, letterSpacing: '.28em', textTransform: 'uppercase', color: C.muted, marginTop: 14 }}>
            {formatDate(invitation.wedding_date, 'd. MMMM yyyy')}
          </p>
        </AnimateSection>
      </footer>

    </div>
  )
}
