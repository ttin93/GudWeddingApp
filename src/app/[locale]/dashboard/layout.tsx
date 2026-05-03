import { redirect } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) notFound()
  setRequestLocale(locale)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const isAdmin = user.user_metadata?.is_admin === true

  return (
    <div style={{ minHeight: '100vh', background: '#F7F4EF', display: 'flex' }}>
      <DashboardSidebar user={user} isAdmin={isAdmin} />
      <main className="md-main" style={{ flex: 1, minWidth: 0 }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 40px' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
