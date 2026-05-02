import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { TemplateRenderer } from '@/components/invitation/TemplateRenderer'
import type { Metadata } from 'next'
import type { Invitation } from '@/types'

interface Props {
  params: Promise<{ slug: string }>
}

async function getInvitation(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  return data as Invitation | null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const invitation = await getInvitation(slug)

  if (!invitation) return { title: 'Invitation not found' }

  return {
    title: `${invitation.partner1_name} & ${invitation.partner2_name} — Wedding Invitation`,
    description: `You're invited to the wedding of ${invitation.partner1_name} and ${invitation.partner2_name}.`,
    openGraph: {
      title: `${invitation.partner1_name} & ${invitation.partner2_name}`,
      description: `Wedding — ${invitation.wedding_date}`,
    },
  }
}

export default async function InvitePage({ params }: Props) {
  const { slug } = await params
  const invitation = await getInvitation(slug)

  if (!invitation) notFound()

  // Increment view count (fire-and-forget)
  const supabase = await createClient()
  supabase
    .from('invitations')
    .update({ view_count: (invitation.view_count ?? 0) + 1 })
    .eq('slug', slug)
    .then(() => {})

  return <TemplateRenderer invitation={invitation} />
}
