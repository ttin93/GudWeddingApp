import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { GuestList } from '@/components/dashboard/GuestList'
import type { RSVPResponse } from '@/types'

export default async function GuestsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: invitations } = await supabase
    .from('invitations')
    .select('id, partner1_name, partner2_name, rsvp_responses(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const allResponses: (RSVPResponse & { invitation_label: string })[] = []
  for (const inv of invitations ?? []) {
    const label = `${inv.partner1_name} & ${inv.partner2_name}`
    for (const r of (inv.rsvp_responses ?? []) as RSVPResponse[]) {
      allResponses.push({ ...r, invitation_label: label })
    }
  }

  return (
    <div>
      <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: '1px solid #E8E2D9' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6e6359', marginBottom: 10 }}>Dashboard</div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 48, lineHeight: 0.95, color: '#1A1714', letterSpacing: '-0.02em' }}>
          Guests
        </h1>
      </div>
      {(invitations?.length ?? 0) === 0 ? (
        <p style={{ fontSize: 13, color: '#6e6359' }}>No invitations yet.</p>
      ) : invitations!.length === 1 ? (
        <GuestList responses={invitations![0].rsvp_responses as RSVPResponse[]} invitationId={invitations![0].id} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {invitations!.map(inv => (
            <div key={inv.id}>
              <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: 12 }}>
                {inv.partner1_name} &amp; {inv.partner2_name}
              </p>
              <GuestList responses={(inv.rsvp_responses ?? []) as RSVPResponse[]} invitationId={inv.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
