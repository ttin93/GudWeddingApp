'use client'

import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { TEMPLATES, PACKAGES } from '@/types'
import type { Invitation, TemplateId, Package } from '@/types'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'
const DEEP  = '#EFE9DD'

const PACKAGE_TEMPLATE_LIMIT: Record<Package, TemplateId[]> = {
  // All templates available on all plans (Stripe not set up yet — free for now)
  essential:  TEMPLATES.map(t => t.id),
  elegance:   TEMPLATES.map(t => t.id),
  signature:  TEMPLATES.map(t => t.id),
}

interface Props { invitations: Invitation[] }

export function SettingsClient({ invitations }: Props) {
  const [selectedInv, setSelectedInv] = useState<string>(invitations[0]?.id ?? '')
  const [saving, setSaving] = useState(false)

  const invitation = invitations.find(i => i.id === selectedInv)
  const [templateId, setTemplateId] = useState<TemplateId>(invitation?.template_id ?? 'botanica')

  const allowedTemplates = PACKAGE_TEMPLATE_LIMIT[invitation?.package ?? 'elegance']

  async function saveTemplate() {
    if (!invitation) return
    setSaving(true)
    try {
      const res = await fetch(`/api/invitations/${invitation.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template_id: templateId }),
      })
      if (!res.ok) throw new Error('Failed to save')
      toast.success('Template updated!')
    } catch {
      toast.error('Could not save template')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${RULE}` }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 10 }}>Account</div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 48, lineHeight: 0.95, color: INK, letterSpacing: '-0.02em' }}>
          Settings
        </h1>
      </div>

      {invitations.length === 0 ? (
        <div style={{ border: `1px solid ${RULE}`, padding: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: MUTE, marginBottom: 20 }}>No invitations yet.</p>
          <Link href="/dashboard/invitation/new" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px',
            background: INK, color: CREAM,
            fontFamily: 'var(--font-instrument)', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
          }}>
            Create your first invitation
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Invitation selector */}
          {invitations.length > 1 && (
            <div style={{ border: `1px solid ${RULE}`, background: '#FBFAF6', padding: '24px 28px' }}>
              <p style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: MUTE, marginBottom: 14 }}>Select invitation</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {invitations.map(inv => (
                  <label key={inv.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '10px 14px', background: selectedInv === inv.id ? DEEP : 'transparent', border: `1px solid ${selectedInv === inv.id ? ACC : RULE}` }}>
                    <input type="radio" name="inv" value={inv.id} checked={selectedInv === inv.id} onChange={() => { setSelectedInv(inv.id); setTemplateId(inv.template_id) }} style={{ accentColor: ACC }} />
                    <div>
                      <span style={{ fontSize: 14, color: INK, fontWeight: 500 }}>{inv.partner1_name} &amp; {inv.partner2_name}</span>
                      <span style={{ fontSize: 11, color: MUTE, marginLeft: 10 }}>{inv.template_id}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Template selector */}
          {invitation && (
            <div style={{ border: `1px solid ${RULE}`, background: '#FBFAF6', padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: MUTE, marginBottom: 4 }}>Design template</p>
                  <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.5 }}>
                    Change your invitation template. Your content stays the same.
                  </p>
                </div>
                <span style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: ACC, padding: '3px 10px', border: `1px solid ${ACC}30`, background: `${ACC}10` }}>
                  {invitation.package} plan
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
                {TEMPLATES.map(t => {
                  const allowed = allowedTemplates.includes(t.id)
                  const selected = templateId === t.id
                  const isDark = parseInt(t.colors.background.slice(1, 3), 16) < 80

                  return (
                    <button key={t.id} onClick={() => allowed && setTemplateId(t.id)}
                      style={{
                        background: 'none', border: `2px solid ${selected ? ACC : RULE}`, padding: 0, cursor: allowed ? 'pointer' : 'not-allowed',
                        opacity: allowed ? 1 : 0.45, textAlign: 'left', position: 'relative',
                        transition: 'border-color .2s',
                      }}
                    >
                      {/* Mini preview */}
                      <div style={{ aspectRatio: '3/4', background: t.colors.background, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px 8px', gap: 4 }}>
                        <div style={{ fontFamily: 'var(--font-script)', fontSize: 20, color: t.colors.primary, lineHeight: 1.1 }}>L</div>
                        <div style={{ fontSize: 9, color: t.colors.textMuted, fontStyle: 'italic' }}>&amp;</div>
                        <div style={{ fontFamily: 'var(--font-script)', fontSize: 20, color: t.colors.primary, lineHeight: 1.1 }}>V</div>
                        <div style={{ width: 16, height: 1, background: t.colors.accent, margin: '4px 0' }} />
                        <div style={{ fontSize: 7, letterSpacing: '0.2em', color: isDark ? t.colors.textMuted : MUTE }}>2026</div>
                      </div>
                      <div style={{ padding: '8px 10px', borderTop: `1px solid ${RULE}` }}>
                        <div style={{ fontSize: 11.5, fontWeight: 500, color: INK }}>{t.name}</div>
                        <div style={{ fontSize: 10, color: MUTE, textTransform: 'capitalize' }}>{t.category}</div>
                      </div>
                      {selected && (
                        <div style={{ position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: '50%', background: ACC, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="10" height="8" viewBox="0 0 12 9" fill="none"><path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button
                  onClick={saveTemplate}
                  disabled={saving || templateId === invitation.template_id}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px',
                    background: templateId !== invitation.template_id ? INK : RULE,
                    color: templateId !== invitation.template_id ? CREAM : MUTE,
                    fontFamily: 'var(--font-instrument)', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase',
                    border: 'none', cursor: saving || templateId === invitation.template_id ? 'not-allowed' : 'pointer',
                    transition: 'background .2s',
                  }}
                >
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
                <Link href={`/templates/${templateId}`} target="_blank" style={{
                  fontSize: 12, color: MUTE, textDecoration: 'none', letterSpacing: '0.06em',
                  borderBottom: `1px solid ${RULE}`, paddingBottom: 1,
                }}>
                  Preview this template →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
