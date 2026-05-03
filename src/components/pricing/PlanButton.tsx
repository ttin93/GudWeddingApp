'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Package } from '@/types'

interface Props {
  plan: Package
  label: string
  style: React.CSSProperties
}

export function PlanButton({ plan, label, style }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push(`/register?plan=${plan}`)
        return
      }

      // Logged-in user: go to dashboard with package pre-selected
      router.push(`/dashboard?package=${plan}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{ ...style, cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1 }}
    >
      {loading ? '…' : label} {!loading && <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6 }} />}
    </button>
  )
}
