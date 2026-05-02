'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import { RSVPForm } from '../RSVPForm'
import type { Invitation, RSVPResponse } from '@/types'
import { SharedSections, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'

const C = {
  bg: '#F4F1EB', alt: '#EBE6DC', card: '#FDFBF6',
  primary: '#B8960C', accent: '#2C4A2C',
  text: '#1C1C1C', muted: '#5A5A5A', rule: '#DDD8CE',
}
const THEME: SectionTheme = { bg: C.bg, bgAlt: C.alt, text: C.text, muted: C.muted, accent: C.accent, rule: C.rule, card: C.card }
const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export function HeritageTemplate({ invitation, onRSVPSubmit, existingRSVP }: { invitation: Invitation; onRSVPSubmit?: (data: unknown) => Promise<void>; existingRSVP?: RSVPResponse | null }) {
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const labels = getEffectiveLabels(invitation)

  return (
    <div style={{ background: C.bg, fontFamily: 'var(--font-cormorant), Georgia, serif', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 32px' }}>
        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', maxWidth: 520, width: '100%' }}
        >
          {/* Ornamental double border frame */}
          <div style={{ border: `2px solid ${C.primary}`, padding: '48px 40px', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 6, border: `1px solid ${C.primary}40`, pointerEvents: 'none' }} />
            {/* Top ornament */}
            <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: C.bg, padding: '0 12px', fontSize: 22, color: C.primary }}>✦</div>
            {/* Corner ornaments */}
            {[{top:-8,left:-8},{top:-8,right:-8},{bottom:-8,left:-8},{bottom:-8,right:-8}].map((s,i) => (
              <div key={i} style={{ position:'absolute', width:14, height:14, background: C.bg, ...s, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:6, height:6, background: C.primary, transform:'rotate(45deg)' }} />
              </div>
            ))}

            <p style={{ fontSize: 9, letterSpacing: '0.6em', textTransform: 'uppercase', color: C.accent, marginBottom: 28 }}>
              Request the honour of your presence
            </p>

            <div style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(60px, 12vw, 96px)', lineHeight: 1.1, color: C.primary }}>
              {invitation.partner1_name}
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 22, color: C.muted, margin: '4px 0' }}>&amp;</div>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(60px, 12vw, 96px)', lineHeight: 1.1, color: C.primary }}>
              {invitation.partner2_name}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0', justifyContent: 'center' }}>
              <div style={{ flex: 1, height: 1, background: `${C.primary}50` }} />
              <span style={{ fontSize: 14, color: C.primary }}>✦</span>
              <div style={{ flex: 1, height: 1, background: `${C.primary}50` }} />
            </div>

            <p style={{ fontSize: 14, letterSpacing: '0.2em', color: C.text, marginBottom: 6 }}>
              {formatDate(invitation.wedding_date, 'MMMM d, yyyy')}
            </p>
            {invitation.venue_name && (
              <p style={{ fontSize: 12.5, letterSpacing: '0.1em', color: C.muted, marginBottom: 8 }}>{invitation.venue_name}</p>
            )}

            {invitation.show_countdown && daysLeft > 0 && (
              <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 15, color: C.accent, marginTop: 12 }}>
                {daysLeft} days remain
              </p>
            )}

            {/* Bottom ornament */}
            <div style={{ position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)', background: C.bg, padding: '0 12px', fontSize: 22, color: C.primary }}>✦</div>
          </div>
        </motion.div>
      </section>

      {/* ── DETAILS ── */}
      {(invitation.venue_name || invitation.ceremony_time) && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 32px', background: C.alt }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
              <div style={{ flex: 1, height: 1, background: `${C.primary}40` }} />
              <span style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.accent }}>The celebration</span>
              <div style={{ flex: 1, height: 1, background: `${C.primary}40` }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {invitation.venue_name && (
                <div style={{ background: C.card, border: `1px solid ${C.rule}`, padding: '20px 24px', textAlign: 'left', display: 'flex', gap: 14 }}>
                  <MapPin size={15} style={{ color: C.primary, marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: 16, color: C.text, marginBottom: 4 }}>{invitation.venue_name}</p>
                    {invitation.venue_address && <p style={{ fontSize: 12.5, color: C.muted }}>{invitation.venue_address}</p>}
                    {invitation.venue_address && (
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 11, color: C.accent, textDecoration: 'none', display: 'inline-block', marginTop: 6 }}>
                        Open in Maps →
                      </a>
                    )}
                  </div>
                </div>
              )}
              {(invitation.ceremony_time || invitation.reception_time) && (
                <div style={{ display: 'grid', gridTemplateColumns: invitation.reception_time ? '1fr 1fr' : '1fr', gap: 12 }}>
                  {invitation.ceremony_time && (
                    <div style={{ background: C.card, border: `1px solid ${C.rule}`, padding: '20px', textAlign: 'center' }}>
                      <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.accent, marginBottom: 8 }}>Ceremony</p>
                      <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 28, color: C.primary }}>{formatTime(invitation.ceremony_time)}</p>
                    </div>
                  )}
                  {invitation.reception_time && (
                    <div style={{ background: C.card, border: `1px solid ${C.rule}`, padding: '20px', textAlign: 'center' }}>
                      <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.accent, marginBottom: 8 }}>Reception</p>
                      <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 28, color: C.primary }}>{formatTime(invitation.reception_time)}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── MESSAGE ── */}
      {invitation.personal_message && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 32px', background: C.bg, textAlign: 'center' }}
        >
          <div style={{ maxWidth: 520, margin: '0 auto', borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}`, padding: '40px 0' }}>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 20, lineHeight: 1.8, color: C.text }}>
              "{invitation.personal_message}"
            </p>
          </div>
        </motion.section>
      )}

      {/* ── TIMELINE ── */}
      {invitation.timeline?.length > 0 && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 32px', background: C.alt }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
              <div style={{ flex: 1, height: 1, background: `${C.primary}40` }} />
              <span style={{ fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.accent }}>Programme</span>
              <div style={{ flex: 1, height: 1, background: `${C.primary}40` }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {invitation.timeline.map((event, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 24, paddingBottom: 24, borderBottom: i < invitation.timeline.length - 1 ? `1px solid ${C.rule}` : 'none', marginBottom: i < invitation.timeline.length - 1 ? 24 : 0 }}>
                  <div style={{ textAlign: 'right', paddingTop: 2 }}>
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 18, color: C.primary }}>{event.time}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: 16, color: C.text, marginBottom: 4 }}>{event.title}</p>
                    {event.description && <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.5 }}>{event.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {invitation.dress_code && (
        <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '64px 32px', background: C.bg, textAlign: 'center' }}
        >
          <p style={{ fontSize: 9.5, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.accent, marginBottom: 12 }}>Dress code</p>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 22, color: C.text }}>{invitation.dress_code}</p>
        </motion.section>
      )}

      <SharedSections invitation={invitation} theme={THEME} labels={labels} />

      {/* ── RSVP ── */}
      <motion.section variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
        style={{ padding: '80px 32px', background: C.alt }}
      >
        <div style={{ maxWidth: 540, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ flex: 1, height: 1, background: `${C.primary}40` }} />
            <span style={{ fontSize: 9.5, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.accent }}>{labels.rsvp_title}</span>
            <div style={{ flex: 1, height: 1, background: `${C.primary}40` }} />
          </div>
          {invitation.rsvp_deadline && (
            <p style={{ fontSize: 13, color: C.muted, marginBottom: 36 }}>{labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}</p>
          )}
          <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.primary} labels={labels} />
        </div>
      </motion.section>

      <footer style={{ padding: '20px 32px', textAlign: 'center', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.muted, borderTop: `1px solid ${C.rule}` }}>
        {invitation.partner1_name} &amp; {invitation.partner2_name} · {new Date(invitation.wedding_date).getFullYear()}
      </footer>
    </div>
  )
}
