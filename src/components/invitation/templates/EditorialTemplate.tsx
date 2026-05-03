'use client'

import { motion } from 'framer-motion'
import { formatDate, daysUntilWedding } from '@/lib/utils/format'
import { RSVPForm } from '../RSVPForm'
import type { Invitation, RSVPResponse } from '@/types'
import { SharedSections, DirectContactCard, getEffectiveLabels } from '../InvitationSections'
import type { SectionTheme } from '../InvitationSections'

export interface RSVPFormData {
  guest_name: string; email?: string; attending: boolean
  adults: number; children: number
  menu_choice?: 'meat' | 'fish' | 'vegetarian' | 'vegan'
  allergies?: string; message?: string
}

const C = {
  bg: '#f8f5f0',
  black: '#0e0e0e',
  accent: '#c8553d',
  gray: '#8a8278',
  lightGray: '#e8e4de',
  warm: '#f2ede5',
}

const THEME: SectionTheme = {
  bg: C.bg, bgAlt: C.warm, text: C.black, muted: C.gray,
  accent: C.accent, rule: C.lightGray, card: C.warm,
}

const fade = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function EditorialTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const labels = getEffectiveLabels(invitation)
  const year = new Date(invitation.wedding_date).getFullYear()

  const playfair = 'var(--font-playfair), "Playfair Display", Georgia, serif'
  const mono = 'var(--font-mono-dm), "DM Mono", "Courier New", monospace'

  return (
    <div style={{ background: C.bg, color: C.black, fontFamily: mono, overflowX: 'hidden' }}>
      <style>{`
        @media (max-width: 900px) {
          .ed-hero { grid-template-columns: 1fr !important; }
          .ed-hero-left { min-height: 60vh; padding: 4rem 2rem !important; }
          .ed-hero-right { padding: 3rem 2rem !important; }
          .ed-program { grid-template-columns: 1fr !important; }
          .ed-sidebar { border-right: none !important; border-bottom: 1px solid ${C.black} !important; }
          .ed-venue { grid-template-columns: 1fr !important; }
          .ed-venue-info { border-right: none !important; border-bottom: 1px solid ${C.black} !important; }
          .ed-rsvp { grid-template-columns: 1fr !important; gap: 3rem !important; padding: 4rem 2rem !important; }
          .ed-topbar { padding: 1rem 1.5rem !important; }
          .ed-topbar-center { display: none; }
        }
      `}</style>

      {/* TOP BAR */}
      <nav className="ed-topbar" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 3rem', borderBottom: `1px solid ${C.black}`, background: C.bg }}>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gray }}>
          Vol. I · {year}
        </span>
        <span className="ed-topbar-center" style={{ fontFamily: playfair, fontSize: '0.9rem', letterSpacing: '0.1em' }}>
          {invitation.partner1_name} &amp; {invitation.partner2_name}
        </span>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {invitation.venue_name ?? ''}
        </span>
      </nav>

      {/* HERO */}
      <section className="ed-hero" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', paddingTop: 60 }}>
        {/* Left — dark */}
        <div className="ed-hero-left" style={{ borderRight: `1px solid ${C.black}`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '5rem 4rem', position: 'relative', overflow: 'hidden', background: C.black }}>
          <div style={{ position: 'absolute', top: '5rem', left: '4rem', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
            01 / {labels.save_the_date}
          </div>
          <div aria-hidden style={{ fontFamily: playfair, fontWeight: 700, fontSize: 'clamp(120px,18vw,220px)', lineHeight: 0.85, color: 'rgba(255,255,255,0.05)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none' }}>
            {year}
          </div>
          <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 1 }} style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.6)', fontSize: '0.6rem', letterSpacing: '0.35em', padding: '0.6rem 1.2rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
              {formatDate(invitation.wedding_date, 'EEEE · d. MMMM yyyy')}
            </div>
            <h1 style={{ fontFamily: playfair, fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 400, fontStyle: 'italic', color: 'white', lineHeight: 1.1, marginBottom: '2rem' }}>
              {invitation.partner1_name}<br />&amp; {invitation.partner2_name}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', lineHeight: 2 }}>
              {labels.together_with_families}
            </p>
          </motion.div>
        </div>

        {/* Right — light */}
        <div className="ed-hero-right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '5rem 4rem', position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: C.gray, marginBottom: '0.5rem' }}>
              {labels.save_the_date}
            </span>
            <h2 style={{ fontFamily: playfair, fontSize: '1.8rem', fontWeight: 700, textAlign: 'right', lineHeight: 1.2 }}>
              {year}
            </h2>
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ fontFamily: playfair, fontStyle: 'italic', fontSize: 'clamp(6rem,14vw,11rem)', color: C.accent, lineHeight: 1, display: 'block' }}>
              &amp;
            </span>
            {invitation.personal_message && (
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: C.gray, marginTop: '1rem', lineHeight: 2, maxWidth: 280 }}>
                {invitation.personal_message}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: '2rem', borderTop: `1px solid ${C.lightGray}` }}>
            {invitation.show_countdown && daysLeft > 0 && (
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: playfair, fontSize: '2rem', fontWeight: 700, display: 'block' }}>{daysLeft}</span>
                <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: C.gray, display: 'block', marginTop: '0.3rem' }}>{labels.days}</span>
              </div>
            )}
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: playfair, fontSize: '2rem', fontWeight: 700, display: 'block' }}>1</span>
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: C.gray, display: 'block', marginTop: '0.3rem' }}>
                {labels.save_the_date}
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: playfair, fontSize: '2rem', fontWeight: 700, display: 'block' }}>∞</span>
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: C.gray, display: 'block', marginTop: '0.3rem' }}>
                {labels.footer_tagline}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* STRIPE DIVIDER */}
      <div style={{ height: 4, background: C.accent, position: 'relative', overflow: 'visible' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: C.accent, color: 'white', fontSize: '0.55rem', letterSpacing: '0.5em', padding: '0.5rem 2rem', textTransform: 'uppercase', whiteSpace: 'nowrap', zIndex: 1 }}>
          {invitation.venue_name ? `${invitation.venue_name} · ` : ''}{formatDate(invitation.wedding_date, 'd. MMMM yyyy')}
        </div>
      </div>

      {/* TIMELINE / PROGRAM */}
      {invitation.timeline?.length > 0 && (
        <motion.div className="ed-program" variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ display: 'grid', gridTemplateColumns: '300px 1fr', minHeight: '60vh' }}
        >
          <div className="ed-sidebar" style={{ borderRight: `1px solid ${C.black}`, padding: '4rem 3rem', background: C.warm, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: C.accent, marginBottom: '1rem' }}>
              {labels.program}
            </p>
            <h2 style={{ fontFamily: playfair, fontSize: '2.2rem', lineHeight: 1.2, marginBottom: '2rem' }}>
              {invitation.partner1_name} &amp; {invitation.partner2_name}
            </h2>
            <p style={{ fontSize: '0.75rem', lineHeight: 2, color: C.gray }}>
              {formatDate(invitation.wedding_date, 'd. MMMM yyyy')}
            </p>
          </div>
          <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {invitation.timeline.map((event, i) => (
              <motion.div key={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ display: 'grid', gridTemplateColumns: '100px 1px 1fr', gap: '0 2rem', padding: '1.8rem 0', borderBottom: `1px solid ${C.lightGray}`, alignItems: 'start' }}
              >
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: C.accent, paddingTop: '0.2rem' }}>
                  {event.time}
                </div>
                <div style={{ background: C.lightGray, width: 1 }} />
                <div>
                  <h3 style={{ fontFamily: playfair, fontSize: '1.2rem', marginBottom: '0.3rem', fontWeight: 400 }}>
                    {event.title}
                  </h3>
                  {event.description && (
                    <p style={{ fontSize: '0.7rem', color: C.gray, lineHeight: 1.7 }}>{event.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* VENUE */}
      {(invitation.venue_name || invitation.venue_address) && (
        <motion.div className="ed-venue" variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: `1px solid ${C.black}` }}
        >
          <div className="ed-venue-info" style={{ padding: '5rem 4rem', borderRight: `1px solid ${C.black}` }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gray, marginBottom: '2rem' }}>
              {labels.venue}
            </p>
            <h2 style={{ fontFamily: playfair, fontSize: '2.5rem', fontStyle: 'italic', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              {invitation.venue_name}
            </h2>
            {invitation.venue_address && (
              <>
                <div style={{ fontSize: '0.75rem', lineHeight: 2.2, color: C.gray, borderLeft: `2px solid ${C.accent}`, paddingLeft: '1.5rem', marginTop: '1.5rem' }}>
                  {invitation.venue_address}
                </div>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent, textDecoration: 'none' }}>
                  {labels.google_maps} →
                </a>
              </>
            )}
          </div>
          {/* Map grid visual */}
          <div style={{ background: C.lightGray, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.bg} 1px, transparent 1px), linear-gradient(90deg, ${C.bg} 1px, transparent 1px)`, backgroundSize: '30px 30px', opacity: 0.6 }} />
            <div style={{ width: 16, height: 16, background: C.accent, borderRadius: '50%', position: 'relative', zIndex: 2, boxShadow: `0 0 0 6px rgba(200,85,61,0.2), 0 0 0 14px rgba(200,85,61,0.1)` }} />
            {invitation.venue_name && (
              <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', background: C.black, color: 'white', padding: '1rem 1.5rem', fontSize: '0.65rem', letterSpacing: '0.15em', zIndex: 2 }}>
                {invitation.venue_name}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* SHARED EXTRA SECTIONS */}
      <SharedSections invitation={invitation} theme={THEME} labels={labels} />

      {/* RSVP */}
      <motion.section className="ed-rsvp" variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
        style={{ padding: '6rem 4rem', background: C.black, color: 'white', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', borderTop: `4px solid ${C.accent}` }}
      >
        <div>
          <h2 style={{ fontFamily: playfair, fontSize: 'clamp(2.5rem,5vw,4rem)', fontStyle: 'italic', lineHeight: 1.1, marginBottom: '1.5rem', color: 'white' }}>
            {labels.rsvp_title}
          </h2>
          {invitation.rsvp_deadline && (
            <p style={{ fontSize: '0.7rem', lineHeight: 2.2, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>
              {labels.rsvp_deadline_prefix}<br />{formatDate(invitation.rsvp_deadline)}.
            </p>
          )}
        </div>
        <div>
          {invitation.rsvp_mode !== 'contact' && (
            <RSVPForm
              invitationId={invitation.id}
              packageType={invitation.package}
              onSubmit={onRSVPSubmit}
              existingRSVP={existingRSVP}
              accentColor={C.accent}
              bgColor='#1a1a1a'
              textColor='#f8f5f0'
              mutedColor='rgba(248,245,240,0.5)'
              labels={labels}
            />
          )}
          {(invitation.rsvp_mode === 'contact' || invitation.rsvp_mode === 'both') && (
            <div style={{ marginTop: invitation.rsvp_mode === 'both' ? 32 : 0 }}>
              <DirectContactCard invitation={invitation} theme={{ ...THEME, bg: '#1a1a1a', bgAlt: '#222', card: '#1a1a1a', text: '#f8f5f0', muted: 'rgba(248,245,240,0.5)', rule: '#333' }} labels={labels} />
            </div>
          )}
        </div>
      </motion.section>

      {/* FOOTER */}
      <div style={{ background: C.accent, color: 'white', padding: '1.5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span>{invitation.partner1_name} &amp; {invitation.partner2_name} · {year}</span>
        {invitation.contact_email && <span>{invitation.contact_email}</span>}
        {invitation.venue_name && <span>{invitation.venue_name}</span>}
      </div>
    </div>
  )
}
