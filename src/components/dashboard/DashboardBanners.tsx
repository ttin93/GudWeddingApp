'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { CheckCircle2, CreditCard, ArrowRight } from 'lucide-react'
import { PACKAGES } from '@/types'
import type { Package } from '@/types'

const INK  = '#1A1714'
const MUTE = '#6e6359'
const ACC  = '#8C7B6B'
const RULE = '#E8E2D9'

interface Props {
  paymentSuccess: boolean
  pendingPackage: Package | null
  hasDraftInvitation: boolean
  draftInvitationId: string | null
}

export function DashboardBanners({ paymentSuccess, pendingPackage, hasDraftInvitation, draftInvitationId }: Props) {
  const router = useRouter()

  useEffect(() => {
    if (paymentSuccess) {
      toast.success('Payment confirmed — your invitation is now live! 🎉', { duration: 6000 })
      // Clean URL without reload
      const url = new URL(window.location.href)
      url.searchParams.delete('payment')
      url.searchParams.delete('session_id')
      window.history.replaceState({}, '', url.toString())
    }
  }, [paymentSuccess])

  async function checkoutDraft(pkg: Package) {
    if (!draftInvitationId) return
    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: pkg, invitationId: draftInvitationId }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  if (!pendingPackage) return null

  const pkg = PACKAGES[pendingPackage]

  return (
    <div style={{
      border: `1px solid ${ACC}`,
      background: '#FDF8F0',
      padding: '20px 24px',
      marginBottom: 32,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
    }}>
      <CreditCard size={18} style={{ color: ACC, flexShrink: 0, marginTop: 2 }} />
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: INK, marginBottom: 4 }}>
          You selected <strong>{pkg.name}</strong> — €{pkg.price}
        </p>

        {hasDraftInvitation && draftInvitationId ? (
          <>
            <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.6, marginBottom: 16 }}>
              Your invitation is ready. Complete your purchase to publish it and start collecting RSVPs.
            </p>
            <button
              onClick={() => checkoutDraft(pendingPackage)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 22px',
                background: INK, color: '#F7F4EF',
                border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-instrument)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                transition: 'background .2s',
              }}
            >
              Activate with {pkg.name} <ArrowRight size={13} />
            </button>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.6, marginBottom: 16 }}>
              Create your invitation first, then activate it with the {pkg.name} package.
            </p>
            <Link
              href={`/dashboard/invitation/new`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 22px',
                background: INK, color: '#F7F4EF',
                fontFamily: 'var(--font-instrument)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Create invitation <ArrowRight size={13} />
            </Link>
          </>
        )}
      </div>

      <button
        onClick={() => {
          const url = new URL(window.location.href)
          url.searchParams.delete('package')
          window.history.replaceState({}, '', url.toString())
          router.refresh()
        }}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTE, fontSize: 18, lineHeight: 1, padding: '0 4px', flexShrink: 0 }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  )
}
