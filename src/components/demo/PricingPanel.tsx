'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Lock, ChevronDown, ChevronUp, X } from 'lucide-react'
import type { Package } from '@/types'
import { PLAN_FEATURES } from '@/lib/demo-data'

const INK  = '#1A1714'
const MUTE = '#6e6359'
const ACC  = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE = '#E8E2D9'

interface Props {
  plan: Package
  onPlanChange: (p: Package) => void
  templateId: string
}

const PRICES: Record<Package, string> = { essential: '€69', elegance: '€89', signature: '€119' }
const PLANS: Package[] = ['essential', 'elegance', 'signature']

export function PricingPanel({ plan, onPlanChange, templateId }: Props) {
  const [expanded, setExpanded] = useState(true)
  const config = PLAN_FEATURES[plan]

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: 24, zIndex: 999,
      width: expanded ? 300 : 'auto',
      background: '#FBFAF6',
      border: `1px solid ${RULE}`,
      boxShadow: '0 8px 32px -8px rgba(26,23,20,.22), 0 2px 8px -2px rgba(26,23,20,.1)',
    }}>
      {/* Corner accents */}
      {[{ top:-3,left:-3,borderRight:'none',borderBottom:'none' },{ top:-3,right:-3,borderLeft:'none',borderBottom:'none' },{ bottom:-3,left:-3,borderRight:'none',borderTop:'none' },{ bottom:-3,right:-3,borderLeft:'none',borderTop:'none' }].map((s,i) => (
        <div key={i} style={{ position:'absolute', width:10, height:10, border:`1px solid ${ACC}`, ...s }} />
      ))}

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: expanded ? '14px 16px 12px' : '12px 16px',
        borderBottom: expanded ? `1px solid ${RULE}` : 'none',
        cursor: 'pointer',
      }} onClick={() => setExpanded(!expanded)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 8, color: ACC }}>◉</span>
          <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTE }}>Preview mode</span>
        </div>
        {expanded ? <ChevronDown size={13} style={{ color: MUTE }} /> : <ChevronUp size={13} style={{ color: MUTE }} />}
      </div>

      {expanded && (
        <div style={{ padding: '14px 16px 16px' }}>
          {/* Plan tabs */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 14, border: `1px solid ${RULE}` }}>
            {PLANS.map((p) => (
              <button key={p} onClick={() => onPlanChange(p)} style={{
                flex: 1, padding: '7px 4px', border: 'none',
                background: plan === p ? INK : 'transparent',
                color: plan === p ? CREAM : MUTE,
                fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'background .2s',
                borderRight: p !== 'signature' ? `1px solid ${RULE}` : 'none',
              }}>
                {PLAN_FEATURES[p].label}
              </button>
            ))}
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 32, lineHeight: 1, color: INK }}>{PRICES[plan]}</span>
            <span style={{ fontSize: 10.5, color: MUTE, letterSpacing: '0.06em' }}>one-time</span>
          </div>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
            {config.features.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: INK }}>
                <CheckCircle2 size={11} style={{ color: '#4caf50', flexShrink: 0 }} />
                {f}
              </div>
            ))}
            {config.locked.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: MUTE, opacity: 0.6 }}>
                <Lock size={11} style={{ flexShrink: 0 }} />
                {f}
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: RULE, marginBottom: 12 }} />

          {/* CTA */}
          <Link href={`/register?template=${templateId}&package=${plan}`} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '11px 16px', width: '100%',
            background: INK, color: CREAM,
            fontFamily: 'var(--font-instrument)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase',
            textDecoration: 'none', transition: 'background .2s',
          }}>
            Start with this design
            <svg width="12" height="9" viewBox="0 0 14 10" fill="none">
              <path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1" />
            </svg>
          </Link>

          <p style={{ fontSize: 10, color: MUTE, textAlign: 'center', marginTop: 8, letterSpacing: '0.04em' }}>
            All plans · No subscription
          </p>
        </div>
      )}
    </div>
  )
}
