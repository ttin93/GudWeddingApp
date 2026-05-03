import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // app_metadata is server-only (user_metadata is user-writeable, so never use it for auth)
  const isAdmin = user.app_metadata?.is_admin === true
  if (!isAdmin) redirect('/dashboard')

  return (
    <div style={{ minHeight: '100vh', background: '#F4F2EE', display: 'flex' }}>
      <AdminSidebar userEmail={user.email ?? ''} />
      <main style={{ flex: 1, minWidth: 0, marginLeft: 260 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 40px' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
