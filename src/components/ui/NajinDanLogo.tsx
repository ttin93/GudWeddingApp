import type { CSSProperties } from 'react'

interface Props {
  size?: number
  dark?: boolean
  style?: CSSProperties
}

// Wordmark: najin (neutral) + dan (gold), Fraunces italic light
export function NajinDanWordmark({ size = 22, dark = false, style }: Props) {
  return (
    <span style={{
      fontFamily: 'var(--font-fraunces), Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: size,
      letterSpacing: '-0.01em',
      lineHeight: 1,
      color: dark ? '#F6F1E8' : '#1C1814',
      ...style,
    }}>
      najin<span style={{ color: '#9C6B3D', fontStyle: 'italic' }}>dan</span>
    </span>
  )
}

// Circle monogram crest N&D (Logo05)
export function NajinDanCrest({ size = 80, dark = false, style }: Props) {
  const border = dark ? '#F6F1E8' : '#1C1814'
  const text = dark ? '#F6F1E8' : '#1C1814'
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: `1px solid ${border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
      flexShrink: 0,
      ...style,
    }}>
      <span style={{
        fontFamily: 'var(--font-fraunces), Georgia, serif',
        fontStyle: 'italic',
        fontWeight: 300,
        fontSize: size * 0.38,
        letterSpacing: '-0.02em',
        color: text,
        lineHeight: 1,
      }}>
        N<span style={{ color: '#9C6B3D', fontSize: size * 0.29 }}>&amp;</span>D
      </span>
      <span style={{
        position: 'absolute',
        bottom: -size * 0.18,
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-instrument), sans-serif',
        fontSize: size * 0.085,
        letterSpacing: '0.4em',
        color: '#8a7d6d',
        whiteSpace: 'nowrap',
      }}>
        NAJINDAN
      </span>
    </div>
  )
}
