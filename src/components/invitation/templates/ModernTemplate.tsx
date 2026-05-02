'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import { RSVPForm } from '../RSVPForm'
import type { Invitation, RSVPResponse } from '@/types'
import { SharedSections, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'

const C = {
  bg: '#F4F4F2', dark: '#1C1C1C', card: '#FFFFFF',
  primary: '#6B7A6B', accent: '#2D2D2D',
  text: '#1C1C1C', muted: '#6B6B6B', rule: '#E0E0DC',
}

const THEME: SectionTheme = {
  bg: C.bg, bgAlt: '#EAEAE8', text: C.text, muted: C.muted,
  accent: C.primary, rule: C.rule, card: C.card,
}

const fade = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: unknown) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function ModernTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const labels = getEffectiveLabels(invitation)

  return (
    <div style={{ background: C.bg, fontFamily: 'var(--font-instrument), system-ui, sans-serif', minHeight: '100vh' }}>

      {/* ── HERO — split layout ── */}
      <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 60px 80px 64px' }}>
          <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 0.8 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase', color: C.primary, marginBottom: 32 }}>
              Wedding Invitation
            </p>
            <h1 style={{ fontFamily: 'var(--font-dm-serif)', color: C.dark, fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 1.05, marginBottom: 8 }}>
              {invitation.partner1_name}
            </h1>
            <div style={{ height: 1, width: 48, background: C.primary, margin: '16px 0' }} />
            <h1 style={{ fontFamily: 'var(--font-dm-serif)', color: C.primary, fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 1.05 }}>
              {invitation.partner2_name}
            </h1>

            <div style={{ marginTop: 40, paddingTop: 32, borderTop: `1px solid ${C.rule}` }}>
              <p style={{ fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.muted, marginBottom: 4 }}>
                {formatDate(invitation.wedding_date, 'MMMM d, yyyy')}
              </p>
              {invitation.venue_name && (
                <p style={{ fontSize: 13.5, color: C.muted }}>{invitation.venue_name}</p>
              )}
              {invitation.show_countdown && daysLeft > 0 && (
                <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 42, color: C.dark, lineHeight: 1 }}>{daysLeft}</span>
                  <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.muted }}>days to go</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right — dark panel */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
          style={{ background: C.dark, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
        >
          {/* Grid lines overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.05,
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(60px, 8vw, 100px)', color: C.primary, lineHeight: 1 }}>
              {invitation.partner1_name[0]}{invitation.partner2_name[0]}
            </div>
            <div style={{ width: 32, height: 1, background: C.primary, margin: '20px auto' }} />
            <p style={{ fontSize: 10, letterSpacing: '0.36em', textTransform: 'uppercase', color: '#ffffff60', marginBottom: 8 }}>
              {new Date(invitation.wedding_date).getFullYear()}
            </p>
            <p style={{ fontSize: 10, letterSpacing: '0.22em', color: '#ffffff40' }}>
              {invitation.venue_name ?? 'To be celebrated'}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── DETAILS ── */}
      {(invitation.venue_name || invitation.ceremony_time) && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 64px', background: C.card, borderTop: `1px solid ${C.rule}` }}
        >
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: invitation.reception_time ? '1fr 1fr 1fr' : '1fr 1fr', gap: 24 }}>
            {invitation.venue_name && (
              <div style={{ borderLeft: `3px solid ${C.primary}`, paddingLeft: 20 }}>
                <p style={{ fontSize: 9, letterSpacing: '0.36em', textTransform: 'uppercase', color: C.primary, marginBottom: 8 }}>Venue</p>
                <p style={{ fontSize: 16, color: C.text, marginBottom: 4 }}>{invitation.venue_name}</p>
                {invitation.venue_address && <p style={{ fontSize: 12.5, color: C.muted }}>{invitation.venue_address}</p>}
                {invitation.venue_address && (
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 11, color: C.primary, textDecoration: 'none', letterSpacing: '0.06em', display: 'inline-block', marginTop: 6 }}>
                    ↗ Maps
                  </a>
                )}
              </div>
            )}
            {invitation.ceremony_time && (
              <div style={{ borderLeft: `3px solid ${C.rule}`, paddingLeft: 20 }}>
                <p style={{ fontSize: 9, letterSpacing: '0.36em', textTransform: 'uppercase', color: C.primary, marginBottom: 8 }}>Ceremony</p>
                <p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 28, color: C.text }}>{formatTime(invitation.ceremony_time)}</p>
              </div>
            )}
            {invitation.reception_time && (
              <div style={{ borderLeft: `3px solid ${C.rule}`, paddingLeft: 20 }}>
                <p style={{ fontSize: 9, letterSpacing: '0.36em', textTransform: 'uppercase', color: C.primary, marginBottom: 8 }}>Reception</p>
                <p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 28, color: C.text }}>{formatTime(invitation.reception_time)}</p>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* ── PERSONAL MESSAGE ── */}
      {invitation.personal_message && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 64px', background: C.bg }}
        >
          <div style={{ maxWidth: 700, margin: '0 auto', display: 'grid', gridTemplateColumns: '4px 1fr', gap: 32, alignItems: 'start' }}>
            <div style={{ background: C.primary, height: '100%', minHeight: 80 }} />
            <div>
              <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.primary, marginBottom: 16 }}>A note from us</p>
              <p style={{ fontSize: 18, lineHeight: 1.75, color: C.text, fontStyle: 'italic' }}>
                "{invitation.personal_message}"
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* ── TIMELINE ── */}
      {invitation.timeline?.length > 0 && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 64px', background: C.card }}
        >
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.primary, marginBottom: 40 }}>Schedule</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 0, borderTop: `1px solid ${C.rule}` }}>
              {invitation.timeline.map((event, i) => (
                <div key={i} style={{ padding: '28px 24px', borderRight: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}` }}>
                  <p style={{ fontSize: 9, letterSpacing: '0.36em', textTransform: 'uppercase', color: C.primary, marginBottom: 8 }}>{event.time}</p>
                  <p style={{ fontSize: 16, color: C.text, marginBottom: 4, fontFamily: 'var(--font-dm-serif)' }}>{event.title}</p>
                  {event.description && <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{event.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── DRESS CODE ── */}
      {invitation.dress_code && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '64px', background: C.dark, color: '#F5F5F3' }}
        >
          <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 32 }}>
            <div style={{ width: 3, height: 60, background: C.primary, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.primary, marginBottom: 10 }}>Dress code</p>
              <p style={{ fontSize: 20, color: '#F5F5F3', lineHeight: 1.5 }}>{invitation.dress_code}</p>
            </div>
          </div>
        </motion.section>
      )}

      <SharedSections invitation={invitation} theme={THEME} labels={labels} />

      {/* ── RSVP ── */}
      <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
        style={{ padding: '80px 64px', background: C.bg }}
      >
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <p style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.primary, marginBottom: 8 }}>{labels.rsvp_title}</p>
          {invitation.rsvp_deadline && (
            <p style={{ fontSize: 13, color: C.muted, marginBottom: 36 }}>{labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}</p>
          )}
          <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.primary} labels={labels} />
        </div>
      </motion.section>

      <footer style={{ padding: '20px 64px', borderTop: `1px solid ${C.rule}`, display: 'flex', justifyContent: 'space-between', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted }}>
        <span>{invitation.partner1_name} &amp; {invitation.partner2_name}</span>
        <span>{new Date(invitation.wedding_date).getFullYear()}</span>
      </footer>
    </div>
  )
}
