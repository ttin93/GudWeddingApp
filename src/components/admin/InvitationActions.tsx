'use client'

import { useState } from 'react'
import { ExternalLink, Trash2, Clock } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const INK  = '#1A1714'
const MUTE = '#6e6359'
const ACC  = '#8C5E3A'
const RULE  = '#E2DDD5'

function daysRemaining(dateStr?: string | null): { days: number; expired: boolean } | null {
  if (!dateStr) return null
  const diff = new Date(dateStr).getTime() - Date.now()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return { days, expired: days < 0 }
}

interface Props {
  invId: string
  slug: string
  activeUntil?: string | null
  isActive: boolean
  partnerNames: string
}

export function InvitationActions({ invId, slug, activeUntil, isActive, partnerNames }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const remaining = daysRemaining(activeUntil)

  async function extend(months: number) {
    setLoading(`extend-${months}`)
    try {
      const res = await fetch(`/api/admin/invitations/${invId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ months }),
      })
      if (!res.ok) throw new Error('Failed')
      toast.success(`Extended by ${months} month${months > 1 ? 's' : ''}`)
      router.refresh()
    } catch {
      toast.error('Could not extend')
    } finally {
      setLoading(null)
    }
  }

  async function deleteInv() {
    if (!confirm(`Delete invitation for "${partnerNames}"? This cannot be undone.`)) return
    setLoading('delete')
    try {
      const res = await fetch(`/api/admin/invitations/${invId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed')
      toast.success('Invitation deleted')
      router.refresh()
    } catch {
      toast.error('Could not delete')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
      {/* Active until badge */}
      {remaining && (
        <span style={{
          fontSize: 10, letterSpacing: '0.1em', padding: '2px 8px',
          background: remaining.expired ? '#fdecea' : remaining.days < 30 ? '#fff3e0' : '#e8f5e9',
          color: remaining.expired ? '#c62828' : remaining.days < 30 ? '#e65100' : '#2e7d32',
          whiteSpace: 'nowrap',
          display: 'flex', alignItems: 'center', gap: 3,
        }}>
          <Clock size={9} />
          {remaining.expired ? 'Expired' : `${remaining.days}d left`}
        </span>
      )}

      {/* Extend buttons */}
      {[3, 6, 12].map(m => (
        <button
          key={m}
          onClick={() => extend(m)}
          disabled={loading !== null}
          style={{
            fontSize: 9.5, letterSpacing: '0.1em', padding: '4px 8px',
            border: `1px solid ${RULE}`, background: 'white', color: ACC,
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
          }}
          title={`Extend by ${m} months`}
        >
          +{m}m
        </button>
      ))}

      {/* View link */}
      <Link href={`/invite/${slug}`} target="_blank" style={{ color: MUTE, display: 'flex', padding: 4 }}>
        <ExternalLink size={12} />
      </Link>

      {/* Manage link */}
      <Link href={`/dashboard/${invId}`} style={{
        fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase',
        padding: '4px 10px', border: `1px solid ${RULE}`,
        color: INK, textDecoration: 'none',
      }}>
        Manage
      </Link>

      {/* Delete */}
      <button
        onClick={deleteInv}
        disabled={loading !== null}
        style={{
          display: 'flex', alignItems: 'center', padding: '4px 6px',
          background: 'none', border: `1px solid #fca5a5`, color: '#dc2626',
          cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
        }}
        title="Delete invitation"
      >
        <Trash2 size={11} />
      </button>
    </div>
  )
}
