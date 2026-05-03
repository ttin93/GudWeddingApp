'use client'

import { motion } from 'framer-motion'
import { formatDate, formatTime, daysUntilWedding } from '@/lib/utils/format'
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
  bg: '#FBF6F4', blush: '#F4D8DC', blushDeep: '#E8B5BE',
  lavender: '#D8C9E2', lavDeep: '#B89BC9',
  rose: '#C58B97', ink: '#5C4750', ink2: '#8C7681', mute: '#B8A6AD',
  rule: '#EDDBE0',
}

const THEME: SectionTheme = {
  bg: C.bg, bgAlt: '#FDF0F3', text: C.ink, muted: C.ink2,
  accent: C.rose, rule: C.rule, card: '#fff',
}

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

const parisienne = 'var(--font-parisienne), "Parisienne", cursive'
const cormorant = 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif'
const sans = 'var(--font-instrument), "Quicksand", sans-serif'

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function WatercolorTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const labels = getEffectiveLabels(invitation)
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const year = new Date(invitation.wedding_date).getFullYear()

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: sans, overflowX: 'hidden' }}>
      {/* Fixed watercolor wash */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 80% 60% at 20% 15%, rgba(244,216,220,0.6), transparent 60%), radial-gradient(ellipse 70% 50% at 85% 75%, rgba(216,201,226,0.55), transparent 60%), radial-gradient(ellipse 50% 40% at 50% 50%, rgba(197,139,151,0.08), transparent 60%)` }} />

      {/* NAV */}
      <nav style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '28px 48px', fontSize: 13, letterSpacing: '0.05em' }}>
        <div style={{ fontFamily: parisienne, fontSize: 28, color: C.rose }}>{invitation.partner1_name} &amp; {invitation.partner2_name}</div>
        <div style={{ display: 'flex', gap: 28, color: C.ink2, fontSize: 12 }}>
          {invitation.timeline?.length > 0 && <span>{labels.program}</span>}
          {invitation.venue_name && <span>{labels.venue}</span>}
          <span>RSVP</span>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', zIndex: 1, minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 40px 100px' }}>
        {/* Botanical petals */}
        <svg style={{ position: 'absolute', top: '5%', left: '3%', width: 200, opacity: 0.7, pointerEvents: 'none' }} viewBox="0 0 200 240" fill="none">
          <path d="M100,220 Q70,150 100,40 Q130,150 100,220" stroke={C.blushDeep} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <ellipse cx="65" cy="120" rx="28" ry="9" transform="rotate(-40 65 120)" fill={C.blush} opacity="0.6"/>
          <ellipse cx="135" cy="100" rx="30" ry="9" transform="rotate(35 135 100)" fill={C.lavender} opacity="0.6"/>
          <ellipse cx="78" cy="60" rx="20" ry="7" transform="rotate(-55 78 60)" fill={C.blushDeep} opacity="0.5"/>
          <circle cx="100" cy="40" r="10" fill={C.rose} opacity="0.5"/>
          <circle cx="100" cy="40" r="6" fill={C.blushDeep} opacity="0.4"/>
        </svg>
        <svg style={{ position: 'absolute', bottom: '5%', right: '3%', width: 220, opacity: 0.7, pointerEvents: 'none', transform: 'rotate(180deg)' }} viewBox="0 0 200 240" fill="none">
          <path d="M100,220 Q70,150 100,40 Q130,150 100,220" stroke={C.lavDeep} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <ellipse cx="65" cy="120" rx="28" ry="9" transform="rotate(-40 65 120)" fill={C.lavender} opacity="0.6"/>
          <ellipse cx="135" cy="100" rx="30" ry="9" transform="rotate(35 135 100)" fill={C.blush} opacity="0.6"/>
          <circle cx="100" cy="40" r="10" fill={C.rose} opacity="0.45"/>
        </svg>

        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 1.2 }} style={{ maxWidth: 760 }}>
          <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 22, color: C.ink2, marginBottom: 24 }}>{labels.together_with_families}</div>
          <h1 style={{ fontFamily: parisienne, fontSize: 'clamp(80px,12vw,180px)', lineHeight: 0.95, color: C.ink, marginBottom: 8 }}>
            {invitation.partner1_name}
          </h1>
          <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 32, color: C.rose, margin: '8px 0' }}>&amp;</div>
          <h1 style={{ fontFamily: parisienne, fontSize: 'clamp(80px,12vw,180px)', lineHeight: 0.95, color: C.ink, marginBottom: 32 }}>
            {invitation.partner2_name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, fontSize: 13, letterSpacing: '0.25em', textTransform: 'uppercase', color: C.ink2 }}>
            <div style={{ height: 1, width: 48, background: C.blushDeep }} />
            {formatDate(invitation.wedding_date, 'd. MMMM yyyy')}
            <div style={{ height: 1, width: 48, background: C.blushDeep }} />
          </div>
          {invitation.venue_name && (
            <div style={{ marginTop: 16, fontFamily: cormorant, fontStyle: 'italic', fontSize: 22, color: C.ink2 }}>
              {invitation.venue_name}
            </div>
          )}
        </motion.div>
      </section>

      {/* COUNTDOWN */}
      {invitation.show_countdown && daysLeft > 0 && (
        <section style={{ position: 'relative', zIndex: 1, padding: '80px 40px', textAlign: 'center' }}>
          <div style={{ fontFamily: parisienne, fontSize: 40, color: C.rose, marginBottom: 40 }}>{labels.save_the_date}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
            {[{ n: daysLeft, l: labels.days }, { n: Math.max(0, Math.floor((new Date(invitation.wedding_date).getTime() - Date.now()) / 36e5) % 24), l: labels.hours }, { n: Math.max(0, Math.floor((new Date(invitation.wedding_date).getTime() - Date.now()) / 6e4) % 60), l: labels.minutes }].map(({ n, l }, i) => (
              <div key={i} style={{ width: 140, padding: '28px 16px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', borderRadius: '50%', border: `1px solid ${C.rule}`, boxShadow: `0 12px 32px -16px rgba(197,139,151,0.35)` }}>
                <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 56, lineHeight: 1, color: C.ink }}>{n}</div>
                <div style={{ marginTop: 10, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.rose }}>{l}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* QUOTE */}
      {invitation.personal_message && (
        <section style={{ position: 'relative', zIndex: 1, padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 'clamp(22px,3vw,36px)', lineHeight: 1.55, color: C.ink, maxWidth: 760, margin: '0 auto' }}>
            {invitation.personal_message}
          </p>
        </section>
      )}

      {/* TIMELINE */}
      {invitation.timeline?.length > 0 && (
        <section style={{ position: 'relative', zIndex: 1, padding: '80px 40px' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <div style={{ fontFamily: parisienne, fontSize: 36, color: C.rose, marginBottom: 8 }}>{labels.program}</div>
            </div>
            {invitation.timeline.map((ev, i) => (
              <motion.div key={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 28, padding: '20px 0', borderBottom: `1px solid ${C.rule}` }}>
                <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 20, color: C.rose, textAlign: 'right' }}>{ev.time}</div>
                <div>
                  <div style={{ fontFamily: cormorant, fontSize: 24, color: C.ink }}>{ev.title}</div>
                  {ev.description && <div style={{ fontSize: 13, color: C.ink2, marginTop: 4, lineHeight: 1.6 }}>{ev.description}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* VENUE */}
      {(invitation.venue_name || invitation.venue_address) && (
        <section style={{ position: 'relative', zIndex: 1, padding: '80px 40px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: parisienne, fontSize: 36, color: C.rose, marginBottom: 12 }}>{labels.venue}</div>
              <h3 style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 40, color: C.ink, fontWeight: 300, marginBottom: 12 }}>{invitation.venue_name}</h3>
              {invitation.venue_address && <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 18, color: C.ink2, lineHeight: 1.6, marginBottom: 20 }}>{invitation.venue_address}</div>}
              {(invitation.ceremony_time || invitation.reception_time) && (
                <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
                  {invitation.ceremony_time && <div><div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.mute }}>{labels.ceremony}</div><div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 24, color: C.rose }}>{formatTime(invitation.ceremony_time)}</div></div>}
                  {invitation.reception_time && <div><div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.mute }}>{labels.reception}</div><div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 24, color: C.rose }}>{formatTime(invitation.reception_time)}</div></div>}
                </div>
              )}
              {invitation.venue_address && (
                <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', padding: '12px 24px', borderRadius: 80, background: `linear-gradient(135deg, ${C.blushDeep}, ${C.lavDeep})`, color: '#fff', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
                  {labels.google_maps}
                </a>
              )}
            </div>
            <div style={{ aspectRatio: '1/1', background: `radial-gradient(ellipse at center, ${C.blush}, ${C.bg})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px dashed ${C.blushDeep}` }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: parisienne, fontSize: 28, color: C.rose, marginBottom: 8 }}>{invitation.venue_name}</div>
                <div style={{ width: 8, height: 8, background: C.rose, borderRadius: '50%', margin: '0 auto', boxShadow: `0 0 0 8px rgba(197,139,151,0.2)` }} />
              </div>
            </div>
          </div>
        </section>
      )}

      <SharedSections invitation={invitation} theme={THEME} labels={labels} />

      {/* RSVP */}
      <section style={{ position: 'relative', zIndex: 1, padding: '100px 40px', background: `linear-gradient(180deg, ${C.bg}, #FDF0F3)` }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: parisienne, fontSize: 40, color: C.rose, marginBottom: 8 }}>{labels.rsvp_title}</div>
            {invitation.rsvp_deadline && <p style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 18, color: C.ink2 }}>{labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}</p>}
          </div>
          <div style={{ background: '#fff', padding: '56px 48px', borderRadius: 24, border: `1px dashed ${C.blushDeep}`, boxShadow: `0 32px 64px -32px rgba(197,139,151,0.3)` }}>
            {invitation.rsvp_mode !== 'contact' && (
              <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.rose} bgColor="#fff" textColor={C.ink} mutedColor={C.ink2} labels={labels} />
            )}
            {(invitation.rsvp_mode === 'contact' || invitation.rsvp_mode === 'both') && (
              <div style={{ marginTop: invitation.rsvp_mode === 'both' ? 32 : 0 }}>
                <DirectContactCard invitation={invitation} theme={THEME} labels={labels} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: 'relative', zIndex: 1, padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ fontFamily: parisienne, fontSize: 'clamp(56px,8vw,100px)', color: C.rose, lineHeight: 1, marginBottom: 16 }}>
          {invitation.partner1_name} &amp; {invitation.partner2_name}
        </div>
        <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 20, color: C.ink2 }}>{formatDate(invitation.wedding_date, 'd. MMMM yyyy')}</div>
        <div style={{ marginTop: 24, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.mute }}>{labels.footer_tagline}</div>
      </footer>
    </div>
  )
}
