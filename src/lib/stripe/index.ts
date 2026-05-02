import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-04-22.dahlia',
    })
  }
  return _stripe
}

// Keep named export for convenience but lazy-loaded
export const STRIPE_PRICES: Record<string, string> = {
  essential: process.env.STRIPE_PRICE_ESSENTIAL ?? '',
  elegance: process.env.STRIPE_PRICE_ELEGANCE ?? '',
  signature: process.env.STRIPE_PRICE_SIGNATURE ?? '',
}

export const PACKAGE_DURATION_MONTHS: Record<string, number> = {
  essential: 6,
  elegance: 12,
  signature: 12,
}
