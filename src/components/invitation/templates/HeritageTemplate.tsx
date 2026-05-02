'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import { RSVPForm } from '../RSVPForm'
import type { Invitation } from '@/types'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const C = { bg: '#F4F1EB', primary: '#B8960C', accent: '#2C4A2C', text: '#1C1C1C', muted: '#5A5A5A', border: '#DDD8CE' }

export function HeritageTemplate({ invitation }: { invitation: Invitation }) {
  const daysLeft = daysUntilWedding(invitation.wedding_date)

  return (
    <div style={{ background: C.bg, fontFamily: 'var(--font-cormorant), Georgia, serif' }}>

      {/* Hero — classic centred with border frame */}
      <section className="min-h-screen flex items-center justify-center px-8 py-20">
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.8 }}
          className="text-center max-w-xl w-full"
        >
          {/* Ornamental frame */}
          <div className="border-2 p-10 sm:p-14 relative" style={{ borderColor: C.primary }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4" style={{ background: C.bg }}>
              <span className="text-lg" style={{ color: C.primary }}>✦</span>
            </div>

            <p className="text-xs tracking-[0.6em] uppercase mb-8" style={{ color: C.accent }}>
              Request the honour of your presence
            </p>

            <div style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(3rem,8vw,5.5rem)', color: C.accent, lineHeight: 1.1 }}>
              {invitation.partner1_name}
            </div>
            <p className="text-base tracking-widest my-3" style={{ color: C.muted }}>AND</p>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(3rem,8vw,5.5rem)', color: C.accent, lineHeight: 1.1 }}>
              {invitation.partner2_name}
            </div>

            <div className="my-6 flex items-center justify-center gap-3">
              <div className="h-px flex-1" style={{ background: C.primary + '60' }} />
              <span style={{ color: C.primary }}>✦</span>
              <div className="h-px flex-1" style={{ background: C.primary + '60' }} />
            </div>

            <p className="text-xl tracking-[0.15em]" style={{ color: C.text }}>
              {formatDate(invitation.wedding_date, 'MMMM d, yyyy').toUpperCase()}
            </p>

            {invitation.venue_name && (
              <p className="mt-2 text-base" style={{ color: C.muted }}>{invitation.venue_name}</p>
            )}

            {daysLeft > 0 && (
              <p className="mt-4 text-sm" style={{ color: C.muted }}>{daysLeft} days remaining</p>
            )}

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4" style={{ background: C.bg }}>
              <span className="text-lg" style={{ color: C.primary }}>✦</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Details */}
      {(invitation.venue_address || invitation.ceremony_time) && (
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="py-20 px-8"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-3xl" style={{ fontFamily: 'var(--font-cormorant)', color: C.accent }}>
              Ceremony & Celebration
            </h2>

            {invitation.venue_address && (
              <div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <MapPin size={16} style={{ color: C.primary }} />
                  <span className="font-medium" style={{ color: C.text }}>{invitation.venue_name}</span>
                </div>
                <p className="text-sm" style={{ color: C.muted }}>{invitation.venue_address}</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs mt-2 inline-block" style={{ color: C.primary }}>
                  View in Google Maps →
                </a>
              </div>
            )}

            <div className="flex justify-center gap-16">
              {invitation.ceremony_time && (
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: C.primary }}>Ceremony</p>
                  <p className="text-lg" style={{ color: C.text }}>{formatTime(invitation.ceremony_time)}</p>
                </div>
              )}
              {invitation.reception_time && (
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: C.primary }}>Reception</p>
                  <p className="text-lg" style={{ color: C.text }}>{formatTime(invitation.reception_time)}</p>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}

      {/* Personal message */}
      {invitation.personal_message && (
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="py-16 px-8 text-center"
          style={{ background: C.accent + '08' }}
        >
          <div className="max-w-xl mx-auto">
            <span className="text-2xl" style={{ color: C.primary }}>❝</span>
            <p className="text-lg leading-relaxed mt-2" style={{ color: C.text }}>{invitation.personal_message}</p>
            <span className="text-2xl" style={{ color: C.primary }}>❞</span>
          </div>
        </motion.section>
      )}

      {/* Timeline */}
      {invitation.timeline?.length > 0 && (
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="py-20 px-8 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl text-center mb-12" style={{ fontFamily: 'var(--font-cormorant)', color: C.accent }}>
            Order of the Day
          </h2>
          <div className="space-y-6">
            {invitation.timeline.map((e, i) => (
              <div key={i} className="flex gap-6 items-start border-b pb-6" style={{ borderColor: C.border }}>
                <span className="text-2xl shrink-0">{e.emoji ?? '✦'}</span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-medium text-lg" style={{ color: C.text }}>{e.title}</p>
                    <p className="text-sm shrink-0" style={{ color: C.primary }}>{e.time}</p>
                  </div>
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
          className="py-12 px-8 text-center"
          style={{ background: C.accent, color: '#F4F1EB' }}
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-2 opacity-70">Dress Code</p>
          <p className="text-xl">{invitation.dress_code}</p>
        </motion.section>
      )}

      {/* RSVP */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="py-20 px-8 max-w-xl mx-auto"
      >
        <h2 className="text-3xl text-center mb-2" style={{ fontFamily: 'var(--font-cormorant)', color: C.accent }}>
          Kindly Reply
        </h2>
        {invitation.rsvp_deadline && (
          <p className="text-sm text-center mb-8" style={{ color: C.muted }}>
            Please respond by {formatDate(invitation.rsvp_deadline)}
          </p>
        )}
        <RSVPForm invitationId={invitation.id} packageType={invitation.package} accentColor={C.primary} />
      </motion.section>

      <footer className="py-8 text-center text-xs tracking-widest" style={{ color: C.muted, borderTop: `1px solid ${C.border}` }}>
        {invitation.partner1_name} & {invitation.partner2_name} · {new Date(invitation.wedding_date).getFullYear()}
      </footer>
    </div>
  )
}
