import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (user.user_metadata?.is_admin !== true) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const body = await req.json()
  const { custom_css, custom_js, custom_head_html } = body

  // Verify invitation exists and is Signature package
  const { data: invitation } = await supabase
    .from('invitations')
    .select('id, package')
    .eq('id', id)
    .eq('package', 'signature')
    .single()

  if (!invitation) {
    return NextResponse.json({ error: 'Invitation not found or not Signature package' }, { status: 404 })
  }

  const { error } = await supabase
    .from('invitations')
    .update({
      custom_css: custom_css ?? null,
      custom_js: custom_js ?? null,
      custom_head_html: custom_head_html ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
