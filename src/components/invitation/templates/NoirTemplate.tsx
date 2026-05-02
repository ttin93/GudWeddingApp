'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Calendar } from 'lucide-react'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import { RSVPForm } from '../RSVPForm'
import type { Invitation, RSVPResponse } from '@/types'
import { SharedSections, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'

const fade = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

const C = {
  bg: '#111111',
  card: '#1A1A1A',
  surface: '#161616',
  gold: '#C9A96E',
  goldDim: '#C9A96E44',
  text: '#F0EBE3',
  muted: '#7A7069',
  rule: '#2A2520',
  accent: '#D4B896',
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
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function calc() {
      const diff = new Date(weddingDate).getTime() - Date.now()
      if (diff <= 0) return
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [weddingDate])

  return (
    <div style={{ display: 'flex', gap: '4vw', justifyContent: 'center' }}>
      {[
        { val: time.days, label: 'Days' },
        { val: time.hours, label: 'Hours' },
        { val: time.minutes, label: 'Min' },
        { val: time.seconds, label: 'Sec' },
      ].map(({ val, label }, i) => (
        <div key={label} style={{ textAlign: 'center', position: 'relative' }}>
          {i > 0 && (
            <span style={{
              position: 'absolute', left: '-2.2vw', top: '50%', transform: 'translateY(-60%)',
              fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: C.gold, opacity: 0.4,
            }}>:</span>
          )}
          <div style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontWeight: 300,
            color: C.gold,
            lineHeight: 1,
            letterSpacing: '0.05em',
          }}>
            {String(val).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.muted, marginTop: 6 }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}

const SECTION_THEME: SectionTheme = {
  bg: '#111111', bgAlt: '#161616',
  text: '#F0EBE3', muted: '#7A7069',
  accent: '#C9A96E', rule: '#2A2520', card: '#1A1A1A',
}

export function NoirTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const labels = getEffectiveLabels(invitation)

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: 'var(--font-dm-serif), Georgia, serif' }}>

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
        {/* Grain overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '256px',
        }} />

        {/* Gold corner marks */}
        {[
          { top: 40, left: 40 },
          { top: 40, right: 40 },
          { bottom: 40, left: 40 },
          { bottom: 40, right: 40 },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute', ...pos,
            width: 20, height: 20,
            borderTop: i < 2 ? `1px solid ${C.gold}40` : 'none',
            borderBottom: i >= 2 ? `1px solid ${C.gold}40` : 'none',
            borderLeft: i % 2 === 0 ? `1px solid ${C.gold}40` : 'none',
            borderRight: i % 2 === 1 ? `1px solid ${C.gold}40` : 'none',
          }} />
        ))}

        <motion.div
          variants={fade} initial="hidden" animate="visible"
          transition={{ duration: 1 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}
        >
          <p style={{ fontSize: 10, letterSpacing: '0.6em', textTransform: 'uppercase', color: C.muted, marginBottom: 48 }}>
            Wedding Invitation
          </p>

          {/* Monogram */}
          <div style={{
            fontFamily: 'var(--font-pinyon), cursive, serif',
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            color: C.gold,
            lineHeight: 0.9,
            marginBottom: 40,
            textShadow: `0 0 80px ${C.goldDim}`,
          }}>
            {invitation.partner1_name[0]}{invitation.partner2_name[0]}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 28 }}>
            <div style={{ height: 1, width: 80, background: `linear-gradient(to right, transparent, ${C.gold}60)` }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.gold }} />
            <div style={{ height: 1, width: 80, background: `linear-gradient(to left, transparent, ${C.gold}60)` }} />
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 300,
            letterSpacing: '0.2em',
            color: C.text,
            textTransform: 'uppercase',
            marginBottom: 16,
            lineHeight: 1.3,
          }}>
            {invitation.partner1_name} &amp; {invitation.partner2_name}
          </h1>

          <p style={{ fontSize: 12, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>
            {formatDate(invitation.wedding_date, 'MMMM d, yyyy')}
          </p>
          {invitation.venue_name && (
            <p style={{ fontSize: 13, color: C.gold + 'CC', letterSpacing: '0.15em' }}>
              {invitation.venue_name}
            </p>
          )}
        </motion.div>

        {/* Countdown */}
        {invitation.show_countdown && daysLeft > 0 && (
          <motion.div
            variants={fade} initial="hidden" animate="visible"
            transition={{ duration: 1, delay: 0.5 }}
            style={{ position: 'relative', zIndex: 1, marginTop: 72, width: '100%', maxWidth: 560 }}
          >
            <div style={{ borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}`, padding: '32px 0' }}>
              <Countdown weddingDate={invitation.wedding_date} />
            </div>
          </motion.div>
        )}
      </section>

      {/* ── Personal message ── */}
      {invitation.personal_message && (
        <motion.section
          variants={fade} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 24px', background: C.surface, textAlign: 'center' }}
        >
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div style={{ fontSize: 40, color: C.gold + '40', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: 16 }}>"</div>
            <p style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontStyle: 'italic',
              lineHeight: 1.9,
              color: C.accent,
              letterSpacing: '0.02em',
            }}>
              {invitation.personal_message}
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
          <div style={{ maxWidth: 580, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ height: 1, width: 48, background: C.gold + '60', margin: '0 auto 20px' }} />
              <h2 style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', letterSpacing: '0.5em', textTransform: 'uppercase', color: C.muted, fontWeight: 400, fontFamily: 'var(--font-instrument), sans-serif' }}>
                The Day
              </h2>
            </div>

            {invitation.timeline.map((event, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1px 1fr',
                  gap: '0 24px',
                  paddingBottom: i < invitation.timeline.length - 1 ? 32 : 0,
                  alignItems: 'start',
                }}
              >
                <div style={{ textAlign: 'right', paddingTop: 4 }}>
                  <span style={{ fontSize: 11, letterSpacing: '0.15em', color: C.gold, fontFamily: 'var(--font-instrument), sans-serif' }}>
                    {event.time}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 7, height: 7, border: `1px solid ${C.gold}`, transform: 'rotate(45deg)', marginTop: 6, flexShrink: 0 }} />
                  {i < invitation.timeline.length - 1 && (
                    <div style={{ width: 1, flex: 1, minHeight: 32, background: C.rule, marginTop: 8 }} />
                  )}
                </div>
                <div>
                  <p style={{ fontSize: 15, color: C.text, marginBottom: 2, letterSpacing: '0.05em' }}>{event.title}</p>
                  {event.description && (
                    <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>{event.description}</p>
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
          variants={fade} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 24px', background: C.surface, textAlign: 'center' }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.muted, marginBottom: 20 }}>Location</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 300, color: C.text, marginBottom: 8 }}>
              {invitation.venue_name}
            </h2>
            {invitation.venue_address && (
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 32 }}>{invitation.venue_address}</p>
            )}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {invitation.ceremony_time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: `1px solid ${C.rule}` }}>
                  <Clock size={13} style={{ color: C.gold }} />
                  <span style={{ fontSize: 12, letterSpacing: '0.15em', color: C.text }}>
                    Ceremony · {formatTime(invitation.ceremony_time)}
                  </span>
                </div>
              )}
              {invitation.reception_time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: `1px solid ${C.rule}` }}>
                  <Clock size={13} style={{ color: C.gold }} />
                  <span style={{ fontSize: 12, letterSpacing: '0.15em', color: C.text }}>
                    Reception · {formatTime(invitation.reception_time)}
                  </span>
                </div>
              )}
            </div>
            {invitation.venue_address && (
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 24px', border: `1px solid ${C.gold}40`,
                    fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: C.gold, textDecoration: 'none',
                  }}
                >
                  <MapPin size={12} />
                  Google Maps
                </a>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(invitation.partner1_name + ' & ' + invitation.partner2_name)}&dates=${invitation.wedding_date.replace(/-/g, '')}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 24px', border: `1px solid ${C.rule}`,
                    fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: C.muted, textDecoration: 'none',
                  }}
                >
                  <Calendar size={12} />
                  Add to Calendar
                </a>
              </div>
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
            <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>Dress Code</p>
            <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontStyle: 'italic', color: C.accent }}>
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
          <RSVPForm
            invitationId={invitation.id}
            packageType={invitation.package}
            onSubmit={onRSVPSubmit}
            existingRSVP={existingRSVP}
            accentColor={C.gold}
            labels={labels}
          />
        </div>
      </motion.section>

      {/* ── Footer ── */}
      <footer style={{ padding: '60px 24px 48px', textAlign: 'center', background: C.bg }}>
        <div style={{
          fontFamily: 'var(--font-pinyon), cursive, serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: C.gold,
          opacity: 0.8,
          marginBottom: 20,
        }}>
          {invitation.partner1_name} &amp; {invitation.partner2_name}
        </div>
        <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.muted }}>
          {new Date(invitation.wedding_date).getFullYear()}
        </p>
      </footer>
    </div>
  )
}
