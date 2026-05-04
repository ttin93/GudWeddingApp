'use client'

import { useState, useRef } from 'react'
import { BACKGROUND_MUSIC_TRACKS } from '@/types'
import type { BackgroundMusicId } from '@/types'

export function MusicPlayer({ trackId }: { trackId?: BackgroundMusicId | null }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null)

  if (!trackId || trackId === 'none') return null
  const track = BACKGROUND_MUSIC_TRACKS[trackId as keyof typeof BACKGROUND_MUSIC_TRACKS]
  if (!track) return null

  function getOrCreateAudio() {
    if (audioRef.current) return audioRef.current
    const audio = new Audio(track!.src)
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio
    return audio
  }

  function fadeTo(audio: HTMLAudioElement, target: number, onDone?: () => void) {
    if (fadeRef.current) clearInterval(fadeRef.current)
    const step = target > audio.volume ? 0.03 : -0.03
    fadeRef.current = setInterval(() => {
      const next = Math.min(1, Math.max(0, audio.volume + step))
      audio.volume = next
      if ((step > 0 && next >= target) || (step < 0 && next <= target)) {
        clearInterval(fadeRef.current!)
        onDone?.()
      }
    }, 40)
  }

  function toggle() {
    const audio = getOrCreateAudio()
    if (playing) {
      fadeTo(audio, 0, () => audio.pause())
      setPlaying(false)
    } else {
      audio.play()
        .then(() => { fadeTo(audio, 0.35); setPlaying(true) })
        .catch(() => { setPlaying(false) })
    }
  }

  return (
    <div
      title={playing ? `Ustavi glasbo — ${track.label}` : `Predvajaj glasbo — ${track.label}`}
      style={{ position: 'fixed', bottom: 22, left: 22, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8 }}
    >
      <button
        onClick={toggle}
        style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(15,12,10,0.75)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, lineHeight: 1,
          transition: 'transform .15s',
          boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
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
