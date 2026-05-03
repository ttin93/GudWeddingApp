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
  bg: '#0B0E14', bg2: '#10141C', bg3: '#161B24',
  line: '#22293a', lineSoft: '#1a2030',
  ink: '#EDEAE0', ink2: '#C9C4B5', mute: '#7e8499',
  gold: '#C9A45C', goldSoft: '#E2C58D',
}

const THEME: SectionTheme = {
  bg: C.bg2, bgAlt: C.bg3, text: C.ink, muted: C.mute,
  accent: C.gold, rule: C.line, card: C.bg3,
}

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

const playfair = 'var(--font-playfair), "Playfair Display", Georgia, serif'
const mono = 'var(--font-mono-dm), "DM Mono", monospace'
const sans = 'var(--font-instrument), "Space Grotesk", sans-serif'

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function DarkGridTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const labels = getEffectiveLabels(invitation)
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const year = new Date(invitation.wedding_date).getFullYear()

  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: sans, overflowX: 'hidden', position: 'relative' }}>
      {/* Architectural grid lines */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`, backgroundSize: '120px 120px', opacity: 0.35 }} />

      {/* HERO — 3-column editorial grid */}
      <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', borderBottom: `1px solid ${C.line}` }}>
        {/* Corner brackets */}
        {[{ top: 14, left: 14, border: 'top left' }, { top: 14, right: 14, border: 'top right' }, { bottom: 14, left: 14, border: 'bottom left' }, { bottom: 14, right: 14, border: 'bottom right' }].map((pos, i) => (
          <div key={i} aria-hidden style={{ position: 'absolute', width: 20, height: 20, zIndex: 3, ...Object.fromEntries(Object.entries(pos).filter(([k]) => ['top','bottom','left','right'].includes(k))), borderTop: pos.border.includes('top') ? `1px solid ${C.gold}` : 'none', borderBottom: pos.border.includes('bottom') ? `1px solid ${C.gold}` : 'none', borderLeft: pos.border.includes('left') ? `1px solid ${C.gold}` : 'none', borderRight: pos.border.includes('right') ? `1px solid ${C.gold}` : 'none' }} />
        ))}

        {/* Left meta column */}
        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 0.8 }}
          style={{ padding: '80px 40px', borderRight: `1px solid ${C.line}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.36em', color: C.gold, textTransform: 'uppercase', marginBottom: 32 }}>No. 001</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {[{ label: 'Date', value: formatDate(invitation.wedding_date, 'd. MMMM yyyy') }, { label: 'Venue', value: invitation.venue_name ?? '—' }, { label: 'Year', value: String(year) }].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.mute, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: playfair, fontStyle: 'italic', fontSize: 18, color: C.ink2 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
          {invitation.ceremony_time && (
            <div>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.mute, marginBottom: 6 }}>{labels.ceremony}</div>
              <div style={{ fontFamily: playfair, fontStyle: 'italic', fontSize: 32, color: C.gold }}>{formatTime(invitation.ceremony_time)}</div>
            </div>
          )}
        </motion.div>

        {/* Center names */}
        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 1 }}
          style={{ padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.5em', color: C.mute, textTransform: 'uppercase', marginBottom: 48 }}>{labels.together_with_families}</div>
          <h1 style={{ fontFamily: playfair, fontSize: 'clamp(80px,10vw,168px)', fontWeight: 400, lineHeight: 0.92, color: C.ink, letterSpacing: '-0.01em' }}>
            {invitation.partner1_name}
            <span style={{ display: 'block', fontStyle: 'italic', color: C.gold, fontSize: '0.45em', margin: '12px 0' }}>&amp;</span>
            {invitation.partner2_name}
          </h1>
          <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ height: 1, width: 48, background: C.line }} />
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.36em', color: C.mute, textTransform: 'uppercase' }}>{formatDate(invitation.wedding_date, 'd · MM · yyyy')}</div>
            <div style={{ height: 1, width: 48, background: C.line }} />
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 0.8, delay: 0.2 }}
          style={{ padding: '80px 40px', borderLeft: `1px solid ${C.line}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {invitation.personal_message && (
            <div>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>Message</div>
              <p style={{ fontFamily: playfair, fontStyle: 'italic', fontSize: 17, color: C.ink2, lineHeight: 1.65 }}>{invitation.personal_message}</p>
            </div>
          )}
          {invitation.show_countdown && daysLeft > 0 && (
            <div style={{ marginTop: 'auto' }}>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.mute, marginBottom: 12 }}>{labels.days}</div>
              <div style={{ fontFamily: playfair, fontStyle: 'italic', fontSize: 72, color: C.gold, lineHeight: 1 }}>{daysLeft}</div>
              <div style={{ marginTop: 8, height: 2, background: C.line, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: C.gold, width: `${Math.min(100, (1 - daysLeft / 365) * 100)}%`, transition: 'width 1s' }} />
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* TIMELINE */}
      {invitation.timeline?.length > 0 && (
        <section style={{ position: 'relative', zIndex: 1, padding: '120px 80px', borderBottom: `1px solid ${C.line}` }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 80 }}>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.gold, whiteSpace: 'nowrap' }}>{labels.program}</div>
              <div style={{ flex: 1, height: 1, background: C.line }} />
              <div style={{ fontFamily: playfair, fontStyle: 'italic', fontSize: 40, color: C.ink, lineHeight: 1 }}>
                {invitation.partner1_name} &amp; {invitation.partner2_name}
              </div>
            </div>
            {invitation.timeline.map((ev, i) => (
              <motion.div key={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ display: 'grid', gridTemplateColumns: '80px 1px 1fr', gap: '0 32px', padding: '28px 0', borderBottom: `1px solid ${C.lineSoft}`, alignItems: 'start' }}>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', color: C.gold, paddingTop: 2 }}>{ev.time}</div>
                <div style={{ background: C.line }} />
                <div>
                  <div style={{ fontFamily: playfair, fontSize: 20, color: C.ink, marginBottom: 4 }}>{ev.title}</div>
                  {ev.description && <div style={{ fontFamily: mono, fontSize: 11, color: C.mute, lineHeight: 1.6 }}>{ev.description}</div>}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* VENUE */}
      {(invitation.venue_name || invitation.venue_address) && (
        <section style={{ position: 'relative', zIndex: 1, padding: '120px 80px', borderBottom: `1px solid ${C.line}` }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.5em', color: C.mute, textTransform: 'uppercase', marginBottom: 20 }}>{labels.venue}</div>
              <h3 style={{ fontFamily: playfair, fontStyle: 'italic', fontSize: 48, color: C.ink, fontWeight: 300, marginBottom: 20, lineHeight: 1.1 }}>{invitation.venue_name}</h3>
              {invitation.venue_address && <div style={{ fontFamily: mono, fontSize: 12, color: C.mute, lineHeight: 1.8 }}>{invitation.venue_address}</div>}
              {invitation.venue_address && (
                <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-block', marginTop: 24, fontFamily: mono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.gold, textDecoration: 'none', borderBottom: `1px solid ${C.gold}`, paddingBottom: 2 }}>
                  {labels.google_maps} →
                </a>
              )}
            </div>
            <div style={{ position: 'relative', aspectRatio: '4/3', background: C.bg2, border: `1px solid ${C.line}` }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                <div style={{ width: 12, height: 12, background: C.gold, borderRadius: '50%', margin: '0 auto', boxShadow: `0 0 0 6px rgba(201,164,92,0.2), 0 0 0 12px rgba(201,164,92,0.1)` }} />
              </div>
              <div style={{ position: 'absolute', bottom: 16, left: 16, fontFamily: mono, fontSize: 9, letterSpacing: '0.3em', color: C.gold, textTransform: 'uppercase' }}>{invitation.venue_name}</div>
            </div>
          </div>
        </section>
      )}

      <SharedSections invitation={invitation} theme={THEME} labels={labels} />

      {/* RSVP */}
      <section style={{ position: 'relative', zIndex: 1, padding: '120px 80px', background: C.bg2, borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.5em', color: C.gold, textTransform: 'uppercase', marginBottom: 20 }}>03.</div>
          <h2 style={{ fontFamily: playfair, fontStyle: 'italic', fontSize: 56, color: C.ink, marginBottom: 16 }}>{labels.rsvp_title}</h2>
          {invitation.rsvp_deadline && <p style={{ fontFamily: mono, fontSize: 11, color: C.mute, letterSpacing: '0.2em', marginBottom: 60 }}>{labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}</p>}
          <div style={{ textAlign: 'left' }}>
            {invitation.rsvp_mode !== 'contact' && (
              <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.gold} bgColor={C.bg2} textColor={C.ink} mutedColor={C.mute} labels={labels} />
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
      <footer style={{ position: 'relative', zIndex: 1, padding: '48px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${C.line}` }}>
        <div style={{ fontFamily: playfair, fontStyle: 'italic', fontSize: 28, color: C.ink }}>{invitation.partner1_name} &amp; {invitation.partner2_name}</div>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.4em', color: C.mute, textTransform: 'uppercase' }}>{year}</div>
        <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.4em', color: C.mute, textTransform: 'uppercase' }}>{invitation.venue_name ?? labels.footer_tagline}</div>
      </footer>
    </div>
  )
}
