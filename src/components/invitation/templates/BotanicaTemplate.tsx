'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Heart } from 'lucide-react'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
import type { Invitation, RSVPResponse } from '@/types'
import { RSVPForm } from '../RSVPForm'
import { SharedSections, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

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

const SECTION_THEME: SectionTheme = {
  bg: '#FAF8F5', bgAlt: '#EFF4F0',
  text: '#1C1C1C', muted: '#6B6B6B',
  accent: '#2D4A3E', rule: '#C4847A30', card: '#FFFFFF',
}

export function BotanicaTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const colors = { bg: '#FAF8F5', primary: '#C4847A', accent: '#2D4A3E', text: '#1C1C1C', muted: '#6B6B6B' }
  const labels = getEffectiveLabels(invitation)

  return (
    <div className="min-h-screen" style={{ background: colors.bg, fontFamily: 'var(--font-cormorant), Georgia, serif' }}>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Botanical SVG bg */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D4A3E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <p className="text-sm tracking-[0.4em] uppercase mb-8" style={{ color: colors.accent }}>
            Together with their families
          </p>

          <div className="font-script text-6xl sm:text-7xl md:text-8xl mb-4" style={{ color: colors.primary, fontFamily: 'var(--font-script)' }}>
            {invitation.partner1_name}
          </div>
          <div className="text-2xl tracking-widest mb-4" style={{ color: colors.muted }}>& </div>
          <div className="font-script text-6xl sm:text-7xl md:text-8xl" style={{ color: colors.primary, fontFamily: 'var(--font-script)' }}>
            {invitation.partner2_name}
          </div>

          <div className="my-8 flex items-center justify-center gap-4">
            <div className="h-px w-16" style={{ background: colors.accent }} />
            <Heart size={16} style={{ color: colors.primary }} fill={colors.primary} />
            <div className="h-px w-16" style={{ background: colors.accent }} />
          </div>

          <p className="text-2xl tracking-[0.2em]" style={{ color: colors.text }}>
            {formatDate(invitation.wedding_date, 'MMMM d, yyyy').toUpperCase()}
          </p>

          {daysLeft > 0 && (
            <p className="mt-4 text-base" style={{ color: colors.muted }}>
              {daysLeft} days to go
            </p>
          )}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-px h-12 mx-auto" style={{ background: `linear-gradient(to bottom, ${colors.accent}, transparent)` }} />
        </motion.div>
      </section>

      {/* ── Details ── */}
      {(invitation.venue_name || invitation.ceremony_time) && (
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="py-20 px-6"
        >
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl tracking-widest uppercase mb-8" style={{ color: colors.accent }}>
              The Celebration
            </h2>

            <div className="space-y-6">
              {invitation.venue_name && (
                <div className="flex items-start gap-3 text-left">
                  <MapPin size={18} style={{ color: colors.primary }} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-lg" style={{ color: colors.text }}>{invitation.venue_name}</p>
                    {invitation.venue_address && (
                      <p className="text-sm mt-0.5" style={{ color: colors.muted }}>{invitation.venue_address}</p>
                    )}
                  </div>
                </div>
              )}

              {invitation.ceremony_time && (
                <div className="flex items-center gap-3">
                  <Clock size={18} style={{ color: colors.primary }} />
                  <div>
                    <p className="font-medium" style={{ color: colors.text }}>Ceremony</p>
                    <p style={{ color: colors.muted }}>{formatTime(invitation.ceremony_time)}</p>
                  </div>
                </div>
              )}

              {invitation.reception_time && (
                <div className="flex items-center gap-3">
                  <Clock size={18} style={{ color: colors.primary }} />
                  <div>
                    <p className="font-medium" style={{ color: colors.text }}>Reception</p>
                    <p style={{ color: colors.muted }}>{formatTime(invitation.reception_time)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Maps link */}
            {invitation.venue_address && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 text-sm underline underline-offset-4"
                style={{ color: colors.accent }}
              >
                Open in Google Maps →
              </a>
            )}
          </div>
        </motion.section>
      )}

      {/* ── Personal message ── */}
      {invitation.personal_message && (
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="py-16 px-6"
          style={{ background: colors.accent + '0A' }}
        >
          <div className="max-w-lg mx-auto text-center">
            <div className="w-px h-12 mx-auto mb-6" style={{ background: colors.primary }} />
            <p className="text-xl leading-relaxed italic" style={{ color: colors.text }}>
              "{invitation.personal_message}"
            </p>
            <div className="w-px h-12 mx-auto mt-6" style={{ background: colors.primary }} />
          </div>
        </motion.section>
      )}

      {/* ── Timeline ── */}
      {invitation.timeline?.length > 0 && (
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="py-20 px-6"
        >
          <div className="max-w-lg mx-auto">
            <h2 className="text-3xl tracking-widest uppercase text-center mb-12" style={{ color: colors.accent }}>
              The Day
            </h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px" style={{ background: colors.primary + '40' }} />
              <div className="space-y-8 pl-12">
                {invitation.timeline.map((event, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-12 top-1 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                      style={{ background: colors.bg, border: `1px solid ${colors.primary}` }}>
                      {event.emoji ?? '♥'}
                    </div>
                    <p className="text-sm font-medium tracking-widest" style={{ color: colors.primary }}>{event.time}</p>
                    <p className="text-lg mt-0.5" style={{ color: colors.text }}>{event.title}</p>
                    {event.description && (
                      <p className="text-sm mt-0.5" style={{ color: colors.muted }}>{event.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ── Dress code ── */}
      {invitation.dress_code && (
        <motion.section
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="py-16 px-6 text-center"
        >
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl tracking-widest uppercase mb-4" style={{ color: colors.accent }}>Dress Code</h2>
            <p className="text-lg" style={{ color: colors.text }}>{invitation.dress_code}</p>
          </div>
        </motion.section>
      )}

      {/* ── Extra sections ── */}
      <SharedSections invitation={invitation} theme={SECTION_THEME} labels={labels} />

      {/* ── RSVP ── */}
      <motion.section
        variants={fadeUp} initial="hidden" whileInView="visible"
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="py-20 px-6"
        style={{ background: colors.accent + '08' }}
      >
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl tracking-widest uppercase text-center mb-2" style={{ color: colors.accent }}>
            {labels.rsvp_title}
          </h2>
          {invitation.rsvp_deadline && (
            <p className="text-center text-sm mb-8" style={{ color: colors.muted }}>
              {labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}
            </p>
          )}
          <RSVPForm
            invitationId={invitation.id}
            packageType={invitation.package}
            onSubmit={onRSVPSubmit}
            existingRSVP={existingRSVP}
            accentColor={colors.primary}
            labels={labels}
          />
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs tracking-widest" style={{ color: colors.muted }}>
        {invitation.partner1_name} & {invitation.partner2_name} — {new Date(invitation.wedding_date).getFullYear()}
      </footer>
    </div>
  )
}
