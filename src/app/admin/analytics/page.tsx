import { createClient } from '@/lib/supabase/server'
import { Eye, Users, TrendingUp, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils/format'

const INK  = '#1A1714'
const MUTE = '#6e6359'
const ACC  = '#8C5E3A'
const CREAM = '#F7F4EF'
const RULE  = '#E2DDD5'

async function getAnalyticsData() {
  const supabase = await createClient()

  const [
    { data: invitations },
    { data: rsvps },
    { data: payments },
  ] = await Promise.all([
    supabase.from('invitations').select('id, view_count, created_at, is_active, package, template_id, partner1_name, partner2_name'),
    supabase.from('rsvp_responses').select('attending, created_at, invitation_id'),
    supabase.from('payments').select('amount, status, created_at, package'),
  ])

  const inv = invitations ?? []
  const rv = rsvps ?? []
  const pay = payments ?? []

  // Daily signups last 30 days
  const now = Date.now()
  const dailyData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now - (29 - i) * 86400000)
    const dateStr = date.toISOString().split('T')[0]
    const signups = inv.filter(x => x.created_at.startsWith(dateStr)).length
    const rsvpCount = rv.filter(x => x.created_at.startsWith(dateStr)).length
    const revenue = pay.filter(p => p.status === 'completed' && p.created_at.startsWith(dateStr)).reduce((s, p) => s + p.amount / 100, 0)
    return { date: dateStr, signups, rsvpCount, revenue, label: date.toLocaleDateString('en', { month: 'short', day: 'numeric' }) }
  })

  // Template popularity
  const templateCounts: Record<string, number> = {}
  inv.forEach(i => { templateCounts[i.template_id] = (templateCounts[i.template_id] ?? 0) + 1 })
  const templateStats = Object.entries(templateCounts).sort((a, b) => b[1] - a[1])

  // Top viewed invitations
  const topViewed = [...inv].sort((a, b) => (b.view_count ?? 0) - (a.view_count ?? 0)).slice(0, 10)

  // RSVP stats
  const rsvpByDay = dailyData.map(d => d.rsvpCount)
  const maxRSVP = Math.max(...rsvpByDay, 1)

  return { dailyData, templateStats, topViewed, maxRSVP, inv, rv, pay }
}

export default async function AnalyticsPage() {
  const { dailyData, templateStats, topViewed, maxRSVP, inv, rv, pay } = await getAnalyticsData()

  const totalViews = inv.reduce((s, i) => s + (i.view_count ?? 0), 0)
  const completedPay = pay.filter(p => p.status === 'completed')
  const totalRevenue = completedPay.reduce((s, p) => s + p.amount / 100, 0)
  const avgOrderValue = completedPay.length > 0 ? totalRevenue / completedPay.length : 0

  return (
    <div>
      <div style={{ marginBottom: 48, paddingBottom: 28, borderBottom: `1px solid ${RULE}` }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 10 }}>
          Platform analytics
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 48, lineHeight: 0.95, color: INK }}>
          Analytics
        </h1>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: RULE, border: `1px solid ${RULE}`, marginBottom: 48 }}>
        {[
          { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye },
          { label: 'Total RSVPs', value: rv.length, icon: Users },
          { label: 'Attending', value: rv.filter(r => r.attending).length, icon: TrendingUp },
          { label: 'Avg Order', value: `€${avgOrderValue.toFixed(0)}`, icon: Calendar },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} style={{ background: CREAM, padding: '24px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTE }}>{label}</span>
              <Icon size={13} style={{ color: ACC }} />
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 36, lineHeight: 1, color: INK }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Signups & Revenue chart (last 30 days) */}
      <div style={{ border: `1px solid ${RULE}`, background: CREAM, padding: '28px', marginBottom: 32 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 24 }}>
          Signups — last 30 days
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 100 }}>
          {dailyData.map((d, i) => {
            const maxSignups = Math.max(...dailyData.map(x => x.signups), 1)
            const h = Math.max((d.signups / maxSignups) * 100, d.signups > 0 ? 8 : 2)
            return (
              <div
                key={i}
                title={`${d.label}: ${d.signups} signups`}
                style={{
                  flex: 1, height: `${h}%`,
                  background: d.signups > 0 ? ACC : RULE,
                  opacity: d.signups > 0 ? 0.85 : 0.4,
                  borderRadius: '2px 2px 0 0',
                  cursor: 'default',
                  transition: 'opacity 0.2s',
                }}
              />
            )
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ fontSize: 10, color: MUTE }}>{dailyData[0].label}</span>
          <span style={{ fontSize: 10, color: MUTE }}>{dailyData[dailyData.length - 1].label}</span>
        </div>
      </div>

      {/* RSVP chart */}
      <div style={{ border: `1px solid ${RULE}`, background: CREAM, padding: '28px', marginBottom: 32 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 24 }}>
          RSVPs — last 30 days
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 80 }}>
          {dailyData.map((d, i) => {
            const h = Math.max((d.rsvpCount / maxRSVP) * 100, d.rsvpCount > 0 ? 6 : 2)
            return (
              <div
                key={i}
                title={`${d.label}: ${d.rsvpCount} RSVPs`}
                style={{
                  flex: 1, height: `${h}%`,
                  background: d.rsvpCount > 0 ? '#2D4A3E' : RULE,
                  opacity: d.rsvpCount > 0 ? 0.8 : 0.35,
                  borderRadius: '2px 2px 0 0',
                }}
              />
            )
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

        {/* Template popularity */}
        <div style={{ border: `1px solid ${RULE}`, background: CREAM, padding: '28px' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 24 }}>
            Template popularity
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {templateStats.map(([id, count]) => {
              const maxCount = templateStats[0]?.[1] ?? 1
              return (
                <div key={id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: INK, textTransform: 'capitalize' }}>{id}</span>
                    <span style={{ fontSize: 12, color: MUTE }}>{count}</span>
                  </div>
                  <div style={{ height: 3, background: RULE }}>
                    <div style={{ height: '100%', background: ACC, width: `${(count / maxCount) * 100}%` }} />
                  </div>
                </div>
              )
            })}
            {templateStats.length === 0 && (
              <p style={{ fontSize: 13, color: MUTE }}>No data yet</p>
            )}
          </div>
        </div>

        {/* Top viewed */}
        <div style={{ border: `1px solid ${RULE}`, background: CREAM, padding: '28px' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 24 }}>
            Top viewed invitations
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {topViewed.map((inv) => (
              <div key={inv.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '9px 0', borderBottom: `1px solid ${RULE}`,
              }}>
                <span style={{ fontSize: 13, color: INK }}>
                  {inv.partner1_name} &amp; {inv.partner2_name}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Eye size={11} style={{ color: ACC }} />
                  <span style={{ fontSize: 13, color: MUTE }}>{inv.view_count ?? 0}</span>
                </div>
              </div>
            ))}
            {topViewed.length === 0 && (
              <p style={{ fontSize: 13, color: MUTE }}>No views yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
