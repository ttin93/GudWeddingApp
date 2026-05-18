import { NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { createServiceClient } from '@/lib/supabase/server'
import { PACKAGE_DURATION_MONTHS } from '@/lib/lemonsqueezy'
import { addMonths } from 'date-fns'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('x-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const expected = createHmac('sha256', process.env.LEMONSQUEEZY_WEBHOOK_SECRET!)
    .update(body)
    .digest('hex')

  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const event = JSON.parse(body)
  const eventName: string = event.meta?.event_name

  if (eventName === 'order_created') {
    const customData = event.meta?.custom_data as Record<string, string> | undefined
    const order = event.data?.attributes

    const userId = customData?.user_id
    const packageId = customData?.package_id
    const invitationId = customData?.invitation_id

    if (!userId || !packageId) {
      return NextResponse.json({ error: 'Missing custom data' }, { status: 400 })
    }

    // Only process paid orders
    if (order?.status !== 'paid') {
      return NextResponse.json({ received: true })
    }

    const supabase = await createServiceClient()
    const durationMonths = PACKAGE_DURATION_MONTHS[packageId] ?? 6
    const activeUntil = addMonths(new Date(), durationMonths).toISOString()

    await supabase.from('payments').insert({
      user_id: userId,
      invitation_id: invitationId || null,
      stripe_session_id: String(event.data?.id ?? ''),
      stripe_payment_id: String(order?.order_number ?? ''),
      package: packageId,
      amount: order?.total ?? 0,
      currency: (order?.currency ?? 'eur').toLowerCase(),
      status: 'completed',
    })

    if (invitationId) {
      await supabase
        .from('invitations')
        .update({ is_active: true, active_until: activeUntil, package: packageId })
        .eq('id', invitationId)
        .eq('user_id', userId)
    }
  }

  return NextResponse.json({ received: true })
}
