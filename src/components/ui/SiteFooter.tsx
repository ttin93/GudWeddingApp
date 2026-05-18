'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { NajinDanWordmark } from './NajinDanLogo'

const INK  = '#1A1714'
const ACC  = '#8C7B6B'
const RULE = '#E8E2D9'

export function SiteFooter() {
  const t = useTranslations('footer')

  const NAV = [
    {
      title: t('product'),
      links: [
        [t('templates'), '/templates'],
        [t('pricing'), '/pricing'],
        [t('demo'), '/demo'],
      ] as [string, string][],
    },
    {
      title: t('account'),
      links: [
        [t('signIn'), '/login'],
        [t('createAccount'), '/register'],
      ] as [string, string][],
    },
    {
      title: t('legal'),
      links: [
        [t('privacy'), '/privacy'],
        [t('terms'), '/terms'],
      ] as [string, string][],
    },
  ]

  return (
    <>
      <div style={{ height: 1, background: RULE }} />
      <footer style={{ background: INK, padding: '0 56px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 20,
          padding: '16px 0', borderBottom: '1px solid #3a342e',
          fontSize: 10, letterSpacing: '0.24em', color: '#6e6359',
          textTransform: 'uppercase', flexWrap: 'wrap',
        }}>
          <span>VOL. I</span>
          <span style={{ color: '#3a342e' }}>·</span>
          <span>ISSUE 26</span>
          <span style={{ color: '#3a342e' }}>·</span>
          <span>{t('spring')}</span>
          <span style={{ flex: 1, height: 1, background: '#3a342e', display: 'inline-block', minWidth: 20 }} />
          <span>{t('featuring')}</span>
          <span style={{ flex: 1, height: 1, background: '#3a342e', display: 'inline-block', minWidth: 20 }} />
          <span>{t('crafted')}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'start', gap: 64, padding: '48px 0' }}>
          <div>
            <Link href="/" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              textDecoration: 'none', marginBottom: 12,
            }}>
              <NajinDanWordmark size={24} dark />
            </Link>
            <p style={{ fontSize: 12.5, lineHeight: 1.6, color: '#6e6359', maxWidth: 200 }}>
              {t('tagline')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {NAV.map(({ title, links }) => (
              <div key={title}>
                <div style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#6e6359', marginBottom: 16 }}>
                  {title}
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 0, margin: 0 }}>
                  {links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href as any} style={{ fontSize: 13, color: '#EFE9DD', textDecoration: 'none' }}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 11, color: '#6e6359' }}>© {new Date().getFullYear()} NajinDan</p>
            <p style={{ fontSize: 11, color: '#6e6359', marginTop: 4 }}>{t('madeWithCare')}</p>
          </div>
        </div>
      </footer>
    </>
  )
}
