import { NextResponse } from 'next/server'
import { getStripe, PACKAGE_DURATION_MONTHS } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
import { addMonths } from 'date-fns'
import type Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { userId, packageId, invitationId } = session.metadata ?? {}

    if (!userId || !packageId) {
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    const supabase = await createServiceClient()
    const durationMonths = PACKAGE_DURATION_MONTHS[packageId] ?? 6
    const activeUntil = addMonths(new Date(), durationMonths).toISOString()

    // Record payment
    await supabase.from('payments').insert({
      user_id: userId,
      invitation_id: invitationId || null,
      stripe_session_id: session.id,
      stripe_payment_id: session.payment_intent as string,
      package: packageId,
      amount: session.amount_total ?? 0,
      currency: session.currency ?? 'eur',
      status: 'completed',
    })

    // Activate invitation if provided
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
