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
  bone: '#F4EFE6', bone2: '#EBE3D3',
  sage: '#8A9A7B', sageDeep: '#5C6B52',
  rose: '#C9876D', roseSoft: '#E0B8A4',
  ink: '#2E332B', inkSoft: '#5C6356', mute: '#8a8e82',
}

const THEME: SectionTheme = {
  bg: C.bone, bgAlt: C.bone2, text: C.ink, muted: C.inkSoft,
  accent: C.sageDeep, rule: C.bone2, card: '#fff',
}

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

const italiana = 'var(--font-italiana), "Italiana", Georgia, serif'
const caveat = 'var(--font-caveat), "Caveat", cursive'
const body = 'var(--font-instrument), "Manrope", sans-serif'

// Inline botanical SVG as a reusable component
function BotanicLeaf({ style }: { style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 300 300" fill="none" style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      <g stroke="#5C6B52" strokeWidth="1.4" strokeLinecap="round">
        <path d="M50,290 Q120,200 150,80 Q175,180 250,260"/>
        <path d="M150,200 Q90,180 60,140"/>
        <path d="M150,160 Q200,145 245,110"/>
        <path d="M150,120 Q110,100 90,60"/>
      </g>
      <g fill="#8A9A7B">
        <ellipse cx="80" cy="170" rx="22" ry="7" transform="rotate(-30 80 170)"/>
        <ellipse cx="220" cy="135" rx="24" ry="8" transform="rotate(30 220 135)"/>
        <ellipse cx="115" cy="80" rx="18" ry="6" transform="rotate(-50 115 80)"/>
        <ellipse cx="180" cy="220" rx="20" ry="7" transform="rotate(20 180 220)"/>
      </g>
      <circle cx="150" cy="80" r="9" fill="#C9876D"/>
      <circle cx="148" cy="76" r="5" fill="#E0B8A4"/>
    </svg>
  )
}

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function CoastalTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const labels = getEffectiveLabels(invitation)
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const year = new Date(invitation.wedding_date).getFullYear()

  return (
    <div style={{ background: C.bone, color: C.ink, fontFamily: body, fontWeight: 300, overflowX: 'hidden' }}>
      {/* Radial gradient wash */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1, background: `radial-gradient(60% 50% at 15% 10%, rgba(138,154,123,.18), transparent 70%), radial-gradient(50% 40% at 90% 30%, rgba(201,135,109,.14), transparent 70%), radial-gradient(50% 50% at 50% 90%, rgba(138,154,123,.12), transparent 70%)` }} />

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 40px', fontSize: 13, letterSpacing: '0.05em' }}>
        <div style={{ fontFamily: caveat, fontSize: 30, color: C.sageDeep, fontWeight: 500 }}>{invitation.partner1_name} &amp; {invitation.partner2_name}</div>
        <div style={{ display: 'flex', gap: 32, color: C.inkSoft }}>
          {invitation.timeline?.length > 0 && <span>{labels.program}</span>}
          {invitation.venue_name && <span>{labels.venue}</span>}
          <span>RSVP</span>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 40px 100px', overflow: 'hidden' }}>
        <BotanicLeaf style={{ top: 0, left: -40, width: 300, opacity: 0.85, transform: 'rotate(-15deg)' }} />
        <BotanicLeaf style={{ bottom: -20, right: -40, width: 340, opacity: 0.85, transform: 'rotate(165deg)' }} />
        <BotanicLeaf style={{ left: -80, top: '40%', width: 220, opacity: 0.5, transform: 'rotate(80deg)' }} />
        <BotanicLeaf style={{ right: -60, top: '50%', width: 200, opacity: 0.4, transform: 'rotate(-90deg)' }} />

        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 1.2 }} style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>
          <div style={{ fontFamily: caveat, fontSize: 30, color: C.rose, marginBottom: 18, fontWeight: 500 }}>— {labels.together_with_families} —</div>
          <h1 style={{ fontFamily: italiana, fontSize: 'clamp(72px,10vw,148px)', lineHeight: 1.02, color: C.ink, letterSpacing: '-0.005em', marginBottom: 8 }}>
            {invitation.partner1_name}
            <span style={{ fontFamily: caveat, color: C.rose, fontSize: '0.7em', display: 'inline-block', transform: 'translateY(-0.05em)', fontWeight: 400, margin: '0 0.1em' }}>&amp;</span>
            {invitation.partner2_name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: 32, fontSize: 13, letterSpacing: '0.4em', textTransform: 'uppercase', color: C.sageDeep }}>
            <span style={{ display: 'inline-block', width: 36, height: 1, background: C.sage }} />
            {formatDate(invitation.wedding_date, 'EEEE · d · MM · yyyy')}
            <span style={{ display: 'inline-block', width: 36, height: 1, background: C.sage }} />
          </div>
          {invitation.venue_name && (
            <div style={{ marginTop: 18, fontFamily: italiana, fontSize: 22, color: C.inkSoft, fontStyle: 'italic', letterSpacing: '0.02em' }}>
              {invitation.venue_name}
            </div>
          )}
        </motion.div>
      </section>

      {/* COUNTDOWN */}
      {invitation.show_countdown && daysLeft > 0 && (
        <section style={{ padding: '60px 0 100px', textAlign: 'center' }}>
          <div style={{ fontFamily: caveat, fontSize: 34, color: C.rose, marginBottom: 36, fontWeight: 500 }}>…{labels.days}…</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            {[{ n: daysLeft, l: labels.days }, { n: Math.max(0, Math.floor((new Date(invitation.wedding_date).getTime() - Date.now()) / 36e5) % 24), l: labels.hours }, { n: Math.max(0, Math.floor((new Date(invitation.wedding_date).getTime() - Date.now()) / 6e4) % 60), l: labels.minutes }].map(({ n, l }, i) => (
              <div key={i} style={{ width: 160, padding: '32px 16px', background: '#fff', borderRadius: '160px / 200px', border: `1px dashed ${C.sage}`, boxShadow: `0 18px 40px -24px rgba(92,107,82,0.3)`, transform: i === 1 ? 'translateY(-12px) rotate(-2deg)' : i === 2 ? 'translateY(8px) rotate(1.5deg)' : 'none' }}>
                <div style={{ fontFamily: italiana, fontSize: 64, lineHeight: 1, color: C.sageDeep }}>{n}</div>
                <div style={{ marginTop: 12, fontSize: 11, letterSpacing: '0.3em', color: C.rose, textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PERSONAL MESSAGE */}
      {invitation.personal_message && (
        <section style={{ padding: '80px 40px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginBottom: 32, color: C.sageDeep }}>
            <svg width="22" height="22" viewBox="0 0 22 22"><path d="M2,18 Q11,2 20,18" stroke="currentColor" fill="none" strokeWidth="1"/><ellipse cx="7" cy="13" rx="5" ry="2" transform="rotate(-30 7 13)" fill="currentColor"/><ellipse cx="15" cy="13" rx="5" ry="2" transform="rotate(30 15 13)" fill="currentColor"/></svg>
            <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="4" fill="#C9876D"/><circle cx="11" cy="11" r="2" fill="#E0B8A4"/></svg>
            <svg width="22" height="22" viewBox="0 0 22 22"><path d="M2,18 Q11,2 20,18" stroke="currentColor" fill="none" strokeWidth="1"/><ellipse cx="7" cy="13" rx="5" ry="2" transform="rotate(-30 7 13)" fill="currentColor"/><ellipse cx="15" cy="13" rx="5" ry="2" transform="rotate(30 15 13)" fill="currentColor"/></svg>
          </div>
          <p style={{ fontFamily: italiana, fontSize: 'clamp(26px,3.2vw,40px)', lineHeight: 1.4, color: C.ink, maxWidth: 880, margin: '0 auto', fontStyle: 'italic' }}>
            {invitation.personal_message}
          </p>
        </section>
      )}

      {/* TIMELINE */}
      {invitation.timeline?.length > 0 && (
        <section style={{ padding: '120px 0', background: `linear-gradient(180deg,transparent,rgba(138,154,123,.08))` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <div style={{ fontFamily: caveat, fontSize: 30, color: C.rose, fontWeight: 500 }}>{labels.program}</div>
              <h2 style={{ fontFamily: italiana, fontSize: 'clamp(48px,6vw,72px)', color: C.ink, margin: '8px 0 16px', letterSpacing: '-0.005em' }}>{labels.program}</h2>
            </div>
            <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 120, top: 24, bottom: 24, width: 1, background: `repeating-linear-gradient(to bottom, ${C.sage} 0, ${C.sage} 4px, transparent 4px, transparent 10px)` }} />
              {invitation.timeline.map((ev, i) => (
                <motion.div key={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ display: 'grid', gridTemplateColumns: '120px 24px 1fr', alignItems: 'center', gap: 24, padding: '24px 0', position: 'relative' }}>
                  <div style={{ fontFamily: italiana, fontStyle: 'italic', fontSize: 18, color: C.sageDeep, textAlign: 'right', letterSpacing: '0.04em' }}>{ev.time}</div>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: i === 0 ? C.rose : C.bone, border: `2px solid ${C.rose}`, justifySelf: 'center', position: 'relative', zIndex: 1 }} />
                  <div>
                    <div style={{ fontFamily: italiana, fontSize: 24, color: C.ink, letterSpacing: '0.005em' }}>{ev.title}</div>
                    {ev.description && <div style={{ fontFamily: body, fontSize: 12, color: C.mute, letterSpacing: '0.06em', marginTop: 4 }}>{ev.description}</div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* VENUE */}
      {(invitation.venue_name || invitation.venue_address) && (
        <section style={{ padding: '120px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div style={{ position: 'relative', aspectRatio: '1/1', background: '#fff', borderRadius: '50%', overflow: 'hidden', border: `1px dashed ${C.sage}`, boxShadow: `0 30px 60px -30px rgba(92,107,82,0.3)` }}>
              <svg viewBox="0 0 320 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="320" height="320" fill="#f0ebe1"/>
                <g stroke="#8A9A7B" strokeWidth="0.7" opacity="0.4">{Array.from({length:11},(_,i)=><line key={i} x1={i*32} y1="0" x2={i*32} y2="320"/>)}{Array.from({length:11},(_,i)=><line key={i} x1="0" y1={i*32} x2="320" y2={i*32}/>)}</g>
                <circle cx="160" cy="160" r="8" fill={C.rose}/>
                <circle cx="160" cy="160" r="18" fill="none" stroke={C.roseSoft} strokeWidth="1.5"/>
                <circle cx="160" cy="160" r="30" fill="none" stroke={C.sage} strokeWidth="0.8" strokeDasharray="4 4"/>
              </svg>
              <div style={{ position: 'absolute', inset: -12, border: `1px solid ${C.roseSoft}`, borderRadius: '50%', pointerEvents: 'none', opacity: 0.6 }} />
            </div>
            <div>
              <h3 style={{ fontFamily: italiana, fontSize: 56, color: C.ink, fontWeight: 400, letterSpacing: '-0.005em', marginBottom: 8 }}>{invitation.venue_name}</h3>
              {invitation.venue_address && <div style={{ fontFamily: caveat, color: C.rose, fontSize: 26, marginBottom: 24 }}>{invitation.venue_address}</div>}
              {(invitation.ceremony_time || invitation.reception_time) && (
                <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                  {invitation.ceremony_time && <div><div style={{ fontFamily: body, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: C.mute }}>{labels.ceremony}</div><div style={{ fontFamily: italiana, fontSize: 22, color: C.ink }}>{formatTime(invitation.ceremony_time)}</div></div>}
                  {invitation.reception_time && <div><div style={{ fontFamily: body, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: C.mute }}>{labels.reception}</div><div style={{ fontFamily: italiana, fontSize: 22, color: C.ink }}>{formatTime(invitation.reception_time)}</div></div>}
                </div>
              )}
              {invitation.venue_address && (
                <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 80, background: C.sageDeep, color: C.bone, fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none' }}>
                  {labels.google_maps}
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      <SharedSections invitation={invitation} theme={THEME} labels={labels} />

      {/* RSVP */}
      <section style={{ padding: '120px 0', background: `linear-gradient(180deg,${C.bone2},${C.bone})` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontFamily: caveat, fontSize: 30, color: C.rose, fontWeight: 500 }}>{labels.rsvp_title}</div>
            {invitation.rsvp_deadline && <p style={{ fontFamily: italiana, fontStyle: 'italic', fontSize: 20, color: C.inkSoft, marginTop: 12 }}>{labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}</p>}
          </div>
          <div style={{ maxWidth: 720, margin: '60px auto 0', background: '#fff', padding: '64px 56px', borderRadius: 24, border: `1px dashed ${C.sage}`, boxShadow: `0 40px 80px -40px rgba(92,107,82,0.4)`, position: 'relative' }}>
            {invitation.rsvp_mode !== 'contact' && (
              <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.sageDeep} bgColor="#fff" textColor={C.ink} mutedColor={C.mute} labels={labels} />
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
      <footer style={{ padding: '120px 40px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontFamily: caveat, fontSize: 'clamp(80px,11vw,140px)', color: C.rose, lineHeight: 1, marginBottom: 20, fontWeight: 500 }}>
          {invitation.partner1_name} &amp; {invitation.partner2_name}
        </div>
        <div style={{ fontFamily: italiana, fontStyle: 'italic', fontSize: 22, color: C.inkSoft, marginBottom: 48 }}>{formatDate(invitation.wedding_date, 'd. MMMM yyyy')}</div>
        <div style={{ fontFamily: caveat, fontSize: 22, color: C.mute }}>{labels.footer_tagline}</div>
      </footer>
    </div>
  )
}
