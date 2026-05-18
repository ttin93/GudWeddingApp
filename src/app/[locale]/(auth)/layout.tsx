import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { NajinDanWordmark } from '@/components/ui/NajinDanLogo'

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) notFound()
  setRequestLocale(locale)

  return (
    <div style={{ minHeight: '100vh', background: '#F7F4EF', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 56px', height: 72, borderBottom: '1px solid #E8E2D9' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <NajinDanWordmark size={20} />
        </Link>
        <div style={{ fontSize: 12, letterSpacing: '0.08em', color: '#6e6359' }}>
          The digital invitation house
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 56, top: 0, bottom: 0, width: 1, background: '#E8E2D9' }} />
        <div style={{ position: 'absolute', right: 56, top: 0, bottom: 0, width: 1, background: '#E8E2D9' }} />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 24px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
