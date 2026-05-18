'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Flower2 } from 'lucide-react'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import { RSVPForm } from '../RSVPForm'
import type { Invitation, RSVPResponse } from '@/types'
import { SharedSections, DirectContactCard, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'


const C = {
  bg: '#F9F7F5',
  soft: '#F3EFEC',
  card: '#FDFCFB',
  sage: '#7A9B8A',
  sageDim: '#7A9B8A20',
  lavender: '#9B8EAA',
  dusty: '#BBA89E',
  text: '#2E2926',
  muted: '#7D6E65',
  rule: '#E4DDD7',
  warm: '#D4C4B8',
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
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 32 }}>
      {[
        { val: time.days, label: 'jours' },
        { val: time.hours, label: 'heures' },
        { val: time.minutes, label: 'minutes' },
      ].map(({ val, label }, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'flex-end', gap: 32 }}>
          {i > 0 && <div style={{ width: 1, height: 40, background: C.rule, marginBottom: 28 }} />}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: 300,
              color: C.text,
              lineHeight: 1,
              letterSpacing: '-0.01em',
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
  bg: '#F9F7F5', bgAlt: '#F3EFEC',
  text: '#2E2926', muted: '#7D6E65',
  accent: '#7A9B8A', rule: '#E4DDD7', card: '#FDFCFB',
}

export function PromesseTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
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
        {/* Gentle botanical pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10 Q50 20 40 30 Q30 20 40 10Z' fill='%237A9B8A'/%3E%3Cpath d='M40 50 Q50 60 40 70 Q30 60 40 50Z' fill='%237A9B8A'/%3E%3Cpath d='M10 40 Q20 50 30 40 Q20 30 10 40Z' fill='%237A9B8A'/%3E%3Cpath d='M50 40 Q60 50 70 40 Q60 30 50 40Z' fill='%237A9B8A'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }} />

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 600 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 40 }}>
            <div style={{ height: 1, width: 48, background: C.rule }} />
            <Flower2 size={14} style={{ color: C.sage }} />
            <div style={{ height: 1, width: 48, background: C.rule }} />
          </div>

          <p style={{ fontSize: 10, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.muted, marginBottom: 20, fontFamily: 'var(--font-instrument), sans-serif' }}>
            Nous avons l'honneur de vous inviter
          </p>

          <h1 style={{
            fontFamily: 'var(--font-pinyon), cursive, serif',
            fontSize: 'clamp(4rem, 11vw, 7.5rem)',
            fontWeight: 400,
            color: C.sage,
            lineHeight: 1.1,
            marginBottom: 4,
          }}>
            {invitation.partner1_name}
          </h1>
          <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontStyle: 'italic', color: C.muted, marginBottom: 4 }}>
            et
          </p>
          <h1 style={{
            fontFamily: 'var(--font-pinyon), cursive, serif',
            fontSize: 'clamp(4rem, 11vw, 7.5rem)',
            fontWeight: 400,
            color: C.sage,
            lineHeight: 1.1,
            marginBottom: 40,
          }}>
            {invitation.partner2_name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ height: 1, width: 40, background: C.rule }} />
            <p style={{ fontSize: 12, letterSpacing: '0.35em', textTransform: 'uppercase', color: C.muted, fontFamily: 'var(--font-instrument), sans-serif' }}>
              {formatDate(invitation.wedding_date, 'dd MMMM yyyy')}
            </p>
            <div style={{ height: 1, width: 40, background: C.rule }} />
          </div>

          {invitation.venue_name && (
            <p style={{ fontSize: 14, color: C.dusty, fontStyle: 'italic' }}>{invitation.venue_name}</p>
          )}
        </motion.div>

        {/* Countdown */}
        {invitation.show_countdown && daysLeft > 0 && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            style={{ position: 'relative', zIndex: 1, marginTop: 64, width: '100%', maxWidth: 480 }}
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
          style={{ padding: '72px 24px', background: C.soft, textAlign: 'center' }}
        >
          <div style={{ maxWidth: 580, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
              <div style={{ height: 1, width: 32, background: C.sage, opacity: 0.4 }} />
              <Flower2 size={12} style={{ color: C.sage, opacity: 0.7 }} />
              <div style={{ height: 1, width: 32, background: C.sage, opacity: 0.4 }} />
            </div>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.85,
              color: C.text,
              opacity: 0.85,
            }}>
              « {invitation.personal_message} »
            </p>
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
          <div style={{ maxWidth: 540, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: C.muted, fontFamily: 'var(--font-instrument), sans-serif', marginBottom: 10 }}>Le programme</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 300, color: C.text }}>
                Déroulement de la journée
              </h2>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: C.rule, transform: 'translateX(-50%)' }} />

              {invitation.timeline.map((event, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={i}
                   
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 32px 1fr',
                      gap: 0,
                      marginBottom: 28,
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ textAlign: isLeft ? 'right' : 'left', paddingRight: isLeft ? 20 : 0, paddingLeft: isLeft ? 0 : 20, order: isLeft ? 0 : 2 }}>
                      <p style={{ fontSize: 15, color: C.text }}>{event.title}</p>
                      <p style={{ fontSize: 11, color: C.sage, fontFamily: 'var(--font-instrument), sans-serif' }}>{event.time}</p>
                      {event.description && <p style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{event.description}</p>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', zIndex: 1, order: 1 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: C.card, border: `2px solid ${C.sage}`, flexShrink: 0 }} />
                    </div>
                    <div style={{ order: isLeft ? 2 : 0 }} />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── Venue ── */}
      {invitation.venue_name && (
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '80px 24px', background: C.soft, textAlign: 'center' }}
        >
          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            <p style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: C.muted, marginBottom: 16, fontFamily: 'var(--font-instrument), sans-serif' }}>Lieu</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 300, color: C.text, marginBottom: 6 }}>
              {invitation.venue_name}
            </h2>
            {invitation.venue_address && (
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>{invitation.venue_address}</p>
            )}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {invitation.ceremony_time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', border: `1px solid ${C.rule}`, background: C.card }}>
                  <Clock size={12} style={{ color: C.sage }} />
                  <span style={{ fontSize: 12, color: C.text }}>Cérémonie · {formatTime(invitation.ceremony_time)}</span>
                </div>
              )}
              {invitation.reception_time && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', border: `1px solid ${C.rule}`, background: C.card }}>
                  <Clock size={12} style={{ color: C.sage }} />
                  <span style={{ fontSize: 12, color: C.text }}>Réception · {formatTime(invitation.reception_time)}</span>
                </div>
              )}
            </div>
            {invitation.venue_address && (
              <div style={{ marginTop: 20 }}>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 24px', border: `1px solid ${C.rule}`,
                    fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: C.sage, textDecoration: 'none',
                  }}
                >
                  <MapPin size={12} />
                  Voir sur la carte
                </a>
              </div>
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
            <p style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: C.muted, marginBottom: 12, fontFamily: 'var(--font-instrument), sans-serif' }}>Tenue</p>
            <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontStyle: 'italic', color: C.text, opacity: 0.8 }}>
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
        style={{ padding: '80px 24px', background: C.soft }}
      >
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ height: 1, width: 40, background: C.rule }} />
              <Flower2 size={12} style={{ color: C.sage, opacity: 0.7 }} />
              <div style={{ height: 1, width: 40, background: C.rule }} />
            </div>
            <p style={{ fontSize: 10, letterSpacing: '0.45em', textTransform: 'uppercase', color: C.muted, marginBottom: 12, fontFamily: 'var(--font-instrument), sans-serif' }}>{labels.rsvp_title}</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 300, color: C.text }}>RSVP</h2>
            {invitation.rsvp_deadline && (
              <p style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>
                {labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline, 'dd MMMM yyyy')}
              </p>
            )}
          </div>
          {invitation.rsvp_mode !== 'contact' && (
            <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.sage} labels={labels} />
          )}
          {(invitation.rsvp_mode === 'contact' || invitation.rsvp_mode === 'both') && (
            <div style={{ marginTop: invitation.rsvp_mode === 'both' ? 32 : 0 }}>
              <DirectContactCard invitation={invitation} theme={SECTION_THEME} labels={labels} />
            </div>
          )}
        </div>
      </motion.section>

      {/* ── Footer ── */}
      <footer style={{ padding: '56px 24px', textAlign: 'center', background: C.bg }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ height: 1, width: 48, background: C.rule }} />
          <Flower2 size={12} style={{ color: C.sage, opacity: 0.5 }} />
          <div style={{ height: 1, width: 48, background: C.rule }} />
        </div>
        <p style={{
          fontFamily: 'var(--font-pinyon), cursive, serif',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: C.sage,
          marginBottom: 12,
        }}>
          Avec tout notre amour
        </p>
        <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.muted, fontFamily: 'var(--font-instrument), sans-serif' }}>
          {invitation.partner1_name} &amp; {invitation.partner2_name} · {new Date(invitation.wedding_date).getFullYear()}
        </p>
      </footer>
    </div>
  )
}
