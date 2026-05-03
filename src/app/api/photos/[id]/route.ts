import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

// DELETE /api/photos/[id]
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const service = await createServiceClient()

  // Verify ownership via invitation
  const { data: photo } = await service
    .from('invitation_photos')
    .select('id, storage_path, invitation_id')
    .eq('id', id)
    .single()

  if (!photo) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: inv } = await service
    .from('invitations')
    .select('user_id')
    .eq('id', photo.invitation_id)
    .single()

  if (!inv || inv.user_id !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await service.storage.from('invitation-photos').remove([photo.storage_path])
  await service.from('invitation_photos').delete().eq('id', id)

  return NextResponse.json({ success: true })
}
