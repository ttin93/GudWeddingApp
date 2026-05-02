import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TemplateRenderer } from '@/components/invitation/TemplateRenderer'
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

  // Povabilo ne obstaja
  if (!invitation) notFound()

  // Increment view count (fire-and-forget)
  supabase
    .from('invitations')
    .update({ view_count: (invitation.view_count ?? 0) + 1 })
    .eq('slug', slug)
    .then(() => {})

  return (
    <>
      {invitation.custom_head_html && (
        <div dangerouslySetInnerHTML={{ __html: invitation.custom_head_html }} />
      )}
      {invitation.custom_css && (
        <style dangerouslySetInnerHTML={{ __html: invitation.custom_css }} />
      )}

      <TemplateRenderer invitation={invitation} />

      {invitation.custom_js && (
        <script defer dangerouslySetInnerHTML={{ __html: invitation.custom_js }} />
      )}
    </>
  )
}
