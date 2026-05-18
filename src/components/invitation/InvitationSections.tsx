'use client'

import { Car, Hotel, Gift, HelpCircle, Phone, Mail, Hash, Music2, ExternalLink, Baby, Users } from 'lucide-react'
import { AnimateSection } from './AnimateSection'
import { useEffect, useState } from 'react'
import type { Invitation, InvitationPhoto } from '@/types'
import type { InvitationLabels } from '@/lib/utils/labels'
import { DEFAULT_LABELS } from '@/lib/utils/labels'

// ─── Theme ───────────────────────────────────────────────────────────────────
export interface SectionTheme {
  bg: string      // main section background
  bgAlt: string   // alternate section background (softer)
  text: string    // primary text
  muted: string   // secondary / muted text
  accent: string  // accent colour (headings, icons, links)
  rule: string    // border / divider colour
  card: string    // card / input background
}

// ─── Label helper ─────────────────────────────────────────────────────────────
export function getEffectiveLabels(invitation: Invitation): InvitationLabels {
  const lang = invitation.languages?.[0] ?? 'sl'
  const defaults = DEFAULT_LABELS[lang] ?? DEFAULT_LABELS['sl']
  if (!invitation.labels) return defaults
  return { ...defaults, ...(invitation.labels as Partial<InvitationLabels>) }
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function Wrap({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <AnimateSection style={{ padding: '72px 24px', background: bg }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {children}
      </div>
    </AnimateSection>
  )
}

function SLabel({ text, theme }: { text: string; theme: SectionTheme }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, justifyContent: 'center' }}>
      <div style={{ height: 1, width: 48, background: theme.rule }} />
      <p style={{ fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase', color: theme.muted, whiteSpace: 'nowrap' }}>
        {text}
      </p>
      <div style={{ height: 1, width: 48, background: theme.rule }} />
    </div>
  )
}

// ─── Individual sections ──────────────────────────────────────────────────────

function StorySection({ invitation, theme, labels }: { invitation: Invitation; theme: SectionTheme; labels: InvitationLabels }) {
  return (
    <Wrap bg={theme.bg}>
      <SLabel text={labels.story_title} theme={theme} />
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: 72,
          lineHeight: 0.7,
          color: theme.accent,
          opacity: 0.12,
          marginBottom: -16,
          userSelect: 'none',
        }}>
          "
        </div>
        <p style={{
          fontFamily: 'var(--font-cormorant), Georgia, serif',
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          lineHeight: 1.9,
          color: theme.text,
          opacity: 0.85,
          maxWidth: 520,
          margin: '0 auto',
        }}>
          {invitation.story}
        </p>
      </div>
    </Wrap>
  )
}

function ChildrenPolicySection({ invitation, theme, labels }: { invitation: Invitation; theme: SectionTheme; labels: InvitationLabels }) {
  const POLICIES = {
    welcome:      { emoji: '👶', text: labels.children_welcome },
    adults_only:  { emoji: '🥂', text: labels.children_adults_only },
    infants_only: { emoji: '🍼', text: labels.children_infants_only },
  }
  const policy = POLICIES[invitation.children_policy as keyof typeof POLICIES]
  if (!policy) return null

  return (
    <div style={{ padding: '28px 24px', display: 'flex', justifyContent: 'center', background: theme.bg }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '12px 28px',
        border: `1px solid ${theme.rule}`,
        background: theme.card,
      }}>
        <span style={{ fontSize: 18 }}>{policy.emoji}</span>
        <span style={{ fontSize: 13, color: theme.text, letterSpacing: '0.08em' }}>{policy.text}</span>
      </div>
    </div>
  )
}

function HashtagSection({ invitation, theme, labels }: { invitation: Invitation; theme: SectionTheme; labels: InvitationLabels }) {
  return (
    <Wrap bg={theme.bgAlt}>
      <SLabel text={labels.hashtag_label} theme={theme} />
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Hash size={22} style={{ color: theme.accent, opacity: 0.7 }} />
          <p style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 300,
            color: theme.accent,
            letterSpacing: '0.03em',
          }}>
            {invitation.hashtag?.replace(/^#/, '')}
          </p>
        </div>
      </div>
    </Wrap>
  )
}

function MusicSection({ invitation, theme }: { invitation: Invitation; theme: SectionTheme }) {
  return (
    <div style={{ padding: '36px 24px', display: 'flex', justifyContent: 'center', background: theme.bg }}>
      <a
        href={invitation.music_playlist_url ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          padding: '13px 28px',
          border: `1px solid ${theme.rule}`,
          background: theme.card,
          color: theme.accent,
          textDecoration: 'none',
          fontSize: 11,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
      >
        <Music2 size={14} />
        Naša glasba
        <ExternalLink size={11} style={{ opacity: 0.5 }} />
      </a>
    </div>
  )
}

function TransportSection({ invitation, theme, labels }: { invitation: Invitation; theme: SectionTheme; labels: InvitationLabels }) {
  return (
    <Wrap bg={theme.bgAlt}>
      <SLabel text={labels.transport_title} theme={theme} />
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <div style={{
          flexShrink: 0,
          width: 40, height: 40,
          borderRadius: '50%',
          background: theme.card,
          border: `1px solid ${theme.rule}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: 2,
        }}>
          <Car size={16} style={{ color: theme.accent }} />
        </div>
        <p style={{
          fontSize: 14,
          color: theme.text,
          lineHeight: 1.85,
          opacity: 0.85,
          whiteSpace: 'pre-line',
          flex: 1,
        }}>
          {invitation.transport_notes}
        </p>
      </div>
    </Wrap>
  )
}

function AccommodationSection({ invitation, theme, labels }: { invitation: Invitation; theme: SectionTheme; labels: InvitationLabels }) {
  const items = invitation.accommodation ?? []
  return (
    <Wrap bg={theme.bg}>
      <SLabel text={labels.accommodation_title} theme={theme} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{ border: `1px solid ${theme.rule}`, background: theme.card, padding: '20px 24px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Hotel size={14} style={{ color: theme.accent, flexShrink: 0 }} />
                <span style={{
                  fontSize: 17,
                  fontWeight: 400,
                  color: theme.text,
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                }}>
                  {item.name}
                </span>
              </div>
              {item.price_range && (
                <span style={{ fontSize: 12, color: theme.muted, whiteSpace: 'nowrap', letterSpacing: '0.05em', marginTop: 2 }}>
                  {item.price_range}
                </span>
              )}
            </div>

            {item.address && (
              <p style={{ fontSize: 13, color: theme.muted, paddingLeft: 24, marginBottom: 6 }}>
                {item.address}
              </p>
            )}

            {item.discount_code && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px',
                marginLeft: 24, marginBottom: 6,
                border: `1px dashed ${theme.rule}`,
                background: theme.bgAlt,
              }}>
                <span style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: theme.accent }}>CODE</span>
                <span style={{ fontSize: 13, color: theme.text, fontWeight: 500 }}>{item.discount_code}</span>
              </div>
            )}

            {item.notes && (
              <p style={{ fontSize: 12.5, color: theme.muted, paddingLeft: 24, lineHeight: 1.65, marginBottom: 6 }}>
                {item.notes}
              </p>
            )}

            {item.url && (
              <a
                href={item.url}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  paddingLeft: 24,
                  fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: theme.accent, textDecoration: 'none',
                }}
              >
                Website
                <ExternalLink size={10} />
              </a>
            )}
          </div>
        ))}
      </div>
    </Wrap>
  )
}

function GiftRegistrySection({ invitation, theme, labels }: { invitation: Invitation; theme: SectionTheme; labels: InvitationLabels }) {
  const items = invitation.gift_registry ?? []
  return (
    <Wrap bg={theme.bgAlt}>
      <SLabel text={labels.gifts_title} theme={theme} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 20px',
              border: `1px solid ${theme.rule}`,
              background: theme.card,
              textDecoration: 'none',
            }}
          >
            <Gift size={14} style={{ color: theme.accent, flexShrink: 0 }} />
            <span style={{
              flex: 1,
              fontSize: 16,
              color: theme.text,
              fontFamily: 'var(--font-cormorant), Georgia, serif',
            }}>
              {item.name}
            </span>
            <ExternalLink size={12} style={{ color: theme.muted, flexShrink: 0 }} />
          </a>
        ))}
      </div>
    </Wrap>
  )
}

function FAQSection({ invitation, theme, labels }: { invitation: Invitation; theme: SectionTheme; labels: InvitationLabels }) {
  const items = invitation.faq ?? []
  return (
    <Wrap bg={theme.bg}>
      <SLabel text={labels.faq_title} theme={theme} />
      <div>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              padding: '20px 0',
              borderBottom: i < items.length - 1 ? `1px solid ${theme.rule}` : 'none',
            }}
          >
            <p style={{
              fontSize: 16,
              fontWeight: 500,
              color: theme.accent,
              marginBottom: 8,
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              letterSpacing: '0.02em',
            }}>
              {item.question}
            </p>
            <p style={{
              fontSize: 14,
              color: theme.text,
              lineHeight: 1.75,
              opacity: 0.82,
            }}>
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </Wrap>
  )
}

function ContactSection({ invitation, theme, labels }: { invitation: Invitation; theme: SectionTheme; labels: InvitationLabels }) {
  return (
    <Wrap bg={theme.bgAlt}>
      <SLabel text={labels.contact_title} theme={theme} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 340, margin: '0 auto' }}>
        {invitation.contact_name && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: theme.card, border: `1px solid ${theme.rule}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Users size={13} style={{ color: theme.accent }} />
            </div>
            <span style={{ fontSize: 16, color: theme.text, fontFamily: 'var(--font-cormorant), Georgia, serif' }}>
              {invitation.contact_name}
            </span>
          </div>
        )}
        {invitation.contact_phone && (
          <a href={`tel:${invitation.contact_phone}`} style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: theme.card, border: `1px solid ${theme.rule}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Phone size={13} style={{ color: theme.accent }} />
            </div>
            <span style={{ fontSize: 14, color: theme.accent, letterSpacing: '0.03em' }}>
              {invitation.contact_phone}
            </span>
          </a>
        )}
        {invitation.contact_email && (
          <a href={`mailto:${invitation.contact_email}`} style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: theme.card, border: `1px solid ${theme.rule}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Mail size={13} style={{ color: theme.accent }} />
            </div>
            <span style={{ fontSize: 14, color: theme.accent }}>
              {invitation.contact_email}
            </span>
          </a>
        )}
      </div>
    </Wrap>
  )
}

// ─── DirectContactCard: shown when rsvp_mode is 'contact' or 'both' ─────────
export function DirectContactCard({ invitation, theme, labels }: {
  invitation: Invitation
  theme: SectionTheme
  labels: InvitationLabels
}) {
  const phone = invitation.contact_phone
  const name  = invitation.contact_name
  const email = invitation.contact_email
  if (!phone && !email) return null

  const whatsapp = phone ? `https://wa.me/${phone.replace(/\D/g, '')}` : null

  return (
    <div style={{
      border: `1px solid ${theme.rule}`,
      background: theme.card,
      padding: '28px 28px',
      display: 'flex', flexDirection: 'column', gap: 16,
      maxWidth: 400, margin: '0 auto', width: '100%',
    }}>
      <p style={{ fontSize: 9, letterSpacing: '0.45em', textTransform: 'uppercase', color: theme.muted, textAlign: 'center' }}>
        {labels.contact_title}
      </p>
      {name && (
        <p style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 18, color: theme.text, textAlign: 'center', fontStyle: 'italic' }}>
          {name}
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {phone && (
          <a href={`tel:${phone}`} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            padding: '12px 20px', border: `1px solid ${theme.accent}`,
            color: theme.accent, textDecoration: 'none',
            fontSize: 14, letterSpacing: '0.04em',
            transition: 'background .15s',
          }}>
            <Phone size={15} />
            {phone}
          </a>
        )}
        {whatsapp && (
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            padding: '12px 20px',
            background: '#25D366', color: '#fff',
            border: 'none', textDecoration: 'none',
            fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            padding: '12px 20px', border: `1px solid ${theme.rule}`,
            color: theme.muted, textDecoration: 'none',
            fontSize: 13, letterSpacing: '0.04em',
          }}>
            <Mail size={14} />
            {email}
          </a>
        )}
      </div>
    </div>
  )
}

// ─── SharedSections: all extra sections in one drop-in component ──────────────
export function SharedSections({
  invitation, theme, labels, coverPhotoUrl,
}: {
  invitation: Invitation
  theme: SectionTheme
  labels: InvitationLabels
  coverPhotoUrl?: string
}) {
  return (
    <>
      {invitation.show_story !== false && invitation.story && (
        <StorySection invitation={invitation} theme={theme} labels={labels} />
      )}
      {invitation.show_children_policy !== false && invitation.children_policy && (
        <ChildrenPolicySection invitation={invitation} theme={theme} labels={labels} />
      )}
      {invitation.show_hashtag !== false && invitation.hashtag && (
        <HashtagSection invitation={invitation} theme={theme} labels={labels} />
      )}
      {invitation.show_music !== false && invitation.music_playlist_url && (
        <MusicSection invitation={invitation} theme={theme} />
      )}
      {invitation.show_transport !== false && invitation.transport_notes && (
        <TransportSection invitation={invitation} theme={theme} labels={labels} />
      )}
      {invitation.show_accommodation !== false && invitation.accommodation && invitation.accommodation.length > 0 && (
        <AccommodationSection invitation={invitation} theme={theme} labels={labels} />
      )}
      {invitation.show_gift_registry !== false && invitation.gift_registry && invitation.gift_registry.length > 0 && (
        <GiftRegistrySection invitation={invitation} theme={theme} labels={labels} />
      )}
      {invitation.show_faq !== false && invitation.faq && invitation.faq.length > 0 && (
        <FAQSection invitation={invitation} theme={theme} labels={labels} />
      )}
      {invitation.show_contact !== false && (invitation.contact_name || invitation.contact_phone || invitation.contact_email) && (
        <ContactSection invitation={invitation} theme={theme} labels={labels} />
      )}
      {invitation.show_gallery && invitation.package !== 'essential' && (
        <GallerySection invitation={invitation} theme={theme} coverPhotoUrl={coverPhotoUrl} />
      )}
    </>
  )
}

// ─── Gallery section ──────────────────────────────────────────────────────────
function GallerySection({ invitation, theme, coverPhotoUrl }: { invitation: Invitation; theme: SectionTheme; coverPhotoUrl?: string }) {
  const [photos, setPhotos] = useState<(InvitationPhoto & { url: string })[]>([])
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/photos?invitationId=${invitation.id}`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setPhotos(data) })
      .catch(() => {})
  }, [invitation.id])

  const visiblePhotos = coverPhotoUrl
    ? photos.filter(p => p.url !== coverPhotoUrl)
    : photos

  if (visiblePhotos.length === 0) return null

  return (
    <AnimateSection style={{ padding: '72px 24px', background: theme.bgAlt }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, justifyContent: 'center' }}>
          <div style={{ height: 1, width: 48, background: theme.rule }} />
          <p style={{ fontSize: 9, letterSpacing: '0.55em', textTransform: 'uppercase', color: theme.muted }}>
            Gallery
          </p>
          <div style={{ height: 1, width: 48, background: theme.rule }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 8,
        }}>
          {visiblePhotos.map(photo => (
            <div
              key={photo.id}
              onClick={() => setLightbox(photo.url)}
              style={{
                aspectRatio: '1',
                overflow: 'hidden',
                cursor: 'pointer',
                background: theme.bg,
              }}
            >
              <img
                src={photo.url}
                alt=""
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = '' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out',
          }}
        >
          <img
            src={lightbox}
            alt=""
            style={{ maxWidth: '92vw', maxHeight: '92vh', objectFit: 'contain' }}
          />
        </div>
      )}
    </AnimateSection>
  )
}
