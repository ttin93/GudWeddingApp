import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createLSCheckout, LS_VARIANTS } from '@/lib/lemonsqueezy'
import { rateLimit } from '@/lib/utils/ratelimit'
import type { Package } from '@/types'

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    const { allowed } = rateLimit(`checkout:${ip}`, 10, 60_000)
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { packageId, invitationId } = await req.json() as {
      packageId: Package
      invitationId?: string
    }

    const variantId = LS_VARIANTS[packageId]
    if (!variantId) {
      return NextResponse.json({ error: 'Invalid package' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL

    const { url } = await createLSCheckout({
      variantId,
      email: user.email!,
      customData: {
        user_id: user.id,
        package_id: packageId,
        invitation_id: invitationId ?? '',
      },
      redirectUrl: `${appUrl}/dashboard?payment=success`,
    })

    return NextResponse.json({ url })
  } catch (err) {
    console.error('LS checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
