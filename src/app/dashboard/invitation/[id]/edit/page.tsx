import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { InvitationEditor } from '@/components/dashboard/InvitationEditor'
import type { Invitation } from '@/types'

export default async function EditInvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!invitation) notFound()

  return <InvitationEditor invitation={invitation as Invitation} />
}
