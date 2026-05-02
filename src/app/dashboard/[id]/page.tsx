import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { InvitationManager } from '@/components/dashboard/InvitationManager'

export default async function InvitationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: invitation } = await supabase
    .from('invitations')
    .select('*, rsvp_responses(*), invitation_photos(*)')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!invitation) notFound()

  return <InvitationManager invitation={invitation} />
}
