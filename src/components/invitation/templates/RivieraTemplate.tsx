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
  cream: '#F5EFE2', creamDeep: '#EDE4D1',
  ink: '#1F1A14', inkSoft: '#3a322a', mute: '#7a6f63',
  rule: '#e7dfd1', ruleSoft: '#d4c8b3',
  accent: '#9C6644', accentSoft: '#C89B7B',
}

const THEME: SectionTheme = {
  bg: C.cream, bgAlt: C.creamDeep, text: C.ink, muted: C.mute,
  accent: C.accent, rule: C.rule, card: C.creamDeep,
}

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

const pinyon = 'var(--font-pinyon), "Pinyon Script", cursive'
const cormorant = 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif'
const instrument = 'var(--font-instrument), "Instrument Sans", sans-serif'

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function RivieraTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const labels = getEffectiveLabels(invitation)
  const daysLeft = daysUntilWedding(invitation.wedding_date)
  const year = new Date(invitation.wedding_date).getFullYear()

  return (
    <div style={{ background: C.cream, color: C.ink, fontFamily: instrument, overflowX: 'hidden', position: 'relative' }}>
      {/* Grain overlay */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 200, opacity: 0.45, mixBlendMode: 'multiply', backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.10 0 0 0 0 0.08 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`, backgroundSize: '240px 240px' }} />

      {/* NAV */}
      <header style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 78, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.inkSoft }}>
          <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 20, letterSpacing: '0.02em', color: C.ink, textTransform: 'none' }}>
            {invitation.partner1_name} &amp; {invitation.partner2_name}
            <small style={{ display: 'block', fontStyle: 'normal', fontFamily: instrument, fontSize: 9, letterSpacing: '0.32em', color: C.mute, textTransform: 'uppercase' }}>
              {formatDate(invitation.wedding_date, 'd · MM · yyyy')}
            </small>
          </div>
          <div style={{ display: 'flex', gap: 36 }}>
            {invitation.timeline?.length > 0 && <span style={{ cursor: 'default' }}>{labels.program}</span>}
            {invitation.venue_name && <span style={{ cursor: 'default' }}>{labels.venue}</span>}
            <span style={{ cursor: 'default' }}>RSVP</span>
          </div>
        </nav>
      </header>
      <div style={{ height: 1, background: C.rule }} />

      {/* HERO */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 56px 120px', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 80, alignItems: 'end' }}>
        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 1 }} style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: -12, top: 0, writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: 9.5, letterSpacing: '0.4em', color: C.mute, textTransform: 'uppercase' }}>
            No. I · {invitation.venue_name ?? labels.save_the_date}
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 10.5, letterSpacing: '0.36em', color: C.mute, textTransform: 'uppercase', marginBottom: 36 }}>
            <div style={{ width: 32, height: 1, background: C.accent }} />
            {labels.together_with_families}
          </div>
          <h1 style={{ fontFamily: pinyon, fontSize: 'clamp(110px,15vw,200px)', lineHeight: 0.95, color: C.ink, fontWeight: 400, letterSpacing: '-0.01em' }}>
            {invitation.partner1_name}
            <span style={{ color: C.accent, fontSize: '0.7em', display: 'inline-block', transform: 'translateY(-0.15em)', margin: '0 0.05em' }}>&amp;</span>
            <br />{invitation.partner2_name}
          </h1>
          <div style={{ marginTop: 24, fontFamily: cormorant, fontStyle: 'italic', fontSize: 42, color: C.ink, letterSpacing: '0.05em' }}>
            {formatDate(invitation.wedding_date, 'EEEE')}
            <span style={{ display: 'inline-block', width: 5, height: 5, background: C.accent, borderRadius: '50%', verticalAlign: 'middle', margin: '0 14px', transform: 'translateY(-4px)' }} />
            {formatDate(invitation.wedding_date, 'd. MMMM')}
            <span style={{ display: 'inline-block', width: 5, height: 5, background: C.accent, borderRadius: '50%', verticalAlign: 'middle', margin: '0 14px', transform: 'translateY(-4px)' }} />
            {year}
          </div>
          {invitation.venue_name && (
            <div style={{ marginTop: 18, fontSize: 11, letterSpacing: '0.32em', color: C.mute, textTransform: 'uppercase' }}>
              {invitation.venue_name}{invitation.venue_address ? ` · ${invitation.venue_address}` : ''}
            </div>
          )}
        </motion.div>

        {/* Rotated card — photo if uploaded, else SVG illustration */}
        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 1, delay: 0.3 }}>
          <div style={{ position: 'relative', aspectRatio: '3/4', background: 'linear-gradient(160deg,#d8c8a8,#bda37c)', border: `1px solid ${C.ruleSoft}`, boxShadow: `0 30px 60px -30px rgba(31,26,20,0.4), 0 60px 120px -50px rgba(31,26,20,0.3)`, overflow: 'hidden', transform: 'rotate(2deg)', maxWidth: 380, marginLeft: 'auto' }}>
            {invitation.cover_photo_url ? (
              <img
                src={invitation.cover_photo_url}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="rv-sky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#e6d4af"/><stop offset=".55" stopColor="#c89b7b"/><stop offset="1" stopColor="#9c6644"/></linearGradient></defs>
                <rect width="300" height="400" fill="url(#rv-sky)"/>
                <circle cx="150" cy="170" r="58" fill="#f5efe2" opacity=".85"/>
                <rect x="0" y="240" width="300" height="160" fill="#7a4f30"/>
                <g fill="#3a261a"><ellipse cx="40" cy="240" rx="6" ry="40"/><ellipse cx="58" cy="245" rx="5" ry="35"/><ellipse cx="245" cy="240" rx="6" ry="42"/><ellipse cx="262" cy="248" rx="4" ry="32"/></g>
                <g fill="#f5efe2" opacity=".95"><rect x="110" y="200" width="80" height="50"/><polygon points="105,200 150,170 195,200"/><rect x="135" y="220" width="12" height="30" fill="#9c6644"/><rect x="155" y="220" width="12" height="30" fill="#9c6644"/><rect x="118" y="210" width="8" height="8" fill="#9c6644"/><rect x="174" y="210" width="8" height="8" fill="#9c6644"/></g>
                <g stroke="#f5efe2" strokeWidth="1" fill="none" opacity=".6"><path d="M0,310 Q30,304 60,310 T120,310 T180,310 T240,310 T300,310"/><path d="M0,330 Q30,324 60,330 T120,330 T180,330 T240,330 T300,330"/></g>
                <g stroke="#3a261a" strokeWidth="1.4" fill="none" strokeLinecap="round"><path d="M70,90 q5,-5 10,0 q5,-5 10,0"/><path d="M210,75 q4,-4 8,0 q4,-4 8,0"/></g>
              </svg>
            )}
            <div style={{ position: 'absolute', top: 18, right: 18, width: 64, height: 64, border: '1px solid rgba(245,239,226,0.8)', color: '#f5efe2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: cormorant, fontStyle: 'italic', fontSize: 11, textAlign: 'center', lineHeight: 1.2, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.85 }}>
              {invitation.cover_photo_badge ?? year}
            </div>
            <div style={{ position: 'absolute', left: 20, bottom: 20, color: '#f5efe2', fontFamily: cormorant, fontStyle: 'italic', fontSize: 14, letterSpacing: '0.06em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
              — {invitation.cover_photo_caption ?? invitation.venue_name ?? labels.save_the_date} —
            </div>
          </div>
        </motion.div>
      </section>

      {/* COUNTDOWN */}
      {invitation.show_countdown && daysLeft > 0 && (
        <section style={{ padding: '80px 0', borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}`, background: C.creamDeep }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.36em', color: C.mute, textTransform: 'uppercase', marginBottom: 10 }}>— {labels.save_the_date} —</div>
              <h2 style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 48, color: C.ink, letterSpacing: '0.01em' }}>{labels.days}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', maxWidth: 780, margin: '0 auto' }}>
              {[{ n: daysLeft, l: labels.days }, { n: Math.floor((new Date(invitation.wedding_date).getTime() - Date.now()) / 36e5) % 24, l: labels.hours }, { n: Math.floor((new Date(invitation.wedding_date).getTime() - Date.now()) / 6e4) % 60, l: labels.minutes }].map(({ n, l }, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '24px 0', position: 'relative', borderLeft: i > 0 ? `1px solid ${C.ruleSoft}` : 'none' }}>
                  <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 88, lineHeight: 1, color: C.ink, letterSpacing: '-0.01em', fontWeight: 300 }}>{Math.max(0, n)}</div>
                  <div style={{ marginTop: 14, fontSize: 10.5, letterSpacing: '0.36em', color: C.mute, textTransform: 'uppercase' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* QUOTE */}
      {invitation.personal_message && (
        <section style={{ padding: '140px 0', textAlign: 'center' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
            <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 120, lineHeight: 0.5, color: C.accent, opacity: 0.5, marginBottom: 40 }}>&ldquo;</div>
            <p style={{ fontFamily: cormorant, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(28px,3.4vw,42px)', lineHeight: 1.35, color: C.ink, maxWidth: 880, margin: '0 auto' }}>
              {invitation.personal_message}
            </p>
          </div>
        </section>
      )}

      {/* TIMELINE */}
      {invitation.timeline?.length > 0 && (
        <section style={{ padding: '120px 0', background: C.creamDeep, borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}` }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 14, color: C.accent, letterSpacing: '0.1em', marginBottom: 8 }}>01.</div>
              <h2 style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 64, color: C.ink, letterSpacing: '0.01em', fontWeight: 300, margin: '8px 0 12px' }}>{labels.program}</h2>
              <div style={{ fontSize: 11, letterSpacing: '0.36em', color: C.mute, textTransform: 'uppercase' }}>{formatDate(invitation.wedding_date, 'd. MMMM yyyy')}</div>
            </div>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              {invitation.timeline.map((ev, i) => (
                <motion.div key={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  style={{ display: 'grid', gridTemplateColumns: '160px 1fr auto', alignItems: 'baseline', gap: 32, padding: '24px 0', borderBottom: i < invitation.timeline.length - 1 ? `1px solid ${C.ruleSoft}` : 'none' }}>
                  <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 24, color: C.ink, letterSpacing: '0.04em' }}>{ev.time}</div>
                  <div>
                    <div style={{ fontFamily: cormorant, fontSize: 22, color: C.ink, letterSpacing: '0.01em' }}>{ev.title}</div>
                    {ev.description && <div style={{ fontSize: 13, color: C.mute, marginTop: 4 }}>{ev.description}</div>}
                  </div>
                  <div style={{ width: 8, height: 8, border: `1px solid ${C.accent}`, borderRadius: '50%', display: 'inline-block' }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* VENUE */}
      {(invitation.venue_name || invitation.ceremony_time) && (
        <section style={{ padding: '120px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative', aspectRatio: '5/4', border: `1px solid ${C.ruleSoft}`, background: '#dfd2b6', overflow: 'hidden' }}>
              <svg viewBox="0 0 400 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="320" fill="#dfd2b6"/>
                <g stroke="#c4b08a" strokeWidth="0.7" opacity="0.4">{Array.from({length:14},(_,i)=><line key={i} x1={i*30} y1="0" x2={i*30} y2="320"/>)}{Array.from({length:11},(_,i)=><line key={i} x1="0" y1={i*30} x2="400" y2={i*30}/>)}</g>
                <circle cx="200" cy="160" r="6" fill={C.accent}/>
                <circle cx="200" cy="160" r="14" fill="none" stroke={C.accent} strokeWidth="1" opacity="0.5"/>
                <circle cx="200" cy="160" r="24" fill="none" stroke={C.accent} strokeWidth="0.5" opacity="0.3"/>
              </svg>
              <div style={{ position: 'absolute', left: 18, bottom: 18, display: 'flex', alignItems: 'center', gap: 10, fontSize: 10, letterSpacing: '0.32em', color: '#f5efe2', textTransform: 'uppercase' }}>
                <span style={{ color: C.accentSoft }}>◉</span> {invitation.venue_name ?? labels.venue}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 48, color: C.ink, fontWeight: 300, marginBottom: 18, letterSpacing: '0.01em' }}>{invitation.venue_name}</h3>
              {invitation.venue_address && <div style={{ fontFamily: cormorant, fontSize: 20, color: C.inkSoft, lineHeight: 1.5, marginBottom: 24 }}>{invitation.venue_address}</div>}
              {(invitation.ceremony_time || invitation.reception_time) && (
                <div style={{ display: 'flex', gap: 32, marginBottom: 24 }}>
                  {invitation.ceremony_time && <div><div style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: C.mute, marginBottom: 4 }}>{labels.ceremony}</div><div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 24, color: C.ink }}>{formatTime(invitation.ceremony_time)}</div></div>}
                  {invitation.reception_time && <div><div style={{ fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: C.mute, marginBottom: 4 }}>{labels.reception}</div><div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 24, color: C.ink }}>{formatTime(invitation.reception_time)}</div></div>}
                </div>
              )}
              {invitation.venue_address && (
                <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px', border: `1px solid ${C.ink}`, fontSize: 10.5, letterSpacing: '0.32em', textTransform: 'uppercase', color: C.ink, textDecoration: 'none' }}>
                  {labels.google_maps}
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      <SharedSections invitation={invitation} theme={THEME} labels={labels} coverPhotoUrl={invitation.cover_photo_url} />

      {/* RSVP */}
      <section style={{ padding: '120px 0', background: C.ink, color: C.cream, position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 56px' }}>
          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 14, color: C.accentSoft, letterSpacing: '0.1em', marginBottom: 8 }}>02.</div>
            <h2 style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 64, color: C.cream, letterSpacing: '0.01em', fontWeight: 300, margin: '8px 0 12px' }}>{labels.rsvp_title}</h2>
            {invitation.rsvp_deadline && <div style={{ fontSize: 11, letterSpacing: '0.36em', color: C.accentSoft, textTransform: 'uppercase' }}>{labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}</div>}
          </div>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            {invitation.rsvp_mode !== 'contact' && (
              <RSVPForm invitationId={invitation.id} packageType={invitation.package} onSubmit={onRSVPSubmit} existingRSVP={existingRSVP} accentColor={C.accentSoft} bgColor={C.ink} textColor={C.cream} mutedColor={C.accentSoft} labels={labels} />
            )}
            {(invitation.rsvp_mode === 'contact' || invitation.rsvp_mode === 'both') && (
              <div style={{ marginTop: invitation.rsvp_mode === 'both' ? 32 : 0 }}>
                <DirectContactCard invitation={invitation} theme={{ bg: C.ink, bgAlt: '#2a2418', card: '#2a2418', text: C.cream, muted: C.accentSoft, accent: C.accentSoft, rule: '#3a3020' }} labels={labels} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '120px 0 60px', textAlign: 'center', background: C.cream }}>
        <div style={{ fontFamily: pinyon, fontSize: 'clamp(80px,11vw,144px)', color: C.ink, lineHeight: 1, marginBottom: 48 }}>
          {invitation.partner1_name} &amp; {invitation.partner2_name}
        </div>
        <div style={{ fontFamily: cormorant, fontStyle: 'italic', fontSize: 22, color: C.inkSoft, marginBottom: 48 }}>
          {formatDate(invitation.wedding_date, 'd. MMMM yyyy')}
        </div>
        <div style={{ fontSize: 10, letterSpacing: '0.32em', color: C.mute, textTransform: 'uppercase' }}>{labels.footer_tagline}</div>
      </footer>
    </div>
  )
}
