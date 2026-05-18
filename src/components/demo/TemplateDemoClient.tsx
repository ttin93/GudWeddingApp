'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { TemplateRenderer } from '@/components/invitation/TemplateRenderer'
import { PricingPanel } from './PricingPanel'
import { buildDemoInvitation } from '@/lib/demo-data'
import type { Package, TemplateId } from '@/types'

const INK  = '#1A1714'
const MUTE = '#6e6359'
const ACC  = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE = '#E8E2D9'

interface Props { templateId: TemplateId }

export function TemplateDemoClient({ templateId }: Props) {
  const [plan, setPlan] = useState<Package>('elegance')
  const invitation = buildDemoInvitation(templateId, plan)

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Back bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 998,
        height: 52, background: 'rgba(247,244,239,0.96)', backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${RULE}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px',
      }}>
        <Link href="/templates" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 11.5, letterSpacing: '0.14em', color: MUTE, textDecoration: 'none',
          textTransform: 'uppercase',
          transition: 'color .2s',
        }}>
          <ArrowLeft size={14} />
          All templates
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 8, color: ACC }}>
          <span>◉</span>
          <span style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 15, color: INK }}>NajinDan</span>
        </div>

        <Link href={`/register?template=${templateId}&package=${plan}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 16px',
          background: INK, color: CREAM,
          fontFamily: 'var(--font-instrument)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase',
          textDecoration: 'none',
        }}>
          Use this template
        </Link>
      </div>

      {/* Template rendered below the top bar */}
      <div style={{ paddingTop: 52 }}>
        <TemplateRenderer invitation={invitation} />
      </div>

      {/* Floating pricing panel — bottom-left */}
      <PricingPanel plan={plan} onPlanChange={setPlan} templateId={templateId} />
    </div>
  )
}
