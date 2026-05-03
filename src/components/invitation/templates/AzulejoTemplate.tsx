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
  bg: '#FDF8F0', bg2: '#F5EBD9',
  azul: '#1E4D8B', azulDeep: '#102E5C', azulSoft: '#5A82B8',
  terra: '#C5644E', gold: '#D9A441',
  ink: '#0F2440', ink2: '#3a4a64', mute: '#8a96a8',
}

const THEME: SectionTheme = {
  bg: C.bg, bgAlt: C.bg2, text: C.ink, muted: C.ink2,
  accent: C.azul, rule: '#D0C4B0', card: C.bg2,
}

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

const dmSerif = 'var(--font-dm-serif), "DM Serif Display", Georgia, serif'
const cormorant = 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif'
const sans = 'var(--font-instrument), "Work Sans", sans-serif'

// Tile pattern SVG
function TilePattern({ size = 40 }: { size?: number }) {
  return (
    <svg width={size * 3} height={size * 3} viewBox={`0 0 ${size * 3} ${size * 3}`} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => {
          const x = col * size, y = row * size, s = size
          return (
            <g key={`${row}-${col}`}>
              <rect x={x} y={y} width={s} height={s} fill={C.azul} stroke={C.bg2} strokeWidth="1"/>
              <polygon points={`${x + s/2},${y + 4} ${x + s - 4},${y + s/2} ${x + s/2},${y + s - 4} ${x + 4},${y + s/2}`} fill="none" stroke={C.gold} strokeWidth="0.8" opacity="0.6"/>
              <circle cx={x + s/2} cy={y + s/2} r={s/8} fill={C.gold} opacity="0.5"/>
            </g>
          )
        })
      )}
    </svg>
  )
}

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function AzulejoTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const labels = getEffectiveLabels(invitation)
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const year = new Date(invitation.wedding_date).getFullYear()

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: sans, fontWeight: 300, overflowX: 'hidden' }}>

      {/* NAV */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', background: C.azulDeep, color: '#fff' }}>
        <div style={{ fontFamily: dmSerif, fontStyle: 'italic', fontSize: 22, color: '#fff', opacity: 0.9 }}>{invitation.partner1_name} &amp; {invitation.partner2_name}</div>
        <div style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{formatDate(invitation.wedding_date, 'd · MM · yyyy')}</div>
      </header>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 48px', overflow: 'hidden', background: C.bg }}>
        {/* Tile borders left/right */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, overflow: 'hidden', opacity: 0.85 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
            {Array.from({ length: 12 }, (_, i) => <TilePattern key={i} size={28} />)}
          </div>
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, overflow: 'hidden', opacity: 0.85 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
            {Array.from({ length: 12 }, (_, i) => <TilePattern key={i} size={28} />)}
          </div>
        </div>

        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 1 }}
          style={{ background: '#fff', border: `2px solid ${C.ink}`, boxShadow: `8px 8px 0 ${C.azul}`, padding: '60px 52px', textAlign: 'center', maxWidth: 680, width: '100%', position: 'relative' }}>
          {/* Diamonds at corners */}
          {(['tl','tr','bl','br'] as const).map(pos => (
            <div key={pos} style={{ position: 'absolute', width: 10, height: 10, background: C.gold, transform: 'rotate(45deg)', [pos[0]==='t'?'top':'bottom']: -5, [pos[1]==='l'?'left':'right']: -5 }} />
          ))}

          <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.mute, marginBottom: 28 }}>{labels.together_with_families}</div>

          <h1 style={{ fontFamily: dmSerif, fontStyle: 'italic', fontSize: 'clamp(56px,8vw,110px)', lineHeight: 0.95, color: C.ink, letterSpacing: '-0.01em' }}>
            {invitation.partner1_name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '16px 0' }}>
            <div style={{ height: 2, flex: 1, background: C.terra }} />
            <div style={{ width: 8, height: 8, background: C.gold, transform: 'rotate(45deg)' }} />
            <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 32, color: C.terra }}>&amp;</div>
            <div style={{ width: 8, height: 8, background: C.gold, transform: 'rotate(45deg)' }} />
            <div style={{ height: 2, flex: 1, background: C.terra }} />
          </div>
          <h1 style={{ fontFamily: dmSerif, fontStyle: 'italic', fontSize: 'clamp(56px,8vw,110px)', lineHeight: 0.95, color: C.ink, letterSpacing: '-0.01em' }}>
            {invitation.partner2_name}
          </h1>

          <div style={{ marginTop: 36, display: 'inline-block', background: C.azulDeep, color: '#fff', padding: '10px 28px', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase' }}>
            {formatDate(invitation.wedding_date, 'EEEE · d. MMMM yyyy')}
          </div>

          {invitation.venue_name && (
            <div style={{ marginTop: 16, fontFamily: cormorant, fontStyle: 'italic', fontSize: 20, color: C.ink2 }}>
              {invitation.venue_name}
            </div>
          )}

          {invitation.show_countdown && daysLeft > 0 && (
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 12 }}>
              <div style={{ padding: '12px 20px', border: `1px solid ${C.azulSoft}` }}>
                <div style={{ fontFamily: dmSerif, fontStyle: 'italic', fontSize: 36, color: C.azul, lineHeight: 1 }}>{daysLeft}</div>
                <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.mute, marginTop: 4 }}>{labels.days}</div>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* TIMELINE */}
      {invitation.timeline?.length > 0 && (
        <section style={{ padding: '100px 48px', background: C.bg2, borderTop: `3px solid ${C.azulDeep}` }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, background: C.gold, transform: 'rotate(45deg)' }} />
                <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.azul }}>{labels.program}</div>
                <div style={{ width: 8, height: 8, background: C.gold, transform: 'rotate(45deg)' }} />
              </div>
              <h2 style={{ fontFamily: dmSerif, fontStyle: 'italic', fontSize: 52, color: C.ink }}>{labels.program}</h2>
            </div>
            {invitation.timeline.map((ev, i) => (
              <motion.div key={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ display: 'grid', gridTemplateColumns: '80px 16px 1fr', gap: '0 24px', padding: '24px 0', borderBottom: `1px solid rgba(30,77,139,0.15)`, alignItems: 'start' }}>
                <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 20, color: C.terra }}>{ev.time}</div>
                <div style={{ width: 8, height: 8, background: C.azul, transform: 'rotate(45deg)', marginTop: 8 }} />
                <div>
                  <div style={{ fontFamily: dmSerif, fontSize: 22, color: C.ink }}>{ev.title}</div>
                  {ev.description && <div style={{ fontSize: 13, color: C.mute, marginTop: 4, lineHeight: 1.6 }}>{ev.description}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* VENUE */}
      {(invitation.venue_name || invitation.venue_address) && (
        <section style={{ padding: '100px 48px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.mute, marginBottom: 16 }}>{labels.venue}</div>
              <h3 style={{ fontFamily: dmSerif, fontStyle: 'italic', fontSize: 52, color: C.ink, marginBottom: 20, lineHeight: 1.1 }}>{invitation.venue_name}</h3>
              {invitation.venue_address && (
                <div style={{ borderLeft: `3px solid ${C.terra}`, paddingLeft: 20, marginBottom: 24 }}>
                  <div style={{ fontFamily: sans, fontSize: 14, color: C.ink2, lineHeight: 1.8 }}>{invitation.venue_address}</div>
                </div>
              )}
              {(invitation.ceremony_time || invitation.reception_time) && (
                <div style={{ display: 'flex', gap: 32, marginBottom: 28 }}>
                  {invitation.ceremony_time && <div><div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.3em', color: C.mute }}>{labels.ceremony}</div><div style={{ fontFamily: dmSerif, fontStyle: 'italic', fontSize: 28, color: C.azul }}>{formatTime(invitation.ceremony_time)}</div></div>}
                  {invitation.reception_time && <div><div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.3em', color: C.mute }}>{labels.reception}</div><div style={{ fontFamily: dmSerif, fontStyle: 'italic', fontSize: 28, color: C.azul }}>{formatTime(invitation.reception_time)}</div></div>}
                </div>
              )}
              {invitation.venue_address && (
                <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', padding: '14px 28px', background: C.azulDeep, color: '#fff', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: `4px 4px 0 ${C.terra}` }}>
                  {labels.google_maps}
                </a>
              )}
            </div>
            {/* Map card */}
            <div style={{ aspectRatio: '5/4', background: C.bg2, border: `2px solid ${C.ink}`, position: 'relative', overflow: 'hidden', boxShadow: `6px 6px 0 ${C.azul}` }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(30,77,139,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,77,139,0.1) 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <div style={{ width: 14, height: 14, background: C.terra, borderRadius: '50%', boxShadow: `0 0 0 6px rgba(197,100,78,0.25), 0 0 0 12px rgba(197,100,78,0.12)` }} />
              </div>
              <div style={{ position: 'absolute', bottom: 16, left: 16, background: C.azulDeep, color: '#fff', padding: '8px 14px', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{invitation.venue_name}</div>
            </div>
          </div>
        </section>
      )}

      {/* QUOTE */}
      {invitation.personal_message && (
        <section style={{ padding: '80px 48px', background: C.azulDeep, textAlign: 'center' }}>
          <p style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 'clamp(22px,3vw,36px)', lineHeight: 1.55, color: 'rgba(255,255,255,0.85)', maxWidth: 760, margin: '0 auto' }}>
            &ldquo;{invitation.personal_message}&rdquo;
          </p>
        </section>
      )}

      <SharedSections invitation={invitation} theme={THEME} labels={labels} />

      {/* RSVP */}
      <section style={{ padding: '100px 48px', background: C.azulDeep, borderTop: `4px solid ${C.gold}` }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>{labels.rsvp_title}</div>
          <h2 style={{ fontFamily: dmSerif, fontStyle: 'italic', fontSize: 52, color: '#fff', marginBottom: 12 }}>{labels.rsvp_title}</h2>
          {invitation.rsvp_deadline && <p style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 56 }}>{labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}</p>}
          <div style={{ textAlign: 'left' }}>
            {invitation.rsvp_mode !== 'contact' && (
              <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.gold} bgColor={C.azulDeep} textColor='#fff' mutedColor='rgba(255,255,255,0.5)' labels={labels} />
            )}
            {(invitation.rsvp_mode === 'contact' || invitation.rsvp_mode === 'both') && (
              <div style={{ marginTop: invitation.rsvp_mode === 'both' ? 32 : 0 }}>
                <DirectContactCard invitation={invitation} theme={{ bg: C.azulDeep, bgAlt: C.azulDeep, card: 'rgba(255,255,255,0.08)', text: '#fff', muted: 'rgba(255,255,255,0.5)', accent: C.gold, rule: 'rgba(255,255,255,0.15)' }} labels={labels} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '40px 48px', background: C.azulDeep, borderTop: `1px solid rgba(255,255,255,0.1)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: dmSerif, fontStyle: 'italic', fontSize: 24, color: C.gold }}>{invitation.partner1_name} &amp; {invitation.partner2_name}</div>
        <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{year} · {labels.footer_tagline}</div>
        {invitation.venue_name && <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{invitation.venue_name}</div>}
      </footer>
    </div>
  )
}
