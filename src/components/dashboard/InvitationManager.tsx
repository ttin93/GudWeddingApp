'use client'

import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { QRCodeSVG } from 'qrcode.react'
import { RSVPStats } from './RSVPStats'
import { GuestList } from './GuestList'
import { AIAssistant } from './AIAssistant'
import { formatDate } from '@/lib/utils/format'
import { Copy, ExternalLink, QrCode, Sparkles, CreditCard } from 'lucide-react'
import type { Invitation, RSVPResponse, Package } from '@/types'

const INK  = '#1A1714'
const MUTE = '#6e6359'
const ACC  = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE = '#E8E2D9'

interface Props {
  invitation: Invitation & { rsvp_responses: RSVPResponse[] }
}

export function InvitationManager({ invitation }: Props) {
  const [showQR, setShowQR] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [paying, setPaying] = useState(false)

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
  const inviteUrl = `${appUrl}/invite/${invitation.slug}`

  function copyLink() {
    navigator.clipboard.writeText(inviteUrl)
    toast.success('Link copied!')
  }

  async function checkout(pkg: Package) {
    setPaying(true)
    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: pkg, invitationId: invitation.id }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (e) {
      toast.error((e as Error).message)
      setPaying(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, paddingBottom: 32, borderBottom: `1px solid ${RULE}` }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 10 }}>
            Invitation
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
            <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 44, lineHeight: 0.95, color: INK, letterSpacing: '-0.02em' }}>
              {invitation.partner1_name} &amp; {invitation.partner2_name}
            </h1>
            <span style={{
              fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', padding: '4px 10px', alignSelf: 'center',
              background: invitation.is_active ? '#e8f5e9' : CREAM,
              color: invitation.is_active ? '#2e7d32' : MUTE,
              border: `1px solid ${invitation.is_active ? '#a5d6a7' : RULE}`,
            }}>
              {invitation.is_active ? 'Active' : 'Draft'}
            </span>
          </div>
          <p style={{ fontSize: 13, color: MUTE, letterSpacing: '0.04em' }}>{formatDate(invitation.wedding_date)}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button
            onClick={() => setShowAI(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px',
              border: `1px solid ${RULE}`, background: CREAM, color: INK,
              fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer',
              transition: 'background .2s',
            }}
          >
            <Sparkles size={13} />
            AI
          </button>
          <Link href={`/invite/${invitation.slug}`} target="_blank" style={{
            display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px',
            border: `1px solid ${RULE}`, background: CREAM, color: INK,
            fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'background .2s',
          }}>
            <ExternalLink size={13} />
            Preview
          </Link>
        </div>
      </div>

      {/* Activation banner */}
      {!invitation.is_active && (
        <div style={{ border: `1px solid ${ACC}`, background: '#FDF8F0', padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <CreditCard size={18} style={{ color: ACC, flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: INK, marginBottom: 6 }}>Activate your invitation</p>
              <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.6, marginBottom: 20 }}>
                Choose a plan to publish and start collecting RSVPs.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {(['essential', 'elegance', 'signature'] as Package[]).map((pkg) => (
                  <button
                    key={pkg}
                    disabled={paying}
                    onClick={() => checkout(pkg)}
                    style={{
                      padding: '10px 20px',
                      background: pkg === 'elegance' ? INK : 'transparent',
                      color: pkg === 'elegance' ? CREAM : INK,
                      border: `1px solid ${pkg === 'elegance' ? INK : RULE}`,
                      fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase',
                      cursor: paying ? 'not-allowed' : 'pointer', opacity: paying ? 0.7 : 1,
                      transition: 'background .2s',
                    }}
                  >
                    {pkg.charAt(0).toUpperCase() + pkg.slice(1)}{pkg === 'elegance' ? ' ★' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share section */}
      <div style={{ border: `1px solid ${RULE}`, background: '#FBFAF6' }}>
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${RULE}` }}>
          <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: MUTE }}>Share your invitation</span>
        </div>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: CREAM, border: `1px solid ${RULE}`, padding: '10px 14px', fontSize: 12.5, color: MUTE, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'var(--font-instrument)' }}>
              {inviteUrl}
            </div>
            <button
              onClick={copyLink}
              style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '10px 16px', flexShrink: 0,
                border: `1px solid ${RULE}`, background: CREAM, color: INK,
                fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer',
                transition: 'background .2s',
              }}
            >
              <Copy size={12} />
              Copy
            </button>
          </div>

          <button
            onClick={() => setShowQR(!showQR)}
            style={{
              display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 7, padding: '8px 14px',
              border: `1px solid ${RULE}`, background: 'none', color: MUTE,
              fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer',
            }}
          >
            <QrCode size={12} />
            {showQR ? 'Hide' : 'Show'} QR code
          </button>

          {showQR && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '28px', background: '#fff', border: `1px solid ${RULE}` }}>
              <QRCodeSVG value={inviteUrl} size={160} fgColor={INK} />
              <p style={{ fontSize: 11, color: MUTE, letterSpacing: '0.08em' }}>Scan or save to add to print materials</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats + details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <RSVPStats responses={invitation.rsvp_responses} />

        <div style={{ border: `1px solid ${RULE}`, background: '#FBFAF6' }}>
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${RULE}` }}>
            <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: MUTE }}>Invitation details</span>
          </div>
          <div style={{ padding: '24px' }}>
            <dl style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['Template', invitation.template_id],
                ['Venue', invitation.venue_name || '—'],
                ['Ceremony', invitation.ceremony_time || '—'],
                ['Dress code', invitation.dress_code || '—'],
                ['RSVP deadline', invitation.rsvp_deadline ? formatDate(invitation.rsvp_deadline) : '—'],
                ['Active until', invitation.active_until ? formatDate(invitation.active_until) : '—'],
              ].map(([label, value]) => (
                <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                  <dt style={{ fontSize: 12.5, color: MUTE }}>{label as string}</dt>
                  <dd style={{ fontSize: 12.5, color: INK, fontWeight: 500, textTransform: 'capitalize' }}>{value as string}</dd>
                </div>
              ))}
            </dl>
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${RULE}` }}>
              <Link href={`/dashboard/invitation/${invitation.id}/edit`} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '11px 20px', width: '100%',
                border: `1px solid ${RULE}`, color: INK,
                fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'background .2s',
              }}>
                Edit details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Guest list */}
      <GuestList responses={invitation.rsvp_responses} invitationId={invitation.id} />

      {/* AI Assistant drawer */}
      {showAI && <AIAssistant onClose={() => setShowAI(false)} invitationId={invitation.id} />}
    </div>
  )
}
