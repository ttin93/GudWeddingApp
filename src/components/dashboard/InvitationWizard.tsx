'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  ChevronLeft, ChevronRight, Check, Plus, Trash2,
  Clock, MapPin, Heart, Gift, HelpCircle,
  Hotel, Car, Hash, Phone, Users, Music,
  ChevronDown, ChevronUp, Sparkles, Loader2, Eye,
  Upload, X, ImageIcon,
} from 'lucide-react'
import { TEMPLATES, BACKGROUND_MUSIC_TRACKS } from '@/types'
import type { TemplateId, BackgroundMusicId, TimelineEvent, AccommodationItem, GiftRegistryItem, FAQItem, Invitation, InvitationPhoto } from '@/types'
import { TemplateRenderer } from '../invitation/TemplateRenderer'
import { DEFAULT_LABELS, LANGUAGE_OPTIONS, LABEL_FIELD_GROUPS } from '@/lib/utils/labels'
import type { InvitationLabels } from '@/lib/utils/labels'

// ─── Colors ───────────────────────────────────────────────────────────────────
const INK      = '#1C1814'
const INK_MUTE = '#8a7d6d'
const INK_FAINT = '#b8aa95'
const ACC      = '#9C6B3D'
const LINE     = '#E2D7BF'
const LINE_SOFT = '#ece2cc'
const PAPER    = '#FFFFFF'
const PAPER_W  = '#FBF7EE'
const BG       = '#F6F1E8'
const STEP_BG  = '#E8DCC2'
const STEP_FG  = '#9C8C72'
const SHADOW   = '0 1px 0 rgba(28,24,20,.02), 0 24px 60px -40px rgba(28,24,20,.18)'
const fran     = 'var(--font-fraunces), Georgia, serif'
const sans     = 'var(--font-instrument), "Helvetica Neue", sans-serif'

// Legacy aliases used in existing step components
const MUTE  = INK_MUTE
const CREAM = BG
const RULE  = LINE
const SOFT  = PAPER_W
const WHITE = PAPER

// ─── Types ────────────────────────────────────────────────────────────────────
interface WizardData {
  // Step 1
  partner1_name: string
  partner2_name: string
  wedding_date: string
  story: string
  show_story: boolean
  // Step 2
  template_id: TemplateId | ''
  // Step 3
  personal_message: string
  venue_name: string
  venue_address: string
  ceremony_time: string
  reception_time: string
  // Step 4 — timeline
  timeline: TimelineEvent[]
  show_program: boolean
  // Step 5 — details
  dress_code: string
  show_dress_code: boolean
  children_policy: string
  show_children_policy: boolean
  hashtag: string
  show_hashtag: boolean
  contact_name: string
  contact_phone: string
  contact_email: string
  show_contact: boolean
  music_playlist_url: string
  show_music: boolean
  // Step 6 — extras
  transport_notes: string
  show_transport: boolean
  accommodation: AccommodationItem[]
  show_accommodation: boolean
  gift_registry: GiftRegistryItem[]
  show_gift_registry: boolean
  faq: FAQItem[]
  show_faq: boolean
  // Step 7 — RSVP
  rsvp_mode: 'form' | 'contact' | 'both'
  rsvp_deadline: string
  max_guests: string
  show_countdown: boolean
  show_gallery: boolean
  show_intro: boolean
  // Step 8 — jezik
  language: string
  labels: InvitationLabels
  // Background music
  background_music: BackgroundMusicId
}

const DEFAULT: WizardData = {
  partner1_name: '', partner2_name: '', wedding_date: '', story: '', show_story: true,
  template_id: '',
  personal_message: '', venue_name: '', venue_address: '', ceremony_time: '', reception_time: '',
  timeline: [], show_program: true,
  dress_code: '', show_dress_code: true,
  children_policy: '', show_children_policy: true,
  hashtag: '', show_hashtag: true,
  contact_name: '', contact_phone: '', contact_email: '', show_contact: true,
  music_playlist_url: '', show_music: true,
  transport_notes: '', show_transport: true,
  accommodation: [], show_accommodation: true,
  gift_registry: [], show_gift_registry: true,
  faq: [], show_faq: true,
  rsvp_mode: 'form', rsvp_deadline: '', max_guests: '', show_countdown: true, show_gallery: true, show_intro: true,
  language: 'sl',
  labels: DEFAULT_LABELS['sl'],
  background_music: 'none',
}

// ─── Step config ──────────────────────────────────────────────────────────────
const STEPS = [
  { label: 'Par', icon: Heart },
  { label: 'Dizajn', icon: null },
  { label: 'Lokacija', icon: MapPin },
  { label: 'Program', icon: Clock },
  { label: 'Podrobnosti', icon: Hash },
  { label: 'Extras', icon: Gift },
  { label: 'RSVP', icon: Users },
  { label: 'Jezik', icon: null },
  { label: 'Pregled', icon: Check },
]

// ─── UI primitives ────────────────────────────────────────────────────────────
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTE }}>{label}</label>
      {hint && <p style={{ fontSize: 12, color: MUTE, marginTop: -4 }}>{hint}</p>}
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', padding: '10px 14px',
        border: `1px solid ${RULE}`, background: WHITE,
        fontSize: 14, color: INK,
        outline: 'none', boxSizing: 'border-box',
        fontFamily: 'inherit',
      }}
    />
  )
}

function TextArea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%', padding: '10px 14px',
        border: `1px solid ${RULE}`, background: WHITE,
        fontSize: 14, color: INK, lineHeight: 1.6,
        outline: 'none', resize: 'vertical', boxSizing: 'border-box',
        fontFamily: 'inherit',
      }}
    />
  )
}

function Select({ value, onChange, options }: {
  value: string; onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', padding: '10px 14px',
        border: `1px solid ${RULE}`, background: WHITE,
        fontSize: 14, color: value ? INK : MUTE,
        outline: 'none', cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

// ─── Section toggle with collapsible content ──────────────────────────────────
function SectionToggle({
  label, icon: Icon, enabled, onToggle, children,
}: {
  label: string
  icon?: React.ElementType
  enabled: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div style={{ border: `1px solid ${enabled ? RULE : RULE}`, marginBottom: 0 }}>
      {/* Header */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={e => e.key === 'Enter' && onToggle()}
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '13px 16px',
          background: enabled ? WHITE : SOFT,
          cursor: 'pointer',
          userSelect: 'none',
          borderBottom: enabled ? `1px solid ${RULE}` : 'none',
        }}
      >
        {Icon && <Icon size={14} style={{ color: enabled ? ACC : MUTE }} />}
        <span style={{
          flex: 1,
          fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: enabled ? INK : MUTE,
        }}>
          {label}
        </span>
        <span style={{ fontSize: 11, color: enabled ? ACC : MUTE, marginRight: 10 }}>
          {enabled ? 'Prikazano' : 'Skrito'}
        </span>
        {/* Toggle pill */}
        <div style={{
          width: 40, height: 22, borderRadius: 11,
          background: enabled ? ACC : RULE,
          position: 'relative', flexShrink: 0,
          transition: 'background .18s',
        }}>
          <div style={{
            position: 'absolute', top: 3,
            left: enabled ? 19 : 3,
            width: 16, height: 16, borderRadius: '50%',
            background: WHITE,
            transition: 'left .18s',
            boxShadow: '0 1px 3px rgba(0,0,0,.18)',
          }} />
        </div>
      </div>

      {/* Collapsible body */}
      {enabled && (
        <div style={{ padding: '20px 16px' }}>
          {children}
        </div>
      )}
    </div>
  )
}

function SectionLabel({ icon: Icon, children }: { icon?: React.ElementType; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 14, borderBottom: `1px solid ${RULE}` }}>
      {Icon && <Icon size={15} style={{ color: ACC }} />}
      <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE }}>{children}</span>
    </div>
  )
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '9px 16px', border: `1px dashed ${RULE}`,
        background: 'transparent', color: MUTE,
        fontSize: 12, letterSpacing: '0.15em', cursor: 'pointer',
        width: '100%', justifyContent: 'center',
      }}
    >
      <Plus size={13} />
      {label}
    </button>
  )
}

// ─── AI assist button ─────────────────────────────────────────────────────────
function AiButton({ onClick, loading, label = 'AI predlog' }: { onClick: () => void; loading: boolean; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '7px 12px', border: `1px solid ${ACC}`, background: loading ? SOFT : WHITE,
        fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
        color: ACC, cursor: loading ? 'wait' : 'pointer',
        opacity: loading ? 0.7 : 1, transition: 'background .15s',
      }}
    >
      {loading ? <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={12} />}
      {loading ? 'Generating…' : label}
    </button>
  )
}

// ─── STEP 1: Par ──────────────────────────────────────────────────────────────
function Step1({ data, set }: { data: WizardData; set: (k: keyof WizardData, v: unknown) => void }) {
  const [aiMsg, setAiMsg] = useState(false)

  async function generateMessage() {
    const input = [
      data.partner1_name && data.partner2_name ? `${data.partner1_name} and ${data.partner2_name}` : '',
      data.story || '',
    ].filter(Boolean).join('. ') || 'a couple getting married'
    setAiMsg(true)
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'message', input, tone: 'warm and romantic' }),
      })
      const json = await res.json()
      if (json.result) set('personal_message', json.result)
    } finally {
      setAiMsg(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Ime partnerja 1">
          <TextInput value={data.partner1_name} onChange={v => set('partner1_name', v)} placeholder="Ana" />
        </Field>
        <Field label="Ime partnerja 2">
          <TextInput value={data.partner2_name} onChange={v => set('partner2_name', v)} placeholder="Marko" />
        </Field>
      </div>
      <Field label="Datum poroke">
        <TextInput type="date" value={data.wedding_date} onChange={v => set('wedding_date', v)} />
      </Field>

      <SectionToggle
        label="Vaša zgodba"
        icon={Heart}
        enabled={data.show_story}
        onToggle={() => set('show_story', !data.show_story)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 12, color: MUTE }}>Kako sta se spoznala? Prikazuje se na povabilu.</p>
          <TextArea
            rows={4}
            value={data.story}
            onChange={v => set('story', v)}
            placeholder="Spoznala sva se na poletnem festivalu leta 2019..."
          />
        </div>
      </SectionToggle>

      <Field label="Osebno sporočilo gostom">
        <TextArea
          rows={3}
          value={data.personal_message}
          onChange={v => set('personal_message', v)}
          placeholder="Z veseljem vas vabimo, da delite z nami ta posebni dan..."
        />
        <div style={{ marginTop: 6 }}>
          <AiButton onClick={generateMessage} loading={aiMsg} label="Generiraj sporočilo z AI" />
        </div>
      </Field>
    </div>
  )
}

// ─── Mock invitation for preview ─────────────────────────────────────────────
function buildMockInvitation(data: WizardData): Invitation {
  const futureDate = new Date(Date.now() + 200 * 24 * 3600 * 1000).toISOString().split('T')[0]
  return {
    id: 'preview', user_id: 'preview', slug: 'preview',
    partner1_name: data.partner1_name || 'Ana',
    partner2_name: data.partner2_name || 'Marko',
    wedding_date: data.wedding_date || futureDate,
    template_id: (data.template_id || 'botanica') as TemplateId,
    venue_name: 'Grand Hotel Portorož',
    venue_address: 'Obala 33, 6320 Portorož',
    ceremony_time: '14:00',
    reception_time: '16:00',
    personal_message: 'Z veseljem vas vabimo, da delite z nami ta posebni dan.',
    timeline: [
      { time: '14:00', title: 'Prihod gostov' },
      { time: '15:00', title: 'Poročna ceremonija' },
      { time: '16:00', title: 'Skupinska fotografija' },
      { time: '18:00', title: 'Večerja & praznovanje' },
    ],
    languages: ['sl'],
    show_gallery: false, show_countdown: true, show_story: false,
    show_program: true, show_dress_code: false, show_children_policy: false,
    show_hashtag: false, show_music: false, show_contact: false,
    show_transport: false, show_accommodation: false, show_gift_registry: false, show_faq: false,
    package: 'signature', is_active: true, view_count: 0,
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  }
}

// ─── STEP 2: Template ─────────────────────────────────────────────────────────
function Step2({ data, set }: { data: WizardData; set: (k: keyof WizardData, v: unknown) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontSize: 12, color: MUTE, marginBottom: 4 }}>Kliknite na predlogo za predogled →</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {TEMPLATES.map(t => {
          const active = data.template_id === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => set('template_id', t.id)}
              style={{
                textAlign: 'left', border: `2px solid ${active ? ACC : RULE}`,
                background: 'transparent', cursor: 'pointer', padding: 0, overflow: 'hidden',
                transition: 'border-color .2s',
                boxShadow: active ? `0 0 0 1px ${ACC}` : 'none',
              }}
            >
              <div style={{
                aspectRatio: '3/2',
                background: t.colors.background,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: 12,
              }}>
                <div style={{ fontFamily: 'var(--font-pinyon), cursive', fontSize: 18, color: t.colors.primary, lineHeight: 1 }}>
                  {data.partner1_name || 'Ana'} &amp; {data.partner2_name || 'Marko'}
                </div>
                <div style={{ height: 1, width: 32, background: t.colors.accent, opacity: 0.5 }} />
                <div style={{ fontSize: 9, letterSpacing: '0.18em', color: t.colors.textMuted, textTransform: 'uppercase' }}>
                  {data.wedding_date || '2026'}
                </div>
              </div>
              <div style={{
                padding: '8px 12px', borderTop: `1px solid ${RULE}`,
                background: active ? ACC + '10' : WHITE,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 12, color: INK, fontWeight: 500 }}>{t.name}</div>
                  <div style={{ fontSize: 10, color: MUTE, textTransform: 'capitalize' }}>{t.category}</div>
                </div>
                {active ? <Check size={13} style={{ color: ACC }} /> : <Eye size={12} style={{ color: MUTE, opacity: 0.5 }} />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Template preview panel (scaled) ─────────────────────────────────────────
function TemplatePreviewPanel({ data }: { data: WizardData }) {
  const SCALE = 0.38
  const mock = buildMockInvitation(data)

  if (!data.template_id) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12, color: MUTE }}>
        <Eye size={28} style={{ opacity: 0.4 }} />
        <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center' }}>Izberite predlogo<br />za predogled</p>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: `${100 / SCALE}%`,
        transformOrigin: 'top left',
        transform: `scale(${SCALE})`,
        pointerEvents: 'none',
      }}>
        <TemplateRenderer invitation={mock} />
      </div>
      <div style={{
        position: 'absolute', bottom: 12, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
      }}>
        <div style={{ background: 'rgba(26,23,20,0.7)', color: '#fff', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '5px 14px', backdropFilter: 'blur(6px)' }}>
          Predogled · {TEMPLATES.find(t => t.id === data.template_id)?.name}
        </div>
      </div>
    </div>
  )
}

// ─── STEP 3: Lokacija ─────────────────────────────────────────────────────────
function Step3({ data, set }: { data: WizardData; set: (k: keyof WizardData, v: unknown) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionLabel icon={MapPin}>Prizorišče</SectionLabel>
      <Field label="Ime prizorišča">
        <TextInput value={data.venue_name} onChange={v => set('venue_name', v)} placeholder="Grand Hotel Portorož" />
      </Field>
      <Field label="Naslov" hint="Gosti bodo dobili direkten link na Google Maps.">
        <TextInput value={data.venue_address} onChange={v => set('venue_address', v)} placeholder="Obala 33, 6320 Portorož" />
      </Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Čas ceremonije">
          <TextInput type="time" value={data.ceremony_time} onChange={v => set('ceremony_time', v)} />
        </Field>
        <Field label="Čas sprejema">
          <TextInput type="time" value={data.reception_time} onChange={v => set('reception_time', v)} />
        </Field>
      </div>
    </div>
  )
}

// ─── STEP 4: Timeline ─────────────────────────────────────────────────────────
function TimelineEditor({ events, onChange }: {
  events: TimelineEvent[]
  onChange: (events: TimelineEvent[]) => void
}) {
  function add() {
    onChange([...events, { time: '', title: '', description: '' }])
  }
  function update(i: number, field: keyof TimelineEvent, value: string) {
    onChange(events.map((e, idx) => idx === i ? { ...e, [field]: value } : e))
  }
  function remove(i: number) {
    onChange(events.filter((_, idx) => idx !== i))
  }
  function moveUp(i: number) {
    if (i === 0) return
    const next = [...events]; [next[i - 1], next[i]] = [next[i], next[i - 1]]; onChange(next)
  }
  function moveDown(i: number) {
    if (i === events.length - 1) return
    const next = [...events]; [next[i], next[i + 1]] = [next[i + 1], next[i]]; onChange(next)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {events.map((event, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '88px 1fr 28px', gap: 16, alignItems: 'start', padding: '14px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE_SOFT}` }}>
          <input type="time" value={event.time} onChange={e => update(i, 'time', e.target.value)}
            style={{ padding: '8px 10px', border: `1px solid ${LINE}`, background: PAPER, fontSize: 17, color: INK, outline: 'none', fontFamily: fran, fontWeight: 300, textAlign: 'center', width: '100%', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input value={event.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Naslov dogodka"
              style={{ padding: '8px 10px', border: `1px solid ${LINE}`, background: PAPER, fontSize: 17, color: INK, outline: 'none', fontFamily: fran, fontWeight: 300, width: '100%', boxSizing: 'border-box' }} />
            <input value={event.description ?? ''} onChange={e => update(i, 'description', e.target.value)} placeholder="Kratek opis (neobvezno)"
              style={{ padding: '8px 10px', border: `1px solid ${LINE}`, background: PAPER_W, fontSize: 14, color: INK, outline: 'none', fontStyle: 'italic', width: '100%', boxSizing: 'border-box', fontFamily: fran, fontWeight: 300 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 4 }}>
            <button type="button" onClick={() => moveUp(i)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: MUTE }}><ChevronUp size={13} /></button>
            <button type="button" onClick={() => moveDown(i)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: MUTE }}><ChevronDown size={13} /></button>
            <button type="button" onClick={() => remove(i)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: '#C0504A' }}><Trash2 size={13} /></button>
          </div>
        </div>
      ))}
      <div onClick={add} style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: ACC, cursor: 'pointer', padding: '12px 0', borderTop: `1px dashed ${LINE}`, fontFamily: sans, fontWeight: 500 }}>
        <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Dodaj dogodek
      </div>
    </div>
  )
}

function Step4({ data, set }: { data: WizardData; set: (k: keyof WizardData, v: unknown) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SectionToggle
        label="Program dneva"
        icon={Clock}
        enabled={data.show_program}
        onToggle={() => set('show_program', !data.show_program)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 13, color: MUTE }}>Dodaj vrstni red dogajanja. Gostje bodo videli lep timeline na povabilu.</p>
          <TimelineEditor events={data.timeline} onChange={events => set('timeline', events)} />
        </div>
      </SectionToggle>
    </div>
  )
}

// ─── STEP 5: Podrobnosti ──────────────────────────────────────────────────────
function Step5({ data, set }: { data: WizardData; set: (k: keyof WizardData, v: unknown) => void }) {
  const [aiDress, setAiDress] = useState(false)
  const [previewPlaying, setPreviewPlaying] = useState<string | null>(null)
  const previewAudioRef = useRef<HTMLAudioElement | null>(null)

  function stopPreview() {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause()
      previewAudioRef.current.src = ''
      previewAudioRef.current = null
    }
    setPreviewPlaying(null)
  }

  function playPreview(id: string) {
    const track = BACKGROUND_MUSIC_TRACKS[id as keyof typeof BACKGROUND_MUSIC_TRACKS]
    if (!track) return

    if (previewPlaying === id) { stopPreview(); return }

    if (previewAudioRef.current) {
      previewAudioRef.current.pause()
      previewAudioRef.current.src = ''
    }

    const audio = new Audio(track.src)
    audio.volume = 0.35
    audio.loop = true
    previewAudioRef.current = audio

    // keep play() call synchronous (preserves browser gesture context)
    const promise = audio.play()
    if (promise !== undefined) {
      promise
        .then(() => setPreviewPlaying(id))
        .catch(() => toast.error('Klikni nekje na strani, nato znova izberi glasbo'))
    }
  }

  function selectTrack(id: BackgroundMusicId) {
    set('background_music', id)
    if (id === 'none') { stopPreview(); return }
    playPreview(id)
  }

  useEffect(() => () => { previewAudioRef.current?.pause() }, [])

  async function generateDressCode() {
    const input = data.dress_code || 'formal wedding, elegant'
    setAiDress(true)
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'dresscode', input }),
      })
      const json = await res.json()
      if (json.result) set('dress_code', json.result)
    } finally {
      setAiDress(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      <SectionToggle
        label="Dress code"
        icon={Heart}
        enabled={data.show_dress_code}
        onToggle={() => set('show_dress_code', !data.show_dress_code)}
      >
        <Field label="Dress code">
          <TextInput value={data.dress_code} onChange={v => set('dress_code', v)} placeholder="Slovesno, barvna tematika: zemeljski toni" />
          <div style={{ marginTop: 6 }}>
            <AiButton onClick={generateDressCode} loading={aiDress} label="AI predlog" />
          </div>
        </Field>
      </SectionToggle>

      <SectionToggle
        label="Politika otrok"
        enabled={data.show_children_policy}
        onToggle={() => set('show_children_policy', !data.show_children_policy)}
      >
        <Field label="Otroci">
          <Select
            value={data.children_policy}
            onChange={v => set('children_policy', v)}
            options={[
              { value: '', label: '— ni navedeno —' },
              { value: 'welcome', label: '👶 Otroci so dobrodošli' },
              { value: 'infants_only', label: '🍼 Samo dojenčki' },
              { value: 'adults_only', label: '🥂 Samo odrasli' },
            ]}
          />
        </Field>
      </SectionToggle>

      <SectionToggle
        label="Wedding hashtag"
        icon={Hash}
        enabled={data.show_hashtag}
        onToggle={() => set('show_hashtag', !data.show_hashtag)}
      >
        <Field label="Hashtag" hint="Gostje bodo videli na povabilu za objave na socialnih omrežjih.">
          <TextInput value={data.hashtag} onChange={v => set('hashtag', v)} placeholder="#AnaInMarko2025" />
        </Field>
      </SectionToggle>

      <SectionToggle
        label="Glasba / Playlist"
        icon={Music}
        enabled={data.show_music}
        onToggle={() => set('show_music', !data.show_music)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="Glasbeno ozadje" hint="Klikni za predvajanje. Gostje glasbo vklopijo sami na povabilu.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 2 }}>
              {/* None option */}
              <button
                type="button"
                onClick={() => selectTrack('none')}
                style={{
                  padding: '10px 14px', textAlign: 'left', fontFamily: 'inherit',
                  border: `2px solid ${data.background_music === 'none' ? ACC : RULE}`,
                  background: data.background_music === 'none' ? ACC + '0D' : WHITE,
                  cursor: 'pointer', transition: 'all .15s',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}
              >
                <span style={{ fontSize: 18, lineHeight: 1 }}>🔇</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: INK }}>Brez glasbe</div>
                  <div style={{ fontSize: 11, color: MUTE }}>Tiho</div>
                </div>
              </button>

              {/* Track options */}
              {(Object.entries(BACKGROUND_MUSIC_TRACKS) as [string, { label: string; description: string }][]).map(([id, track]) => {
                const selected = data.background_music === id
                const playing = previewPlaying === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => selectTrack(id as BackgroundMusicId)}
                    style={{
                      padding: '10px 14px', textAlign: 'left', fontFamily: 'inherit',
                      border: `2px solid ${selected ? ACC : RULE}`,
                      background: selected ? ACC + '0D' : WHITE,
                      cursor: 'pointer', transition: 'all .15s',
                      display: 'flex', alignItems: 'center', gap: 12,
                    }}
                  >
                    {/* Play/pause indicator */}
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                      background: playing ? ACC : selected ? ACC + '30' : RULE,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, color: playing ? WHITE : MUTE,
                      transition: 'all .2s',
                    }}>
                      {playing ? '⏸' : '▶'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: selected ? 600 : 400, color: INK }}>{track.label}</div>
                      <div style={{ fontSize: 11, color: MUTE }}>{track.description}</div>
                    </div>
                    {playing && (
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14 }}>
                        {[1, 1.5, 0.8, 1.2].map((h, i) => (
                          <div key={i} style={{
                            width: 3, borderRadius: 2, background: ACC,
                            height: `${h * 9}px`,
                            animation: `musicBar ${0.7 + i * 0.15}s ease-in-out infinite alternate`,
                          }} />
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}

              {/* Stop bar */}
              {previewPlaying && (
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 14px', background: ACC + '15', border: `1px solid ${ACC}30`,
                  marginTop: 2,
                }}>
                  <span style={{ fontSize: 11.5, color: ACC, fontWeight: 500 }}>
                    ♫ Predvajam: {BACKGROUND_MUSIC_TRACKS[previewPlaying as keyof typeof BACKGROUND_MUSIC_TRACKS]?.label}
                  </span>
                  <button type="button" onClick={stopPreview} style={{
                    background: 'none', border: `1px solid ${ACC}60`, color: ACC,
                    fontSize: 11, padding: '3px 10px', cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    ■ Stop
                  </button>
                </div>
              )}

              <style>{`
                @keyframes musicBar {
                  from { transform: scaleY(0.3); opacity: 0.5; }
                  to   { transform: scaleY(1);   opacity: 1;   }
                }
              `}</style>
            </div>
          </Field>
          <Field label="Spotify / Apple Music" hint="Link na skupno predvajalno listo (prikaže se na povabilu).">
            <TextInput value={data.music_playlist_url} onChange={v => set('music_playlist_url', v)} placeholder="https://open.spotify.com/playlist/..." />
          </Field>
        </div>
      </SectionToggle>

      <SectionToggle
        label="Kontaktna oseba"
        icon={Phone}
        enabled={data.show_contact}
        onToggle={() => set('show_contact', !data.show_contact)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Ime">
              <TextInput value={data.contact_name} onChange={v => set('contact_name', v)} placeholder="Maja Novak" />
            </Field>
            <Field label="Telefon">
              <TextInput value={data.contact_phone} onChange={v => set('contact_phone', v)} placeholder="+386 41 123 456" />
            </Field>
          </div>
          <Field label="Email">
            <TextInput type="email" value={data.contact_email} onChange={v => set('contact_email', v)} placeholder="maja@email.com" />
          </Field>
        </div>
      </SectionToggle>

    </div>
  )
}

// ─── STEP 6: Extras ───────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  padding: '8px 10px', border: `1px solid ${RULE}`, background: WHITE,
  fontSize: 13, color: INK, outline: 'none', fontFamily: 'inherit', width: '100%',
}

function Step6({ data, set }: { data: WizardData; set: (k: keyof WizardData, v: unknown) => void }) {

  function updateAccommodation(i: number, field: keyof AccommodationItem, value: string) {
    set('accommodation', data.accommodation.map((a, idx) => idx === i ? { ...a, [field]: value } : a))
  }
  function updateRegistry(i: number, field: keyof GiftRegistryItem, value: string) {
    set('gift_registry', data.gift_registry.map((g, idx) => idx === i ? { ...g, [field]: value } : g))
  }
  function updateFAQ(i: number, field: keyof FAQItem, value: string) {
    set('faq', data.faq.map((f, idx) => idx === i ? { ...f, [field]: value } : f))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      <SectionToggle
        label="Prevoz & parkiranje"
        icon={Car}
        enabled={data.show_transport}
        onToggle={() => set('show_transport', !data.show_transport)}
      >
        <TextArea rows={3} value={data.transport_notes} onChange={v => set('transport_notes', v)}
          placeholder="Brezplačen shuttle bus iz Ljubljane vsako uro od 14:00.&#10;Parkiranje pred hotelom." />
      </SectionToggle>

      <SectionToggle
        label="Nastanitev"
        icon={Hotel}
        enabled={data.show_accommodation}
        onToggle={() => set('show_accommodation', !data.show_accommodation)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.accommodation.map((acc, i) => (
            <div key={i} style={{ border: `1px solid ${RULE}`, padding: 12, background: WHITE, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: MUTE }}>Hotel {i + 1}</span>
                <button type="button" onClick={() => set('accommodation', data.accommodation.filter((_, idx) => idx !== i))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0504A', padding: 2 }}><Trash2 size={13} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <input value={acc.name} onChange={e => updateAccommodation(i, 'name', e.target.value)} placeholder="Hotel Kempinski" style={inputStyle} />
                <input value={acc.price_range ?? ''} onChange={e => updateAccommodation(i, 'price_range', e.target.value)} placeholder="€€€ (od €150/noč)" style={inputStyle} />
              </div>
              <input value={acc.address ?? ''} onChange={e => updateAccommodation(i, 'address', e.target.value)} placeholder="Naslov hotela" style={inputStyle} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <input value={acc.url ?? ''} onChange={e => updateAccommodation(i, 'url', e.target.value)} placeholder="https://hotel.com" style={inputStyle} />
                <input value={acc.discount_code ?? ''} onChange={e => updateAccommodation(i, 'discount_code', e.target.value)} placeholder="Koda: POROKA25" style={inputStyle} />
              </div>
              <input value={acc.notes ?? ''} onChange={e => updateAccommodation(i, 'notes', e.target.value)} placeholder="Opomba (npr. rezervirajte do 1.8.)" style={inputStyle} />
            </div>
          ))}
          <AddButton onClick={() => set('accommodation', [...data.accommodation, { name: '', address: '', url: '', discount_code: '', price_range: '', notes: '' }])} label="Dodaj hotel" />
        </div>
      </SectionToggle>

      <SectionToggle
        label="Darila / Gift registry"
        icon={Gift}
        enabled={data.show_gift_registry}
        onToggle={() => set('show_gift_registry', !data.show_gift_registry)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.gift_registry.map((g, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input value={g.name} onChange={e => updateRegistry(i, 'name', e.target.value)} placeholder="Zalando wishlist" style={{ ...inputStyle, flex: 1 }} />
              <input value={g.url} onChange={e => updateRegistry(i, 'url', e.target.value)} placeholder="https://..." style={{ ...inputStyle, flex: 2 }} />
              <button type="button" onClick={() => set('gift_registry', data.gift_registry.filter((_, idx) => idx !== i))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0504A', padding: 6, flexShrink: 0 }}><Trash2 size={13} /></button>
            </div>
          ))}
          <AddButton onClick={() => set('gift_registry', [...data.gift_registry, { name: '', url: '' }])} label="Dodaj gift registry" />
        </div>
      </SectionToggle>

      <SectionToggle
        label="Pogosta vprašanja (FAQ)"
        icon={HelpCircle}
        enabled={data.show_faq}
        onToggle={() => set('show_faq', !data.show_faq)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.faq.map((f, i) => (
            <div key={i} style={{ border: `1px solid ${RULE}`, padding: 12, background: WHITE }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: MUTE }}>Vprašanje {i + 1}</span>
                <button type="button" onClick={() => set('faq', data.faq.filter((_, idx) => idx !== i))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0504A', padding: 0 }}><Trash2 size={13} /></button>
              </div>
              <input value={f.question} onChange={e => updateFAQ(i, 'question', e.target.value)} placeholder="Ali je potrebna formalna obleka?"
                style={{ ...inputStyle, marginBottom: 6 }} />
              <textarea value={f.answer} onChange={e => updateFAQ(i, 'answer', e.target.value)} placeholder="Ja, prosimo za cocktail attire."
                rows={2} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
            </div>
          ))}
          <AddButton onClick={() => set('faq', [...data.faq, { question: '', answer: '' }])} label="Dodaj vprašanje" />
        </div>
      </SectionToggle>

    </div>
  )
}

// ─── STEP 7: RSVP ─────────────────────────────────────────────────────────────
const RSVP_MODE_OPTIONS = [
  { value: 'form', label: 'RSVP obrazec', desc: 'Gostje izpolnijo obrazec na povabilu', icon: '📝' },
  { value: 'contact', label: 'Direkten kontakt', desc: 'Gostje vas pokličejo ali pišejo', icon: '📱' },
  { value: 'both', label: 'Oboje', desc: 'Obrazec in kontaktni podatki', icon: '✦' },
] as const

function Step7({ data, set }: { data: WizardData; set: (k: keyof WizardData, v: unknown) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionLabel icon={Users}>RSVP nastavitve</SectionLabel>

      {/* RSVP mode */}
      <Field label="Način prijave">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {RSVP_MODE_OPTIONS.map(opt => {
            const active = data.rsvp_mode === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => set('rsvp_mode', opt.value)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '13px 16px',
                  border: `2px solid ${active ? ACC : RULE}`,
                  background: active ? ACC + '0D' : WHITE,
                  cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                  transition: 'all .15s',
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{opt.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13.5, color: active ? INK : MUTE, fontWeight: active ? 500 : 400 }}>{opt.label}</p>
                  <p style={{ fontSize: 11.5, color: MUTE, marginTop: 2 }}>{opt.desc}</p>
                </div>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                  border: `2px solid ${active ? ACC : RULE}`,
                  background: active ? ACC : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {active && <div style={{ width: 6, height: 6, borderRadius: '50%', background: WHITE }} />}
                </div>
              </button>
            )
          })}
        </div>
      </Field>

      {/* Contact info reminder */}
      {(data.rsvp_mode === 'contact' || data.rsvp_mode === 'both') && !data.contact_phone && (
        <div style={{ padding: '12px 16px', border: `1px solid ${ACC}30`, background: ACC + '08', fontSize: 12.5, color: MUTE }}>
          💡 Ne pozabi dodati kontaktnih podatkov v koraku "Podrobnosti" (telefon/WhatsApp).
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Rok za RSVP">
          <TextInput type="date" value={data.rsvp_deadline} onChange={v => set('rsvp_deadline', v)} />
        </Field>
        <Field label="Pričakovano število gostov">
          <TextInput type="number" value={data.max_guests} onChange={v => set('max_guests', v)} placeholder="150" />
        </Field>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { key: 'show_countdown', label: '⏱ Pokaži countdown timer do poroke' },
          { key: 'show_gallery', label: '📸 Pokaži galerijo fotografij' },
        ].map(({ key, label }) => (
          <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '12px 14px', border: `1px solid ${RULE}`, background: WHITE }}>
            <input
              type="checkbox"
              checked={data[key as keyof WizardData] as boolean}
              onChange={e => set(key as keyof WizardData, e.target.checked)}
              style={{ width: 16, height: 16, cursor: 'pointer', accentColor: ACC }}
            />
            <span style={{ fontSize: 14, color: INK }}>{label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

// ─── STEP 8: Jezik ────────────────────────────────────────────────────────────
function Step8({ data, set }: { data: WizardData; set: (k: keyof WizardData, v: unknown) => void }) {
  function handleLanguageChange(lang: string) {
    set('language', lang)
    set('labels', { ...DEFAULT_LABELS[lang] ?? DEFAULT_LABELS['sl'] })
  }
  function updateLabel(key: keyof InvitationLabels, value: string) {
    set('labels', { ...data.labels, [key]: value })
  }

  const LABEL_NAMES: Record<keyof InvitationLabels, string> = {
    together_with_families: 'Skupaj z družinami',
    save_the_date: 'Save the date',
    days: 'Dni', hours: 'Ur', minutes: 'Minut', seconds: 'Sekund',
    program: 'Program', venue: 'Prizorišče', ceremony: 'Ceremonija', reception: 'Sprejem',
    dress_code: 'Dress code', story_title: 'Naša zgodba',
    accommodation_title: 'Nastanitev', transport_title: 'Prevoz',
    gifts_title: 'Darila', faq_title: 'FAQ', contact_title: 'Kontakt',
    rsvp_title: 'RSVP naslov', rsvp_deadline_prefix: 'Rok RSVP prefix',
    attending_yes: 'Pridem', attending_no: 'Ne pridem',
    your_name: 'Ime', your_email: 'Email',
    adults: 'Odrasli', children: 'Otroci',
    menu_choice: 'Meni izbira', menu_meat: 'Meso', menu_fish: 'Ribe',
    menu_vegetarian: 'Vegetarijansko', menu_vegan: 'Vegansko',
    allergies: 'Alergije', message_label: 'Sporočilo', submit_rsvp: 'Pošlji RSVP',
    thank_you: 'Hvala', thank_you_attending: 'Prideš — zahvala', thank_you_not_attending: 'Ne prideš — zahvala',
    footer_tagline: 'Footer izrek', google_maps: 'Google Maps', add_to_calendar: 'Dodaj v kalendar',
    hashtag_label: 'Hashtag', children_welcome: 'Otroci dobrodošli',
    children_adults_only: 'Samo odrasli', children_infants_only: 'Samo dojenčki',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <SectionLabel>Jezik povabila</SectionLabel>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {LANGUAGE_OPTIONS.map(opt => (
            <button key={opt.value} type="button" onClick={() => handleLanguageChange(opt.value)}
              style={{
                padding: '10px 18px',
                border: `2px solid ${data.language === opt.value ? ACC : RULE}`,
                background: data.language === opt.value ? ACC + '15' : WHITE,
                color: data.language === opt.value ? INK : MUTE,
                fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
              }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: 12.5, color: MUTE, marginBottom: 16 }}>
          Privzeto nastavljeno glede na jezik. Vsako polje lahko spremenite po želji.
        </p>
        {LABEL_FIELD_GROUPS.map(group => (
          <div key={group.group} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: MUTE, marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${RULE}` }}>
              {group.group}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {group.fields.map(field => (
                <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 10.5, color: MUTE }}>{LABEL_NAMES[field]}</label>
                  <input value={data.labels?.[field] ?? ''} onChange={e => updateLabel(field, e.target.value)}
                    style={{ padding: '7px 10px', border: `1px solid ${RULE}`, background: WHITE, fontSize: 12.5, color: INK, outline: 'none', fontFamily: 'inherit' }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── STEP 9: Review ───────────────────────────────────────────────────────────
function Step9({ data }: { data: WizardData }) {
  const template = TEMPLATES.find(t => t.id === data.template_id)
  const rows = [
    ['Par', data.partner1_name && data.partner2_name ? `${data.partner1_name} & ${data.partner2_name}` : '—'],
    ['Datum', data.wedding_date || '—'],
    ['Template', template?.name || '—'],
    ['Prizorišče', data.venue_name || '—'],
    ['Program', data.show_program && data.timeline.length > 0 ? `${data.timeline.length} eventov` : data.show_program ? '—' : 'Skriti'],
    ['Dress code', data.show_dress_code ? (data.dress_code || '—') : 'Skriti'],
    ['Nastanitev', data.show_accommodation && data.accommodation.length > 0 ? `${data.accommodation.length} hotelov` : data.show_accommodation ? '—' : 'Skriti'],
    ['Gift registry', data.show_gift_registry && data.gift_registry.length > 0 ? `${data.gift_registry.length} linkov` : data.show_gift_registry ? '—' : 'Skriti'],
    ['FAQ', data.show_faq && data.faq.length > 0 ? `${data.faq.length} vprašanj` : data.show_faq ? '—' : 'Skriti'],
    ['RSVP rok', data.rsvp_deadline || '—'],
    ['Hashtag', data.show_hashtag ? (data.hashtag || '—') : 'Skriti'],
    ['Jezik', LANGUAGE_OPTIONS.find(l => l.value === data.language)?.label || '—'],
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p style={{ fontSize: 13, color: MUTE }}>
        Povabilo bo ustvarjeno kot osnutek. Naknadno lahko urejate vse sekcije.
      </p>
      <div style={{ border: `1px solid ${RULE}`, background: WHITE }}>
        {rows.map(([label, value], i) => (
          <div key={label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '11px 16px',
            borderBottom: i < rows.length - 1 ? `1px solid ${RULE}` : 'none',
          }}>
            <span style={{ fontSize: 12, color: MUTE }}>{label}</span>
            <span style={{ fontSize: 13, color: value === 'Skriti' ? MUTE : INK, fontWeight: value === 'Skriti' ? 400 : 500, fontStyle: value === 'Skriti' ? 'italic' : 'normal' }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
function StepIndicator({ current, total, onJump }: { current: number; total: number; onJump?: (i: number) => void }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '0 16px', maxWidth: 860, margin: '0 auto', flexWrap: 'nowrap' }}>
        {STEPS.map((s, i) => {
          const done = i < current
          const isCurrent = i === current
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', ...(i < total - 1 ? { flex: 1, maxWidth: 80 } : {}) }}>
              <div
                onClick={() => onJump?.(i)}
                title={s.label}
                style={{
                  width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                  background: isCurrent ? INK : done ? '#c8b78f' : STEP_BG,
                  color: isCurrent ? PAPER : done ? PAPER_W : STEP_FG,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 500, fontFamily: sans,
                  cursor: onJump ? 'pointer' : 'default', position: 'relative',
                  outline: isCurrent ? `2px solid ${INK}` : 'none',
                  outlineOffset: isCurrent ? 5 : 0,
                  transition: 'background .22s, color .22s',
                }}
                onMouseEnter={e => { if (!isCurrent && onJump) (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
              >
                {isCurrent && (
                  <motion.div
                    animate={{ scale: [0.85, 1.4], opacity: [0, 0.6, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                    style={{ position: 'absolute', inset: -12, borderRadius: '50%', border: `1px solid ${LINE}`, pointerEvents: 'none' }}
                  />
                )}
                {done ? <Check size={13} /> : i + 1}
              </div>
              {i < total - 1 && (
                <div style={{ flex: 1, height: 1, background: done ? '#c8b78f' : LINE, margin: '0 6px' }} />
              )}
            </div>
          )
        })}
      </div>
      <div style={{ textAlign: 'center', marginTop: 20, fontFamily: fran, fontStyle: 'italic', fontWeight: 300, fontSize: 14, color: INK_MUTE }}>
        {STEPS[current]?.label ?? ''}
      </div>
    </>
  )
}

// ─── Main wizard ──────────────────────────────────────────────────────────────
const STEP_TITLES = [
  'O paru',
  'Izberite dizajn',
  'Lokacija & čas',
  'Program dneva',
  'Podrobnosti',
  'Nastanitev & darila',
  'RSVP',
  'Jezik & besedilo',
  'Pregled',
]

// ─── Photo upload step (shown after invitation created) ───────────────────────
function WizardPhotoUpload({ invitationId, onFinish }: { invitationId: string; onFinish: () => void }) {
  const [photos, setPhotos] = useState<(InvitationPhoto & { url: string })[]>([])
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('invitationId', invitationId)
      const res = await fetch('/api/photos', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) { toast.error(json.error ?? 'Upload ni uspel'); break }
      setPhotos(prev => [...prev, json])
    }
    setUploading(false)
  }

  async function deletePhoto(id: string) {
    const res = await fetch(`/api/photos/${id}`, { method: 'DELETE' })
    if (res.ok) setPhotos(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p style={{ fontSize: 13, color: MUTE, lineHeight: 1.6 }}>
        Naložite fotografije za galerijo. Prva slika bo cover fotografija (prikazana na templateih z hero sliko, npr. Riviera). Fotografije lahko kadar koli spremenite v urejevalniku.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: 13, color: MUTE }}>{photos.length} fotografij</p>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', background: INK, color: CREAM,
            border: 'none', cursor: uploading ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
            opacity: uploading ? 0.7 : 1,
          }}
        >
          <Upload size={13} />
          {uploading ? 'Nalagam…' : 'Dodaj fotografije'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          style={{ display: 'none' }}
          onChange={e => handleFiles(e.target.files)}
        />
      </div>

      {photos.length === 0 ? (
        <div style={{ border: `1px dashed ${RULE}`, padding: '40px 24px', textAlign: 'center' }}>
          <ImageIcon size={28} style={{ color: MUTE, marginBottom: 10 }} />
          <p style={{ fontSize: 13, color: MUTE }}>Še ni fotografij. Kliknite "Dodaj fotografije" ali preskočite.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {photos.map((photo, i) => (
            <div key={photo.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', border: `1px solid ${RULE}`, background: WHITE }}>
              <img src={photo.url} alt="" style={{ width: 48, height: 48, objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                {i === 0 && <span style={{ fontSize: 10, color: ACC, letterSpacing: '0.18em', textTransform: 'uppercase' }}>★ Cover</span>}
              </div>
              <button
                type="button"
                onClick={() => deletePhoto(photo.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTE, padding: 4, display: 'flex' }}
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 24, borderTop: `1px solid ${RULE}` }}>
        <button
          type="button"
          onClick={onFinish}
          style={{ padding: '10px 20px', border: `1px solid ${RULE}`, background: 'transparent', color: MUTE, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Preskoči
        </button>
        <button
          type="button"
          onClick={onFinish}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 28px', background: INK, color: CREAM, border: 'none', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Zaključi
          <Check size={14} />
        </button>
      </div>
    </div>
  )
}

export function InvitationWizard() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<WizardData>(DEFAULT)
  const [submitting, setSubmitting] = useState(false)
  const [uploadStep, setUploadStep] = useState(false)
  const [createdId, setCreatedId] = useState<string | null>(null)
  const router = useRouter()

  function set(key: keyof WizardData, value: unknown) {
    setData(prev => ({ ...prev, [key]: value }))
  }

  function canProceed() {
    if (step === 0) return data.partner1_name.trim() && data.partner2_name.trim() && data.wedding_date
    if (step === 1) return data.template_id !== ''
    return true
  }

  async function submit() {
    setSubmitting(true)
    try {
      const res = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          max_guests: data.max_guests ? parseInt(data.max_guests) : undefined,
          package: 'signature', // TODO: set to 'essential' when Stripe is live; Stripe webhook upgrades package after payment
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error)
      toast.success('Povabilo ustvarjeno!')
      setCreatedId(result.id)
      setUploadStep(true)
    } catch (e) {
      toast.error((e as Error).message || 'Napaka')
    } finally {
      setSubmitting(false)
    }
  }

  const stepProps = { data, set }

  const stepHeader = (
    <div style={{ marginBottom: 0 }}>
      <div style={{ fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase', color: ACC, fontWeight: 500, fontFamily: sans }}>
        Korak {step + 1} / {STEPS.length}
      </div>
      <h2 style={{ fontFamily: fran, fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(36px,4vw,54px)', lineHeight: 1.05, letterSpacing: '-.015em', marginTop: 10, color: INK }}>
        {STEP_TITLES[step]}
      </h2>
      <div style={{ height: 1, background: LINE_SOFT, margin: '32px 0 28px' }} />
    </div>
  )

  const stepContent = (
    <div>
      {step === 0 && <Step1 {...stepProps} />}
      {step === 1 && <Step2 {...stepProps} />}
      {step === 2 && <Step3 {...stepProps} />}
      {step === 3 && <Step4 {...stepProps} />}
      {step === 4 && <Step5 {...stepProps} />}
      {step === 5 && <Step6 {...stepProps} />}
      {step === 6 && <Step7 {...stepProps} />}
      {step === 7 && <Step8 {...stepProps} />}
      {step === 8 && <Step9 data={data} />}
    </div>
  )

  const navButtons = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, paddingTop: 24, borderTop: `1px solid ${LINE_SOFT}` }}>
      <button type="button" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
        style={{
          padding: '13px 22px', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 500,
          border: `1px solid ${LINE}`, color: step === 0 ? INK_FAINT : INK_MUTE, background: PAPER,
          cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.4 : 1,
          fontFamily: sans, borderRadius: 2, transition: 'all .15s',
        }}
        onMouseEnter={e => { if (step > 0) { (e.currentTarget).style.borderColor = INK; (e.currentTarget).style.color = INK } }}
        onMouseLeave={e => { (e.currentTarget).style.borderColor = LINE; (e.currentTarget).style.color = step === 0 ? INK_FAINT : INK_MUTE }}
      >
        ‹ Nazaj
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {step >= 3 && step <= 6 && (
          <button type="button" onClick={() => setStep(s => s + 1)}
            style={{ padding: '13px 18px', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', border: 'none', background: 'transparent', color: INK_MUTE, cursor: 'pointer', fontFamily: sans }}>
            Preskoči
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={() => canProceed() && setStep(s => s + 1)} disabled={!canProceed()}
            style={{
              padding: '13px 28px', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 500,
              border: 'none', background: canProceed() ? INK : LINE, color: canProceed() ? PAPER : INK_MUTE,
              cursor: canProceed() ? 'pointer' : 'not-allowed', fontFamily: sans, borderRadius: 2, transition: 'background .15s',
            }}
            onMouseEnter={e => { if (canProceed()) (e.currentTarget.style.background = '#000') }}
            onMouseLeave={e => { (e.currentTarget.style.background = canProceed() ? INK : LINE) }}
          >
            Naprej ›
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={submitting}
            style={{
              padding: '13px 28px', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 500,
              border: 'none', background: submitting ? INK_MUTE : ACC, color: PAPER,
              cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: sans, borderRadius: 2, transition: 'background .15s',
            }}
            onMouseEnter={e => { if (!submitting) (e.currentTarget.style.background = '#83572d') }}
            onMouseLeave={e => { (e.currentTarget.style.background = submitting ? INK_MUTE : ACC) }}
          >
            {submitting ? 'Ustvarjam…' : 'Ustvari povabilo'}
          </button>
        )}
      </div>
    </div>
  )

  if (uploadStep && createdId) {
    return (
      <div style={{ fontFamily: sans }}>
        <div style={{ textAlign: 'center', padding: '36px 24px 8px', borderBottom: `1px solid ${LINE}`, marginBottom: 0 }}>
          <div style={{ fontFamily: fran, fontWeight: 300, fontStyle: 'italic', fontSize: 30, color: INK }}>najindan</div>
          <div style={{ marginTop: 6, fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: INK_MUTE, fontFamily: sans }}>Ustvari povabilo</div>
          <div style={{ width: 64, height: 1, background: INK, margin: '18px auto 0' }} />
        </div>
        <div style={{ maxWidth: 760, margin: '28px auto 60px', padding: '0 4px' }}>
          <div style={{ background: PAPER, border: `1px solid ${LINE}`, boxShadow: SHADOW, padding: '52px 60px 44px' }}>
            <div style={{ fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase', color: ACC, fontWeight: 500, fontFamily: sans }}>Zadnji korak</div>
            <h2 style={{ fontFamily: fran, fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(36px,4vw,54px)', lineHeight: 1.05, marginTop: 10, color: INK }}>Dodajte fotografije</h2>
            <div style={{ height: 1, background: LINE_SOFT, margin: '32px 0 28px' }} />
            <WizardPhotoUpload invitationId={createdId} onFinish={() => router.push(`/dashboard/${createdId}`)} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: sans }}>
      {/* Topbar */}
      <div style={{ textAlign: 'center', padding: '36px 24px 8px', position: 'relative', borderBottom: `1px solid ${LINE}`, marginBottom: 0 }}>
        <a href="/dashboard" style={{ position: 'absolute', left: 32, top: 46, display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: INK_MUTE, fontFamily: sans, textDecoration: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.color = INK)} onMouseLeave={e => (e.currentTarget.style.color = INK_MUTE)}>
          ← Nadzorna plošča
        </a>
        <div style={{ fontFamily: fran, fontWeight: 300, fontStyle: 'italic', fontSize: 30, letterSpacing: '.005em', color: INK }}>
          najindan
        </div>
        <div style={{ marginTop: 6, fontSize: 11, letterSpacing: '.32em', textTransform: 'uppercase', color: INK_MUTE, fontFamily: sans }}>
          Ustvari povabilo
        </div>
        <div style={{ width: 64, height: 1, background: INK, margin: '18px auto 0' }} />
      </div>

      {/* Stepper */}
      <div style={{ padding: '32px 24px 0' }}>
        <StepIndicator current={step} total={STEPS.length} onJump={i => { if (i < step) setStep(i) }} />
      </div>

      {/* Card area */}
      <div style={{ maxWidth: 760, margin: '28px auto 60px', padding: '0 4px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.2, 0.6, 0.2, 1] }}
            style={{ background: PAPER, border: `1px solid ${LINE}`, boxShadow: SHADOW, padding: '52px 60px 44px' }}
          >
            {stepHeader}
            {stepContent}
            {navButtons}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
