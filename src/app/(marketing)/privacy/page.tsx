import Link from 'next/link'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'

export const metadata = {
  title: 'Privacy Policy — Invitia',
}

export default function PrivacyPage() {
  return (
    <div style={{ background: CREAM, minHeight: '100vh' }}>
      <div style={{ borderBottom: `1px solid ${RULE}`, padding: '0 56px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 18, color: INK, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 9, color: ACC }}>◉</span>Invitia
        </Link>
        <Link href="/" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTE, textDecoration: 'none' }}>← Back</Link>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 56px 120px' }}>
        <div style={{ fontSize: 10.5, letterSpacing: '0.32em', textTransform: 'uppercase', color: MUTE, marginBottom: 20 }}>Legal</div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 56, color: INK, lineHeight: 1, marginBottom: 8 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 13, color: MUTE, marginBottom: 56 }}>Last updated: January 2025</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontSize: 14, color: '#3a342e', lineHeight: 1.75 }}>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>1. Who We Are</h2>
            <p>Invitia ("we", "us") operates an online platform for digital wedding invitations. This Privacy Policy explains how we collect, use, and protect your personal data in compliance with the General Data Protection Regulation (GDPR).</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>2. Data We Collect</h2>
            <p><strong>Account data:</strong> email address and password (hashed) when you register.</p>
            <p style={{ marginTop: 8 }}><strong>Invitation data:</strong> names, wedding date, venue, photos, and other details you enter while creating your invitation.</p>
            <p style={{ marginTop: 8 }}><strong>Guest RSVP data:</strong> names, attendance, menu preferences, and any optional fields filled in by your guests.</p>
            <p style={{ marginTop: 8 }}><strong>Usage data:</strong> invitation view counts, browser type, and anonymised analytics.</p>
            <p style={{ marginTop: 8 }}><strong>Payment data:</strong> processed entirely by Stripe. We do not store card numbers.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>3. How We Use Your Data</h2>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>To operate and deliver the invitation service</li>
              <li>To process payments via Stripe</li>
              <li>To send transactional emails (account confirmation, RSVP notifications)</li>
              <li>To improve the platform through anonymised analytics</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>4. Legal Basis for Processing</h2>
            <p>We process your data on the basis of contract performance (to provide the Service you purchased), legitimate interests (platform security, fraud prevention), and — where required — your explicit consent.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>5. Data Sharing</h2>
            <p>We do not sell your personal data. We share data only with:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li><strong>Supabase</strong> — database and authentication infrastructure (EU region)</li>
              <li><strong>Stripe</strong> — payment processing</li>
              <li><strong>Vercel</strong> — hosting platform</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>6. Data Retention</h2>
            <p>Active invitation data is retained for the duration of your plan plus 12 months. After that, data is permanently deleted unless you request earlier deletion. Account data is retained until account deletion.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>7. Your Rights (GDPR)</h2>
            <p>Under GDPR you have the right to:</p>
            <ul style={{ paddingLeft: 20, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion ("right to be forgotten")</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p style={{ marginTop: 12 }}>To exercise these rights, email <a href="mailto:privacy@invitia.co" style={{ color: INK }}>privacy@invitia.co</a>.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>8. Cookies</h2>
            <p>We use only technically necessary cookies for authentication (session token). We do not use tracking or advertising cookies.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>9. Security</h2>
            <p>Data is stored in Supabase with encryption at rest and in transit. Access to personal data is restricted to authorised personnel only.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>10. Contact & DPA</h2>
            <p>For privacy enquiries or to exercise your rights, contact us at <a href="mailto:privacy@invitia.co" style={{ color: INK }}>privacy@invitia.co</a>. You also have the right to lodge a complaint with your local data protection authority.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
