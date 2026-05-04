import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils/format'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const {
    partner1_name, partner2_name, wedding_date, template_id, package: pkg,
    venue_name, venue_address, ceremony_time, reception_time,
    personal_message, story, dress_code,
    timeline, show_gallery, show_countdown,
    rsvp_deadline, max_guests,
    hashtag, contact_name, contact_phone, contact_email,
    children_policy, transport_notes, music_playlist_url,
    accommodation, gift_registry, faq,
    language, labels,
    show_story, show_program, show_dress_code, show_children_policy,
    show_hashtag, show_music, show_contact, show_transport,
    show_accommodation, show_gift_registry, show_faq,
    rsvp_mode, background_music,
  } = body

  const year = new Date(wedding_date).getFullYear()
  let slug = generateSlug(partner1_name, partner2_name, year)

  const { data: existing } = await supabase
    .from('invitations')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (existing) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`

  const { data, error } = await supabase
    .from('invitations')
    .insert({
      user_id: user.id,
      slug,
      partner1_name,
      partner2_name,
      wedding_date,
      template_id: template_id ?? 'botanica',
      package: pkg ?? 'essential',
      venue_name: venue_name || null,
      venue_address: venue_address || null,
      ceremony_time: ceremony_time || null,
      reception_time: reception_time || null,
      personal_message: personal_message || null,
      story: story || null,
      dress_code: dress_code || null,
      timeline: timeline ?? [],
      languages: language ? [language] : ['sl'],
      labels: labels ?? null,
      show_gallery: show_gallery ?? true,
      show_countdown: show_countdown ?? true,
      rsvp_deadline: rsvp_deadline || null,
      max_guests: max_guests || null,
      hashtag: hashtag || null,
      contact_name: contact_name || null,
      contact_phone: contact_phone || null,
      contact_email: contact_email || null,
      children_policy: children_policy || null,
      transport_notes: transport_notes || null,
      music_playlist_url: music_playlist_url || null,
      accommodation: accommodation ?? [],
      gift_registry: gift_registry ?? [],
      faq: faq ?? [],
      show_story: show_story ?? true,
      show_program: show_program ?? true,
      show_dress_code: show_dress_code ?? true,
      show_children_policy: show_children_policy ?? true,
      show_hashtag: show_hashtag ?? true,
      show_music: show_music ?? true,
      show_contact: show_contact ?? true,
      show_transport: show_transport ?? true,
      show_accommodation: show_accommodation ?? true,
      show_gift_registry: show_gift_registry ?? true,
      show_faq: show_faq ?? true,
      rsvp_mode: rsvp_mode ?? 'form',
      background_music: background_music && background_music !== 'none' ? background_music : null,
      is_active: false,
      view_count: 0,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
