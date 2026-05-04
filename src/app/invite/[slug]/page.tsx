import { notFound } from 'next/navigation'
import { createClient, createServiceClient } from '@/lib/supabase/server'
import { TemplateRenderer } from '@/components/invitation/TemplateRenderer'
import { MusicPlayer } from '@/components/invitation/MusicPlayer'
import { PreviewBanner } from '@/components/invitation/PreviewBanner'
import type { Metadata } from 'next'
import type { Invitation } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
}

type FullInvitation = Invitation & {
  custom_css?: string | null
  custom_js?: string | null
  custom_head_html?: string | null
}

async function getInvitationBySlug(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', slug)
    .single()
  return data as FullInvitation | null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('invitations')
    .select('partner1_name, partner2_name, wedding_date, is_active')
    .eq('slug', slug)
    .single()

  if (!data || !data.is_active) return { title: 'Wedding Invitation' }

  return {
    title: `${data.partner1_name} & ${data.partner2_name} — Wedding Invitation`,
    description: `You're invited to the wedding of ${data.partner1_name} and ${data.partner2_name}.`,
    openGraph: {
      title: `${data.partner1_name} & ${data.partner2_name}`,
      description: `Wedding — ${data.wedding_date}`,
    },
  }
}

export default async function InvitePage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const invitation = await getInvitationBySlug(slug)

  if (!invitation) notFound()
  // Expired invitations → 404
  if (invitation.active_until && new Date(invitation.active_until) < new Date()) notFound()
  const isPreview = !invitation.is_active

  const serviceClient = await createServiceClient()

  // Attach cover photo (first photo by display_order)
  const { data: firstPhoto } = await serviceClient
    .from('invitation_photos')
    .select('storage_path')
    .eq('invitation_id', invitation.id)
    .order('display_order', { ascending: true })
    .limit(1)
    .maybeSingle()

  const invitationWithPhoto: FullInvitation = {
    ...invitation,
    cover_photo_url: firstPhoto
      ? serviceClient.storage.from('invitation-photos').getPublicUrl(firstPhoto.storage_path).data.publicUrl
      : undefined,
  }

  // Count views only for live invitations
  if (!isPreview) {
    serviceClient.rpc('increment_view_count', { inv_slug: slug }).then(() => {})
  }

  return (
    <>
      {invitation.custom_head_html && (
        <div dangerouslySetInnerHTML={{ __html: invitation.custom_head_html }} />
      )}
      {invitation.custom_css && (
        <style dangerouslySetInnerHTML={{ __html: invitation.custom_css }} />
      )}

      <TemplateRenderer invitation={invitationWithPhoto} />
      <MusicPlayer trackId={invitation.background_music} />
      {isPreview && <PreviewBanner invitationId={invitation.id} />}

      {invitation.custom_js && (
        <script defer dangerouslySetInnerHTML={{ __html: invitation.custom_js }} />
      )}
    </>
  )
}
