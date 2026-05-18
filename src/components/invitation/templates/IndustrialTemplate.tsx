'use client'

import { motion } from 'framer-motion'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import { RSVPForm } from '../RSVPForm'
import type { Invitation, RSVPResponse } from '@/types'
import { SharedSections, DirectContactCard, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'

export interface RSVPFormData {
  guest_name: string; email?: string; attending: boolean
  adults: number; children: number
  menu_choice?: 'meat' | 'fish' | 'vegetarian' | 'vegan'
  allergies?: string; message?: string
}

const C = {
  bg: '#1A1A17', bg2: '#23231F',
  paper: '#E8E5DC', paperSoft: '#D4D0C5',
  olive: '#5C6B3A', oliveSoft: '#8A9B5E',
  rust: '#A8542B', concrete: '#4a4a45', rule: '#33332E',
}

const THEME: SectionTheme = {
  bg: C.bg2, bgAlt: C.bg, text: C.paper, muted: C.paperSoft,
  accent: C.olive, rule: C.rule, card: C.bg,
}


const archivo = 'var(--font-archivo), "Archivo Black", sans-serif'
const garamond = 'var(--font-eb-garamond), "EB Garamond", Georgia, serif'
const sans = 'var(--font-instrument), "Archivo", sans-serif'

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function IndustrialTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const labels = getEffectiveLabels(invitation)
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const year = new Date(invitation.wedding_date).getFullYear()

  return (
    <div style={{ background: C.bg, color: C.paper, fontFamily: sans, overflowX: 'hidden', position: 'relative' }}>
      {/* Grain overlay */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100, opacity: 0.12, backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>")`, backgroundSize: '200px 200px' }} />

      {/* HERO — split layout */}
      <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'grid', gridTemplateColumns: '7fr 5fr', borderBottom: `1px solid ${C.rule}` }}>
        {/* Left */}
        <motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          style={{ padding: '80px 64px', borderRight: `1px solid ${C.rule}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', gap: 40, marginBottom: 60, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.concrete }}>
              <span>Vol. I</span>
              <span>{year}</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.oliveSoft, marginBottom: 12 }}>{labels.together_with_families}</div>
              <h1 style={{ fontFamily: archivo, fontSize: 'clamp(72px,10vw,144px)', fontWeight: 400, lineHeight: 0.88, color: C.paper, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
                {invitation.partner1_name}
                <span style={{ display: 'block', color: C.rust, fontFamily: garamond, fontStyle: 'italic', fontWeight: 400, fontSize: '0.55em', textTransform: 'none', letterSpacing: '0.05em', margin: '8px 0' }}>&amp;</span>
                {invitation.partner2_name}
              </h1>
            </div>
          </div>
          <div>
            <div style={{ height: 1, background: C.rule, marginBottom: 32 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {[{ label: 'Date', value: formatDate(invitation.wedding_date, 'd. MMMM yyyy') }, { label: labels.venue, value: invitation.venue_name ?? '—' }].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.oliveSoft, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: garamond, fontStyle: 'italic', fontSize: 20, color: C.paper, lineHeight: 1.3 }}>{value}</div>
                </div>
              ))}
            </div>
            {(invitation.ceremony_time || invitation.reception_time) && (
              <div style={{ marginTop: 24, display: 'flex', gap: 32 }}>
                {invitation.ceremony_time && <div><div style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.oliveSoft, marginBottom: 6 }}>{labels.ceremony}</div><div style={{ fontFamily: garamond, fontStyle: 'italic', fontSize: 24, color: C.rust }}>{formatTime(invitation.ceremony_time)}</div></div>}
                {invitation.reception_time && <div><div style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.oliveSoft, marginBottom: 6 }}>{labels.reception}</div><div style={{ fontFamily: garamond, fontStyle: 'italic', fontSize: 24, color: C.rust }}>{formatTime(invitation.reception_time)}</div></div>}
              </div>
            )}
          </div>
        </motion.div>

        {/* Right — olive branch SVG */}
        <motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '60px 40px', background: C.bg2 }}>
          <div aria-hidden style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', fontFamily: archivo, fontSize: 'clamp(100px,18vw,240px)', color: C.rule, lineHeight: 1, userSelect: 'none', pointerEvents: 'none', fontWeight: 400 }}>
            {year}
          </div>
          <svg viewBox="0 0 200 360" width="70%" style={{ position: 'relative', zIndex: 2 }} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trunk */}
            <path d="M100,350 Q95,280 105,200 Q100,150 100,60" stroke={C.oliveSoft} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
            {/* Branches + leaves */}
            <path d="M100,200 Q70,185 50,160" stroke={C.oliveSoft} strokeWidth="1.5" strokeLinecap="round"/>
            <ellipse cx="55" cy="155" rx="20" ry="7" transform="rotate(-35 55 155)" fill={C.olive} opacity="0.7"/>
            <path d="M100,240 Q130,225 155,200" stroke={C.oliveSoft} strokeWidth="1.5" strokeLinecap="round"/>
            <ellipse cx="152" cy="196" rx="20" ry="7" transform="rotate(30 152 196)" fill={C.olive} opacity="0.7"/>
            <path d="M100,280 Q72,265 52,245" stroke={C.oliveSoft} strokeWidth="1.5" strokeLinecap="round"/>
            <ellipse cx="50" cy="242" rx="18" ry="6" transform="rotate(-25 50 242)" fill={C.olive} opacity="0.65"/>
            <path d="M100,300 Q128,288 148,272" stroke={C.oliveSoft} strokeWidth="1.5" strokeLinecap="round"/>
            <ellipse cx="145" cy="270" rx="18" ry="6" transform="rotate(20 145 270)" fill={C.olive} opacity="0.65"/>
            <path d="M100,160 Q75,140 58,115" stroke={C.oliveSoft} strokeWidth="1.2" strokeLinecap="round"/>
            <ellipse cx="56" cy="112" rx="16" ry="5" transform="rotate(-40 56 112)" fill={C.olive} opacity="0.6"/>
            <path d="M100,140 Q125,122 144,100" stroke={C.oliveSoft} strokeWidth="1.2" strokeLinecap="round"/>
            <ellipse cx="142" cy="97" rx="16" ry="5" transform="rotate(35 142 97)" fill={C.olive} opacity="0.6"/>
            {/* Berries */}
            <circle cx="50" cy="157" r="4" fill={C.rust} opacity="0.7"/>
            <circle cx="153" cy="198" r="4" fill={C.rust} opacity="0.7"/>
            <circle cx="52" cy="243" r="3.5" fill={C.rust} opacity="0.6"/>
          </svg>

          {invitation.show_countdown && daysLeft > 0 && (
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginTop: 32, borderTop: `1px solid ${C.rule}`, paddingTop: 24, width: '100%' }}>
              <div style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.oliveSoft, marginBottom: 8 }}>{labels.days}</div>
              <div style={{ fontFamily: archivo, fontSize: 64, color: C.paper, lineHeight: 1 }}>{daysLeft}</div>
            </div>
          )}
        </motion.div>
      </section>

      {/* QUOTE */}
      {invitation.personal_message && (
        <section style={{ position: 'relative', zIndex: 1, padding: '80px 64px', borderBottom: `1px solid ${C.rule}`, background: C.bg2 }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ fontFamily: garamond, fontSize: 72, lineHeight: 0.5, color: C.olive, opacity: 0.4, marginBottom: 32 }}>&ldquo;</div>
            <p style={{ fontFamily: garamond, fontStyle: 'italic', fontSize: 'clamp(22px,2.8vw,34px)', lineHeight: 1.6, color: C.paper }}>{invitation.personal_message}</p>
          </div>
        </section>
      )}

      {/* TIMELINE */}
      {invitation.timeline?.length > 0 && (
        <section style={{ position: 'relative', zIndex: 1, padding: '100px 64px', borderBottom: `1px solid ${C.rule}` }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 64 }}>
              <div style={{ fontFamily: archivo, fontSize: 80, color: C.rule, lineHeight: 1, fontWeight: 400 }}>01</div>
              <h2 style={{ fontFamily: archivo, fontSize: 32, color: C.paper, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{labels.program}</h2>
            </div>
            {invitation.timeline.map((ev, i) => (
              <motion.div key={i} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ display: 'grid', gridTemplateColumns: '80px 1px 1fr', gap: '0 32px', padding: '28px 0', borderBottom: `1px solid ${C.rule}`, alignItems: 'start' }}>
                <div style={{ fontFamily: garamond, fontStyle: 'italic', fontSize: 20, color: C.rust, paddingTop: 2 }}>{ev.time}</div>
                <div style={{ background: C.rule }} />
                <div>
                  <div style={{ fontFamily: archivo, fontSize: 18, color: C.paper, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 4 }}>{ev.title}</div>
                  {ev.description && <div style={{ fontFamily: garamond, fontStyle: 'italic', fontSize: 15, color: C.concrete, lineHeight: 1.6 }}>{ev.description}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* VENUE */}
      {(invitation.venue_name || invitation.venue_address) && (
        <section style={{ position: 'relative', zIndex: 1, padding: '100px 64px', background: C.bg2, borderBottom: `1px solid ${C.rule}` }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
                <div style={{ fontFamily: archivo, fontSize: 56, color: C.rule, lineHeight: 1 }}>02</div>
                <div style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.oliveSoft }}>{labels.venue}</div>
              </div>
              <h3 style={{ fontFamily: garamond, fontStyle: 'italic', fontSize: 44, color: C.paper, fontWeight: 400, marginBottom: 20, lineHeight: 1.1 }}>{invitation.venue_name}</h3>
              {invitation.venue_address && <div style={{ fontFamily: garamond, fontSize: 18, color: C.concrete, lineHeight: 1.7, marginBottom: 32 }}>{invitation.venue_address}</div>}
              {invitation.venue_address && (
                <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 24px', border: `1px solid ${C.olive}`, color: C.oliveSoft, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', textDecoration: 'none' }}>
                  {labels.google_maps} →
                </a>
              )}
            </div>
            <div style={{ aspectRatio: '4/3', background: C.bg, border: `1px solid ${C.rule}`, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.rule} 1px, transparent 1px), linear-gradient(90deg, ${C.rule} 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.6 }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 10, height: 10, background: C.rust, borderRadius: '50%', boxShadow: `0 0 0 8px rgba(168,84,43,0.2)` }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16, fontFamily: sans, fontSize: 9, letterSpacing: '0.3em', color: C.oliveSoft, textTransform: 'uppercase' }}>{invitation.venue_name}</div>
            </div>
          </div>
        </section>
      )}

      <SharedSections invitation={invitation} theme={THEME} labels={labels} />

      {/* RSVP */}
      <section style={{ position: 'relative', zIndex: 1, padding: '100px 64px', background: C.paper }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 16 }}>
            <div style={{ fontFamily: archivo, fontSize: 72, color: C.paperSoft, lineHeight: 1 }}>03</div>
            <h2 style={{ fontFamily: archivo, fontSize: 36, color: C.bg, textTransform: 'uppercase' }}>{labels.rsvp_title}</h2>
          </div>
          <div style={{ height: 2, background: C.rust, marginBottom: 40, width: 80 }} />
          {invitation.rsvp_deadline && <p style={{ fontFamily: garamond, fontStyle: 'italic', fontSize: 18, color: C.concrete, marginBottom: 48 }}>{labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}</p>}
          <div style={{ background: '#fff', padding: '48px 40px', border: `1px solid ${C.paperSoft}` }}>
            {invitation.rsvp_mode !== 'contact' && (
              <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.olive} bgColor="#fff" textColor={C.bg} mutedColor={C.concrete} labels={labels} />
            )}
            {(invitation.rsvp_mode === 'contact' || invitation.rsvp_mode === 'both') && (
              <div style={{ marginTop: invitation.rsvp_mode === 'both' ? 32 : 0 }}>
                <DirectContactCard invitation={invitation} theme={{ bg: '#fff', bgAlt: C.paper, card: C.paper, text: C.bg, muted: C.concrete, accent: C.olive, rule: C.paperSoft }} labels={labels} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: 'relative', zIndex: 1, padding: '48px 64px', background: C.bg, borderTop: `1px solid ${C.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: garamond, fontStyle: 'italic', fontSize: 24, color: C.paper }}>{invitation.partner1_name} &amp; {invitation.partner2_name}</div>
        <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: '0.5em', color: C.rule, textTransform: 'uppercase' }}>{year} · {labels.footer_tagline}</div>
        <div style={{ fontFamily: sans, fontSize: 9, letterSpacing: '0.5em', color: C.rule, textTransform: 'uppercase' }}>❦</div>
      </footer>
    </div>
  )
}
