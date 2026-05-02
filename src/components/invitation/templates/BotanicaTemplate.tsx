'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import type { Invitation, RSVPResponse } from '@/types'
import { RSVPForm } from '../RSVPForm'
import { SharedSections, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'

export interface RSVPFormData {
  guest_name: string; email?: string; attending: boolean
  adults: number; children: number
  menu_choice?: 'meat' | 'fish' | 'vegetarian' | 'vegan'
  allergies?: string; message?: string
}

const C = {
  bg: '#FAF8F5', alt: '#EFF4F0', card: '#FFFFFF',
  primary: '#C4847A', accent: '#2D4A3E',
  text: '#1C1C1C', muted: '#6B6B6B', rule: '#E2D8D0',
}

const THEME: SectionTheme = {
  bg: C.bg, bgAlt: C.alt, text: C.text, muted: C.muted,
  accent: C.accent, rule: C.rule, card: C.card,
}

const fade = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0' }}>
      <div style={{ flex: 1, height: 1, background: C.rule }} />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C12 2 8 6 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 6 12 2 12 2Z" fill={C.primary} opacity=".7" />
        <path d="M7 14C7 14 3 16 3 19C3 20.7 4.3 22 6 22C7.7 22 9 20.7 9 19C9 16 7 14 7 14Z" fill={C.accent} opacity=".5" />
        <path d="M17 14C17 14 21 16 21 19C21 20.7 19.7 22 18 22C16.3 22 15 20.7 15 19C15 16 17 14 17 14Z" fill={C.accent} opacity=".5" />
      </svg>
      <div style={{ flex: 1, height: 1, background: C.rule }} />
    </div>
  )
}

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function BotanicaTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const labels = getEffectiveLabels(invitation)

  return (
    <div style={{ background: C.bg, fontFamily: 'var(--font-cormorant), Georgia, serif', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle botanical pattern bg */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 Q50 20 40 30 Q30 20 40 10Z M40 50 Q50 60 40 70 Q30 60 40 50Z M10 40 Q20 50 30 40 Q20 30 10 40Z M50 40 Q60 50 70 40 Q60 30 50 40Z' fill='%232D4A3E'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }} />

        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 1 }} style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>
          <p style={{ fontSize: 9.5, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.accent, marginBottom: 36 }}>
            Together with their families
          </p>

          <div style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(72px, 14vw, 112px)', lineHeight: 1.1, color: C.primary, marginBottom: 8 }}>
            {invitation.partner1_name}
          </div>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 28, color: C.muted, margin: '4px 0' }}>&amp;</div>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(72px, 14vw, 112px)', lineHeight: 1.1, color: C.primary }}>
            {invitation.partner2_name}
          </div>

          <Divider />

          <p style={{ fontSize: 15, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.text, marginBottom: 6 }}>
            {formatDate(invitation.wedding_date, 'MMMM d, yyyy')}
          </p>

          {invitation.venue_name && (
            <p style={{ fontSize: 13, color: C.muted, letterSpacing: '0.1em' }}>
              {invitation.venue_name}
            </p>
          )}

          {invitation.show_countdown && daysLeft > 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              style={{ marginTop: 32, display: 'inline-flex', gap: 0, border: `1px solid ${C.rule}`, overflow: 'hidden' }}
            >
              {[['Days', daysLeft], ['Until', 'we say'], ['I do', '♥']].map(([label, value], ci) => (
                <div key={String(label)} style={{ padding: '12px 20px', borderRight: ci < 2 ? `1px solid ${C.rule}` : 'none', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 28, lineHeight: 1, color: C.primary }}>{value}</div>
                  <div style={{ fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.muted, marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        >
          <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${C.accent}, transparent)` }} />
        </motion.div>
      </section>

      {/* ── DETAILS ── */}
      {(invitation.venue_name || invitation.ceremony_time) && (
        <motion.section
          variants={fade} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 32px', background: C.alt }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: 9.5, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.accent, marginBottom: 32 }}>The celebration</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {invitation.venue_name && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, textAlign: 'left', background: C.card, padding: '20px 24px', border: `1px solid ${C.rule}` }}>
                  <MapPin size={16} style={{ color: C.primary, marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 16, color: C.text, marginBottom: 4 }}>{invitation.venue_name}</p>
                    {invitation.venue_address && (
                      <p style={{ fontSize: 12.5, color: C.muted }}>{invitation.venue_address}</p>
                    )}
                    {invitation.venue_address && (
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 11.5, color: C.accent, textDecoration: 'none', letterSpacing: '0.06em', display: 'inline-block', marginTop: 8, borderBottom: `1px solid ${C.accent}40` }}>
                        Open in Maps →
                      </a>
                    )}
                  </div>
                </div>
              )}

              {(invitation.ceremony_time || invitation.reception_time) && (
                <div style={{ display: 'grid', gridTemplateColumns: invitation.reception_time ? '1fr 1fr' : '1fr', gap: 12 }}>
                  {invitation.ceremony_time && (
                    <div style={{ background: C.card, padding: '20px 24px', border: `1px solid ${C.rule}`, textAlign: 'center' }}>
                      <Clock size={14} style={{ color: C.primary, marginBottom: 8 }} />
                      <p style={{ fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: C.muted, marginBottom: 6 }}>Ceremony</p>
                      <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 26, color: C.text }}>{formatTime(invitation.ceremony_time)}</p>
                    </div>
                  )}
                  {invitation.reception_time && (
                    <div style={{ background: C.card, padding: '20px 24px', border: `1px solid ${C.rule}`, textAlign: 'center' }}>
                      <Clock size={14} style={{ color: C.primary, marginBottom: 8 }} />
                      <p style={{ fontSize: 9, letterSpacing: '0.32em', textTransform: 'uppercase', color: C.muted, marginBottom: 6 }}>Reception</p>
                      <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 26, color: C.text }}>{formatTime(invitation.reception_time)}</p>
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
            <div style={{ width: 1, height: 48, background: C.primary, margin: '0 auto 32px', opacity: 0.4 }} />
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 20, lineHeight: 1.75, color: C.text }}>
              "{invitation.personal_message}"
            </p>
            <div style={{ width: 1, height: 48, background: C.primary, margin: '32px auto 0', opacity: 0.4 }} />
          </div>
        </motion.section>
      )}

      {/* ── TIMELINE ── */}
      {invitation.timeline?.length > 0 && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 32px', background: C.alt }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <p style={{ fontSize: 9.5, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.accent, textAlign: 'center', marginBottom: 48 }}>The day</p>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 1, background: `${C.primary}30` }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {invitation.timeline.map((event, i) => (
                  <motion.div key={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    style={{ display: 'flex', gap: 28, alignItems: 'flex-start', paddingBottom: 32 }}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: C.bg, border: `1px solid ${C.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, zIndex: 1 }}>
                      {event.emoji ?? '♥'}
                    </div>
                    <div style={{ paddingTop: 8 }}>
                      <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.primary, marginBottom: 4 }}>{event.time}</p>
                      <p style={{ fontSize: 17, color: C.text, marginBottom: 4 }}>{event.title}</p>
                      {event.description && <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{event.description}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ── DRESS CODE ── */}
      {invitation.dress_code && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '64px 32px', background: C.bg, textAlign: 'center' }}
        >
          <div style={{ maxWidth: 480, margin: '0 auto', border: `1px solid ${C.rule}`, padding: '40px 32px', position: 'relative' }}>
            {/* Corner accents */}
            {[{top:-4,left:-4,borderRight:'none',borderBottom:'none'},{top:-4,right:-4,borderLeft:'none',borderBottom:'none'},{bottom:-4,left:-4,borderRight:'none',borderTop:'none'},{bottom:-4,right:-4,borderLeft:'none',borderTop:'none'}].map((s,i) => (
              <div key={i} style={{ position:'absolute', width:12, height:12, border:`1px solid ${C.primary}`, ...s }} />
            ))}
            <p style={{ fontSize: 9.5, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.accent, marginBottom: 16 }}>Dress code</p>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 22, color: C.text, lineHeight: 1.6 }}>{invitation.dress_code}</p>
          </div>
        </motion.section>
      )}

      {/* ── SHARED SECTIONS (transport, accommodation, gifts, etc.) ── */}
      <SharedSections invitation={invitation} theme={THEME} labels={labels} />

      {/* ── RSVP ── */}
      <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
        style={{ padding: '80px 32px', background: `${C.accent}08` }}
      >
        <div style={{ maxWidth: 540, margin: '0 auto' }}>
          <p style={{ fontSize: 9.5, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.accent, textAlign: 'center', marginBottom: 8 }}>
            {labels.rsvp_title}
          </p>
          {invitation.rsvp_deadline && (
            <p style={{ textAlign: 'center', fontSize: 13, color: C.muted, marginBottom: 36 }}>
              {labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}
            </p>
          )}
          <RSVPForm
            invitationId={invitation.id}
            packageType={invitation.package}
            onSubmit={onRSVPSubmit}
            existingRSVP={existingRSVP}
            accentColor={C.primary}
            labels={labels}
          />
        </div>
      </motion.section>

      <footer style={{ padding: '24px 32px', textAlign: 'center', fontSize: 11, letterSpacing: '0.2em', color: C.muted, borderTop: `1px solid ${C.rule}` }}>
        {invitation.partner1_name} &amp; {invitation.partner2_name} · {new Date(invitation.wedding_date).getFullYear()}
      </footer>
    </div>
  )
}
