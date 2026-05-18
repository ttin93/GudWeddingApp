'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Star } from 'lucide-react'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import { RSVPForm } from '../RSVPForm'
import type { Invitation, RSVPResponse } from '@/types'
import { SharedSections, DirectContactCard, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'


const C = {
  bg: '#0D1B2A',
  surface: '#0F2133',
  card: '#122538',
  silver: '#C8D8E8',
  silverDim: '#C8D8E830',
  accent: '#7EB3D4',
  gold: '#D4B896',
  text: '#EDF2F7',
  muted: '#5A7A96',
  rule: '#1A3450',
  glow: '#4A90C440',
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

function Stars() {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number; delay: number }>>([])

  useEffect(() => {
    setStars(Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      delay: Math.random() * 3,
    })))
  }, [])

  if (stars.length === 0) return null

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {stars.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: C.silver,
            opacity: s.opacity,
          }}
          animate={{ opacity: [s.opacity, s.opacity * 2, s.opacity] }}
          transition={{ repeat: Infinity, duration: 2 + s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
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
    <div style={{ display: 'flex', gap: 'clamp(16px, 4vw, 48px)', justifyContent: 'center', alignItems: 'center' }}>
      {[
        { val: time.days, label: 'Days' },
        { val: time.hours, label: 'Hours' },
        { val: time.minutes, label: 'Minutes' },
      ].map(({ val, label }, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 4vw, 48px)' }}>
          {i > 0 && <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.muted }} />}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 300,
              color: C.silver,
              lineHeight: 1,
              textShadow: `0 0 30px ${C.glow}`,
            }}>
              {String(val).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.muted, marginTop: 8 }}>
              {label}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const SECTION_THEME: SectionTheme = {
  bg: '#0D1B2A', bgAlt: '#0F2133',
  text: '#EDF2F7', muted: '#5A7A96',
  accent: '#7EB3D4', rule: '#1A3450', card: '#122538',
}

export function NocturneTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
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
        <Stars />

        {/* Moon gradient */}
        <div style={{
          position: 'absolute',
          top: -200,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.glow} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 660 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 40 }}>
            <Star size={10} style={{ color: C.silver, opacity: 0.6 }} fill={C.silver} />
            <p style={{ fontSize: 10, letterSpacing: '0.6em', textTransform: 'uppercase', color: C.muted }}>
              Wedding Invitation
            </p>
            <Star size={10} style={{ color: C.silver, opacity: 0.6 }} fill={C.silver} />
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem, 9vw, 6.5rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '0.03em',
            color: C.text,
            marginBottom: 0,
          }}>
            {invitation.partner1_name}
          </h1>
          <div style={{
            fontFamily: 'var(--font-pinyon), cursive, serif',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: C.accent,
            lineHeight: 1.2,
            margin: '4px 0',
          }}>
            &amp;
          </div>
          <h1 style={{
            fontSize: 'clamp(3rem, 9vw, 6.5rem)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '0.03em',
            color: C.text,
            marginBottom: 48,
          }}>
            {invitation.partner2_name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ height: 1, width: 48, background: `linear-gradient(to right, transparent, ${C.silverDim})` }} />
            <p style={{ fontSize: 12, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.silver, opacity: 0.6 }}>
              {formatDate(invitation.wedding_date, 'MMMM d · yyyy')}
            </p>
            <div style={{ height: 1, width: 48, background: `linear-gradient(to left, transparent, ${C.silverDim})` }} />
          </div>

          {invitation.venue_name && (
            <p style={{ fontSize: 13, color: C.accent, letterSpacing: '0.1em' }}>{invitation.venue_name}</p>
          )}
        </motion.div>

        {/* Countdown */}
        {invitation.show_countdown && daysLeft > 0 && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ position: 'relative', zIndex: 1, marginTop: 72, width: '100%', maxWidth: 520 }}
          >
            <Countdown weddingDate={invitation.wedding_date} />
          </motion.div>
        )}
      </section>

      {/* ── Personal message ── */}
      {invitation.personal_message && (
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 24px', background: C.surface, textAlign: 'center', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at center, ${C.glow}20 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: 620, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.55rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.85,
              color: C.silver,
              opacity: 0.9,
            }}>
              "{invitation.personal_message}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 32 }}>
              <div style={{ height: 1, width: 32, background: C.accent, opacity: 0.4 }} />
              <Star size={10} fill={C.accent} style={{ color: C.accent, opacity: 0.6 }} />
              <div style={{ height: 1, width: 32, background: C.accent, opacity: 0.4 }} />
            </div>
          </div>
        </motion.section>
      )}

      {/* ── Timeline ── */}
      {invitation.timeline?.length > 0 && (
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 24px' }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ height: 1, width: 40, background: C.rule }} />
                <Star size={12} style={{ color: C.accent }} fill={C.accent} />
                <div style={{ height: 1, width: 40, background: C.rule }} />
              </div>
              <h2 style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.muted, fontFamily: 'var(--font-instrument), sans-serif', fontWeight: 400 }}>
                Program
              </h2>
            </div>

            {invitation.timeline.map((event, i) => (
              <motion.div
                key={i}
               
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1px 1fr',
                  gap: '0 24px',
                  paddingBottom: i < invitation.timeline.length - 1 ? 30 : 0,
                  alignItems: 'start',
                }}
              >
                <div style={{ textAlign: 'right', paddingTop: 4 }}>
                  <span style={{ fontSize: 11, color: C.accent, fontFamily: 'var(--font-instrument), sans-serif', letterSpacing: '0.1em' }}>
                    {event.time}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.accent, marginTop: 6, boxShadow: `0 0 8px ${C.glow}`, flexShrink: 0 }} />
                  {i < invitation.timeline.length - 1 && (
                    <div style={{ width: 1, flex: 1, minHeight: 30, background: C.rule, marginTop: 6 }} />
                  )}
                </div>
                <div>
                  <p style={{ fontSize: 15, color: C.text, marginBottom: 2 }}>{event.title}</p>
                  {event.description && (
                    <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{event.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── Venue ── */}
      {invitation.venue_name && (
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 24px', background: C.surface, textAlign: 'center' }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.muted, marginBottom: 20 }}>Venue</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 300, color: C.silver, marginBottom: 8 }}>
              {invitation.venue_name}
            </h2>
            {invitation.venue_address && (
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 28 }}>{invitation.venue_address}</p>
            )}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
              {invitation.ceremony_time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', border: `1px solid ${C.rule}` }}>
                  <Clock size={13} style={{ color: C.accent }} />
                  <span style={{ fontSize: 12, color: C.text }}>Ceremony · {formatTime(invitation.ceremony_time)}</span>
                </div>
              )}
              {invitation.reception_time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', border: `1px solid ${C.rule}` }}>
                  <Clock size={13} style={{ color: C.accent }} />
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
                  padding: '10px 24px', border: `1px solid ${C.accent}40`,
                  fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: C.accent, textDecoration: 'none',
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '60px 24px', textAlign: 'center' }}
        >
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>Dress Code</p>
            <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontStyle: 'italic', color: C.silver, opacity: 0.85 }}>
              {invitation.dress_code}
            </p>
          </div>
        </motion.section>
      )}

      {/* ── Extra sections ── */}
      <SharedSections invitation={invitation} theme={SECTION_THEME} labels={labels} />

      {/* ── RSVP ── */}
      <motion.section
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7 }}
        style={{ padding: '80px 24px', background: C.surface }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>RSVP</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 300, color: C.text }}>
              {labels.rsvp_title}
            </h2>
            {invitation.rsvp_deadline && (
              <p style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>
                {labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}
              </p>
            )}
          </div>
          {invitation.rsvp_mode !== 'contact' && (
            <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.accent} bgColor={C.card} textColor={C.text} mutedColor={C.muted} labels={labels} />
          )}
          {(invitation.rsvp_mode === 'contact' || invitation.rsvp_mode === 'both') && (
            <div style={{ marginTop: invitation.rsvp_mode === 'both' ? 32 : 0 }}>
              <DirectContactCard invitation={invitation} theme={SECTION_THEME} labels={labels} />
            </div>
          )}
        </div>
      </motion.section>

      {/* ── Footer ── */}
      <footer style={{ padding: '56px 24px', textAlign: 'center', background: C.bg, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: -80, left: '50%', transform: 'translateX(-50%)',
          width: 300, height: 300, borderRadius: '50%',
          background: `radial-gradient(circle, ${C.glow}15 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ height: 1, width: 40, background: C.rule }} />
            <Star size={10} fill={C.accent} style={{ color: C.accent, opacity: 0.5 }} />
            <div style={{ height: 1, width: 40, background: C.rule }} />
          </div>
          <p style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontStyle: 'italic',
            color: C.silver,
            opacity: 0.7,
            marginBottom: 12,
          }}>
            {invitation.partner1_name} &amp; {invitation.partner2_name}
          </p>
          <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.muted }}>
            {new Date(invitation.wedding_date).getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}
