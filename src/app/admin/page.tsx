import { createServiceClient } from '@/lib/supabase/server'
import { Users, FileText, Eye, TrendingUp, CreditCard, CheckCircle, Clock, Package } from 'lucide-react'
import { formatDate } from '@/lib/utils/format'

const INK  = '#1A1714'
const MUTE = '#6e6359'
const ACC  = '#8C5E3A'
const CREAM = '#F7F4EF'
const RULE  = '#E2DDD5'

async function getPlatformStats() {
  const supabase = await createServiceClient()

  const [
    { count: totalUsers },
    { data: invitations },
    { data: rsvps },
    { data: payments },
  ] = await Promise.all([
    supabase.from('invitations').select('*', { count: 'exact', head: true }),
    supabase.from('invitations').select('id, package, is_active, view_count, created_at, partner1_name, partner2_name, slug'),
    supabase.from('rsvp_responses').select('attending, created_at'),
    supabase.from('payments').select('amount, status, package, created_at, currency'),
  ])

  const inv = invitations ?? []
  const rv = rsvps ?? []
  const pay = payments ?? []

  const totalRevenue = pay.filter(p => p.status === 'completed').reduce((s, p) => s + (p.amount / 100), 0)
  const activeInvites = inv.filter(i => i.is_active).length
  const totalViews = inv.reduce((s, i) => s + (i.view_count ?? 0), 0)
  const totalRSVPs = rv.length
  const attendingYes = rv.filter(r => r.attending).length

  // Recent signups (last 7 days)
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString()
  const recentInvites = inv.filter(i => i.created_at > sevenDaysAgo).length

  // Package breakdown
  const packageBreakdown = {
    essential: inv.filter(i => i.package === 'essential').length,
    elegance: inv.filter(i => i.package === 'elegance').length,
    signature: inv.filter(i => i.package === 'signature').length,
  }

  // Revenue by package
  const revenueByPackage = {
    essential: pay.filter(p => p.status === 'completed' && p.package === 'essential').reduce((s, p) => s + p.amount / 100, 0),
    elegance: pay.filter(p => p.status === 'completed' && p.package === 'elegance').reduce((s, p) => s + p.amount / 100, 0),
    signature: pay.filter(p => p.status === 'completed' && p.package === 'signature').reduce((s, p) => s + p.amount / 100, 0),
  }

  // Recent invitations
  const recent = [...inv].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 8)

  return {
    totalInvitations: totalUsers ?? inv.length,
    activeInvites,
    totalViews,
    totalRSVPs,
    attendingYes,
    totalRevenue,
    recentInvites,
    packageBreakdown,
    revenueByPackage,
    recent,
  }
}

export default async function AdminPage() {
  const stats = await getPlatformStats()

  const kpis = [
    { label: 'Total Invitations', value: stats.totalInvitations, icon: FileText, sub: `+${stats.recentInvites} this week` },
    { label: 'Active', value: stats.activeInvites, icon: CheckCircle, sub: 'Live pages' },
    { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, sub: 'All time' },
    { label: 'RSVPs', value: stats.totalRSVPs, icon: Users, sub: `${stats.attendingYes} attending` },
    { label: 'Revenue', value: `€${stats.totalRevenue.toFixed(0)}`, icon: CreditCard, sub: 'Completed payments' },
    { label: 'Conversion', value: stats.totalRSVPs > 0 ? `${Math.round((stats.attendingYes / stats.totalRSVPs) * 100)}%` : '—', icon: TrendingUp, sub: 'Yes / total RSVP' },
  ]

  const packages = [
    { id: 'essential', label: 'Essential', count: stats.packageBreakdown.essential, revenue: stats.revenueByPackage.essential, color: '#7A8C7A' },
    { id: 'elegance', label: 'Elegance', count: stats.packageBreakdown.elegance, revenue: stats.revenueByPackage.elegance, color: ACC },
    { id: 'signature', label: 'Signature', count: stats.packageBreakdown.signature, revenue: stats.revenueByPackage.signature, color: '#2D4A3E' },
  ]

  const total = stats.packageBreakdown.essential + stats.packageBreakdown.elegance + stats.packageBreakdown.signature || 1

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 48, paddingBottom: 28, borderBottom: `1px solid ${RULE}` }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 10 }}>
          Platform overview
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 48, lineHeight: 0.95, color: INK }}>
          Admin Dashboard
        </h1>
      </div>

      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: RULE, border: `1px solid ${RULE}`, marginBottom: 48 }}>
        {kpis.map(({ label, value, icon: Icon, sub }) => (
          <div key={label} style={{ background: CREAM, padding: '28px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: MUTE }}>{label}</span>
              <Icon size={14} style={{ color: ACC }} />
            </div>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 40, lineHeight: 1, color: INK }}>
              {value}
            </div>
            <p style={{ fontSize: 11, color: MUTE, marginTop: 6 }}>{sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 48 }}>

        {/* Package breakdown */}
        <div style={{ border: `1px solid ${RULE}`, background: CREAM, padding: '28px' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Package size={12} style={{ color: ACC }} />
            Package breakdown
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {packages.map(pkg => (
              <div key={pkg.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, color: INK }}>{pkg.label}</span>
                  <span style={{ fontSize: 13, color: MUTE }}>{pkg.count} · €{pkg.revenue.toFixed(0)}</span>
                </div>
                <div style={{ height: 4, background: RULE, borderRadius: 2 }}>
                  <div style={{
                    height: '100%', borderRadius: 2,
                    background: pkg.color,
                    width: `${Math.round((pkg.count / total) * 100)}%`,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
                <div style={{ fontSize: 10, color: MUTE, marginTop: 3 }}>
                  {Math.round((pkg.count / total) * 100)}% of invitations
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ border: `1px solid ${RULE}`, background: CREAM, padding: '28px' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Clock size={12} style={{ color: ACC }} />
            Recent invitations
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {stats.recent.slice(0, 6).map((inv) => (
              <div key={inv.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '9px 0', borderBottom: `1px solid ${RULE}`,
              }}>
                <div>
                  <span style={{ fontSize: 13, color: INK }}>
                    {inv.partner1_name} &amp; {inv.partner2_name}
                  </span>
                  <p style={{ fontSize: 11, color: MUTE }}>/invite/{inv.slug}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                    padding: '2px 7px',
                    background: inv.package === 'signature' ? '#2D4A3E15' : inv.package === 'elegance' ? '#8C5E3A15' : '#7A8C7A15',
                    color: inv.package === 'signature' ? '#2D4A3E' : inv.package === 'elegance' ? ACC : '#7A8C7A',
                  }}>
                    {inv.package}
                  </span>
                  <p style={{ fontSize: 10, color: MUTE, marginTop: 2 }}>{formatDate(inv.created_at, 'dd MMM')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
