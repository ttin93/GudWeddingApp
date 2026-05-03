import { NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase/server'

async function verifyAdmin() {
  const authClient = await createClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) return null
  // app_metadata is server-only; user_metadata is user-writeable
  if (user.app_metadata?.is_admin !== true) return null
  const supabase = await createServiceClient()
  return { supabase, user }
}

// PATCH /api/admin/invitations/[id] — extend active_until OR toggle is_active
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await verifyAdmin()
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const body = await req.json()

  // Toggle is_active
  if ('is_active' in body) {
    const { data, error } = await ctx.supabase
      .from('invitations')
      .update({ is_active: Boolean(body.is_active), updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('id, is_active')
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  }

  // Extend active_until by N months
  const { months } = body
  if (!months || typeof months !== 'number') {
    return NextResponse.json({ error: 'months or is_active required' }, { status: 400 })
  }

  const { data: inv } = await ctx.supabase
    .from('invitations')
    .select('active_until')
    .eq('id', id)
    .single()

  if (!inv) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const base = inv.active_until ? new Date(inv.active_until) : new Date()
  base.setMonth(base.getMonth() + months)

  const { data, error } = await ctx.supabase
    .from('invitations')
    .update({ active_until: base.toISOString(), updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, active_until')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// DELETE /api/admin/invitations/[id]
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await verifyAdmin()
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params

  const { error } = await ctx.supabase
    .from('invitations')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
