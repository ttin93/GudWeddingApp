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
  black: '#0A0908', black2: '#141210',
  gold: '#D4AF37', goldSoft: '#E8CC72', goldDeep: '#A8862A',
  cream: '#F4ECD8', rule: '#3a3329',
}

const THEME: SectionTheme = {
  bg: C.black, bgAlt: C.black2, text: C.cream, muted: 'rgba(244,236,216,0.6)',
  accent: C.gold, rule: C.rule, card: C.black2,
}


const limelight = 'var(--font-limelight), "Limelight", cursive'
const cinzel = 'var(--font-cinzel), "Cinzel", serif'
const cormorant = 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif'

function DecoRule() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '24px 0' }}>
      <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, transparent, ${C.gold})` }} />
      <div style={{ width: 6, height: 6, background: C.gold, transform: 'rotate(45deg)' }} />
      <div style={{ width: 4, height: 4, background: C.goldSoft, transform: 'rotate(45deg)' }} />
      <div style={{ width: 6, height: 6, background: C.gold, transform: 'rotate(45deg)' }} />
      <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
    </div>
  )
}

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function GatsbyTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const labels = getEffectiveLabels(invitation)
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const year = new Date(invitation.wedding_date).getFullYear()

  return (
    <div style={{ background: C.black, color: C.cream, fontFamily: cormorant, overflowX: 'hidden' }}>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Corner brackets */}
        {(['tl','tr','bl','br'] as const).map(pos => (
          <div key={pos} style={{ position: 'absolute', width: 60, height: 60, [pos[0] === 't' ? 'top' : 'bottom']: 24, [pos[1] === 'l' ? 'left' : 'right']: 24, borderTop: pos[0] === 't' ? `1px solid ${C.gold}` : 'none', borderBottom: pos[0] === 'b' ? `1px solid ${C.gold}` : 'none', borderLeft: pos[1] === 'l' ? `1px solid ${C.gold}` : 'none', borderRight: pos[1] === 'r' ? `1px solid ${C.gold}` : 'none' }} />
        ))}

        {/* Sun ornament */}
        <motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ marginBottom: 40 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="14" stroke={C.gold} strokeWidth="1"/>
            <circle cx="40" cy="40" r="18" stroke={C.gold} strokeWidth="0.4" opacity="0.5"/>
            {Array.from({length:16},(_,i) => {
              const a = (i * 360/16) * Math.PI/180
              const r1 = 22, r2 = i%2===0 ? 32 : 28
              return <line key={i} x1={40+r1*Math.cos(a)} y1={40+r1*Math.sin(a)} x2={40+r2*Math.cos(a)} y2={40+r2*Math.sin(a)} stroke={C.gold} strokeWidth={i%2===0 ? 1 : 0.5} opacity={i%2===0 ? 1 : 0.5}/>
            })}
          </svg>
        </motion.div>

        <motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
          style={{ position: 'relative', maxWidth: 720, width: '100%', border: `1px solid ${C.gold}`, padding: '60px 52px' }}>
          {/* Inner frame */}
          <div style={{ position: 'absolute', inset: 8, border: `1px solid ${C.gold}`, opacity: 0.3, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 14, border: `1px solid ${C.gold}`, opacity: 0.12, pointerEvents: 'none' }} />

          <div style={{ fontFamily: cinzel, fontSize: '0.6rem', letterSpacing: '0.6em', color: C.gold, textTransform: 'uppercase', marginBottom: 28 }}>
            {labels.together_with_families}
          </div>

          <h1 style={{ fontFamily: limelight, fontSize: 'clamp(48px,8vw,100px)', letterSpacing: '0.04em', lineHeight: 1, color: C.cream }}>
            {invitation.partner1_name}
            <span style={{ display: 'block', fontFamily: cormorant, fontStyle: 'italic', color: C.gold, fontSize: '0.45em', margin: '8px 0', fontWeight: 300 }}>&amp;</span>
            {invitation.partner2_name}
          </h1>

          <DecoRule />

          <div style={{ fontFamily: cinzel, fontSize: '0.8rem', letterSpacing: '0.4em', color: C.gold, textTransform: 'uppercase' }}>
            {formatDate(invitation.wedding_date, 'EEEE · d · MMMM · yyyy')}
          </div>
          {invitation.venue_name && (
            <div style={{ marginTop: 12, fontFamily: cormorant, fontStyle: 'italic', fontSize: 20, color: 'rgba(244,236,216,0.6)' }}>
              {invitation.venue_name}
            </div>
          )}

          {invitation.show_countdown && daysLeft > 0 && (
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 32 }}>
              {[{ n: daysLeft, l: labels.days }, { n: Math.max(0, Math.floor((new Date(invitation.wedding_date).getTime() - Date.now()) / 36e5) % 24), l: labels.hours }].map(({ n, l }, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '16px 24px', background: `linear-gradient(160deg, #1a1610, ${C.black2})`, border: `1px solid ${C.rule}`, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -4, left: -4, width: 8, height: 8, background: C.gold, transform: 'rotate(45deg)' }} />
                  <div style={{ position: 'absolute', bottom: -4, right: -4, width: 8, height: 8, background: C.gold, transform: 'rotate(45deg)' }} />
                  <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 48, color: C.gold, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: cinzel, fontSize: 8, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(244,236,216,0.5)', marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      {/* QUOTE */}
      {invitation.personal_message && (
        <section style={{ padding: '100px 40px', textAlign: 'center', background: C.black2, borderTop: `1px solid ${C.rule}` }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ fontFamily: cormorant, fontSize: 80, lineHeight: 0.5, color: C.gold, opacity: 0.4, marginBottom: 36 }}>&ldquo;</div>
            <p style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 'clamp(24px,3vw,36px)', lineHeight: 1.5, color: C.cream }}>{invitation.personal_message}</p>
          </div>
        </section>
      )}

      {/* TIMELINE */}
      {invitation.timeline?.length > 0 && (
        <section style={{ padding: '100px 40px', borderTop: `1px solid ${C.rule}` }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontFamily: cinzel, fontSize: '0.55rem', letterSpacing: '0.6em', color: C.gold, textTransform: 'uppercase', marginBottom: 12 }}>{labels.program}</div>
              <h2 style={{ fontFamily: limelight, fontSize: 40, color: C.cream, letterSpacing: '0.04em' }}>{labels.program}</h2>
              <DecoRule />
            </div>
            {invitation.timeline.map((ev, i) => (
              <motion.div key={i} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ display: 'grid', gridTemplateColumns: '80px 20px 1fr', gap: '0 24px', padding: '20px 0', borderBottom: `1px solid ${C.rule}`, alignItems: 'start' }}>
                <div style={{ fontFamily: cinzel, fontSize: 11, letterSpacing: '0.15em', color: C.gold, paddingTop: 4 }}>{ev.time}</div>
                <div style={{ width: 8, height: 8, border: `1px solid ${C.gold}`, transform: 'rotate(45deg)', marginTop: 6, background: C.black, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: cormorant, fontSize: 22, color: C.cream, marginBottom: 4 }}>{ev.title}</div>
                  {ev.description && <div style={{ fontFamily: cinzel, fontSize: 10, color: 'rgba(244,236,216,0.5)', letterSpacing: '0.1em', lineHeight: 1.6 }}>{ev.description}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* VENUE */}
      {(invitation.venue_name || invitation.venue_address) && (
        <section style={{ padding: '100px 40px', background: C.black2, borderTop: `1px solid ${C.rule}` }}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: cinzel, fontSize: '0.55rem', letterSpacing: '0.6em', color: C.gold, textTransform: 'uppercase', marginBottom: 12 }}>{labels.venue}</div>
            <h3 style={{ fontFamily: limelight, fontSize: 36, color: C.gold, letterSpacing: '0.04em', marginBottom: 8 }}>{invitation.venue_name}</h3>
            <DecoRule />
            {invitation.venue_address && <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 20, color: 'rgba(244,236,216,0.7)', marginBottom: 32 }}>{invitation.venue_address}</div>}
            {(invitation.ceremony_time || invitation.reception_time) && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 48 }}>
                {invitation.ceremony_time && <div><div style={{ fontFamily: cinzel, fontSize: 8, letterSpacing: '0.4em', color: 'rgba(244,236,216,0.4)', textTransform: 'uppercase' }}>{labels.ceremony}</div><div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 32, color: C.gold }}>{formatTime(invitation.ceremony_time)}</div></div>}
                {invitation.reception_time && <div><div style={{ fontFamily: cinzel, fontSize: 8, letterSpacing: '0.4em', color: 'rgba(244,236,216,0.4)', textTransform: 'uppercase' }}>{labels.reception}</div><div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 32, color: C.gold }}>{formatTime(invitation.reception_time)}</div></div>}
              </div>
            )}
          </div>
        </section>
      )}

      <SharedSections invitation={invitation} theme={THEME} labels={labels} />

      {/* RSVP */}
      <section style={{ padding: '100px 40px', borderTop: `4px solid ${C.gold}` }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: cinzel, fontSize: '0.55rem', letterSpacing: '0.6em', color: C.gold, textTransform: 'uppercase', marginBottom: 12 }}>{labels.rsvp_title}</div>
          <h2 style={{ fontFamily: limelight, fontSize: 44, color: C.cream, letterSpacing: '0.04em', marginBottom: 12 }}>{labels.rsvp_title}</h2>
          <DecoRule />
          {invitation.rsvp_deadline && <p style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 18, color: 'rgba(244,236,216,0.5)', marginBottom: 48 }}>{labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}</p>}
          <div style={{ textAlign: 'left' }}>
            {invitation.rsvp_mode !== 'contact' && (
              <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.gold} bgColor={C.black} textColor={C.cream} mutedColor='rgba(244,236,216,0.5)' labels={labels} />
            )}
            {(invitation.rsvp_mode === 'contact' || invitation.rsvp_mode === 'both') && (
              <div style={{ marginTop: invitation.rsvp_mode === 'both' ? 32 : 0 }}>
                <DirectContactCard invitation={invitation} theme={THEME} labels={labels} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 40px', textAlign: 'center', borderTop: `1px solid ${C.rule}`, background: C.black2 }}>
        <div style={{ fontFamily: limelight, fontSize: 32, color: C.gold, letterSpacing: '0.04em', marginBottom: 12 }}>{invitation.partner1_name} &amp; {invitation.partner2_name}</div>
        <div style={{ fontFamily: cinzel, fontSize: 9, letterSpacing: '0.5em', color: 'rgba(244,236,216,0.3)', textTransform: 'uppercase' }}>{year} · {labels.footer_tagline}</div>
      </footer>
    </div>
  )
}
