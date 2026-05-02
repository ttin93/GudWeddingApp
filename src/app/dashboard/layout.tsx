import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div style={{ minHeight: '100vh', background: '#F7F4EF', display: 'flex' }}>
      <DashboardSidebar user={user} />
      <main className="md-main" style={{ flex: 1, minWidth: 0 }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 40px' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
