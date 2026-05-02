'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import { RSVPForm } from '../RSVPForm'
import type { Invitation, RSVPResponse } from '@/types'
import { SharedSections, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const C = { bg: '#F5F5F3', primary: '#7A8C7A', accent: '#2D2D2D', text: '#1C1C1C', muted: '#6B6B6B', border: '#E0E0DC' }

const SECTION_THEME: SectionTheme = {
  bg: '#F5F5F3', bgAlt: '#EEEEED',
  text: '#1C1C1C', muted: '#6B6B6B',
  accent: '#7A8C7A', rule: '#E0E0DC', card: '#FFFFFF',
}

export function ModernTemplate({ invitation, onRSVPSubmit, existingRSVP }: { invitation: Invitation; onRSVPSubmit?: (data: unknown) => Promise<void>; existingRSVP?: RSVPResponse | null }) {
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const labels = getEffectiveLabels(invitation)

  return (
    <div style={{ background: C.bg, fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>

      {/* Hero — asymmetric grid */}
      <section className="min-h-screen grid md:grid-cols-2">
        <div className="flex flex-col justify-center px-10 py-20 md:px-16">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7 }}>
            <p className="text-xs tracking-[0.5em] uppercase mb-6" style={{ color: C.primary }}>Wedding Invitation</p>
            <h1 style={{ fontFamily: 'var(--font-dm-serif), Georgia, serif', color: C.accent, fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}>
              {invitation.partner1_name}<br />
              <span style={{ color: C.primary }}>& {invitation.partner2_name}</span>
            </h1>
            <div className="mt-8 h-px w-16" style={{ background: C.primary }} />
            <p className="mt-6 text-lg tracking-widest" style={{ color: C.muted }}>
              {formatDate(invitation.wedding_date, 'MMMM d, yyyy').toUpperCase()}
            </p>
            {daysLeft > 0 && (
              <p className="mt-2 text-sm" style={{ color: C.muted }}>{daysLeft} days away</p>
            )}
          </motion.div>
        </div>

        <div className="hidden md:flex items-center justify-center p-16" style={{ background: C.accent }}>
          <div className="text-center">
            <div style={{ fontFamily: 'var(--font-script)', fontSize: '5rem', color: C.primary }}>
              {invitation.partner1_name[0]}{invitation.partner2_name[0]}
            </div>
            <p className="mt-4 text-sm tracking-widest" style={{ color: '#ffffff80' }}>
              {new Date(invitation.wedding_date).getFullYear()}
            </p>
          </div>
        </div>
      </section>

      {/* Details */}
      {(invitation.venue_name || invitation.ceremony_time) && (
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="py-20 px-10 md:px-16 max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12">
            {invitation.venue_name && (
              <div>
                <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: C.primary }}>Venue</p>
                <div className="flex gap-3">
                  <MapPin size={18} style={{ color: C.primary }} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium" style={{ color: C.text }}>{invitation.venue_name}</p>
                    {invitation.venue_address && <p className="text-sm mt-0.5" style={{ color: C.muted }}>{invitation.venue_address}</p>}
                    {invitation.venue_address && (
                      <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                        className="text-xs mt-2 inline-block" style={{ color: C.primary }}>View on map →</a>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-4">
              {invitation.ceremony_time && (
                <div>
                  <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: C.primary }}>Ceremony</p>
                  <div className="flex items-center gap-2">
                    <Clock size={15} style={{ color: C.primary }} />
                    <span style={{ color: C.text }}>{formatTime(invitation.ceremony_time)}</span>
                  </div>
                </div>
              )}
              {invitation.reception_time && (
                <div>
                  <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: C.primary }}>Reception</p>
                  <div className="flex items-center gap-2">
                    <Clock size={15} style={{ color: C.primary }} />
                    <span style={{ color: C.text }}>{formatTime(invitation.reception_time)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* Message */}
      {invitation.personal_message && (
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="py-16 px-10 md:px-16" style={{ background: C.accent }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl leading-relaxed italic" style={{ color: '#E8E2DA' }}>
              "{invitation.personal_message}"
            </p>
          </div>
        </motion.section>
      )}

      {/* Timeline */}
      {invitation.timeline?.length > 0 && (
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="py-20 px-10 md:px-16 max-w-2xl mx-auto"
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-10" style={{ color: C.primary }}>The Day</p>
          <div className="space-y-6">
            {invitation.timeline.map((e, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="text-sm font-mono shrink-0 w-16" style={{ color: C.muted }}>{e.time}</span>
                <div>
                  <p className="font-medium" style={{ color: C.text }}>{e.emoji} {e.title}</p>
                  {e.description && <p className="text-sm mt-0.5" style={{ color: C.muted }}>{e.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Dress code */}
      {invitation.dress_code && (
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="py-12 px-10 text-center border-t border-b" style={{ borderColor: C.border }}
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: C.primary }}>Dress Code</p>
          <p className="text-lg" style={{ color: C.text }}>{invitation.dress_code}</p>
        </motion.section>
      )}

      {/* Extra sections */}
      <SharedSections invitation={invitation} theme={SECTION_THEME} labels={labels} />

      {/* RSVP */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="py-20 px-10 md:px-16 max-w-xl mx-auto"
      >
        <p className="text-xs tracking-[0.5em] uppercase mb-2" style={{ color: C.primary }}>{labels.rsvp_title}</p>
        {invitation.rsvp_deadline && (
          <p className="text-sm mb-8" style={{ color: C.muted }}>{labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}</p>
        )}
        <RSVPForm invitationId={invitation.id} packageType={invitation.package} accentColor={C.primary} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} labels={labels} />
      </motion.section>

      <footer className="py-6 text-center text-xs tracking-widest" style={{ color: C.muted, borderTop: `1px solid ${C.border}` }}>
        {invitation.partner1_name} & {invitation.partner2_name}
      </footer>
    </div>
  )
}
