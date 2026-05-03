import Link from 'next/link'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'

export const metadata = {
  title: 'Terms of Service — Invitia',
}

export default function TermsPage() {
  return (
    <div style={{ background: CREAM, minHeight: '100vh' }}>
      {/* Minimal header */}
      <div style={{ borderBottom: `1px solid ${RULE}`, padding: '0 56px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 18, color: INK, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 9, color: ACC }}>◉</span>Invitia
        </Link>
        <Link href="/" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTE, textDecoration: 'none' }}>← Back</Link>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 56px 120px' }}>
        <div style={{ fontSize: 10.5, letterSpacing: '0.32em', textTransform: 'uppercase', color: MUTE, marginBottom: 20 }}>Legal</div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 56, color: INK, lineHeight: 1, marginBottom: 8 }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: 13, color: MUTE, marginBottom: 56 }}>Last updated: January 2025</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontSize: 14, color: '#3a342e', lineHeight: 1.75 }}>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>1. Acceptance of Terms</h2>
            <p>By accessing or using Invitia ("Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>2. Description of Service</h2>
            <p>Invitia provides a platform for creating and publishing digital wedding invitations. Users can collect RSVPs, share event details, and manage guest communication through a personalised web page.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>3. Account Registration</h2>
            <p>You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>4. Payments & Refunds</h2>
            <p>All payments are processed securely via Stripe. Prices are listed in euros (EUR) and are one-time fees that cover the stated active period. Due to the digital nature of the product, refunds are issued only where required by applicable law within 14 days of purchase, provided no invitation has been published (made publicly accessible).</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>5. Active Period</h2>
            <p>Your invitation remains publicly accessible for the duration of the plan you purchased (6 or 12 months from the date of activation). After expiry, the page becomes inaccessible but your data is retained for 12 months and can be reactivated.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>6. User Content</h2>
            <p>You retain ownership of all content you upload. By publishing an invitation, you grant Invitia a non-exclusive licence to display that content to guests accessing your invitation URL. You must not upload content that is unlawful, offensive, or infringes third-party rights.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>7. Prohibited Use</h2>
            <p>You may not use the Service for any purpose other than creating personal wedding invitations. Commercial reselling, automated scraping, or use of the Service to harm others is strictly prohibited.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Invitia is not liable for indirect, incidental, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount you paid for the relevant plan.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>9. Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that violate these Terms. You may delete your account at any time from the dashboard settings.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>10. Changes to Terms</h2>
            <p>We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms. We will notify active users by email of material changes.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, fontWeight: 400, color: INK, marginBottom: 12 }}>11. Contact</h2>
            <p>Questions about these Terms? Email us at <a href="mailto:hello@invitia.co" style={{ color: INK }}>hello@invitia.co</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
