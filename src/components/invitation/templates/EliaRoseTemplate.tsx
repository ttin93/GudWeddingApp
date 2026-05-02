'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Calendar, ChevronDown } from 'lucide-react'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import { RSVPForm } from '../RSVPForm'
import type { Invitation, RSVPResponse } from '@/types'
import { SharedSections, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

const C = {
  bg: '#FDF8F5',
  card: '#FEFCFA',
  primary: '#C09080',
  accent: '#9B7B6A',
  gold: '#C4A882',
  text: '#2C1810',
  muted: '#8C6B5A',
  rule: '#EDE0D8',
  soft: '#F5EDE8',
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
    <div style={{ display: 'flex', gap: 32, justifyContent: 'center', alignItems: 'flex-end' }}>
      {[
        { val: time.days, label: 'dana' },
        { val: time.hours, label: 'sati' },
        { val: time.minutes, label: 'minuta' },
      ].map(({ val, label }) => (
        <div key={label} style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 300,
            lineHeight: 1,
            color: C.text,
            letterSpacing: '-0.02em',
          }}>
            {String(val).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.muted, marginTop: 6 }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}

const SECTION_THEME: SectionTheme = {
  bg: '#FDF8F5', bgAlt: '#F5EDE8',
  text: '#2C1810', muted: '#8C6B5A',
  accent: '#C09080', rule: '#EDE0D8', card: '#FEFCFA',
}

export function EliaRoseTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const labels = getEffectiveLabels(invitation)

  return (
    <div style={{ background: C.bg, fontFamily: 'var(--font-cormorant), Georgia, serif', color: C.text }}>

      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Subtle texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.025,
          backgroundImage: 'radial-gradient(circle, #9B7B6A 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        <motion.div
          variants={fade} initial="hidden" animate="visible"
          transition={{ duration: 1 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}
        >
          {/* Top ornament */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ height: 1, width: 64, background: C.gold }} />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2 C10 2, 14 6, 18 10 C14 14, 10 18, 10 18 C10 18, 6 14, 2 10 C6 6, 10 2, 10 2Z" fill={C.gold} opacity="0.6" />
              <circle cx="10" cy="10" r="2" fill={C.gold} />
            </svg>
            <div style={{ height: 1, width: 64, background: C.gold }} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            lineHeight: 1.05,
            letterSpacing: '0.02em',
            color: C.text,
            marginBottom: 8,
          }}>
            {invitation.partner1_name}
          </h1>
          <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: C.muted, fontStyle: 'italic', marginBottom: 8 }}>
            &amp;
          </div>
          <h1 style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(3.5rem, 10vw, 7rem)',
            lineHeight: 1.05,
            letterSpacing: '0.02em',
            color: C.text,
            marginBottom: 40,
          }}>
            {invitation.partner2_name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
            <div style={{ height: 1, width: 40, background: C.rule }} />
            <p style={{ fontSize: 13, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.muted }}>
              {formatDate(invitation.wedding_date, 'dd . MM . yyyy')}
            </p>
            <div style={{ height: 1, width: 40, background: C.rule }} />
          </div>

          {invitation.venue_name && (
            <p style={{ fontSize: 15, color: C.accent, letterSpacing: '0.1em' }}>
              {invitation.venue_name}
            </p>
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

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: C.muted }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* ── Personal message ── */}
      {invitation.personal_message && (
        <motion.section
          variants={fade} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 24px', background: C.soft, textAlign: 'center' }}
        >
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.8,
              color: C.text,
            }}>
              "{invitation.personal_message}"
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 32 }}>
              <div style={{ height: 1, width: 32, background: C.gold }} />
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.gold }} />
              <div style={{ height: 1, width: 32, background: C.gold }} />
            </div>
          </div>
        </motion.section>
      )}

      {/* ── Timeline / Program ── */}
      {invitation.timeline?.length > 0 && (
        <motion.section
          variants={fade} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 24px' }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>Raspored</p>
              <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 300, color: C.text }}>
                Program dana
              </h2>
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
                    gridTemplateColumns: '88px 1px 1fr',
                    gap: '0 20px',
                    paddingBottom: i < invitation.timeline.length - 1 ? 28 : 0,
                    alignItems: 'start',
                  }}
                >
                  <div style={{ textAlign: 'right', paddingTop: 2 }}>
                    <span style={{ fontSize: 12, letterSpacing: '0.15em', color: C.accent, fontFamily: 'var(--font-instrument), sans-serif' }}>
                      {event.time}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.gold, marginTop: 4, flexShrink: 0 }} />
                    {i < invitation.timeline.length - 1 && (
                      <div style={{ width: 1, flex: 1, minHeight: 28, background: C.rule, marginTop: 4 }} />
                    )}
                  </div>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 400, color: C.text, marginBottom: 2 }}>{event.title}</p>
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
          style={{ padding: '80px 24px', background: C.soft }}
        >
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>Lokacija</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 400, color: C.text, marginBottom: 8 }}>
              {invitation.venue_name}
            </h2>
            {invitation.venue_address && (
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>{invitation.venue_address}</p>
            )}

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
              {invitation.ceremony_time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.card, padding: '10px 20px', border: `1px solid ${C.rule}` }}>
                  <Clock size={14} style={{ color: C.accent }} />
                  <span style={{ fontSize: 13, color: C.text }}>Ceremonija · {formatTime(invitation.ceremony_time)}</span>
                </div>
              )}
              {invitation.reception_time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.card, padding: '10px 20px', border: `1px solid ${C.rule}` }}>
                  <Clock size={14} style={{ color: C.accent }} />
                  <span style={{ fontSize: 13, color: C.text }}>Koktel · {formatTime(invitation.reception_time)}</span>
                </div>
              )}
            </div>

            {invitation.venue_address && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px', border: `1px solid ${C.rule}`,
                    fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: C.accent, textDecoration: 'none',
                  }}
                >
                  <MapPin size={12} />
                  Google Maps
                </a>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(invitation.partner1_name + ' & ' + invitation.partner2_name)}&dates=${invitation.wedding_date.replace(/-/g, '')}&details=${encodeURIComponent(invitation.venue_name ?? '')}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px', border: `1px solid ${C.rule}`,
                    fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: C.accent, textDecoration: 'none',
                  }}
                >
                  <Calendar size={12} />
                  Apple Calendar
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
            <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>Dress Code</p>
            <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontStyle: 'italic', color: C.text }}>
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
        style={{ padding: '80px 24px', background: C.soft }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>RSVP</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 300, color: C.text }}>
              {labels.rsvp_title}
            </h2>
            {invitation.rsvp_deadline && (
              <p style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>
                {labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline, 'dd. MM. yyyy')}
              </p>
            )}
          </div>
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

      {/* ── Footer ── */}
      <footer style={{ padding: '60px 24px 48px', textAlign: 'center', background: C.bg }}>
        <div style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: C.text,
          marginBottom: 20,
        }}>
          Jedva čekamo!
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ height: 1, width: 40, background: C.rule }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.gold }} />
          <div style={{ height: 1, width: 40, background: C.rule }} />
        </div>
        <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.muted }}>
          {invitation.partner1_name} &amp; {invitation.partner2_name} · {new Date(invitation.wedding_date).getFullYear()}
        </p>
      </footer>
    </div>
  )
}
