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

const MENU_LABELS: Record<string, string> = {
  meat: 'Meso',
  fish: 'Riba',
  vegetarian: 'Vegetarijansko',
  vegan: 'Vegansko',
}

function emailWrapper(content: string) {
  return `<!DOCTYPE html>
<html lang="sl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F3EE;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F3EE;padding:40px 0;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
      <!-- Header -->
      <tr><td style="background:#1C1714;padding:32px 40px;text-align:center;border-radius:8px 8px 0 0;">
        <p style="margin:0;color:#C9A96E;font-size:11px;letter-spacing:.35em;text-transform:uppercase;font-family:Georgia,serif;">NajinDan</p>
        <p style="margin:6px 0 0;color:rgba(255,255,255,.4);font-size:10px;letter-spacing:.2em;font-family:Georgia,serif;">digitalna poročna vabila</p>
      </td></tr>
      <!-- Body -->
      <tr><td style="background:#ffffff;padding:40px;border-radius:0 0 8px 8px;">
        ${content}
      </td></tr>
      <!-- Footer -->
      <tr><td style="padding:24px 0;text-align:center;">
        <p style="margin:0;color:#A0927E;font-size:11px;font-family:Georgia,serif;letter-spacing:.1em;">
          NajinDan &middot; <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#A0927E;">najindan.gudweb.si</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

function coupleNotificationHtml({
  guestName, attending, adults, children, menuChoice, guestMenus, allergies, message, dashboardUrl,
}: {
  guestName: string, attending: boolean, adults: number, children: number,
  menuChoice?: string, guestMenus?: Array<{label:string,menu:string}>,
  allergies?: string, message?: string, dashboardUrl: string,
}) {
  const rows = [
    ['Prisoten/na', attending ? '✓ Da' : '✗ Ne'],
    attending ? ['Odrasli', String(adults)] : null,
    attending && children > 0 ? ['Otroci', String(children)] : null,
    menuChoice ? ['Meni', MENU_LABELS[menuChoice] ?? menuChoice] : null,
    allergies ? ['Alergije', allergies] : null,
    message ? ['Sporočilo', `<em>"${message}"</em>`] : null,
  ].filter(Boolean) as [string, string][]

  const menus = guestMenus?.length
    ? `<tr><td colspan="2" style="padding:0 0 16px;"><table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #EDE8E3;border-radius:4px;overflow:hidden;">${
        guestMenus.map((gm, i) => `<tr style="background:${i%2===0?'#FAF8F6':'#fff'}"><td style="padding:8px 12px;font-size:13px;color:#5C4A3A;">${gm.label}</td><td style="padding:8px 12px;font-size:13px;color:#1C1714;text-align:right;">${MENU_LABELS[gm.menu]??gm.menu}</td></tr>`).join('')
      }</table></td></tr>`
    : ''

  return emailWrapper(`
    <p style="margin:0 0 4px;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#A0927E;">Nova prijava</p>
    <h1 style="margin:0 0 24px;font-size:24px;color:#1C1714;font-weight:normal;">${guestName}</h1>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${menus}
      ${rows.map(([k,v]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #F0EBE5;font-size:13px;color:#7A6A5A;width:40%;">${k}</td><td style="padding:10px 0;border-bottom:1px solid #F0EBE5;font-size:13px;color:#1C1714;">${v}</td></tr>`).join('')}
    </table>
    <div style="text-align:center;margin-top:32px;">
      <a href="${dashboardUrl}" style="display:inline-block;background:#1C1714;color:#C9A96E;text-decoration:none;font-size:11px;letter-spacing:.25em;text-transform:uppercase;padding:14px 28px;border-radius:4px;">Odpri nadzorno ploščo</a>
    </div>
  `)
}

function guestConfirmationHtml({
  guestName, coupleNames, weddingDate,
}: {
  guestName: string, coupleNames: string, weddingDate?: string,
}) {
  const dateStr = weddingDate
    ? new Date(weddingDate).toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return emailWrapper(`
    <div style="text-align:center;padding:8px 0 32px;">
      <div style="font-size:28px;color:#C9A96E;margin-bottom:20px;">♡</div>
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#A0927E;">Prijava potrjena</p>
      <h1 style="margin:0 0 16px;font-size:26px;color:#1C1714;font-weight:normal;">Vidimo se, ${guestName}!</h1>
      <p style="margin:0;font-size:15px;color:#5C4A3A;line-height:1.7;">Vaša prijava na poroko<br><strong>${coupleNames}</strong>${dateStr ? `<br><span style="color:#A0927E;">${dateStr}</span>` : ''}<br>je bila uspešno prejeta.</p>
      <div style="margin:32px auto;width:48px;height:1px;background:#C9A96E;opacity:.4;"></div>
      <p style="margin:0;font-size:13px;color:#A0927E;line-height:1.6;">Veselimo se vašega obiska.<br>Z veseljem,<br><em>${coupleNames}</em></p>
    </div>
  `)
}

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
    const { data: userData } = await supabase.auth.admin.getUserById(invitation.user_id)
    const coupleEmail = userData?.user?.email

    const resend = new Resend(process.env.RESEND_API_KEY)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL

    if (coupleEmail) {
      await resend.emails.send({
        from: `NajinDan <${process.env.RESEND_FROM_EMAIL}>`,
        to: coupleEmail,
        subject: `${data.attending ? '✓' : '✗'} ${data.guest_name} ${data.attending ? 'prihaja' : 'ne prihaja'} na vašo poroko`,
        html: coupleNotificationHtml({
          guestName: data.guest_name,
          attending: data.attending,
          adults: data.adults,
          children: data.children,
          menuChoice: data.menu_choice,
          guestMenus: data.guest_menus,
          allergies: data.allergies,
          message: data.message,
          dashboardUrl: `${appUrl}/dashboard`,
        }),
      })
    }

    if (data.email && data.attending) {
      await resend.emails.send({
        from: `NajinDan <${process.env.RESEND_FROM_EMAIL}>`,
        to: data.email,
        subject: `Prijava potrjena — ${coupleNames}`,
        html: guestConfirmationHtml({
          guestName: data.guest_name,
          coupleNames,
          weddingDate: invitation.wedding_date,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('RSVP error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
