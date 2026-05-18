const LS_API = 'https://api.lemonsqueezy.com/v1'

export const LS_VARIANTS: Record<string, string> = {
  essential: process.env.LS_VARIANT_ESSENTIAL ?? '',
  elegance: process.env.LS_VARIANT_ELEGANCE ?? '',
  signature: process.env.LS_VARIANT_SIGNATURE ?? '',
}

export const PACKAGE_DURATION_MONTHS: Record<string, number> = {
  essential: 6,
  elegance: 12,
  signature: 12,
}

export async function createLSCheckout({
  variantId,
  email,
  customData,
  redirectUrl,
}: {
  variantId: string
  email: string
  customData: Record<string, string>
  redirectUrl: string
}): Promise<{ url: string }> {
  const storeId = process.env.LEMONSQUEEZY_STORE_ID!

  const res = await fetch(`${LS_API}/checkouts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    },
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            email,
            custom: customData,
          },
          product_options: {
            redirect_url: redirectUrl,
            enabled_variants: [parseInt(variantId)],
          },
        },
        relationships: {
          store: {
            data: { type: 'stores', id: storeId },
          },
          variant: {
            data: { type: 'variants', id: variantId },
          },
        },
      },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`LS checkout error: ${res.status} ${err}`)
  }

  const json = await res.json()
  return { url: json.data.attributes.url }
}
