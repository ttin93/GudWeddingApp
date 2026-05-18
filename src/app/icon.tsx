import { ImageResponse } from 'next/og'

export const dynamic = 'force-dynamic'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default async function Icon() {
  let fontData: ArrayBuffer | null = null

  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9,300&display=block',
      { headers: { 'User-Agent': 'Mozilla/5.0' }, next: { revalidate: 86400 } }
    ).then(r => r.text())
    const match = css.match(/src: url\(([^)]+)\) format\('woff2'\)/)
    if (match?.[1]) {
      fontData = await fetch(match[1]).then(r => r.arrayBuffer())
    }
  } catch {
    // font unavailable — use geometric fallback
  }

  const fonts = fontData
    ? [{ name: 'Fraunces', data: fontData, style: 'italic' as const, weight: 300 as const }]
    : undefined

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: '#1C1814',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: fontData ? 'Fraunces' : 'serif',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 19,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          paddingTop: 2,
        }}
      >
        <span style={{ color: '#c69b6e' }}>n</span>
        <span style={{ color: '#F6F1E8' }}>d</span>
      </div>
    ),
    { width: 32, height: 32, ...(fonts ? { fonts } : {}) }
  )
}
