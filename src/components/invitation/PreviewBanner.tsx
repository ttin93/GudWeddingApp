'use client'

import Link from 'next/link'

export function PreviewBanner({ invitationId }: { invitationId: string }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99999,
      background: 'rgba(15, 12, 10, 0.92)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 24px', gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
          color: '#C9A45C', border: '1px solid #C9A45C44',
          padding: '3px 8px', whiteSpace: 'nowrap',
        }}>
          Predogled
        </div>
        <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          To povabilo še ni objavljeno. Gostje ga ne vidijo.
        </p>
      </div>
      <Link
        href={`/dashboard/${invitationId}`}
        style={{
          padding: '8px 20px', whiteSpace: 'nowrap',
          background: '#C9A45C', color: '#0F0C0A',
          fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
          fontWeight: 600, textDecoration: 'none',
          transition: 'opacity .15s',
        }}
      >
        Objavi povabilo →
      </Link>
    </div>
  )
}
