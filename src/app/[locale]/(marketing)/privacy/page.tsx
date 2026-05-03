import { getTranslations } from 'next-intl/server'
import { SiteNav } from '@/components/ui/SiteNav'
import { SiteFooter } from '@/components/ui/SiteFooter'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const CREAM = '#F7F4EF'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })
  return { title: `${t('title')} — Invitia` }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })

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
          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>{t('s1title')}</h2>
            <p>{t('s1body')}</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>{t('s2title')}</h2>
            <p><strong>{t('s2account')}</strong> {t('s2accountDesc')}</p>
            <p style={{ marginTop: 8 }}><strong>{t('s2invitation')}</strong> {t('s2invitationDesc')}</p>
            <p style={{ marginTop: 8 }}><strong>{t('s2rsvp')}</strong> {t('s2rsvpDesc')}</p>
            <p style={{ marginTop: 8 }}><strong>{t('s2usage')}</strong> {t('s2usageDesc')}</p>
            <p style={{ marginTop: 8 }}><strong>{t('s2payment')}</strong> {t('s2paymentDesc')}</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>{t('s3title')}</h2>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(t.raw('s3list') as string[]).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>{t('s4title')}</h2>
            <p>{t('s4body')}</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>{t('s5title')}</h2>
            <p>{t('s5body')}</p>
            <ul style={{ paddingLeft: 20, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(t.raw('s5list') as string[]).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>{t('s6title')}</h2>
            <p>{t('s6body')}</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>{t('s7title')}</h2>
            <p>{t('s7body')}</p>
            <ul style={{ paddingLeft: 20, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(t.raw('s7list') as string[]).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <p style={{ marginTop: 12 }}>{t('s7contact')} <a href="mailto:privacy@invitia.co" style={{ color: INK }}>privacy@invitia.co</a>.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>{t('s8title')}</h2>
            <p>{t('s8body')}</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>{t('s9title')}</h2>
            <p>{t('s9body')}</p>
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>{t('s10title')}</h2>
            <p>{t('s10body')} <a href="mailto:privacy@invitia.co" style={{ color: INK }}>privacy@invitia.co</a>. {t('s10body2')}</p>
          </section>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}
