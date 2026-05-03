'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Heart } from 'lucide-react'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import { RSVPForm } from '../RSVPForm'
import type { Invitation, RSVPResponse } from '@/types'
import { SharedSections, DirectContactCard, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'

const fade = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

const C = {
  bg: '#FBF6F3',
  surface: '#F5EDE8',
  card: '#FDFAF8',
  rose: '#C4837A',
  roseDark: '#A86A62',
  roseDim: '#C4837A20',
  blush: '#DEB4AC',
  text: '#2A1F1B',
  muted: '#8A6960',
  rule: '#E8D5CF',
  leaf: '#7A9070',
}

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export interface RSVPFormData {
  guest_name: string
  email?: string
  attending: boolean
  adults: number
  children: number
  menu_choice?: 'meat' | 'fish' | 'vegetarian' | 'vegan'
  allergies?: string
  message?: string
}

function Countdown({ weddingDate }: { weddingDate: string }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    function calc() {
      const diff = new Date(weddingDate).getTime() - Date.now()
      if (diff <= 0) return
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
      })
    }
    calc()
    const id = setInterval(calc, 60000)
    return () => clearInterval(id)
  }, [weddingDate])

  return (
    <div style={{ display: 'flex', gap: 0, justifyContent: 'center' }}>
      {[
        { val: time.days, label: 'Days' },
        { val: time.hours, label: 'Hours' },
        { val: time.minutes, label: 'Min' },
      ].map(({ val, label }, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
          {i > 0 && (
            <div style={{ width: 1, height: 52, background: C.rule, margin: '0 clamp(16px, 4vw, 40px)' }} />
          )}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: 300,
              color: C.rose,
              lineHeight: 1,
            }}>
              {String(val).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.muted, marginTop: 6, fontFamily: 'var(--font-instrument), sans-serif' }}>
              {label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const SECTION_THEME: SectionTheme = {
  bg: '#FBF6F3', bgAlt: '#F5EDE8',
  text: '#2A1F1B', muted: '#8A6960',
  accent: '#C4837A', rule: '#E8D5CF', card: '#FDFAF8',
}

export function RosewoodTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const labels = getEffectiveLabels(invitation)

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-cormorant), Georgia, serif' }}>

      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Rose botanical SVG decorations */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '260px', height: '260px', opacity: 0.12, pointerEvents: 'none' }}
          viewBox="0 0 200 200" fill="none"
        >
          <path d="M20 180 Q40 120 80 100 Q60 60 100 20 Q120 60 140 100 Q160 80 180 60" stroke={C.rose} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <ellipse cx="100" cy="20" rx="14" ry="8" fill={C.rose} transform="rotate(-10 100 20)" />
          <ellipse cx="140" cy="100" rx="16" ry="9" fill={C.leaf} transform="rotate(30 140 100)" />
          <ellipse cx="60" cy="100" rx="16" ry="9" fill={C.leaf} transform="rotate(-30 60 100)" />
          <circle cx="100" cy="20" r="5" fill={C.blush} />
        </svg>
        <svg
          style={{ position: 'absolute', bottom: 0, right: 0, width: '220px', height: '220px', opacity: 0.1, pointerEvents: 'none', transform: 'rotate(180deg)' }}
          viewBox="0 0 200 200" fill="none"
        >
          <path d="M20 180 Q40 120 80 100 Q60 60 100 20 Q120 60 140 100 Q160 80 180 60" stroke={C.rose} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <ellipse cx="100" cy="20" rx="14" ry="8" fill={C.rose} transform="rotate(-10 100 20)" />
          <ellipse cx="140" cy="100" rx="16" ry="9" fill={C.leaf} transform="rotate(30 140 100)" />
        </svg>

        <motion.div
          variants={fade} initial="hidden" animate="visible"
          transition={{ duration: 1 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 600 }}
        >
          <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.muted, marginBottom: 32, fontFamily: 'var(--font-instrument), sans-serif' }}>
            Together with their families
          </p>

          <div style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(3rem, 9vw, 6rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            color: C.text,
            letterSpacing: '0.02em',
          }}>
            {invitation.partner1_name}
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
            margin: '16px 0',
          }}>
            <div style={{ height: 1, width: 40, background: C.rule }} />
            <Heart size={14} fill={C.rose} style={{ color: C.rose }} />
            <div style={{ height: 1, width: 40, background: C.rule }} />
          </div>

          <div style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(3rem, 9vw, 6rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            color: C.text,
            letterSpacing: '0.02em',
            marginBottom: 40,
          }}>
            {invitation.partner2_name}
          </div>

          <div style={{ border: `1px solid ${C.rule}`, display: 'inline-block', padding: '14px 32px', marginBottom: 16 }}>
            <p style={{ fontSize: 12, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.muted, fontFamily: 'var(--font-instrument), sans-serif' }}>
              {formatDate(invitation.wedding_date, 'MMMM d, yyyy')}
            </p>
          </div>

          {invitation.venue_name && (
            <p style={{ fontSize: 14, color: C.rose, fontStyle: 'italic', marginTop: 8 }}>{invitation.venue_name}</p>
          )}
        </motion.div>

        {/* Countdown */}
        {invitation.show_countdown && daysLeft > 0 && (
          <motion.div
            variants={fade} initial="hidden" animate="visible"
            transition={{ duration: 1, delay: 0.4 }}
            style={{ position: 'relative', zIndex: 1, marginTop: 64, width: '100%', maxWidth: 480 }}
          >
            <Countdown weddingDate={invitation.wedding_date} />
          </motion.div>
        )}
      </section>

      {/* ── Personal message ── */}
      {invitation.personal_message && (
        <motion.section
          variants={fade} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '72px 24px', background: C.surface, textAlign: 'center', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '100%', height: 2,
            background: `linear-gradient(to right, transparent, ${C.blush}60, transparent)`,
          }} />
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <Heart size={16} fill={C.blush} style={{ color: C.blush, marginBottom: 20 }} />
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.85,
              color: C.text,
              opacity: 0.85,
            }}>
              "{invitation.personal_message}"
            </p>
          </div>
        </motion.section>
      )}

      {/* ── Timeline ── */}
      {invitation.timeline?.length > 0 && (
        <motion.section
          variants={fade} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 24px' }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: C.muted, fontFamily: 'var(--font-instrument), sans-serif', marginBottom: 12 }}>
                Wedding Day
              </p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 300, color: C.text }}>Schedule</h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 }}>
                <div style={{ height: 1, width: 32, background: C.rule }} />
                <Heart size={10} fill={C.rose} style={{ color: C.rose, opacity: 0.6 }} />
                <div style={{ height: 1, width: 32, background: C.rule }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {invitation.timeline.map((event, i) => (
                <motion.div
                  key={i}
                  variants={fade}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1px 1fr',
                    gap: '0 20px',
                    paddingBottom: i < invitation.timeline.length - 1 ? 28 : 0,
                    alignItems: 'start',
                  }}
                >
                  <div style={{ textAlign: 'right', paddingTop: 3 }}>
                    <span style={{ fontSize: 12, letterSpacing: '0.1em', color: C.rose, fontFamily: 'var(--font-instrument), sans-serif' }}>
                      {event.time}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.blush, border: `1.5px solid ${C.rose}`, marginTop: 4, flexShrink: 0 }} />
                    {i < invitation.timeline.length - 1 && (
                      <div style={{ width: 1, flex: 1, minHeight: 28, background: C.rule, marginTop: 6 }} />
                    )}
                  </div>
                  <div>
                    <p style={{ fontSize: 16, color: C.text, marginBottom: 2 }}>{event.title}</p>
                    {event.description && (
                      <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{event.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── Venue ── */}
      {invitation.venue_name && (
        <motion.section
          variants={fade} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 24px', background: C.surface, textAlign: 'center' }}
        >
          <div style={{ maxWidth: 540, margin: '0 auto' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: C.muted, marginBottom: 16, fontFamily: 'var(--font-instrument), sans-serif' }}>Venue</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 300, color: C.text, marginBottom: 6 }}>
              {invitation.venue_name}
            </h2>
            {invitation.venue_address && (
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>{invitation.venue_address}</p>
            )}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
              {invitation.ceremony_time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: `1px solid ${C.rule}`, background: C.card }}>
                  <Clock size={13} style={{ color: C.rose }} />
                  <span style={{ fontSize: 12, color: C.text }}>Ceremony · {formatTime(invitation.ceremony_time)}</span>
                </div>
              )}
              {invitation.reception_time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: `1px solid ${C.rule}`, background: C.card }}>
                  <Clock size={13} style={{ color: C.rose }} />
                  <span style={{ fontSize: 12, color: C.text }}>Reception · {formatTime(invitation.reception_time)}</span>
                </div>
              )}
            </div>

            {invitation.venue_address && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 24px', border: `1px solid ${C.rule}`,
                  fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: C.rose, textDecoration: 'none',
                }}
              >
                <MapPin size={12} />
                View on Map
              </a>
            )}
          </div>
        </motion.section>
      )}

      {/* ── Dress code ── */}
      {invitation.dress_code && (
        <motion.section
          variants={fade} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '60px 24px', textAlign: 'center' }}
        >
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: C.muted, marginBottom: 12, fontFamily: 'var(--font-instrument), sans-serif' }}>Dress Code</p>
            <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontStyle: 'italic', color: C.text, opacity: 0.85 }}>
              {invitation.dress_code}
            </p>
          </div>
        </motion.section>
      )}

      {/* ── Extra sections ── */}
      <SharedSections invitation={invitation} theme={SECTION_THEME} labels={labels} />

      {/* ── RSVP ── */}
      <motion.section
        variants={fade} initial="hidden" whileInView="visible"
        viewport={{ once: true }} transition={{ duration: 0.7 }}
        style={{ padding: '80px 24px', background: C.surface }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Heart size={16} fill={C.blush} style={{ color: C.blush, marginBottom: 16 }} />
            <p style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: C.muted, marginBottom: 12, fontFamily: 'var(--font-instrument), sans-serif' }}>RSVP</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 300, color: C.text }}>
              {labels.rsvp_title}
            </h2>
            {invitation.rsvp_deadline && (
              <p style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>
                {labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}
              </p>
            )}
          </div>
          {invitation.rsvp_mode !== 'contact' && (
            <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.rose} labels={labels} />
          )}
          {(invitation.rsvp_mode === 'contact' || invitation.rsvp_mode === 'both') && (
            <div style={{ marginTop: invitation.rsvp_mode === 'both' ? 32 : 0 }}>
              <DirectContactCard invitation={invitation} theme={SECTION_THEME} labels={labels} />
            </div>
          )}
        </div>
      </motion.section>

      {/* ── Footer ── */}
      <footer style={{ padding: '56px 24px', textAlign: 'center', background: C.bg, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ height: 1, width: 48, background: C.rule }} />
          <Heart size={12} fill={C.rose} style={{ color: C.rose, opacity: 0.6 }} />
          <div style={{ height: 1, width: 48, background: C.rule }} />
        </div>
        <p style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: C.roseDark,
          marginBottom: 10,
        }}>
          {invitation.partner1_name} &amp; {invitation.partner2_name}
        </p>
        <p style={{ fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.muted, fontFamily: 'var(--font-instrument), sans-serif' }}>
          {new Date(invitation.wedding_date).getFullYear()}
        </p>
      </footer>
    </div>
  )
}
