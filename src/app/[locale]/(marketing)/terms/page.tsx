import { getTranslations } from 'next-intl/server'
import { SiteNav } from '@/components/ui/SiteNav'
import { SiteFooter } from '@/components/ui/SiteFooter'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const CREAM = '#F7F4EF'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })
  return { title: `${t('title')} — NajinDan` }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'terms' })

  return (
    <div style={{ background: CREAM, minHeight: '100vh' }}>
      <SiteNav />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 56px 120px' }}>
        <div style={{ fontSize: 10.5, letterSpacing: '0.32em', textTransform: 'uppercase', color: MUTE, marginBottom: 20 }}>{t('label')}</div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 56, color: INK, lineHeight: 1, marginBottom: 8 }}>
          {t('title')}
        </h1>
        <p style={{ fontSize: 13, color: MUTE, marginBottom: 56 }}>{t('updated')}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontSize: 14, color: '#3a342e', lineHeight: 1.75 }}>
          {[
            { title: t('s1title'), body: t('s1body') },
            { title: t('s2title'), body: t('s2body') },
            { title: t('s3title'), body: t('s3body') },
            { title: t('s4title'), body: t('s4body') },
            { title: t('s5title'), body: t('s5body') },
            { title: t('s6title'), body: t('s6body') },
            { title: t('s7title'), body: t('s7body') },
            { title: t('s8title'), body: t('s8body') },
            { title: t('s9title'), body: t('s9body') },
            { title: t('s10title'), body: t('s10body') },
          ].map(({ title, body }) => (
            <section key={title}>
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>{title}</h2>
              <p>{body}</p>
            </section>
          ))}
          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>{t('s11title')}</h2>
            <p>{t('s11body')} <a href="mailto:hello@invitia.co" style={{ color: INK }}>hello@invitia.co</a>.</p>
          </section>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
