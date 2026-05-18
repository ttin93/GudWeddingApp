import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('invitations')
    .select('*, invitation_photos(*), rsvp_responses(*)')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json(data)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  // Allowlist — users must never set is_active, user_id, or payment fields
  const ALLOWED = [
    'partner1_name', 'partner2_name', 'wedding_date', 'template_id',
    'venue_name', 'venue_address', 'ceremony_time', 'reception_time',
    'personal_message', 'story', 'dress_code',
    'timeline', 'languages', 'labels',
    'show_gallery', 'show_countdown', 'show_story', 'show_program',
    'show_dress_code', 'show_children_policy', 'show_hashtag',
    'show_music', 'show_contact', 'show_transport',
    'show_accommodation', 'show_gift_registry', 'show_faq',
    'rsvp_deadline', 'rsvp_mode', 'max_guests',
    'hashtag', 'contact_name', 'contact_phone', 'contact_email',
    'children_policy', 'transport_notes', 'music_playlist_url',
    'accommodation', 'gift_registry', 'faq',
    'background_music', 'cover_photo_caption', 'cover_photo_badge',
    'show_intro',
  ] as const
  type AllowedField = (typeof ALLOWED)[number]
  const patch: Partial<Record<AllowedField, unknown>> & { updated_at: string } = {
    updated_at: new Date().toISOString(),
  }
  for (const key of ALLOWED) {
    if (key in body) patch[key] = body[key]
  }

  const { data, error } = await supabase
    .from('invitations')
    .update(patch)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase
    .from('invitations')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
