import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/server'
import { Eye, Users, TrendingUp, Plus, ExternalLink } from 'lucide-react'
import { formatDate } from '@/lib/utils/format'
import { DashboardBanners } from '@/components/dashboard/DashboardBanners'
import { PACKAGES } from '@/types'
import type { Invitation, Package } from '@/types'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'

async function getDashboardData(userId: string) {
  const supabase = await createClient()
  const [{ data: invitations }, { data: rsvps }] = await Promise.all([
    supabase.from('invitations').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    supabase.from('rsvp_responses').select('attending, invitation_id').in(
      'invitation_id',
      (await supabase.from('invitations').select('id').eq('user_id', userId)).data?.map((i) => i.id) ?? []
    ),
  ])
  return { invitations: invitations ?? [], rsvps: rsvps ?? [] }
}

export default async function DashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ payment?: string; package?: string; session_id?: string }>
}) {
  const { locale } = await params
  const sp = await searchParams
  setRequestLocale(locale)
  const t = await getTranslations('dashboard')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { invitations, rsvps } = await getDashboardData(user.id)

  const pendingPackage = (sp.package && sp.package in PACKAGES) ? sp.package as Package : null
  const paymentSuccess = sp.payment === 'success'
  const draftInv = invitations.find((i: Invitation) => !i.is_active) ?? null

  const totalViews = invitations.reduce((s: number, i: Invitation) => s + (i.view_count ?? 0), 0)
  const totalYes = rsvps.filter((r) => r.attending).length
  const totalNo = rsvps.filter((r) => !r.attending).length

  return (
    <div>
      <DashboardBanners
        paymentSuccess={paymentSuccess}
        pendingPackage={pendingPackage}
        hasDraftInvitation={!!draftInv}
        draftInvitationId={draftInv?.id ?? null}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48, paddingBottom: 32, borderBottom: `1px solid ${RULE}` }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 10 }}>
            {t('account')}
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 48, lineHeight: 0.95, color: INK, letterSpacing: '-0.02em' }}>
            {t('title')}
          </h1>
        </div>
        <Link href="/dashboard/invitation/new" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '13px 22px',
          background: INK, color: CREAM,
          fontFamily: 'var(--font-instrument)', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase',
          textDecoration: 'none',
        }}>
          <Plus size={13} />
          {t('newInvitation')}
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: RULE, border: `1px solid ${RULE}`, marginBottom: 48 }}>
        {[
          { label: t('totalViews'), value: totalViews, icon: Eye },
          { label: t('attending'), value: totalYes, icon: Users },
          { label: t('declined'), value: totalNo, icon: Users },
          { label: t('responseRate'), value: rsvps.length > 0 ? `${Math.round((rsvps.length / (rsvps.length + 10)) * 100)}%` : '—', icon: TrendingUp },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} style={{ background: CREAM, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: MUTE }}>{label}</span>
              <Icon size={14} style={{ color: ACC }} />
            </div>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 40, lineHeight: 1, color: INK, letterSpacing: '-0.01em' }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 20 }}>
          <span style={{ width: 24, height: 1, background: MUTE, display: 'inline-block' }} />
          {t('yourInvitations')}
        </div>

        {invitations.length === 0 ? (
          <div style={{ position: 'relative', border: `1px solid ${RULE}`, background: '#FBFAF6', padding: '64px 40px', textAlign: 'center' }}>
            {[
              { top: -4, left: -4, borderRight: 'none', borderBottom: 'none' },
              { top: -4, right: -4, borderLeft: 'none', borderBottom: 'none' },
              { bottom: -4, left: -4, borderRight: 'none', borderTop: 'none' },
              { bottom: -4, right: -4, borderLeft: 'none', borderTop: 'none' },
            ].map((s, i) => (
              <div key={i} style={{ position: 'absolute', width: 12, height: 12, border: `1px solid ${ACC}`, ...s }} />
            ))}
            <div style={{ fontFamily: 'var(--font-pinyon)', fontSize: 48, color: ACC, marginBottom: 8, lineHeight: 1 }}>
              {t('beginHere')}
            </div>
            <p style={{ fontSize: 14, color: MUTE, marginBottom: 28, lineHeight: 1.6 }}>
              {t('noInvitationsDesc')}
            </p>
            <Link href="/dashboard/invitation/new" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '13px 24px',
              background: INK, color: CREAM,
              fontFamily: 'var(--font-instrument)', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
              <Plus size={13} />
              {t('createFirst')}
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: RULE, border: `1px solid ${RULE}` }}>
            {invitations.map((inv: Invitation) => {
              const invRsvps = rsvps.filter((r) => r.invitation_id === inv.id)
              const attending = invRsvps.filter((r) => r.attending).length

              return (
                <div key={inv.id} style={{
                  background: CREAM, padding: '24px 28px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                      <span style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 17, color: INK }}>
                        {inv.partner1_name} &amp; {inv.partner2_name}
                      </span>
                      <span style={{
                        fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
                        padding: '3px 8px',
                        background: inv.is_active ? '#e8f5e9' : '#F7F4EF',
                        color: inv.is_active ? '#2e7d32' : MUTE,
                        border: `1px solid ${inv.is_active ? '#a5d6a7' : RULE}`,
                      }}>
                        {inv.is_active ? t('active') : t('draft')}
                      </span>
                    </div>
                    <p style={{ fontSize: 12.5, color: MUTE, marginBottom: 6 }}>
                      {formatDate(inv.wedding_date)} · {inv.template_id}
                    </p>
                    <p style={{ fontSize: 11, color: '#a89f96', fontFamily: 'var(--font-instrument)' }}>
                      /invite/{inv.slug}
                    </p>
                    <div style={{ display: 'flex', gap: 20, marginTop: 10, fontSize: 11.5, color: MUTE }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Eye size={11} style={{ color: ACC }} />{inv.view_count ?? 0} {t('views')}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Users size={11} style={{ color: ACC }} />{attending} {t('attending2')}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <a href={`/invite/${inv.slug}`} target="_blank" rel="noreferrer" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 36, height: 36, border: `1px solid ${RULE}`,
                      color: MUTE, textDecoration: 'none',
                    }}>
                      <ExternalLink size={14} />
                    </a>
                    <Link href={`/dashboard/${inv.id}`} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '9px 16px', border: `1px solid ${RULE}`,
                      fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: INK,
                      textDecoration: 'none',
                    }}>
                      {t('manage')}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
