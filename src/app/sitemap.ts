import type { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

const BASE = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ?? 'https://najindan.gudweb.si'
const LOCALES = ['sl', 'hr', 'en']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let invitations: { slug: string; updated_at: string }[] = []

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createServiceClient } = await import('@/lib/supabase/server')
      const supabase = await createServiceClient()
      const { data } = await supabase
        .from('invitations')
        .select('slug, updated_at')
        .eq('is_active', true)
      invitations = data ?? []
    } catch {
      // Supabase unavailable — skip invite routes
    }
  }

  const staticRoutes = ['', '/pricing', '/templates', '/demo'].flatMap(path =>
    LOCALES.map(locale => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    }))
  )

  const inviteRoutes = invitations.map(inv => ({
    url: `${BASE}/invite/${inv.slug}`,
    lastModified: new Date(inv.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...inviteRoutes]
}
