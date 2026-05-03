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
  marble: '#f7f3ee',
  marbleDark: '#ede8e0',
  gold: '#b8935a',
  goldLight: '#d4b483',
  goldPale: '#f0e4cc',
  black: '#1a1410',
  ink: '#2c2318',
  warm: '#8b7355',
}

const SECTION_THEME: SectionTheme = {
  bg: C.marble, bgAlt: C.marbleDark, text: C.ink, muted: C.warm,
  accent: C.gold, rule: C.goldPale, card: C.marbleDark,
}

const fade = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

const cormorant = 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif'
const cinzel = 'var(--font-cinzel), "Cinzel", "Trajan Pro", serif'

function CornerOrnament({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const transforms: Record<string, string> = {
    tl: 'none', tr: 'scaleX(-1)', bl: 'scaleY(-1)', br: 'scale(-1)',
  }
  return (
    <div style={{ position: 'absolute', width: 100, height: 100, top: position.includes('t') ? '2rem' : 'auto', bottom: position.includes('b') ? '2rem' : 'auto', left: position.includes('l') ? '2rem' : 'auto', right: position.includes('r') ? '2rem' : 'auto', transform: transforms[position], pointerEvents: 'none' }}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <path d="M4 4 L4 44 M4 4 L44 4" stroke={C.gold} strokeWidth="1"/>
        <path d="M4 4 L22 22" stroke={C.gold} strokeWidth="0.5" opacity="0.5"/>
        <circle cx="4" cy="4" r="2" fill={C.gold} opacity="0.8"/>
        <rect x="16" y="2" width="4" height="4" fill="none" stroke={C.gold} strokeWidth="0.8" opacity="0.6" transform="rotate(45 18 4)"/>
        <path d="M4 18 Q14 12 24 18 Q34 24 44 18" stroke={C.gold} strokeWidth="0.5" opacity="0.25" fill="none"/>
        <line x1="4" y1="28" x2="18" y2="28" stroke={C.gold} strokeWidth="0.4" opacity="0.3"/>
      </svg>
    </div>
  )
}

function GoldRule() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '2.5rem 0' }}>
      <div style={{ height: 1, width: 60, background: C.gold }} />
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 5, height: 5, background: C.gold, transform: 'rotate(45deg)' }} />
        <div style={{ width: 4, height: 4, background: C.gold, borderRadius: '50%' }} />
        <div style={{ width: 5, height: 5, background: C.gold, transform: 'rotate(45deg)' }} />
      </div>
      <div style={{ height: 1, width: 60, background: C.gold }} />
    </div>
  )
}

function FullDivider({ bg = C.marble }: { bg?: string }) {
  return (
    <div style={{ width: '100%', height: 1, background: `linear-gradient(90deg, transparent 0%, ${C.goldLight} 20%, ${C.gold} 50%, ${C.goldLight} 80%, transparent 100%)`, position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', width: 8, height: 8, background: bg, border: `1px solid ${C.gold}`, transform: 'translate(-50%,-50%) rotate(45deg)' }} />
    </div>
  )
}

interface Props {
  invitation: Invitation
  onRSVPSubmit?: (data: RSVPFormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function VeneziaTemplate({ invitation, onRSVPSubmit, existingRSVP }: Props) {
  const labels = getEffectiveLabels(invitation)
  const year = new Date(invitation.wedding_date).getFullYear()
  const daysLeft = daysUntilWedding(invitation.wedding_date)

  // Pass modified invitation to SharedSections so it doesn't double-render story
  const invForShared = invitation.story ? { ...invitation, show_story: false } as Invitation : invitation

  return (
    <div style={{ background: C.marble, color: C.ink, fontFamily: cormorant, overflowX: 'hidden' }}>
      <style>{`
        @media(max-width:700px){
          .vz-story-inner{grid-template-columns:1fr!important;gap:3rem!important;}
          .vz-story-sep{display:none!important;}
          .vz-location-inner{grid-template-columns:1fr!important;}
          .vz-rsvp-inner{padding:5rem 1.5rem!important;}
          .vz-hero-frame{padding:3rem 2rem!important;}
          .vz-corner{width:70px!important;height:70px!important;}
        }
      `}</style>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', backgroundImage: `radial-gradient(ellipse 120% 80% at 50% 0%, rgba(184,147,90,0.08) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 10% 80%, rgba(184,147,90,0.05) 0%, transparent 50%), repeating-linear-gradient(160deg, transparent, transparent 80px, rgba(184,147,90,0.015) 80px, rgba(184,147,90,0.015) 81px)`, backgroundColor: C.marble }}>
        <CornerOrnament position="tl" />
        <CornerOrnament position="tr" />
        <CornerOrnament position="bl" />
        <CornerOrnament position="br" />

        <motion.div className="vz-hero-frame" variants={fade} initial="hidden" animate="visible" transition={{ duration: 1.2 }}
          style={{ border: `1px solid rgba(184,147,90,0.3)`, padding: '5rem 4rem', textAlign: 'center', position: 'relative', maxWidth: 680, width: '90%' }}
        >
          {/* Inner double border */}
          <div style={{ position: 'absolute', inset: 8, border: `1px solid rgba(184,147,90,0.12)`, pointerEvents: 'none' }} />

          <motion.p variants={fade} initial="hidden" animate="visible" transition={{ delay: 0.4 }}
            style={{ fontFamily: cinzel, fontSize: '0.58rem', letterSpacing: '0.6em', color: C.gold, textTransform: 'uppercase', marginBottom: '2.5rem' }}>
            {labels.together_with_families}
          </motion.p>

          <motion.div variants={fade} initial="hidden" animate="visible" transition={{ delay: 0.6 }} style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: 'clamp(3rem,8vw,6.5rem)', fontWeight: 300, lineHeight: 1, color: C.black, letterSpacing: '0.05em', fontStyle: 'italic' }}>
              {invitation.partner1_name}
            </div>
            <span style={{ fontSize: '1.1rem', fontStyle: 'italic', color: C.gold, letterSpacing: '0.4em', display: 'block', margin: '0.8rem 0' }}>
              &amp;
            </span>
            <div style={{ fontSize: 'clamp(3rem,8vw,6.5rem)', fontWeight: 300, lineHeight: 1, color: C.black, letterSpacing: '0.05em', fontStyle: 'italic' }}>
              {invitation.partner2_name}
            </div>
          </motion.div>

          <GoldRule />

          <motion.p variants={fade} initial="hidden" animate="visible" transition={{ delay: 1 }}
            style={{ fontFamily: cinzel, fontSize: '0.75rem', letterSpacing: '0.4em', color: C.warm, textTransform: 'uppercase' }}>
            {formatDate(invitation.wedding_date, 'EEEE · d. MMMM · yyyy')}
          </motion.p>

          {invitation.venue_name && (
            <motion.p variants={fade} initial="hidden" animate="visible" transition={{ delay: 1.2 }}
              style={{ fontStyle: 'italic', fontSize: '1.15rem', color: C.ink, opacity: 0.55, marginTop: '0.7rem' }}>
              {invitation.venue_name}
              {invitation.venue_address ? ` · ${invitation.venue_address}` : ''}
            </motion.p>
          )}

          {invitation.show_countdown && daysLeft > 0 && (
            <motion.div variants={fade} initial="hidden" animate="visible" transition={{ delay: 1.4 }}
              style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: cinzel, fontSize: '2rem', color: C.gold }}>{daysLeft}</div>
                <div style={{ fontFamily: cinzel, fontSize: '0.5rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: C.warm }}>{labels.days}</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>

      <FullDivider />

      {/* STORY — dark two-column */}
      {invitation.story && invitation.show_story !== false && (
        <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ background: C.ink, padding: '7rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontFamily: cinzel, fontSize: '0.55rem', letterSpacing: '0.6em', color: C.goldLight, textTransform: 'uppercase', marginBottom: '1rem' }}>
              {labels.story_title}
            </p>
            <h2 style={{ fontFamily: cormorant, fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.15 }}>
              {invitation.partner1_name} <em style={{ fontStyle: 'italic', color: C.gold }}>&amp;</em> {invitation.partner2_name}
            </h2>
          </div>
          <div className="vz-story-inner" style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '0 5rem', alignItems: 'start' }}>
            <div style={{ color: 'white', textAlign: 'center' }}>
              <div style={{ fontFamily: cormorant, fontSize: '5rem', fontStyle: 'italic', fontWeight: 300, color: C.gold, lineHeight: 1, marginBottom: '1rem', opacity: 0.9 }}>
                {invitation.partner1_name[0]}
              </div>
              <p style={{ fontFamily: cinzel, fontSize: '0.6rem', letterSpacing: '0.5em', color: C.goldLight, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                {invitation.partner1_name}
              </p>
              <p style={{ fontStyle: 'italic', fontSize: '1rem', lineHeight: 2, color: 'rgba(255,255,255,0.65)' }}>
                {invitation.story}
              </p>
            </div>
            <div className="vz-story-sep" style={{ width: 1, background: `linear-gradient(180deg, transparent, rgba(184,147,90,0.4), transparent)`, height: 300, margin: '2rem auto 0' }} />
            <div style={{ color: 'white', textAlign: 'center' }}>
              <div style={{ fontFamily: cormorant, fontSize: '5rem', fontStyle: 'italic', fontWeight: 300, color: C.gold, lineHeight: 1, marginBottom: '1rem', opacity: 0.9 }}>
                {invitation.partner2_name[0]}
              </div>
              <p style={{ fontFamily: cinzel, fontSize: '0.6rem', letterSpacing: '0.5em', color: C.goldLight, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                {invitation.partner2_name}
              </p>
              <p style={{ fontStyle: 'italic', fontSize: '1rem', lineHeight: 2, color: 'rgba(255,255,255,0.65)' }}>
                {labels.footer_tagline}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {(invitation.story && invitation.show_story !== false) && <FullDivider bg={C.marbleDark} />}

      {/* ITINERARY */}
      {invitation.timeline?.length > 0 && (
        <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ background: C.marbleDark, padding: '7rem 2rem' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <p style={{ fontFamily: cinzel, fontSize: '0.55rem', letterSpacing: '0.6em', color: C.gold, textTransform: 'uppercase', textAlign: 'center', marginBottom: '1rem' }}>
              {labels.program}
            </p>
            <h2 style={{ fontFamily: cormorant, fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 300, textAlign: 'center', lineHeight: 1.15, marginBottom: '0.5rem', color: C.black }}>
              {invitation.partner1_name} <em style={{ fontStyle: 'italic', color: C.gold }}>&amp;</em> {invitation.partner2_name}
            </h2>
            <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column' }}>
              {invitation.timeline.map((event, i) => (
                <motion.div key={i} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ display: 'grid', gridTemplateColumns: '90px 30px 1fr', gap: '0 1.5rem', padding: '2rem 0', borderBottom: i < invitation.timeline.length - 1 ? `1px solid rgba(184,147,90,0.15)` : 'none', alignItems: 'center' }}>
                  <div style={{ fontFamily: cinzel, fontSize: '0.7rem', letterSpacing: '0.15em', color: C.gold, textAlign: 'right' }}>
                    {event.time}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
                    <div style={{ width: 7, height: 7, border: `1px solid ${C.gold}`, transform: 'rotate(45deg)', background: C.marbleDark, flexShrink: 0 }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: cormorant, fontSize: '1.2rem', fontWeight: 400, color: C.black, marginBottom: '0.2rem' }}>
                      {event.title}
                    </h3>
                    {event.description && (
                      <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: C.warm, opacity: 0.8, lineHeight: 1.6 }}>{event.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* LOCATION */}
      {(invitation.venue_name || invitation.venue_address) && (
        <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ padding: '7rem 2rem', background: C.marble }}>
          <div className="vz-location-inner" style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: cinzel, fontSize: '0.55rem', letterSpacing: '0.6em', color: C.gold, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                {labels.venue}
              </p>
              <h2 style={{ fontFamily: cormorant, fontSize: '2.8rem', fontWeight: 300, lineHeight: 1.1, color: C.black, marginBottom: '1.5rem' }}>
                <em style={{ fontStyle: 'italic', color: C.gold }}>{invitation.venue_name}</em>
              </h2>
              {invitation.venue_address && (
                <>
                  <div style={{ fontFamily: cinzel, fontSize: '0.65rem', letterSpacing: '0.2em', color: C.ink, lineHeight: 2.2, borderLeft: `2px solid ${C.gold}`, paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    {invitation.venue_address}
                  </div>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(invitation.venue_address)}`} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: cinzel, fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: C.gold, textDecoration: 'none' }}>
                    {labels.google_maps} →
                  </a>
                </>
              )}
            </div>
            {/* Architectural visual */}
            <div style={{ background: C.marbleDark, aspectRatio: '4/5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: `1px solid rgba(184,147,90,0.2)`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 16, border: `1px solid rgba(184,147,90,0.12)`, pointerEvents: 'none' }} />
              <svg width="180" height="200" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.3 }}>
                <rect x="20" y="100" width="140" height="80" stroke={C.gold} strokeWidth="1"/>
                <rect x="40" y="80" width="100" height="40" stroke={C.gold} strokeWidth="1"/>
                <rect x="60" y="60" width="60" height="40" stroke={C.gold} strokeWidth="1"/>
                <rect x="75" y="30" width="30" height="35" stroke={C.gold} strokeWidth="1"/>
                <rect x="35" y="115" width="20" height="30" stroke={C.gold} strokeWidth="0.7"/>
                <rect x="80" y="115" width="20" height="30" stroke={C.gold} strokeWidth="0.7"/>
                <rect x="125" y="115" width="20" height="30" stroke={C.gold} strokeWidth="0.7"/>
                <rect x="50" y="88" width="14" height="20" stroke={C.gold} strokeWidth="0.6"/>
                <rect x="83" y="88" width="14" height="20" stroke={C.gold} strokeWidth="0.6"/>
                <rect x="116" y="88" width="14" height="20" stroke={C.gold} strokeWidth="0.6"/>
                <path d="M82 180 L82 148 Q90 138 98 148 L98 180" stroke={C.gold} strokeWidth="0.8"/>
                <circle cx="90" cy="18" r="5" stroke={C.gold} strokeWidth="0.7"/>
                <line x1="90" y1="23" x2="90" y2="30" stroke={C.gold} strokeWidth="0.7"/>
              </svg>
              <p style={{ marginTop: '2rem', fontFamily: cinzel, fontSize: '0.55rem', letterSpacing: '0.4em', color: C.gold, textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
                {invitation.venue_name ?? labels.venue}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <FullDivider />

      {/* SHARED EXTRA SECTIONS (story already rendered above, show_story overridden) */}
      <SharedSections invitation={invForShared} theme={SECTION_THEME} labels={labels} />

      {/* RSVP */}
      <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
        style={{ background: C.ink }}>
        <div className="vz-rsvp-inner" style={{ maxWidth: 620, margin: '0 auto', padding: '7rem 2rem', textAlign: 'center' }}>
          <p style={{ fontFamily: cinzel, fontSize: '0.55rem', letterSpacing: '0.6em', color: C.goldLight, textTransform: 'uppercase', marginBottom: '1rem' }}>
            {labels.rsvp_title}
          </p>
          <h2 style={{ fontFamily: cormorant, fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 300, lineHeight: 1.15, color: 'white', marginBottom: '1.5rem' }}>
            {invitation.partner1_name} <em style={{ fontStyle: 'italic', color: C.gold }}>&amp;</em> {invitation.partner2_name}
          </h2>
          {invitation.rsvp_deadline && (
            <p style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.45)', fontSize: '1rem', marginTop: '1rem', marginBottom: '2.5rem', lineHeight: 1.9 }}>
              {labels.rsvp_deadline_prefix} {formatDate(invitation.rsvp_deadline)}.
            </p>
          )}
          <div style={{ textAlign: 'left' }}>
            {invitation.rsvp_mode !== 'contact' && (
              <RSVPForm
                invitationId={invitation.id}
                packageType={invitation.package}
                onSubmit={onRSVPSubmit}
                existingRSVP={existingRSVP}
                accentColor={C.gold}
                bgColor='rgba(255,255,255,0.04)'
                textColor='#f7f3ee'
                mutedColor='rgba(247,243,238,0.45)'
                labels={labels}
              />
            )}
            {(invitation.rsvp_mode === 'contact' || invitation.rsvp_mode === 'both') && (
              <div style={{ marginTop: invitation.rsvp_mode === 'both' ? 32 : 0 }}>
                <DirectContactCard invitation={invitation} theme={{ bg: C.ink, bgAlt: '#221c14', card: 'rgba(255,255,255,0.04)', text: '#f7f3ee', muted: 'rgba(247,243,238,0.5)', accent: C.gold, rule: 'rgba(184,147,90,0.2)' }} labels={labels} />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* FOOTER */}
      <footer style={{ background: C.marbleDark, padding: '3rem 2rem', textAlign: 'center', borderTop: `1px solid rgba(184,147,90,0.2)` }}>
        <p style={{ fontFamily: cormorant, fontSize: '1.8rem', fontStyle: 'italic', fontWeight: 300, color: C.gold, opacity: 0.7 }}>
          {invitation.partner1_name} &amp; {invitation.partner2_name}
        </p>
        <p style={{ fontFamily: cinzel, fontSize: '0.5rem', letterSpacing: '0.6em', color: C.warm, opacity: 0.5, marginTop: '0.8rem', textTransform: 'uppercase' }}>
          {formatDate(invitation.wedding_date, 'd. MMMM yyyy')}
          {invitation.venue_name ? ` · ${invitation.venue_name}` : ''}
        </p>
      </footer>
    </div>
  )
}
