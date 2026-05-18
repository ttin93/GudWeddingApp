'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  partner1: string
  partner2: string
  accentColor?: string
  paperColor?: string
  forceShow?: boolean
  onComplete: () => void
}

export function EnvelopeIntro({ partner1, partner2, forceShow = false, onComplete }: Props) {
  const [mounted, setMounted]   = useState(false)
  const [gone, setGone]         = useState(false)
  const [playing, setPlaying]   = useState(false)
  const [desktop, setDesktop]   = useState(false)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    setDesktop(window.innerWidth >= 600)
  }, [])

  function dismiss() {
    if (overlayRef.current) overlayRef.current.style.display = 'none'
    setGone(true)
    onComplete()
  }

  function handleTap() {
    if (playing) return
    setPlaying(true)
    const vid = videoRef.current
    if (!vid) { dismiss(); return }
    vid.play().catch(dismiss)
  }


  if (!mounted || gone || desktop) return null

  // Mobile: inner fills entire overlay via absolute inset
  // Desktop: inner is portrait-sized + rotated to fill landscape screen
  const innerStyle: React.CSSProperties = desktop
    ? {
        position: 'relative',
        width: '100vh',
        height: '100vw',
        transform: 'rotate(-90deg)',
        overflow: 'hidden',
        flexShrink: 0,
      }
    : {
        position: 'absolute',
        inset: 0,
      }

  const videoSrc  = desktop ? '/music/envelope_intro_desktop.mp4'  : '/music/envelope_intro.mp4'
  const posterSrc = desktop ? '/music/envelope_poster_desktop.png' : '/music/envelope_poster.png'

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed', inset: 0,
        zIndex: 2147483647,
        background: '#000',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Video + poster — rotated only on desktop */}
      <div style={innerStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        />
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onEnded={dismiss}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
            opacity: playing ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* UI overlays — always outside rotated container, always upright */}
      {!playing && (
        <button
          onClick={handleTap}
          aria-label="Tapni za odprtje"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          } as React.CSSProperties}
        />
      )}

      {!playing && (
        <div style={{
          position: 'absolute', bottom: 80, left: 0, right: 0,
          textAlign: 'center', pointerEvents: 'none',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.85)',
          textShadow: '0 1px 8px rgba(0,0,0,.6)',
        }}>
          Tapni za odprtje
        </div>
      )}

      <button
        onClick={dismiss}
        style={{
          position: 'absolute', top: 16, right: 16,
          zIndex: 1,
          background: 'rgba(0,0,0,.55)',
          border: '1px solid rgba(255,255,255,.5)',
          borderRadius: 4,
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase',
          padding: '10px 16px',
          cursor: 'pointer',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          minWidth: 80, minHeight: 44,
        } as React.CSSProperties}
      >
        Preskoči
      </button>
    </div>
  )
}
