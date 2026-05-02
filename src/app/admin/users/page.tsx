import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Eye, Users, ExternalLink, Crown } from 'lucide-react'
import { formatDate } from '@/lib/utils/format'

const INK  = '#1A1714'
const MUTE = '#6e6359'
const ACC  = '#8C5E3A'
const CREAM = '#F7F4EF'
const RULE  = '#E2DDD5'
const SOFT  = '#F4F1EC'

async function getAllUsersData() {
  const supabase = await createClient()

  const [{ data: invitations }, { data: rsvps }, { data: payments }] = await Promise.all([
    supabase.from('invitations').select('*').order('created_at', { ascending: false }),
    supabase.from('rsvp_responses').select('attending, invitation_id'),
    supabase.from('payments').select('user_id, amount, status, package').eq('status', 'completed'),
  ])

  const inv = invitations ?? []
  const rv = rsvps ?? []
  const pay = payments ?? []

  // Group invitations by user
  const userMap: Record<string, {
    user_id: string
    invitations: typeof inv
    totalViews: number
    totalRSVPs: number
    totalRevenue: number
    packages: string[]
  }> = {}

  inv.forEach(invitation => {
    if (!userMap[invitation.user_id]) {
      userMap[invitation.user_id] = {
        user_id: invitation.user_id,
        invitations: [],
        totalViews: 0,
        totalRSVPs: 0,
        totalRevenue: 0,
        packages: [],
      }
    }
    const u = userMap[invitation.user_id]
    u.invitations.push(invitation)
    u.totalViews += invitation.view_count ?? 0
    u.packages.push(invitation.package)

    const invRSVPs = rv.filter(r => r.invitation_id === invitation.id)
    u.totalRSVPs += invRSVPs.length
  })

  pay.forEach(p => {
    if (userMap[p.user_id]) {
      userMap[p.user_id].totalRevenue += p.amount / 100
    }
  })

  return Object.values(userMap).sort((a, b) => {
    const aDate = a.invitations[0]?.created_at ?? ''
    const bDate = b.invitations[0]?.created_at ?? ''
    return bDate.localeCompare(aDate)
  })
}

export default async function UsersPage() {
  const users = await getAllUsersData()

  return (
    <div>
      <div style={{ marginBottom: 48, paddingBottom: 28, borderBottom: `1px solid ${RULE}` }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 10 }}>
          User management
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 48, lineHeight: 0.95, color: INK }}>
          Users
        </h1>
        <p style={{ fontSize: 13, color: MUTE, marginTop: 8 }}>{users.length} users with invitations</p>
      </div>

      {/* Users table */}
      <div style={{ border: `1px solid ${RULE}`, background: CREAM }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 80px 80px 80px 80px 80px 120px',
          gap: 0,
          padding: '12px 24px',
          borderBottom: `1px solid ${RULE}`,
          background: SOFT,
        }}>
          {['User / Invitations', 'Inv.', 'Views', 'RSVPs', 'Revenue', 'Package', 'Actions'].map(h => (
            <span key={h} style={{ fontSize: 9.5, letterSpacing: '0.25em', textTransform: 'uppercase', color: MUTE }}>{h}</span>
          ))}
        </div>

        {users.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: MUTE }}>No users yet</p>
          </div>
        ) : (
          users.map((user) => {
            const hasSignature = user.packages.includes('signature')
            const latestInv = user.invitations[0]
            const latestDate = latestInv?.created_at

            return (
              <div
                key={user.user_id}
                style={{
                  borderBottom: `1px solid ${RULE}`,
                  padding: '0',
                }}
              >
                {/* User row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 80px 80px 80px 80px 120px',
                  padding: '16px 24px',
                  alignItems: 'center',
                  gap: 0,
                }}>
                  {/* User info */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 10, letterSpacing: '0.2em', color: MUTE, fontFamily: 'monospace' }}>
                        {user.user_id.slice(0, 8)}…
                      </span>
                      {hasSignature && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '2px 7px', background: '#2D4A3E15', color: '#2D4A3E' }}>
                          <Crown size={9} />
                          Signature
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: 11, color: MUTE }}>
                      {latestDate ? `Last active ${formatDate(latestDate, 'dd MMM yyyy')}` : '—'}
                    </p>
                  </div>

                  <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, color: INK }}>{user.invitations.length}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Eye size={11} style={{ color: ACC }} />
                    <span style={{ fontSize: 13, color: MUTE }}>{user.totalViews}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Users size={11} style={{ color: ACC }} />
                    <span style={{ fontSize: 13, color: MUTE }}>{user.totalRSVPs}</span>
                  </div>
                  <span style={{ fontSize: 13, color: user.totalRevenue > 0 ? '#2D4A3E' : MUTE }}>
                    {user.totalRevenue > 0 ? `€${user.totalRevenue.toFixed(0)}` : '—'}
                  </span>
                  <div>
                    {[...new Set(user.packages)].map(pkg => (
                      <span key={pkg} style={{
                        display: 'inline-block', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
                        padding: '2px 7px', marginRight: 4, marginBottom: 2,
                        background: pkg === 'signature' ? '#2D4A3E15' : pkg === 'elegance' ? '#8C5E3A15' : '#7A8C7A15',
                        color: pkg === 'signature' ? '#2D4A3E' : pkg === 'elegance' ? ACC : '#7A8C7A',
                      }}>
                        {pkg}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {hasSignature && (
                      <Link href={`/admin/custom-code?user=${user.user_id}`} style={{
                        fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                        padding: '6px 12px', border: `1px solid ${RULE}`,
                        color: INK, textDecoration: 'none',
                        background: 'transparent',
                      }}>
                        Code
                      </Link>
                    )}
                  </div>
                </div>

                {/* Invitations sub-rows */}
                {user.invitations.map(inv => (
                  <div key={inv.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 24px 8px 40px',
                    background: '#FAFAF6',
                    borderTop: `1px solid ${RULE}`,
                  }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 12.5, color: INK }}>
                        {inv.partner1_name} &amp; {inv.partner2_name}
                      </span>
                      <span style={{ fontSize: 11, color: MUTE, marginLeft: 10 }}>
                        /invite/{inv.slug} · {formatDate(inv.wedding_date)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{
                        fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                        padding: '2px 6px',
                        background: inv.is_active ? '#e8f5e9' : '#F7F4EF',
                        color: inv.is_active ? '#2e7d32' : MUTE,
                      }}>
                        {inv.is_active ? 'Active' : 'Draft'}
                      </span>
                      <span style={{ fontSize: 11, color: MUTE, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Eye size={10} /> {inv.view_count ?? 0}
                      </span>
                      <Link href={`/invite/${inv.slug}`} target="_blank" style={{ color: MUTE, display: 'flex' }}>
                        <ExternalLink size={12} />
                      </Link>
                      <Link href={`/dashboard/${inv.id}`} style={{
                        fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                        padding: '5px 10px', border: `1px solid ${RULE}`,
                        color: INK, textDecoration: 'none',
                      }}>
                        Manage
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
