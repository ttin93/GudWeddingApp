import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

// TODO: restore limits when Stripe is live — essential: 0, elegance: 10
const LIMITS: Record<string, number> = { essential: 20, elegance: 20, signature: 20 }
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

// POST /api/photos — upload a photo for an invitation
export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const invitationId = formData.get('invitationId') as string | null

  if (!file || !invitationId) {
    return NextResponse.json({ error: 'file and invitationId required' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG and WebP images allowed' }, { status: 400 })
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
  }

  const service = await createServiceClient()

  // Verify invitation belongs to user and get package
  const { data: invitation } = await service
    .from('invitations')
    .select('id, package')
    .eq('id', invitationId)
    .eq('user_id', user.id)
    .single()

  if (!invitation) return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })

  const maxPhotos = LIMITS[invitation.package] ?? 0
  if (maxPhotos === 0) {
    return NextResponse.json({ error: 'Photo gallery not available on Essential plan' }, { status: 403 })
  }

  // Count existing photos
  const { count } = await service
    .from('invitation_photos')
    .select('id', { count: 'exact', head: true })
    .eq('invitation_id', invitationId)

  if ((count ?? 0) >= maxPhotos) {
    return NextResponse.json({ error: `Maximum ${maxPhotos} photos reached for your plan` }, { status: 403 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const path = `${user.id}/${invitationId}/${Date.now()}.${ext}`

  const { error: uploadErr } = await service.storage
    .from('invitation-photos')
    .upload(path, file, { contentType: file.type, upsert: false })

  if (uploadErr) return NextResponse.json({ error: uploadErr.message }, { status: 500 })

  // Get next display_order
  const { data: maxOrder } = await service
    .from('invitation_photos')
    .select('display_order')
    .eq('invitation_id', invitationId)
    .order('display_order', { ascending: false })
    .limit(1)
    .single()

  const nextOrder = (maxOrder?.display_order ?? -1) + 1

  const { data: photo, error: dbErr } = await service
    .from('invitation_photos')
    .insert({ invitation_id: invitationId, storage_path: path, display_order: nextOrder })
    .select()
    .single()

  if (dbErr) return NextResponse.json({ error: dbErr.message }, { status: 500 })

  const { data: { publicUrl } } = service.storage
    .from('invitation-photos')
    .getPublicUrl(path)

  return NextResponse.json({ ...photo, url: publicUrl })
}

// GET /api/photos?invitationId=xxx — list photos for an invitation
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const invitationId = searchParams.get('invitationId')
  if (!invitationId) return NextResponse.json({ error: 'invitationId required' }, { status: 400 })

  const service = await createServiceClient()
  const { data: photos, error } = await service
    .from('invitation_photos')
    .select('*')
    .eq('invitation_id', invitationId)
    .order('display_order', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const withUrls = (photos ?? []).map(p => ({
    ...p,
    url: service.storage.from('invitation-photos').getPublicUrl(p.storage_path).data.publicUrl,
  }))

  return NextResponse.json(withUrls)
}
