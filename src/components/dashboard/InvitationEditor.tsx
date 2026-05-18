'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  Plus, Trash2, Heart, Gift, HelpCircle, Hotel,
  Car, Hash, Phone, Music, ChevronUp, ChevronDown,
  Upload, X, ImageIcon, ArrowUp, ArrowDown,
} from 'lucide-react'
import { BACKGROUND_MUSIC_TRACKS } from '@/types'
import type { Invitation, TimelineEvent, AccommodationItem, GiftRegistryItem, FAQItem, InvitationPhoto, Package } from '@/types'
import { DEFAULT_LABELS, LANGUAGE_OPTIONS, LABEL_FIELD_GROUPS } from '@/lib/utils/labels'
import type { InvitationLabels } from '@/lib/utils/labels'

// ─── Design tokens ─────────────────────────────────────────────────────────────
const PAPER   = '#FFFFFF'
const PAPER_W = '#FBF7EE'
const INK     = '#1C1814'
const INK_MUTE = '#8a7d6d'
const INK_FAINT = '#b8aa95'
const ACC     = '#9C6B3D'
const LINE    = '#E2D7BF'
const LINE_SOFT = '#ece2cc'
const STEP_BG = '#E8DCC2'
const STEP_FG = '#9C8C72'
const SHADOW  = '0 1px 0 rgba(28,24,20,.02), 0 24px 60px -40px rgba(28,24,20,.18)'
const fran    = 'var(--font-fraunces), Georgia, serif'
const sans    = 'var(--font-instrument), "Helvetica Neue", sans-serif'

// ─── Steps ─────────────────────────────────────────────────────────────────────
const STEPS = [
  { n: 1, key: 'paru',     title: 'O paru',            caption: 'Imeni, datum, vajina zgodba.' },
  { n: 2, key: 'naslovna', title: 'Naslovna',           caption: 'Cover fotografija in pozdravni stavek.' },
  { n: 3, key: 'program',  title: 'Program dneva',      caption: 'Urnik dogodkov.' },
  { n: 4, key: 'lokacija', title: 'Lokacija',           caption: 'Prizorišče, naslov, časi.' },
  { n: 5, key: 'rsvp',     title: 'Potrditev',          caption: 'Rok in nastavitve RSVP.' },
  { n: 6, key: 'darila',   title: 'Darila',             caption: 'Darila in registry.' },
  { n: 7, key: 'galerija', title: 'Galerija',           caption: 'Fotografije.' },
  { n: 8, key: 'dodatno',  title: 'Podrobnosti',        caption: 'Dress code, prevoz, glasba in več.' },
  { n: 9, key: 'objava',   title: 'Pregled in objava',  caption: 'Še zadnji pogled.' },
]

// ─── Primitives ────────────────────────────────────────────────────────────────

function Lbl({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: ACC, marginBottom: 10, fontWeight: 500, fontFamily: sans }}>
      {children}
    </div>
  )
}

function Help({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 13.5, color: INK_MUTE, marginTop: 8, lineHeight: 1.5 }}>
      {children}
    </div>
  )
}

function Fld({ label, help, children }: { label?: string; help?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 26 }}>
      {label && <Lbl>{label}</Lbl>}
      {children}
      {help && <Help>{help}</Help>}
    </div>
  )
}

function Inp({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width: '100%', padding: '14px 16px', background: PAPER, border: `1px solid ${LINE}`, borderRadius: 2, fontFamily: fran, fontWeight: 300, fontSize: 17, color: INK, outline: 'none', transition: 'border-color .15s, background .15s', boxSizing: 'border-box' }}
      onFocus={e => { e.target.style.borderColor = INK; e.target.style.background = PAPER_W }}
      onBlur={e => { e.target.style.borderColor = LINE; e.target.style.background = PAPER }}
    />
  )
}

function TxtArea({ value, onChange, placeholder, rows = 4 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{ width: '100%', padding: '14px 16px', background: PAPER, border: `1px solid ${LINE}`, borderRadius: 2, fontFamily: fran, fontWeight: 300, fontSize: 16, color: INK, outline: 'none', resize: 'vertical', lineHeight: 1.55, transition: 'border-color .15s, background .15s', boxSizing: 'border-box' }}
      onFocus={e => { e.target.style.borderColor = INK; e.target.style.background = PAPER_W }}
      onBlur={e => { e.target.style.borderColor = LINE; e.target.style.background = PAPER }}
    />
  )
}

function Tgl({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: fran, fontStyle: 'italic', fontSize: 12, color: INK_MUTE }}>
      {label && <span>{label}</span>}
      <div
        onClick={() => onChange(!on)}
        style={{ width: 44, height: 22, borderRadius: 11, background: on ? ACC : LINE, position: 'relative', cursor: 'pointer', transition: 'background .2s', flexShrink: 0 }}
      >
        <div style={{ position: 'absolute', top: 2, left: on ? 22 : 2, width: 18, height: 18, borderRadius: '50%', background: PAPER, transition: 'left .22s cubic-bezier(.4,.2,.2,1)', boxShadow: '0 1px 2px rgba(28,24,20,.18)' }} />
      </div>
      <span>{on ? 'Prikazano' : 'Skrito'}</span>
    </div>
  )
}

function Sub({ icon: Icon, title, on, onToggle, children, toggleable = true }: {
  icon?: React.ElementType; title: string; on: boolean; onToggle: () => void; children?: React.ReactNode; toggleable?: boolean
}) {
  return (
    <div style={{ border: `1px solid ${LINE}`, borderRadius: 2, marginBottom: 26, background: PAPER_W, opacity: on ? 1 : 0.7 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: on ? `1px solid ${LINE_SOFT}` : 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: INK, fontWeight: 500, fontFamily: sans }}>
          {Icon && <Icon size={14} style={{ color: ACC }} />}
          <span>{title}</span>
        </div>
        {toggleable && <Tgl on={on} onChange={onToggle} />}
      </div>
      {on && <div style={{ padding: '18px 20px 20px' }}>{children}</div>}
    </div>
  )
}

function AddRow({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <div
      onClick={onClick}
      style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: ACC, cursor: 'pointer', padding: '12px 0', borderTop: `1px dashed ${LINE}`, fontFamily: sans, fontWeight: 500 }}
    >
      <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
      {label}
    </div>
  )
}

const SmallInp: React.CSSProperties = {
  padding: '8px 10px', border: `1px solid ${LINE}`, background: PAPER, borderRadius: 2,
  fontFamily: fran, fontWeight: 300, fontSize: 15, color: INK, outline: 'none', width: '100%', boxSizing: 'border-box',
}

// ─── Timeline editor ─────────────────────────────────────────────────────────
function TimelineEditor({ events, onChange }: { events: TimelineEvent[]; onChange: (e: TimelineEvent[]) => void }) {
  function add() { onChange([...events, { time: '', title: '', description: '' }]) }
  function update(i: number, field: keyof TimelineEvent, value: string) {
    onChange(events.map((e, idx) => idx === i ? { ...e, [field]: value } : e))
  }
  function remove(i: number) { onChange(events.filter((_, idx) => idx !== i)) }
  function move(i: number, dir: -1 | 1) {
    const next = [...events]; const j = i + dir
    if (j < 0 || j >= next.length) return
    ;[next[i], next[j]] = [next[j], next[i]]; onChange(next)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {events.map((event, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 28px', gap: 16, alignItems: 'start', padding: '14px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE_SOFT}` }}>
          <input type="time" value={event.time} onChange={e => update(i, 'time', e.target.value)}
            style={{ ...SmallInp, textAlign: 'center', fontSize: 17 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input value={event.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Naslov dogodka"
              style={{ ...SmallInp, fontSize: 17 }} />
            <input value={event.description ?? ''} onChange={e => update(i, 'description', e.target.value)} placeholder="Kratek opis (neobvezno)"
              style={{ ...SmallInp, fontStyle: 'italic', fontSize: 14 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 4 }}>
            <button type="button" onClick={() => move(i, -1)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: INK_MUTE }}><ChevronUp size={13} /></button>
            <button type="button" onClick={() => move(i, 1)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: INK_MUTE }}><ChevronDown size={13} /></button>
            <button type="button" onClick={() => remove(i)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: '#C0504A' }}><Trash2 size={13} /></button>
          </div>
        </div>
      ))}
      <AddRow onClick={add} label="Dodaj dogodek" />
    </div>
  )
}

// ─── Gallery tab ─────────────────────────────────────────────────────────────
const GALLERY_LIMITS: Record<string, number> = { essential: 20, elegance: 20, signature: 20 }

function GalleryTab({ invitationId, pkg, caption, onCaptionChange, badge, onBadgeChange }: {
  invitationId: string; pkg: Package; caption: string; onCaptionChange: (v: string) => void; badge: string; onBadgeChange: (v: string) => void
}) {
  const [photos, setPhotos] = useState<(InvitationPhoto & { url: string })[]>([])
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const limit = GALLERY_LIMITS[pkg] ?? 0

  useEffect(() => {
    fetch(`/api/photos?invitationId=${invitationId}`).then(r => r.json()).then(data => { if (Array.isArray(data)) setPhotos(data) }).catch(() => {})
  }, [invitationId])

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const fd = new FormData(); fd.append('file', file); fd.append('invitationId', invitationId)
      const res = await fetch('/api/photos', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) { toast.error(json.error ?? 'Upload failed'); break }
      setPhotos(prev => [...prev, json])
    }
    setUploading(false)
  }

  async function deletePhoto(id: string) {
    const res = await fetch(`/api/photos/${id}`, { method: 'DELETE' })
    if (res.ok) setPhotos(prev => prev.filter(p => p.id !== id))
    else toast.error('Napaka pri brisanju')
  }

  async function movePhoto(index: number, dir: -1 | 1) {
    const target = index + dir
    if (target < 0 || target >= photos.length) return
    const updated = [...photos]
    const aOrder = updated[index].display_order; const bOrder = updated[target].display_order
    await Promise.all([
      fetch(`/api/photos/${updated[index].id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ display_order: bOrder }) }),
      fetch(`/api/photos/${updated[target].id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ display_order: aOrder }) }),
    ])
    updated[index] = { ...updated[index], display_order: bOrder }
    updated[target] = { ...updated[target], display_order: aOrder }
    updated.sort((a, b) => a.display_order - b.display_order)
    setPhotos(updated)
  }

  if (limit === 0) {
    return (
      <div style={{ border: `1px solid ${LINE}`, background: PAPER_W, padding: '40px 24px', textAlign: 'center', borderRadius: 2 }}>
        <ImageIcon size={32} style={{ color: INK_MUTE, marginBottom: 12 }} />
        <p style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 18, color: INK, marginBottom: 6 }}>Galerija ni na voljo</p>
        <p style={{ fontSize: 13, color: INK_MUTE }}>Nadgradi na Elegance ali Signature za dodajanje fotografij.</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}>
        <Fld label="Napis pod cover fotografijo" help="Prikaže se pri templateih z cover sliko (npr. Riviera).">
          <Inp value={caption} onChange={onCaptionChange} placeholder="Villa Rosa · Toskana" />
        </Fld>
        <div style={{ width: 110 }}>
          <Fld label="Krog ⬤" help="Kratko (leto, kraj…)">
            <Inp value={badge} onChange={onBadgeChange} placeholder="2026" />
          </Fld>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: 13, color: INK_MUTE, fontFamily: fran, fontStyle: 'italic' }}>{photos.length} / {limit} fotografij</p>
        {photos.length < limit && (
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 18px', border: `1px solid ${ACC}`, color: ACC, background: PAPER, fontFamily: sans, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 500, cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.7 : 1, transition: 'background .15s, color .15s', borderRadius: 2 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = ACC; (e.currentTarget as HTMLElement).style.color = PAPER }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = PAPER; (e.currentTarget as HTMLElement).style.color = ACC }}
          >
            <Upload size={12} />{uploading ? 'Nalagam…' : 'Dodaj fotografije'}
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
      </div>

      {photos.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {photos.map((photo, i) => (
            <div key={photo.id} style={{ display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${i === 0 ? ACC : LINE}`, background: i === 0 ? ACC + '08' : PAPER, padding: 8, borderRadius: 2 }}>
              <div style={{ width: 72, height: 72, flexShrink: 0, overflow: 'hidden' }}>
                <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                {i === 0 && <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: ACC, marginBottom: 4, fontWeight: 600, fontFamily: sans }}>★ Cover fotografija</div>}
                <div style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 14, color: INK_MUTE }}>Fotografija {i + 1}</div>
              </div>
              <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                {[{ fn: () => movePhoto(i, -1), dis: i === 0, icon: <ArrowUp size={13} /> },
                  { fn: () => movePhoto(i, 1), dis: i === photos.length - 1, icon: <ArrowDown size={13} /> },
                ].map(({ fn, dis, icon }, j) => (
                  <button key={j} onClick={fn} disabled={dis}
                    style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${LINE}`, background: PAPER, cursor: dis ? 'not-allowed' : 'pointer', opacity: dis ? 0.3 : 1, color: INK_MUTE, borderRadius: 2 }}>
                    {icon}
                  </button>
                ))}
                <button onClick={() => deletePhoto(photo.id)}
                  style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${LINE}`, background: PAPER, cursor: 'pointer', color: '#C0504A', borderRadius: 2 }}>
                  <X size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div onClick={() => fileRef.current?.click()}
          style={{ border: `2px dashed ${LINE}`, padding: '48px 24px', textAlign: 'center', cursor: 'pointer', background: PAPER_W, borderRadius: 2, transition: 'border-color .2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = ACC }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = LINE }}>
          <ImageIcon size={28} style={{ color: INK_MUTE, marginBottom: 12 }} />
          <p style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 17, color: INK, marginBottom: 4 }}>Povleci sem ali klikni za nalaganje</p>
          <p style={{ fontSize: 12, color: INK_MUTE, fontFamily: sans }}>JPEG, PNG, WebP · max 5MB · 1. slika = cover</p>
        </div>
      )}
    </div>
  )
}

// ─── State type ───────────────────────────────────────────────────────────────
interface EditorState {
  partner1_name: string; partner2_name: string; wedding_date: string
  story: string; show_story: boolean; personal_message: string
  venue_name: string; venue_address: string; ceremony_time: string; reception_time: string
  timeline: TimelineEvent[]; show_program: boolean
  dress_code: string; show_dress_code: boolean
  children_policy: string; show_children_policy: boolean
  hashtag: string; show_hashtag: boolean
  contact_name: string; contact_phone: string; contact_email: string; show_contact: boolean
  music_playlist_url: string; show_music: boolean; background_music: string
  transport_notes: string; show_transport: boolean
  accommodation: AccommodationItem[]; show_accommodation: boolean
  gift_registry: GiftRegistryItem[]; show_gift_registry: boolean
  faq: FAQItem[]; show_faq: boolean
  rsvp_mode: 'form' | 'contact' | 'both'; rsvp_deadline: string; max_guests: string
  show_countdown: boolean; show_gallery: boolean; show_intro: boolean
  language: string; labels: InvitationLabels
  cover_photo_caption: string; cover_photo_badge: string
}

function invToState(inv: Invitation): EditorState {
  const lang = inv.languages?.[0] ?? 'sl'
  const defaults = DEFAULT_LABELS[lang] ?? DEFAULT_LABELS['sl']
  return {
    partner1_name: inv.partner1_name ?? '', partner2_name: inv.partner2_name ?? '', wedding_date: inv.wedding_date ?? '',
    story: inv.story ?? '', show_story: inv.show_story ?? true, personal_message: inv.personal_message ?? '',
    venue_name: inv.venue_name ?? '', venue_address: inv.venue_address ?? '',
    ceremony_time: inv.ceremony_time ?? '', reception_time: inv.reception_time ?? '',
    timeline: inv.timeline ?? [], show_program: inv.show_program ?? true,
    dress_code: inv.dress_code ?? '', show_dress_code: inv.show_dress_code ?? true,
    children_policy: inv.children_policy ?? '', show_children_policy: inv.show_children_policy ?? true,
    hashtag: inv.hashtag ?? '', show_hashtag: inv.show_hashtag ?? false,
    contact_name: inv.contact_name ?? '', contact_phone: inv.contact_phone ?? '', contact_email: inv.contact_email ?? '', show_contact: inv.show_contact ?? false,
    music_playlist_url: inv.music_playlist_url ?? '', background_music: inv.background_music ?? 'none', show_music: inv.show_music ?? false,
    transport_notes: inv.transport_notes ?? '', show_transport: inv.show_transport ?? false,
    accommodation: inv.accommodation ?? [], show_accommodation: inv.show_accommodation ?? false,
    gift_registry: inv.gift_registry ?? [], show_gift_registry: inv.show_gift_registry ?? false,
    faq: inv.faq ?? [], show_faq: inv.show_faq ?? false,
    rsvp_mode: inv.rsvp_mode ?? 'form', rsvp_deadline: inv.rsvp_deadline ?? '', max_guests: inv.max_guests ? String(inv.max_guests) : '',
    show_countdown: inv.show_countdown ?? true, show_gallery: inv.show_gallery ?? true, show_intro: inv.show_intro ?? true,
    language: lang, labels: { ...defaults, ...(inv.labels as Partial<InvitationLabels> ?? {}) },
    cover_photo_caption: inv.cover_photo_caption ?? '', cover_photo_badge: inv.cover_photo_badge ?? '',
  }
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
function Stepper({ current, setCurrent, visited }: { current: number; setCurrent: (n: number) => void; visited: Set<number> }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '32px 24px 0', maxWidth: 900, margin: '0 auto', flexWrap: 'nowrap' }}>
        {STEPS.map((s, i) => {
          const done = visited.has(s.n) && current > s.n
          const isCurrent = s.n === current
          return (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', ...(i < STEPS.length - 1 ? { flex: 1, maxWidth: 80 } : {}) }}>
              <div
                onClick={() => setCurrent(s.n)}
                title={s.title}
                style={{
                  width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                  background: isCurrent ? INK : done ? '#c8b78f' : STEP_BG,
                  color: isCurrent ? PAPER : done ? PAPER_W : STEP_FG,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 500, fontFamily: sans,
                  cursor: 'pointer', position: 'relative',
                  outline: isCurrent ? `2px solid ${INK}` : 'none',
                  outlineOffset: isCurrent ? 5 : 0,
                  transition: 'background .22s, color .22s, transform .22s',
                }}
                onMouseEnter={e => { if (!isCurrent) (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
              >
                {isCurrent && (
                  <motion.div
                    animate={{ scale: [0.85, 1.4], opacity: [0, 0.6, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                    style={{ position: 'absolute', inset: -12, borderRadius: '50%', border: `1px solid ${LINE}`, pointerEvents: 'none' }}
                  />
                )}
                {done ? '✓' : s.n}
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 1, background: done ? '#c8b78f' : LINE, margin: '0 6px' }} />
              )}
            </div>
          )
        })}
      </div>
      <div style={{ textAlign: 'center', marginTop: 20, fontFamily: fran, fontStyle: 'italic', fontWeight: 300, fontSize: 14, color: INK_MUTE }}>
        {STEPS[current - 1].caption}
      </div>
    </>
  )
}

// ─── Step bodies ──────────────────────────────────────────────────────────────
function Step1({ data, set }: { data: EditorState; set: (p: Partial<EditorState>) => void }) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Fld label="Ime partnerja 1">
          <Inp value={data.partner1_name} onChange={v => set({ partner1_name: v })} placeholder="Ana" />
        </Fld>
        <Fld label="Ime partnerja 2">
          <Inp value={data.partner2_name} onChange={v => set({ partner2_name: v })} placeholder="Marko" />
        </Fld>
      </div>
      <Fld label="Datum poroke" help="Dan v tednu se izračuna samodejno.">
        <Inp type="date" value={data.wedding_date} onChange={v => set({ wedding_date: v })} />
      </Fld>
      <Sub icon={Heart} title="Vaša zgodba" on={data.show_story} onToggle={() => set({ show_story: !data.show_story })}>
        <div style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 14.5, color: ACC, marginBottom: 10 }}>
          Kako sta se spoznala? Prikazuje se na vabilu.
        </div>
        <TxtArea value={data.story} onChange={v => set({ story: v })} />
      </Sub>
      <Fld label="Osebno sporočilo gostom">
        <TxtArea value={data.personal_message} onChange={v => set({ personal_message: v })} placeholder="Z veseljem vas vabimo, da delite z nami ta posebni dan…" rows={3} />
      </Fld>
      <button type="button"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '11px 18px', border: `1px solid ${ACC}`, color: ACC, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 500, background: PAPER, cursor: 'pointer', transition: 'background .15s, color .15s', fontFamily: sans, borderRadius: 2 }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = ACC; (e.currentTarget as HTMLElement).style.color = PAPER }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = PAPER; (e.currentTarget as HTMLElement).style.color = ACC }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2"/></svg>
        Generiraj sporočilo z AI
      </button>
    </>
  )
}

function Step2({ data, set }: { data: EditorState; set: (p: Partial<EditorState>) => void }) {
  return (
    <>
      <div style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 14.5, color: INK_MUTE, marginBottom: 24, lineHeight: 1.5 }}>
        Fotografije so na voljo v koraku 7. Tukaj nastavite napis in oznako, ki se prikažeta poleg cover slike.
      </div>
      <Fld label="Napis pod cover fotografijo" help="Prikaže se na templateih z naslovnico (npr. Riviera). Privzeto: ime prizorišča.">
        <Inp value={data.cover_photo_caption} onChange={v => set({ cover_photo_caption: v })} placeholder="Villa Rosa · Toskana" />
      </Fld>
      <Fld label="Krog ⬤ (kratka oznaka)" help="Do 8 znakov — leto, kraj ali monogram.">
        <Inp value={data.cover_photo_badge} onChange={v => set({ cover_photo_badge: v })} placeholder="2026" />
      </Fld>
      <Fld label="Osebno sporočilo gostom" help="En pozdravni stavek nad imenoma na naslovnici.">
        <TxtArea value={data.personal_message} onChange={v => set({ personal_message: v })} rows={3} placeholder="Z veseljem vas vabiva, da z nama delita najlepši dan." />
      </Fld>
    </>
  )
}

function Step3({ data, set }: { data: EditorState; set: (p: Partial<EditorState>) => void }) {
  return (
    <Sub icon={undefined} title="Program dneva" on={data.show_program} onToggle={() => set({ show_program: !data.show_program })}>
      <div style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 14.5, color: INK_MUTE, marginBottom: 18, lineHeight: 1.5 }}>
        Dodajte vse, kar gosti morajo vedeti — od prihoda do plesa.
      </div>
      <TimelineEditor events={data.timeline} onChange={v => set({ timeline: v })} />
    </Sub>
  )
}

function Step4({ data, set }: { data: EditorState; set: (p: Partial<EditorState>) => void }) {
  return (
    <>
      <Fld label="Ime prizorišča">
        <Inp value={data.venue_name} onChange={v => set({ venue_name: v })} placeholder="Vila Bled" />
      </Fld>
      <Fld label="Naslov" help="Klik na vabilu odpre Google Maps.">
        <Inp value={data.venue_address} onChange={v => set({ venue_address: v })} placeholder="Cesta svobode 26, 4260 Bled" />
      </Fld>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Fld label="Čas ceremonije">
          <Inp type="time" value={data.ceremony_time} onChange={v => set({ ceremony_time: v })} />
        </Fld>
        <Fld label="Čas sprejema">
          <Inp type="time" value={data.reception_time} onChange={v => set({ reception_time: v })} />
        </Fld>
      </div>
      <Fld label="Parkiranje in prihod" help="Kratko sporočilo gostom — kje parkirati, kdaj prispeti.">
        <TxtArea value={data.transport_notes} onChange={v => set({ transport_notes: v })} placeholder="Brezplačno parkirišče pred hotelom. Prosimo, prispejte do 15:45." rows={3} />
      </Fld>
    </>
  )
}

const RSVP_OPTS = [
  { value: 'form',    label: 'Prijavni obrazec',  desc: 'Gostje izpolnijo obrazec na vabilu' },
  { value: 'contact', label: 'Direkten kontakt',  desc: 'Gostje vas pokličejo ali napišejo' },
  { value: 'both',    label: 'Oboje',             desc: 'Obrazec in kontaktni podatki' },
] as const

function Step5({ data, set }: { data: EditorState; set: (p: Partial<EditorState>) => void }) {
  return (
    <>
      <Fld label="Rok za potrditev" help="Po tem datumu se obrazec za potrditev zapre.">
        <Inp type="date" value={data.rsvp_deadline} onChange={v => set({ rsvp_deadline: v })} />
      </Fld>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 26 }}>
        <Fld label="Pričakovano število gostov">
          <Inp type="number" value={data.max_guests} onChange={v => set({ max_guests: v })} placeholder="150" />
        </Fld>
      </div>
      <Sub icon={Heart} title="Vprašanje o prehrani" on={true} onToggle={() => {}} toggleable={false}>
        <div style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 14.5, color: ACC, marginBottom: 0 }}>
          Pri potrditvi se gostu prikaže polje za alergije in prehranske posebnosti.
        </div>
      </Sub>
      <Sub icon={Heart} title="Spremljevalec (+1)" on={data.rsvp_mode !== 'contact'} onToggle={() => set({ rsvp_mode: data.rsvp_mode === 'contact' ? 'form' : 'contact' })}>
        <div style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 14.5, color: ACC }}>
          Gostu omogoči, da prijavi spremljevalca z imenom.
        </div>
      </Sub>
      <Sub icon={undefined} title="Countdown timer" on={data.show_countdown} onToggle={() => set({ show_countdown: !data.show_countdown })}>
        <div style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 14.5, color: ACC }}>
          Odštevalnik do dneva poroke se prikaže na vabilu.
        </div>
      </Sub>
      <Sub icon={undefined} title="Animacija kuverte" on={data.show_intro} onToggle={() => set({ show_intro: !data.show_intro })}>
        <div style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 14.5, color: ACC }}>
          Ko gost odpre vabilo, se prikaže poročna kuverta z voskenim pečatom. Klik pečat zlomi in razkrije vabilo.
        </div>
      </Sub>
    </>
  )
}

function Step6({ data, set }: { data: EditorState; set: (p: Partial<EditorState>) => void }) {
  return (
    <Sub icon={Gift} title="Razdelek o darilih" on={data.show_gift_registry} onToggle={() => set({ show_gift_registry: !data.show_gift_registry })}>
      <div style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 14.5, color: ACC, marginBottom: 14 }}>
        Kratko, iskreno sporočilo o vajinih željah.
      </div>
      <TxtArea
        value={data.gift_registry[0]?.name ?? ''}
        onChange={v => set({ gift_registry: [{ name: v, url: '' }, ...data.gift_registry.slice(1)] })}
        placeholder="Najino največje darilo je vajina prisotnost. Če pa bi vendarle želeli, je dobrodošla skromna donacija za najino poročno potovanje."
        rows={5}
      />
      <div style={{ marginTop: 14, marginBottom: 20 }}>
        <button type="button"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '11px 18px', border: `1px solid ${ACC}`, color: ACC, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 500, background: PAPER, cursor: 'pointer', transition: 'background .15s, color .15s', fontFamily: sans, borderRadius: 2 }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = ACC; (e.currentTarget as HTMLElement).style.color = PAPER }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = PAPER; (e.currentTarget as HTMLElement).style.color = ACC }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2"/></svg>
          Predlog z AI
        </button>
      </div>
      <div style={{ borderTop: `1px dashed ${LINE}`, paddingTop: 20 }}>
        <Lbl>Gift registry povezave</Lbl>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.gift_registry.slice(1).map((g, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input value={g.name} onChange={e => set({ gift_registry: [data.gift_registry[0], ...data.gift_registry.slice(1).map((x, j) => j === i ? { ...x, name: e.target.value } : x)] })} placeholder="Ime (npr. Zalando)" style={{ ...SmallInp, flex: 1 }} />
              <input value={g.url} onChange={e => set({ gift_registry: [data.gift_registry[0], ...data.gift_registry.slice(1).map((x, j) => j === i ? { ...x, url: e.target.value } : x)] })} placeholder="https://..." style={{ ...SmallInp, flex: 2 }} />
              <button type="button" onClick={() => set({ gift_registry: [data.gift_registry[0], ...data.gift_registry.slice(1).filter((_, j) => j !== i)] })}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0504A', padding: 6, flexShrink: 0 }}><Trash2 size={13} /></button>
            </div>
          ))}
          <AddRow onClick={() => set({ gift_registry: [...data.gift_registry, { name: '', url: '' }] })} label="Dodaj registry" />
        </div>
      </div>
    </Sub>
  )
}

function Step7({ data, set, invitationId, pkg }: { data: EditorState; set: (p: Partial<EditorState>) => void; invitationId: string; pkg: Package }) {
  return (
    <GalleryTab
      invitationId={invitationId} pkg={pkg}
      caption={data.cover_photo_caption} onCaptionChange={v => set({ cover_photo_caption: v })}
      badge={data.cover_photo_badge} onBadgeChange={v => set({ cover_photo_badge: v })}
    />
  )
}

const DRESS_OPTS = [
  { v: 'sproščeno', l: 'Sproščeno' }, { v: 'cocktail', l: 'Cocktail' },
  { v: 'black tie', l: 'Black tie' }, { v: 'tematsko', l: 'Tematsko' },
]

function Step8({ data, set }: { data: EditorState; set: (p: Partial<EditorState>) => void }) {
  return (
    <>
      <Sub icon={undefined} title="Dress code" on={data.show_dress_code} onToggle={() => set({ show_dress_code: !data.show_dress_code })}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
          {DRESS_OPTS.map(d => (
            <div key={d.v} onClick={() => set({ dress_code: d.v })}
              style={{ padding: '10px 18px', border: `1px solid ${data.dress_code === d.v ? INK : LINE}`, borderRadius: 99, background: data.dress_code === d.v ? INK : PAPER, color: data.dress_code === d.v ? PAPER : INK, fontFamily: fran, fontStyle: 'italic', fontSize: 15, cursor: 'pointer', transition: 'all .15s' }}>
              {d.l}
            </div>
          ))}
        </div>
        <Inp value={data.dress_code} onChange={v => set({ dress_code: v })} placeholder="ali vpišite po meri…" />
      </Sub>

      <Sub icon={undefined} title="Politika otrok" on={data.show_children_policy} onToggle={() => set({ show_children_policy: !data.show_children_policy })}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[{ v: 'welcome', l: '👶 Otroci so dobrodošli' }, { v: 'infants_only', l: '🍼 Samo dojenčki' }, { v: 'adults_only', l: '🥂 Samo odrasli' }].map(o => (
            <div key={o.v} onClick={() => set({ children_policy: o.v })}
              style={{ padding: '12px 16px', border: `1px solid ${data.children_policy === o.v ? INK : LINE}`, background: data.children_policy === o.v ? PAPER_W : PAPER, cursor: 'pointer', borderRadius: 2, fontFamily: fran, fontWeight: 300, fontSize: 16, color: INK }}>
              {o.l}
            </div>
          ))}
        </div>
      </Sub>

      <Sub icon={Car} title="Prevoz in parkiranje" on={data.show_transport} onToggle={() => set({ show_transport: !data.show_transport })}>
        <TxtArea value={data.transport_notes} onChange={v => set({ transport_notes: v })} placeholder="Shuttle bus iz Ljubljane vsako uro od 14:00." rows={3} />
      </Sub>

      <Sub icon={Hotel} title="Nastanitev" on={data.show_accommodation} onToggle={() => set({ show_accommodation: !data.show_accommodation })}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.accommodation.map((acc, i) => (
            <div key={i} style={{ border: `1px solid ${LINE}`, padding: 14, background: PAPER, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 13, color: INK_MUTE }}>Hotel {i + 1}</span>
                <button type="button" onClick={() => set({ accommodation: data.accommodation.filter((_, j) => j !== i) })}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0504A', padding: 2 }}><Trash2 size={13} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <input value={acc.name} onChange={e => set({ accommodation: data.accommodation.map((a, j) => j === i ? { ...a, name: e.target.value } : a) })} placeholder="Hotel Kempinski" style={SmallInp} />
                <input value={acc.price_range ?? ''} onChange={e => set({ accommodation: data.accommodation.map((a, j) => j === i ? { ...a, price_range: e.target.value } : a) })} placeholder="€€€" style={SmallInp} />
              </div>
              <input value={acc.address ?? ''} onChange={e => set({ accommodation: data.accommodation.map((a, j) => j === i ? { ...a, address: e.target.value } : a) })} placeholder="Naslov" style={SmallInp} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <input value={acc.url ?? ''} onChange={e => set({ accommodation: data.accommodation.map((a, j) => j === i ? { ...a, url: e.target.value } : a) })} placeholder="https://hotel.com" style={SmallInp} />
                <input value={acc.discount_code ?? ''} onChange={e => set({ accommodation: data.accommodation.map((a, j) => j === i ? { ...a, discount_code: e.target.value } : a) })} placeholder="Koda: POROKA25" style={SmallInp} />
              </div>
            </div>
          ))}
          <AddRow onClick={() => set({ accommodation: [...data.accommodation, { name: '', address: '', url: '', discount_code: '', price_range: '', notes: '' }] })} label="Dodaj hotel" />
        </div>
      </Sub>

      <Sub icon={Music} title="Glasba in playlist" on={data.show_music} onToggle={() => set({ show_music: !data.show_music })}>
        <Fld label="Glasbeno ozadje na vabilu" help="Gostje glasbo vklopijo sami.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            {[{ id: 'none', label: 'Brez glasbe', description: 'Tiho' },
              ...Object.entries(BACKGROUND_MUSIC_TRACKS).map(([id, t]) => ({ id, ...t }))
            ].map(track => {
              const active = (data.background_music || 'none') === track.id
              return (
                <div key={track.id} onClick={() => set({ background_music: track.id })}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', border: `1px solid ${active ? INK : LINE}`, background: active ? PAPER_W : PAPER, cursor: 'pointer', borderRadius: 2, transition: 'all .15s' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: fran, fontWeight: 300, fontSize: 16, color: INK }}>{track.label}</div>
                    <div style={{ fontSize: 11, color: INK_MUTE, fontFamily: sans }}>{track.description}</div>
                  </div>
                  {active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACC }} />}
                </div>
              )
            })}
          </div>
        </Fld>
        <Fld label="Spotify / Apple Music">
          <Inp value={data.music_playlist_url} onChange={v => set({ music_playlist_url: v })} placeholder="https://open.spotify.com/playlist/…" />
        </Fld>
      </Sub>

      <Sub icon={Hash} title="Wedding hashtag" on={data.show_hashtag} onToggle={() => set({ show_hashtag: !data.show_hashtag })}>
        <Inp value={data.hashtag} onChange={v => set({ hashtag: v })} placeholder="#AnaInMarko2025" />
      </Sub>

      <Sub icon={Phone} title="Kontaktna oseba" on={data.show_contact} onToggle={() => set({ show_contact: !data.show_contact })}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Fld label="Ime"><Inp value={data.contact_name} onChange={v => set({ contact_name: v })} placeholder="Maja Novak" /></Fld>
            <Fld label="Telefon"><Inp value={data.contact_phone} onChange={v => set({ contact_phone: v })} placeholder="+386 41 123 456" /></Fld>
          </div>
          <Fld label="Email"><Inp type="email" value={data.contact_email} onChange={v => set({ contact_email: v })} placeholder="maja@email.com" /></Fld>
        </div>
      </Sub>

      <Sub icon={HelpCircle} title="Pogosta vprašanja (FAQ)" on={data.show_faq} onToggle={() => set({ show_faq: !data.show_faq })}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.faq.map((f, i) => (
            <div key={i} style={{ border: `1px solid ${LINE}`, padding: 14, background: PAPER, borderRadius: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 13, color: INK_MUTE }}>Vprašanje {i + 1}</span>
                <button type="button" onClick={() => set({ faq: data.faq.filter((_, j) => j !== i) })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0504A' }}><Trash2 size={13} /></button>
              </div>
              <input value={f.question} onChange={e => set({ faq: data.faq.map((x, j) => j === i ? { ...x, question: e.target.value } : x) })} placeholder="Ali je potrebna formalna obleka?" style={{ ...SmallInp, marginBottom: 8 }} />
              <textarea value={f.answer} onChange={e => set({ faq: data.faq.map((x, j) => j === i ? { ...x, answer: e.target.value } : x) })} placeholder="Ja, prosimo za cocktail attire." rows={2} style={{ ...SmallInp, resize: 'vertical', lineHeight: 1.5 }} />
            </div>
          ))}
          <AddRow onClick={() => set({ faq: [...data.faq, { question: '', answer: '' }] })} label="Dodaj vprašanje" />
        </div>
      </Sub>

      <div style={{ marginTop: 8, paddingTop: 28, borderTop: `1px solid ${LINE_SOFT}` }}>
        <Lbl>Jezik vabila</Lbl>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {LANGUAGE_OPTIONS.map(opt => (
            <div key={opt.value} onClick={() => { set({ language: opt.value, labels: { ...DEFAULT_LABELS[opt.value] ?? DEFAULT_LABELS['sl'] } }) }}
              style={{ padding: '10px 18px', border: `1px solid ${data.language === opt.value ? INK : LINE}`, background: data.language === opt.value ? INK : PAPER, color: data.language === opt.value ? PAPER : INK, fontFamily: fran, fontWeight: 300, fontSize: 16, cursor: 'pointer', transition: 'all .15s', borderRadius: 2 }}>
              {opt.label}
            </div>
          ))}
        </div>
        {LABEL_FIELD_GROUPS.map(group => (
          <div key={group.group} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: INK_MUTE, marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${LINE}`, fontFamily: sans }}>{group.group}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {group.fields.map(field => (
                <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 10.5, color: INK_MUTE, fontFamily: sans }}>{field}</label>
                  <input value={data.labels?.[field] ?? ''} onChange={e => set({ labels: { ...data.labels, [field]: e.target.value } })} style={{ ...SmallInp, fontSize: 13 }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Step9({ data, onSave, saving, slug, jump }: { data: EditorState; onSave: () => void; saving: boolean; slug: string; jump: (n: number) => void }) {
  const dateStr = useMemo(() => {
    if (!data.wedding_date) return '—'
    return new Date(data.wedding_date).toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' })
  }, [data.wedding_date])

  const rows: [string, string, number][] = [
    ['Par', `${data.partner1_name || '—'} & ${data.partner2_name || '—'}`, 1],
    ['Datum', dateStr, 1],
    ['Lokacija', `${data.venue_name || '—'} — ${data.venue_address || '—'}`, 4],
    ['Program', `${data.timeline.length} dogodkov`, 3],
    ['Potrditev do', data.rsvp_deadline ? new Date(data.rsvp_deadline).toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' }) : '—', 5],
    ['Galerija', data.show_gallery ? 'Prikazana' : 'Skrita', 7],
    ['Dress code', data.dress_code || '—', 8],
    ['Jezik', data.language, 8],
  ]

  return (
    <>
      <div style={{ fontFamily: fran, fontStyle: 'italic', fontSize: 15, color: INK_MUTE, marginBottom: 24, lineHeight: 1.5 }}>
        Še zadnji pogled na vajino vabilo. Vse je mogoče urediti tudi po objavi.
      </div>
      <div style={{ borderTop: `1px solid ${LINE_SOFT}` }}>
        {rows.map(([k, v, step]) => (
          <div key={k} onClick={() => jump(step)}
            style={{ display: 'grid', gridTemplateColumns: '180px 1fr', padding: '16px 0', borderBottom: `1px solid ${LINE_SOFT}`, cursor: 'pointer', transition: 'background .12s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = PAPER_W}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <div style={{ fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: INK_MUTE, fontFamily: sans, paddingRight: 16 }}>{k}</div>
            <div style={{ fontFamily: fran, fontWeight: 300, fontSize: 18, color: v === '—' ? INK_FAINT : INK, fontStyle: v === '—' ? 'italic' : 'normal' }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, padding: '24px 28px', background: '#F6F1E8', border: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 2 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: INK_MUTE, marginBottom: 6, fontFamily: sans }}>Vajino vabilo bo živo na</div>
          <div style={{ fontFamily: fran, fontStyle: 'italic', fontWeight: 300, fontSize: 22, color: INK, borderBottom: `1px solid ${INK}`, display: 'inline' }}>{slug}.najindan.si</div>
        </div>
        <button
          onClick={onSave} disabled={saving}
          style={{ padding: '16px 32px', background: saving ? INK_MUTE : ACC, color: PAPER, border: 'none', fontFamily: sans, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 500, cursor: saving ? 'not-allowed' : 'pointer', transition: 'background .15s', borderRadius: 2 }}
          onMouseEnter={e => { if (!saving) (e.currentTarget as HTMLElement).style.background = '#83572d' }}
          onMouseLeave={e => { if (!saving) (e.currentTarget as HTMLElement).style.background = ACC }}
        >
          {saving ? 'Shranjujem…' : 'Objavi vabilo'}
        </button>
      </div>
    </>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function InvitationEditor({ invitation }: { invitation: Invitation }) {
  const [current, setCurrent] = useState(1)
  const [data, setData] = useState<EditorState>(() => invToState(invitation))
  const [saving, setSaving] = useState(false)
  const [savedAgo, setSavedAgo] = useState(0)
  const [visited, setVisited] = useState(() => new Set([1]))
  const router = useRouter()

  function set(patch: Partial<EditorState>) { setData(d => ({ ...d, ...patch })); setSavedAgo(0) }
  function goTo(n: number) { setCurrent(n); setVisited(v => new Set([...v, n])) }

  useEffect(() => {
    const t = setInterval(() => setSavedAgo(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  async function save() {
    setSaving(true)
    try {
      const res = await fetch(`/api/invitations/${invitation.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          max_guests: data.max_guests ? parseInt(data.max_guests) : null,
          languages: [data.language],
          background_music: data.background_music && data.background_music !== 'none' ? data.background_music : null,
          ceremony_time: data.ceremony_time || null, reception_time: data.reception_time || null,
          rsvp_deadline: data.rsvp_deadline || null, wedding_date: data.wedding_date || null,
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error ?? 'Failed to save')
      toast.success('Shranjeno!')
      setSavedAgo(0)
      router.refresh()
    } catch (e) {
      toast.error((e as Error).message || 'Napaka pri shranjevanju')
    } finally {
      setSaving(false)
    }
  }

  const slug = `${(data.partner1_name || '').toLowerCase()}-in-${(data.partner2_name || '').toLowerCase()}`.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const isFirst = current === 1
  const isLast = current === STEPS.length
  const step = STEPS[current - 1]

  return (
    <div style={{ fontFamily: sans }}>
      {/* Topbar */}
      <div style={{ textAlign: 'center', padding: '36px 24px 8px', position: 'relative', borderBottom: `1px solid ${LINE}`, marginBottom: 0 }}>
        <button onClick={() => router.back()}
          style={{ position: 'absolute', left: 32, top: 46, display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: INK_MUTE, fontFamily: sans, background: 'none', border: 'none', cursor: 'pointer', padding: 0, whiteSpace: 'nowrap' }}
          onMouseEnter={e => (e.currentTarget.style.color = INK)} onMouseLeave={e => (e.currentTarget.style.color = INK_MUTE)}>
          ← Nadzorna plošča
        </button>
        <div style={{ fontFamily: fran, fontWeight: 300, fontStyle: 'italic', fontSize: 30, letterSpacing: '.005em', color: INK }}>
          najindan
        </div>
        <div style={{ marginTop: 6, fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: INK_MUTE, fontFamily: sans }}>
          Ustvari povabilo
        </div>
        <div style={{ width: 64, height: 1, background: INK, margin: '18px auto 0' }} />
        <div style={{ position: 'absolute', right: 32, top: 46, display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: INK_MUTE, fontFamily: sans, whiteSpace: 'nowrap' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#9bc28a', boxShadow: '0 0 0 4px rgba(155,194,138,.18)', flexShrink: 0 }} />
          Shranjeno{savedAgo > 0 ? ` pred ${savedAgo}s` : ''}
        </div>
      </div>

      {/* Stepper */}
      <Stepper current={current} setCurrent={goTo} visited={visited} />

      {/* Card */}
      <div style={{ maxWidth: 760, margin: '28px auto 60px', padding: '0 4px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.2, 0.6, 0.2, 1] }}
            style={{ background: PAPER, border: `1px solid ${LINE}`, boxShadow: SHADOW, padding: '52px 60px 44px', position: 'relative' }}
          >
            <div style={{ fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase', color: ACC, fontWeight: 500, fontFamily: sans }}>
              Korak {current} / {STEPS.length}
            </div>
            <h1 style={{ fontFamily: fran, fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(36px,4vw,54px)', lineHeight: 1.05, letterSpacing: '-.015em', marginTop: 10, color: INK }}>
              {step.title}
            </h1>
            <div style={{ height: 1, background: LINE_SOFT, margin: '32px 0 28px' }} />

            {current === 1 && <Step1 data={data} set={set} />}
            {current === 2 && <Step2 data={data} set={set} />}
            {current === 3 && <Step3 data={data} set={set} />}
            {current === 4 && <Step4 data={data} set={set} />}
            {current === 5 && <Step5 data={data} set={set} />}
            {current === 6 && <Step6 data={data} set={set} />}
            {current === 7 && <Step7 data={data} set={set} invitationId={invitation.id} pkg={invitation.package} />}
            {current === 8 && <Step8 data={data} set={set} />}
            {current === 9 && <Step9 data={data} onSave={save} saving={saving} slug={slug} jump={goTo} />}

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, paddingTop: 24, borderTop: `1px solid ${LINE_SOFT}` }}>
              <button
                onClick={() => !isFirst && goTo(current - 1)}
                style={{ padding: '13px 22px', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 500, border: `1px solid ${LINE}`, color: isFirst ? INK_FAINT : INK_MUTE, background: PAPER, cursor: isFirst ? 'not-allowed' : 'pointer', opacity: isFirst ? 0.4 : 1, transition: 'all .15s', fontFamily: sans, borderRadius: 2 }}
                onMouseEnter={e => { if (!isFirst) { (e.currentTarget).style.borderColor = INK; (e.currentTarget).style.color = INK } }}
                onMouseLeave={e => { (e.currentTarget).style.borderColor = LINE; (e.currentTarget).style.color = isFirst ? INK_FAINT : INK_MUTE }}
              >
                ‹ Nazaj
              </button>
              {!isLast && (
                <button onClick={() => goTo(current + 1)}
                  style={{ padding: '13px 28px', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 500, border: 'none', background: INK, color: PAPER, cursor: 'pointer', fontFamily: sans, borderRadius: 2, transition: 'background .15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#000')}
                  onMouseLeave={e => (e.currentTarget.style.background = INK)}
                >
                  Naprej ›
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
