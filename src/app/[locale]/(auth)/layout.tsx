import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'

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
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-dm-serif)', fontSize: 18, color: '#1A1714', textDecoration: 'none' }}>
          <span style={{ fontSize: 9, color: '#8C7B6B' }}>◉</span>
          <span>NajinDan</span>
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
