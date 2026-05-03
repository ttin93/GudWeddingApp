import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { rateLimit } from '@/lib/utils/ratelimit'

const schema = z.object({
  invitation_id: z.string().uuid(),
  guest_name: z.string().min(1).max(100),
  email: z.string().email().optional().or(z.literal('')),
  attending: z.boolean(),
  adults: z.number().int().min(1).max(20).default(1),
  children: z.number().int().min(0).max(20).default(0),
  children_ages: z.string().max(200).optional(),
  menu_choice: z.enum(['meat', 'fish', 'vegetarian', 'vegan']).optional(),
  guest_menus: z.array(z.object({ label: z.string().max(50), menu: z.string().max(50) })).max(20).optional(),
  allergies: z.string().max(500).optional(),
  message: z.string().max(1000).optional(),
})

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    const { allowed } = rateLimit(`rsvp:${ip}`, 5, 60_000)
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data
    const supabase = await createServiceClient()

    // Verify invitation exists and is active
    const { data: invitation, error: invErr } = await supabase
      .from('invitations')
      .select('id, partner1_name, partner2_name, wedding_date, user_id, is_active')
      .eq('id', data.invitation_id)
      .single()

    if (invErr || !invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
    }

    if (!invitation.is_active) {
      return NextResponse.json({ error: 'This invitation is no longer accepting RSVPs' }, { status: 403 })
    }

    // Save RSVP
    const { error: rsvpErr } = await supabase.from('rsvp_responses').insert({
      invitation_id: data.invitation_id,
      guest_name: data.guest_name,
      email: data.email || null,
      attending: data.attending,
      adults: data.adults,
      children: data.children,
      children_ages: data.children_ages || null,
      menu_choice: data.menu_choice || null,
      guest_menus: data.guest_menus?.length ? data.guest_menus : null,
      allergies: data.allergies || null,
      message: data.message || null,
    })

    if (rsvpErr) {
      return NextResponse.json({ error: 'Failed to save RSVP' }, { status: 500 })
    }

    const coupleNames = `${invitation.partner1_name} & ${invitation.partner2_name}`

    // Get couple's email to notify them
    const { data: userData } = await supabase.auth.admin.getUserById(invitation.user_id)
    const coupleEmail = userData?.user?.email

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send notification to couple
    if (coupleEmail) {
      await resend.emails.send({
        from: `Invitia <${process.env.RESEND_FROM_EMAIL}>`,
        to: coupleEmail,
        subject: `New RSVP from ${data.guest_name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; color: #1C1C1C;">
            <h2 style="color: #8B6B4A;">New RSVP Response</h2>
            <p><strong>${data.guest_name}</strong> has responded to your invitation.</p>
            <table style="border-collapse: collapse; width: 100%; margin-top: 16px;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Attending:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.attending ? '✅ Yes' : '❌ No'}</td></tr>
              ${data.attending ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Adults:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.adults}</td></tr>` : ''}
              ${data.attending && data.children > 0 ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Children:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.children}</td></tr>` : ''}
              ${data.menu_choice ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Menu:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.menu_choice}</td></tr>` : ''}
              ${data.guest_menus?.length ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; vertical-align: top;"><strong>Menus:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.guest_menus.map(gm => `${gm.label}: ${gm.menu}`).join('<br>')}</td></tr>` : ''}
              ${data.message ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee; font-style: italic;">"${data.message}"</td></tr>` : ''}
            </table>
            <p style="margin-top: 24px; color: #6B6B6B; font-size: 14px;">View all responses in your <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="color: #8B6B4A;">Invitia dashboard</a>.</p>
          </div>
        `,
      })
    }

    // Send confirmation to guest if they provided email
    if (data.email && data.attending) {
      await resend.emails.send({
        from: `Invitia <${process.env.RESEND_FROM_EMAIL}>`,
        to: data.email,
        subject: `RSVP Confirmed — ${coupleNames}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 500px; margin: 0 auto; color: #1C1C1C; text-align: center;">
            <div style="color: #8B6B4A; font-size: 32px; margin-bottom: 16px;">♥</div>
            <h2 style="color: #8B6B4A;">See you there, ${data.guest_name}!</h2>
            <p>Your RSVP for <strong>${coupleNames}</strong>'s wedding has been received.</p>
            <p style="color: #6B6B6B; font-size: 14px; margin-top: 24px;">We look forward to celebrating with you.</p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('RSVP error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
