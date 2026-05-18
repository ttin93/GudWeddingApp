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
  bg: '#FAFAF7', bg2: '#F1EFE8',
  ink: '#1A1A18', ink2: '#4a4a45', mute: '#90908a',
  rule: '#E0DDD2', sage: '#7C8C6F', sageSoft: '#A8B59B',
}

const THEME: SectionTheme = {
  bg: C.bg, bgAlt: C.bg2, text: C.ink, muted: C.mute,
  accent: C.sage, rule: C.rule, card: C.bg2,
}


const fraunces = 'var(--font-fraunces), "Fraunces", Georgia, serif'
const sans = 'var(--font-instrument), "Inter Tight", sans-serif'

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function ScandiTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const labels = getEffectiveLabels(invitation)
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const year = new Date(invitation.wedding_date).getFullYear()

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: sans, overflowX: 'hidden' }}>

      {/* NAV */}
      <header style={{ padding: '40px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${C.rule}` }}>
        <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 20, fontWeight: 300 }}>{invitation.partner1_name} &amp; {invitation.partner2_name}</div>
        <div style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.mute }}>{formatDate(invitation.wedding_date, 'd · MM · yyyy')}</div>
      </header>

      {/* HERO */}
      <section style={{ padding: '120px 64px 160px', textAlign: 'center', position: 'relative' }}>
        <motion.div animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.36em', textTransform: 'uppercase', color: C.mute, marginBottom: 48 }}>{labels.together_with_families}</div>
          <h1 style={{ fontFamily: fraunces, fontSize: 'clamp(72px,12vw,160px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 0.9, color: C.ink }}>
            {invitation.partner1_name}
            <span style={{ fontStyle: 'italic', color: C.sage, fontWeight: 300 }}> &amp; </span>
            {invitation.partner2_name}
          </h1>
          <div style={{ marginTop: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, color: C.mute, fontSize: 13, letterSpacing: '0.2em' }}>
            <div style={{ height: 1, width: 60, background: C.rule }} />
            {formatDate(invitation.wedding_date, 'EEEE, d. MMMM yyyy')}
            <div style={{ height: 1, width: 60, background: C.rule }} />
          </div>
          {invitation.venue_name && (
            <div style={{ marginTop: 16, fontFamily: fraunces, fontStyle: 'italic', fontSize: 22, color: C.ink2, fontWeight: 300 }}>
              {invitation.venue_name}
            </div>
          )}
        </motion.div>
      </section>

      <div style={{ height: 1, background: C.rule }} />

      {/* COUNTDOWN */}
      {invitation.show_countdown && daysLeft > 0 && (
        <section style={{ padding: '100px 64px', background: C.bg2, textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.mute, marginBottom: 56 }}>{labels.save_the_date}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', maxWidth: 600, margin: '0 auto', gap: 0 }}>
            {[{ n: daysLeft, l: labels.days }, { n: Math.max(0, Math.floor((new Date(invitation.wedding_date).getTime() - Date.now()) / 36e5) % 24), l: labels.hours }, { n: Math.max(0, Math.floor((new Date(invitation.wedding_date).getTime() - Date.now()) / 6e4) % 60), l: labels.minutes }].map(({ n, l }, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px 16px', borderLeft: i > 0 ? `1px solid ${C.rule}` : 'none' }}>
                <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 80, lineHeight: 1, color: C.ink, fontWeight: 300 }}>{n}</div>
                <div style={{ marginTop: 12, fontSize: 10, letterSpacing: '0.36em', textTransform: 'uppercase', color: C.mute }}>{l}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div style={{ height: 1, background: C.rule }} />

      {/* QUOTE */}
      {invitation.personal_message && (
        <section style={{ padding: '120px 64px', textAlign: 'center' }}>
          <p style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(24px,3vw,40px)', lineHeight: 1.4, color: C.ink, maxWidth: 800, margin: '0 auto' }}>
            {invitation.personal_message}
          </p>
        </section>
      )}

      {/* TIMELINE */}
      {invitation.timeline?.length > 0 && (
        <>
          <div style={{ height: 1, background: C.rule }} />
          <section style={{ padding: '120px 64px', background: C.bg2 }}>
            <div style={{ maxWidth: 640, margin: '0 auto' }}>
              <div style={{ marginBottom: 64 }}>
                <div style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.mute, marginBottom: 12 }}>{labels.program}</div>
                <h2 style={{ fontFamily: fraunces, fontSize: 52, fontWeight: 300, letterSpacing: '-0.01em', color: C.ink }}>{labels.program}</h2>
              </div>
              {invitation.timeline.map((ev, i) => (
                <motion.div key={i} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 32, padding: '28px 0', borderTop: `1px solid ${C.rule}` }}>
                  <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 18, color: C.sage, fontWeight: 300 }}>{ev.time}</div>
                  <div>
                    <div style={{ fontFamily: fraunces, fontSize: 24, fontWeight: 300, color: C.ink, letterSpacing: '-0.01em' }}>{ev.title}</div>
                    {ev.description && <div style={{ fontSize: 13, color: C.mute, marginTop: 4, lineHeight: 1.6 }}>{ev.description}</div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* VENUE */}
      {(invitation.venue_name || invitation.venue_address) && (
        <>
          <div style={{ height: 1, background: C.rule }} />
          <section style={{ padding: '120px 64px' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.mute, marginBottom: 20 }}>{labels.venue}</div>
                <h3 style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 48, fontWeight: 300, color: C.ink, letterSpacing: '-0.01em', marginBottom: 20 }}>{invitation.venue_name}</h3>
                {invitation.venue_address && <div style={{ fontSize: 15, color: C.ink2, lineHeight: 1.7, marginBottom: 32 }}>{invitation.venue_address}</div>}
                {(invitation.ceremony_time || invitation.reception_time) && (
                  <div style={{ display: 'flex', gap: 32, borderTop: `1px solid ${C.rule}`, paddingTop: 24, marginBottom: 32 }}>
                    {invitation.ceremony_time && <div><div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.3em', color: C.mute }}>{labels.ceremony}</div><div style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 28, fontWeight: 300, color: C.ink }}>{formatTime(invitation.ceremony_time)}</div></div>}
                    {invitation.reception_time && <div><div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.3em', color: C.mute }}>{labels.reception}</div><div style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 28, fontWeight: 300, color: C.ink }}>{formatTime(invitation.reception_time)}</div></div>}
                  </div>
                )}
                {invitation.venue_address && (
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px', border: `1px solid ${C.ink}`, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.ink, textDecoration: 'none' }}>
                    {labels.google_maps}
                  </a>
                )}
              </div>
              <div style={{ aspectRatio: '4/3', background: C.bg2, border: `1px solid ${C.rule}`, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.rule} 1px, transparent 1px), linear-gradient(90deg, ${C.rule} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 10, height: 10, background: C.sage, borderRadius: '50%' }} />
              </div>
            </div>
          </section>
        </>
      )}

      <SharedSections invitation={invitation} theme={THEME} labels={labels} />

      {/* RSVP */}
      <div style={{ height: 1, background: C.rule }} />
      <section style={{ padding: '120px 64px', background: C.ink }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ color: C.sageSoft, fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 20 }}>{labels.rsvp_title}</div>
          <h2 style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 60, fontWeight: 300, color: C.bg, letterSpacing: '-0.01em', marginBottom: 8 }}>{labels.rsvp_title}</h2>
          {invitation.rsvp_deadline && <p style={{ color: C.sageSoft, fontSize: 13, letterSpacing: '0.1em', marginBottom: 60 }}>{labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}</p>}
          {invitation.rsvp_mode !== 'contact' && (
            <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.sage} bgColor={C.ink} textColor={C.bg} mutedColor={C.sageSoft} labels={labels} />
          )}
          {(invitation.rsvp_mode === 'contact' || invitation.rsvp_mode === 'both') && (
            <div style={{ marginTop: invitation.rsvp_mode === 'both' ? 32 : 0 }}>
              <DirectContactCard invitation={invitation} theme={{ bg: C.ink, bgAlt: '#2a2a28', card: '#2a2a28', text: C.bg, muted: C.sageSoft, accent: C.sage, rule: '#333330' }} labels={labels} />
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '80px 64px', textAlign: 'center', borderTop: `1px solid ${C.rule}` }}>
        <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 'clamp(40px,6vw,80px)', fontWeight: 300, color: C.ink, letterSpacing: '-0.01em' }}>
          {invitation.partner1_name} <span style={{ color: C.sage }}>&amp;</span> {invitation.partner2_name}
        </div>
        <div style={{ marginTop: 24, fontSize: 11, letterSpacing: '0.36em', textTransform: 'uppercase', color: C.mute }}>{year} · {labels.footer_tagline}</div>
      </footer>
    </div>
  )
}
