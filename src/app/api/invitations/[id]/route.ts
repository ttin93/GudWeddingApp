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
    'partner1_name', 'partner2_name', 'wedding_date', 'wedding_time',
    'venue_name', 'venue_address', 'venue_city', 'venue_country',
    'ceremony_time', 'ceremony_venue', 'reception_time', 'reception_venue',
    'rsvp_deadline', 'rsvp_email', 'template_id', 'language',
    'dress_code', 'custom_message', 'additional_info',
    'show_gallery', 'show_rsvp', 'show_schedule', 'show_accommodation',
    'accommodation_info', 'transport_info',
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
