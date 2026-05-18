'use client'

import { useState, useRef } from 'react'
import { BACKGROUND_MUSIC_TRACKS } from '@/types'
import type { BackgroundMusicId } from '@/types'

export function MusicPlayer({ trackId }: { trackId?: BackgroundMusicId | null }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  if (!trackId || trackId === 'none') return null
  const track = BACKGROUND_MUSIC_TRACKS[trackId as keyof typeof BACKGROUND_MUSIC_TRACKS]
  if (!track) return null

  function toggle() {
    if (playing) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current = null
      }
      setPlaying(false)
      return
    }

    // Create and play in the same synchronous user-gesture call — required by iOS Safari
    const audio = new Audio(track.src)
    audio.loop = true
    audioRef.current = audio
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }

  return (
    <div style={{ position: 'fixed', bottom: 22, left: 22, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={toggle}
        title={playing ? `Ustavi glasbo — ${track.label}` : `Predvajaj glasbo — ${track.label}`}
        style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'rgba(15,12,10,0.75)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, lineHeight: 1,
          boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
        } as React.CSSProperties}
      >
        {playing ? '⏸' : '♪'}
      </button>

      {playing && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 16 }}>
          {[1, 1.6, 0.7, 1.3].map((h, i) => (
            <div key={i} style={{
              width: 3, borderRadius: 2,
              background: 'rgba(255,255,255,0.8)',
              animation: `musicBar ${0.8 + i * 0.15}s ease-in-out infinite alternate`,
              height: `${h * 10}px`,
            }} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes musicBar {
          from { transform: scaleY(0.3); opacity: 0.5; }
          to   { transform: scaleY(1);   opacity: 1;   }
        }
      `}</style>
    </div>
  )
}
