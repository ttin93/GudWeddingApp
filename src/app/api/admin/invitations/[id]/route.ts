import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

async function verifyAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  if (user.user_metadata?.is_admin !== true) return null
  return { supabase, user }
}

// PATCH /api/admin/invitations/[id] — extend active_until
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await verifyAdmin()
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const { months } = await req.json()
  if (!months || typeof months !== 'number') {
    return NextResponse.json({ error: 'months required' }, { status: 400 })
  }

  // Get current active_until
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
