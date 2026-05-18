import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'NajinDan — Digitalna poročna vabila'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#1C1714',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Subtle decorative lines */}
        <div style={{ position: 'absolute', top: 60, left: 80, right: 80, height: 1, background: 'rgba(201,169,110,0.2)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 60, left: 80, right: 80, height: 1, background: 'rgba(201,169,110,0.2)', display: 'flex' }} />

        {/* Logo mark */}
        <div style={{ fontSize: 13, letterSpacing: 8, color: '#C9A96E', textTransform: 'uppercase', marginBottom: 24, display: 'flex' }}>
          NajinDan
        </div>

        {/* Divider */}
        <div style={{ width: 48, height: 1, background: '#C9A96E', opacity: 0.6, marginBottom: 28, display: 'flex' }} />

        {/* Main text */}
        <div style={{ fontSize: 52, color: '#F5EFE8', fontWeight: 400, textAlign: 'center', lineHeight: 1.2, marginBottom: 20, display: 'flex' }}>
          Digitalna poročna vabila
        </div>

        {/* Sub text */}
        <div style={{ fontSize: 20, color: 'rgba(245,239,232,0.5)', letterSpacing: 2, display: 'flex' }}>
          najindan.gudweb.si
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
