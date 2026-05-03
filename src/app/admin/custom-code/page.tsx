import { createServiceClient } from '@/lib/supabase/server'
import { CustomCodeEditor } from '@/components/admin/CustomCodeEditor'

async function getSignatureInvitations(filterUserId?: string) {
  const supabase = await createServiceClient()

  let query = supabase
    .from('invitations')
    .select('id, slug, partner1_name, partner2_name, user_id, package, custom_css, custom_js, custom_head_html')
    .eq('package', 'signature')
    .order('created_at', { ascending: false })

  if (filterUserId) {
    query = query.eq('user_id', filterUserId)
  }

  const { data } = await query
  return data ?? []
}

interface PageProps {
  searchParams: Promise<{ user?: string }>
}

export default async function CustomCodePage({ searchParams }: PageProps) {
  const { user: filterUserId } = await searchParams
  const invitations = await getSignatureInvitations(filterUserId)

  return (
    <CustomCodeEditor
      invitations={invitations}
      filterUserId={filterUserId}
    />
  )
}
