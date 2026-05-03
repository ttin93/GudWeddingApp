import type { MetadataRoute } from 'next'
import { createServiceClient } from '@/lib/supabase/server'

const BASE = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ?? 'https://invitia.app'
const LOCALES = ['sl', 'hr', 'en']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createServiceClient()
  const { data: invitations } = await supabase
    .from('invitations')
    .select('slug, updated_at')
    .eq('is_active', true)

  const staticRoutes = ['', '/pricing', '/templates', '/demo'].flatMap(path =>
    LOCALES.map(locale => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    }))
  )

  const inviteRoutes = (invitations ?? []).map(inv => ({
    url: `${BASE}/invite/${inv.slug}`,
    lastModified: new Date(inv.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...inviteRoutes]
}
