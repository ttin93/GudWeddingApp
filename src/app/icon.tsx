import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default async function Icon() {
  // Fetch Fraunces italic 300 from Google Fonts
  const cssRes = await fetch(
    'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9,300&display=block',
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  )
  const css = await cssRes.text()
  const match = css.match(/src: url\(([^)]+)\) format\('woff2'\)/)
  const fontUrl = match?.[1] ?? ''
  const fontData = fontUrl
    ? await fetch(fontUrl).then(r => r.arrayBuffer()).catch(() => null)
    : null

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
          fontFamily: fontData ? 'Fraunces' : 'Georgia, serif',
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
    {
      width: 32,
      height: 32,
      fonts: fontData
        ? [{ name: 'Fraunces', data: fontData, style: 'italic', weight: 300 }]
        : [],
    }
  )
}
