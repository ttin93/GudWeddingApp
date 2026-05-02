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
  const { partner1_name, partner2_name, wedding_date, template_id, package: pkg } = body

  const year = new Date(wedding_date).getFullYear()
  let slug = generateSlug(partner1_name, partner2_name, year)

  // Ensure slug uniqueness
  const { data: existing } = await supabase
    .from('invitations')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (existing) {
    slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`
  }

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
      timeline: [],
      languages: ['en'],
      show_gallery: true,
      show_countdown: true,
      is_active: false,
      view_count: 0,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
