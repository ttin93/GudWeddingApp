'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import { RSVPForm } from '../RSVPForm'
import type { Invitation, RSVPResponse } from '@/types'
import { SharedSections, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'

export interface RSVPFormData {
  guest_name: string; email?: string; attending: boolean
  adults: number; children: number
  menu_choice?: 'meat' | 'fish' | 'vegetarian' | 'vegan'
  allergies?: string; message?: string
}

const C = {
  bg: '#111111', surface: '#1A1A1A', card: '#161616',
  gold: '#C9A96E', goldDim: '#C9A96E44',
  text: '#F0EBE3', muted: '#7A7069', rule: '#2A2520',
}

const THEME: SectionTheme = {
  bg: C.surface, bgAlt: C.card, text: C.text, muted: C.muted,
  accent: C.gold, rule: C.rule, card: C.card,
}

const fade = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function NoirTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const labels = getEffectiveLabels(invitation)

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-cormorant), Georgia, serif', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Art Deco geometric bg */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04 }}>
          <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: '70%', paddingBottom: '70%', border: `1px solid ${C.gold}`, borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '55%', paddingBottom: '55%', border: `1px solid ${C.gold}`, borderRadius: '50%' }} />
        </div>

        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 1 }} style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>
          {/* Top rule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, justifyContent: 'center' }}>
            <div style={{ flex: 1, height: 1, background: C.goldDim }} />
            <div style={{ width: 6, height: 6, background: C.gold, transform: 'rotate(45deg)' }} />
            <div style={{ flex: 1, height: 1, background: C.goldDim }} />
          </div>

          <p style={{ fontSize: 9.5, letterSpacing: '0.6em', textTransform: 'uppercase', color: C.gold, marginBottom: 32, opacity: 0.8 }}>
            Together with their families
          </p>

          <div style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(68px, 13vw, 108px)', lineHeight: 1.1, color: C.gold, marginBottom: 4 }}>
            {invitation.partner1_name}
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 24, color: C.muted, margin: '4px 0' }}>&amp;</div>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(68px, 13vw, 108px)', lineHeight: 1.1, color: C.gold }}>
            {invitation.partner2_name}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '32px 0', justifyContent: 'center' }}>
            <div style={{ flex: 1, height: 1, background: C.goldDim }} />
            <div style={{ width: 6, height: 6, background: C.gold, transform: 'rotate(45deg)' }} />
            <div style={{ flex: 1, height: 1, background: C.goldDim }} />
          </div>

          <p style={{ fontSize: 13, letterSpacing: '0.32em', textTransform: 'uppercase', color: C.text, marginBottom: 6 }}>
            {formatDate(invitation.wedding_date, 'MMMM d, yyyy')}
          </p>
          {invitation.venue_name && (
            <p style={{ fontSize: 11.5, letterSpacing: '0.18em', color: C.muted }}>{invitation.venue_name}</p>
          )}

          {invitation.show_countdown && daysLeft > 0 && (
            <div style={{ marginTop: 32, display: 'inline-flex', gap: 24, paddingTop: 24, borderTop: `1px solid ${C.rule}` }}>
              {String(daysLeft).split('').map((d, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 52, color: C.gold, lineHeight: 1 }}>{d}</span>
                </div>
              ))}
              <div style={{ textAlign: 'center', paddingTop: 12 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.muted }}>days</div>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* ── DETAILS ── */}
      {(invitation.venue_name || invitation.ceremony_time) && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 32px', background: C.surface, borderTop: `1px solid ${C.rule}` }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, justifyContent: 'center' }}>
              <div style={{ flex: 1, height: 1, background: C.rule }} />
              <p style={{ fontSize: 9.5, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.gold, whiteSpace: 'nowrap' }}>The celebration</p>
              <div style={{ flex: 1, height: 1, background: C.rule }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {invitation.venue_name && (
                <div style={{ background: C.card, padding: '24px 28px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <MapPin size={16} style={{ color: C.gold, marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 17, color: C.text, marginBottom: 4 }}>{invitation.venue_name}</p>
                    {invitation.venue_address && <p style={{ fontSize: 12.5, color: C.muted }}>{invitation.venue_address}</p>}
                    {invitation.venue_address && (
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 11, color: C.gold, textDecoration: 'none', letterSpacing: '0.06em', display: 'inline-block', marginTop: 6 }}>
                        Open in Maps →
                      </a>
                    )}
                  </div>
                </div>
              )}
              {(invitation.ceremony_time || invitation.reception_time) && (
                <div style={{ display: 'grid', gridTemplateColumns: invitation.reception_time ? '1fr 1fr' : '1fr', gap: 1 }}>
                  {invitation.ceremony_time && (
                    <div style={{ background: C.card, padding: '24px 28px' }}>
                      <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold, marginBottom: 8 }}>Ceremony</p>
                      <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 32, color: C.text }}>{formatTime(invitation.ceremony_time)}</p>
                    </div>
                  )}
                  {invitation.reception_time && (
                    <div style={{ background: C.card, padding: '24px 28px' }}>
                      <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold, marginBottom: 8 }}>Reception</p>
                      <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 32, color: C.text }}>{formatTime(invitation.reception_time)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── PERSONAL MESSAGE ── */}
      {invitation.personal_message && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 32px', background: C.bg, textAlign: 'center' }}
        >
          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            <div style={{ fontSize: 60, color: C.goldDim, lineHeight: 0.8, marginBottom: 16, fontFamily: 'Georgia' }}>"</div>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 20, lineHeight: 1.8, color: C.text }}>
              {invitation.personal_message}
            </p>
            <div style={{ fontSize: 60, color: C.goldDim, lineHeight: 0.8, marginTop: 8, fontFamily: 'Georgia' }}>"</div>
          </div>
        </motion.section>
      )}

      {/* ── TIMELINE ── */}
      {invitation.timeline?.length > 0 && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 32px', background: C.surface, borderTop: `1px solid ${C.rule}` }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48, justifyContent: 'center' }}>
              <div style={{ flex: 1, height: 1, background: C.rule }} />
              <p style={{ fontSize: 9.5, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.gold, whiteSpace: 'nowrap' }}>The day</p>
              <div style={{ flex: 1, height: 1, background: C.rule }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderLeft: `1px solid ${C.rule}`, paddingLeft: 32, marginLeft: 16 }}>
              {invitation.timeline.map((event, i) => (
                <motion.div key={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ paddingBottom: 32, position: 'relative' }}
                >
                  <div style={{ position: 'absolute', left: -41, top: 2, width: 18, height: 18, background: C.bg, border: `1px solid ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
                    {event.emoji ?? '◆'}
                  </div>
                  <p style={{ fontSize: 9, letterSpacing: '0.36em', textTransform: 'uppercase', color: C.gold, marginBottom: 4 }}>{event.time}</p>
                  <p style={{ fontSize: 17, color: C.text, marginBottom: 4 }}>{event.title}</p>
                  {event.description && <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.5 }}>{event.description}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── DRESS CODE ── */}
      {invitation.dress_code && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '64px 32px', background: C.bg, textAlign: 'center' }}
        >
          <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <p style={{ fontSize: 9.5, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>Dress code</p>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 22, color: C.text, lineHeight: 1.6 }}>{invitation.dress_code}</p>
          </div>
        </motion.section>
      )}

      <SharedSections invitation={invitation} theme={THEME} labels={labels} />

      {/* ── RSVP ── */}
      <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
        style={{ padding: '80px 32px', background: C.surface, borderTop: `1px solid ${C.rule}` }}
      >
        <div style={{ maxWidth: 540, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36, justifyContent: 'center' }}>
            <div style={{ flex: 1, height: 1, background: C.rule }} />
            <p style={{ fontSize: 9.5, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.gold, whiteSpace: 'nowrap' }}>{labels.rsvp_title}</p>
            <div style={{ flex: 1, height: 1, background: C.rule }} />
          </div>
          {invitation.rsvp_deadline && (
            <p style={{ textAlign: 'center', fontSize: 13, color: C.muted, marginBottom: 32 }}>{labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}</p>
          )}
          <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.gold} labels={labels} />
        </div>
      </motion.section>

      <footer style={{ padding: '24px 32px', textAlign: 'center', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.muted, borderTop: `1px solid ${C.rule}` }}>
        {invitation.partner1_name} &amp; {invitation.partner2_name} · {new Date(invitation.wedding_date).getFullYear()}
      </footer>
    </div>
  )
}
