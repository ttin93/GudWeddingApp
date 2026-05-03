'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  ChevronLeft, ChevronRight, Check, Plus, Trash2,
  Clock, MapPin, Heart, Gift, HelpCircle, Hotel,
  Car, Hash, Phone, Users, Music, ChevronDown, ChevronUp,
} from 'lucide-react'
import type { Invitation, TimelineEvent, AccommodationItem, GiftRegistryItem, FAQItem } from '@/types'
import { DEFAULT_LABELS, LANGUAGE_OPTIONS, LABEL_FIELD_GROUPS } from '@/lib/utils/labels'
import type { InvitationLabels } from '@/lib/utils/labels'

// ─── Colors ───────────────────────────────────────────────────────────────────
const INK   = '#1A1714'
const MUTE  = '#6e6359'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'
const SOFT  = '#F4F1EC'
const WHITE = '#FDFCFA'

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
        outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
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
        outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit',
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
        outline: 'none', cursor: 'pointer', fontFamily: 'inherit',
      }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

function SectionToggle({ label, icon: Icon, enabled, onToggle, children }: {
  label: string; icon?: React.ElementType; enabled: boolean; onToggle: () => void; children: React.ReactNode
}) {
  return (
    <div style={{ border: `1px solid ${RULE}`, marginBottom: 0 }}>
      <div
        role="button" tabIndex={0}
        onClick={onToggle} onKeyDown={e => e.key === 'Enter' && onToggle()}
        style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px',
          background: enabled ? WHITE : SOFT, cursor: 'pointer', userSelect: 'none',
          borderBottom: enabled ? `1px solid ${RULE}` : 'none',
        }}
      >
        {Icon && <Icon size={14} style={{ color: enabled ? ACC : MUTE }} />}
        <span style={{ flex: 1, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: enabled ? INK : MUTE }}>
          {label}
        </span>
        <span style={{ fontSize: 11, color: enabled ? ACC : MUTE, marginRight: 10 }}>
          {enabled ? 'Prikazano' : 'Skrito'}
        </span>
        <div style={{ width: 40, height: 22, borderRadius: 11, background: enabled ? ACC : RULE, position: 'relative', flexShrink: 0, transition: 'background .18s' }}>
          <div style={{ position: 'absolute', top: 3, left: enabled ? 19 : 3, width: 16, height: 16, borderRadius: '50%', background: WHITE, transition: 'left .18s', boxShadow: '0 1px 3px rgba(0,0,0,.18)' }} />
        </div>
      </div>
      {enabled && <div style={{ padding: '20px 16px' }}>{children}</div>}
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
    <button type="button" onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '9px 16px',
      border: `1px dashed ${RULE}`, background: 'transparent', color: MUTE,
      fontSize: 12, letterSpacing: '0.15em', cursor: 'pointer', width: '100%', justifyContent: 'center',
    }}>
      <Plus size={13} /> {label}
    </button>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '8px 10px', border: `1px solid ${RULE}`, background: WHITE,
  fontSize: 13, color: INK, outline: 'none', fontFamily: 'inherit', width: '100%',
}

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = [
  { key: 'par',        label: 'Par' },
  { key: 'lokacija',   label: 'Lokacija' },
  { key: 'program',    label: 'Program' },
  { key: 'podrobnosti',label: 'Podrobnosti' },
  { key: 'extras',     label: 'Extras' },
  { key: 'rsvp',       label: 'RSVP' },
  { key: 'jezik',      label: 'Jezik' },
]

// ─── RSVP mode ────────────────────────────────────────────────────────────────
const RSVP_MODE_OPTIONS = [
  { value: 'form',    label: 'RSVP obrazec', desc: 'Gostje izpolnijo obrazec na povabilu', icon: '📝' },
  { value: 'contact', label: 'Direkten kontakt', desc: 'Gostje vas pokličejo ali pišejo', icon: '📱' },
  { value: 'both',    label: 'Oboje', desc: 'Obrazec in kontaktni podatki', icon: '✦' },
] as const

// ─── Timeline editor ──────────────────────────────────────────────────────────
const QUICK_EMOJIS = ['💒','⛪','🥂','🎂','🍽️','🎵','💃','🎉','🌸','💍','🚗','🕯️','📸','🌙','🌅','❤️','🙏','✨']

function TimelineEditor({ events, onChange }: { events: TimelineEvent[]; onChange: (e: TimelineEvent[]) => void }) {
  function add() { onChange([...events, { time: '', title: '', description: '', emoji: '✨' }]) }
  function update(i: number, field: keyof TimelineEvent, value: string) {
    onChange(events.map((e, idx) => idx === i ? { ...e, [field]: value } : e))
  }
  function remove(i: number) { onChange(events.filter((_, idx) => idx !== i)) }
  function move(i: number, dir: -1 | 1) {
    const next = [...events]
    const j = i + dir
    if (j < 0 || j >= next.length) return
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {events.map((event, i) => (
        <div key={i} style={{ border: `1px solid ${RULE}`, background: WHITE, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontSize: 22, lineHeight: 1, paddingTop: 6 }}>{event.emoji || '✨'}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, width: 200, marginTop: 4 }}>
                {QUICK_EMOJIS.map(em => (
                  <button key={em} type="button" onClick={() => update(i, 'emoji', em)}
                    style={{ fontSize: 16, padding: '2px 3px', border: `1px solid ${event.emoji === em ? ACC : 'transparent'}`, background: 'transparent', cursor: 'pointer', borderRadius: 3 }}>
                    {em}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8 }}>
                <input type="time" value={event.time} onChange={e => update(i, 'time', e.target.value)}
                  style={{ padding: '8px 10px', border: `1px solid ${RULE}`, background: WHITE, fontSize: 13, color: INK, outline: 'none', fontFamily: 'inherit' }} />
                <input value={event.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Prihod gostov"
                  style={{ padding: '8px 10px', border: `1px solid ${RULE}`, background: WHITE, fontSize: 13, color: INK, outline: 'none', fontFamily: 'inherit' }} />
              </div>
              <input value={event.description ?? ''} onChange={e => update(i, 'description', e.target.value)} placeholder="Opis (opcijsko)"
                style={{ padding: '8px 10px', border: `1px solid ${RULE}`, background: SOFT, fontSize: 12.5, color: INK, outline: 'none', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
              <button type="button" onClick={() => move(i, -1)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: MUTE }}><ChevronUp size={14} /></button>
              <button type="button" onClick={() => move(i, 1)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: MUTE }}><ChevronDown size={14} /></button>
              <button type="button" onClick={() => remove(i)} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: '#C0504A' }}><Trash2 size={14} /></button>
            </div>
          </div>
        </div>
      ))}
      <AddButton onClick={add} label="Dodaj event v program" />
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
interface EditorState {
  partner1_name: string; partner2_name: string; wedding_date: string
  story: string; show_story: boolean
  personal_message: string
  venue_name: string; venue_address: string; ceremony_time: string; reception_time: string
  timeline: TimelineEvent[]; show_program: boolean
  dress_code: string; show_dress_code: boolean
  children_policy: string; show_children_policy: boolean
  hashtag: string; show_hashtag: boolean
  contact_name: string; contact_phone: string; contact_email: string; show_contact: boolean
  music_playlist_url: string; show_music: boolean
  transport_notes: string; show_transport: boolean
  accommodation: AccommodationItem[]; show_accommodation: boolean
  gift_registry: GiftRegistryItem[]; show_gift_registry: boolean
  faq: FAQItem[]; show_faq: boolean
  rsvp_mode: 'form' | 'contact' | 'both'
  rsvp_deadline: string; max_guests: string
  show_countdown: boolean; show_gallery: boolean
  language: string; labels: InvitationLabels
}

function invToState(inv: Invitation): EditorState {
  const lang = inv.languages?.[0] ?? 'sl'
  const defaults = DEFAULT_LABELS[lang] ?? DEFAULT_LABELS['sl']
  return {
    partner1_name: inv.partner1_name ?? '',
    partner2_name: inv.partner2_name ?? '',
    wedding_date: inv.wedding_date ?? '',
    story: inv.story ?? '',
    show_story: inv.show_story ?? true,
    personal_message: inv.personal_message ?? '',
    venue_name: inv.venue_name ?? '',
    venue_address: inv.venue_address ?? '',
    ceremony_time: inv.ceremony_time ?? '',
    reception_time: inv.reception_time ?? '',
    timeline: inv.timeline ?? [],
    show_program: inv.show_program ?? true,
    dress_code: inv.dress_code ?? '',
    show_dress_code: inv.show_dress_code ?? true,
    children_policy: inv.children_policy ?? '',
    show_children_policy: inv.show_children_policy ?? true,
    hashtag: inv.hashtag ?? '',
    show_hashtag: inv.show_hashtag ?? false,
    contact_name: inv.contact_name ?? '',
    contact_phone: inv.contact_phone ?? '',
    contact_email: inv.contact_email ?? '',
    show_contact: inv.show_contact ?? false,
    music_playlist_url: inv.music_playlist_url ?? '',
    show_music: inv.show_music ?? false,
    transport_notes: inv.transport_notes ?? '',
    show_transport: inv.show_transport ?? false,
    accommodation: inv.accommodation ?? [],
    show_accommodation: inv.show_accommodation ?? false,
    gift_registry: inv.gift_registry ?? [],
    show_gift_registry: inv.show_gift_registry ?? false,
    faq: inv.faq ?? [],
    show_faq: inv.show_faq ?? false,
    rsvp_mode: inv.rsvp_mode ?? 'form',
    rsvp_deadline: inv.rsvp_deadline ?? '',
    max_guests: inv.max_guests ? String(inv.max_guests) : '',
    show_countdown: inv.show_countdown ?? true,
    show_gallery: inv.show_gallery ?? true,
    language: lang,
    labels: { ...defaults, ...(inv.labels as Partial<InvitationLabels> ?? {}) },
  }
}

export function InvitationEditor({ invitation }: { invitation: Invitation }) {
  const [tab, setTab] = useState(0)
  const [data, setData] = useState<EditorState>(() => invToState(invitation))
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  function set<K extends keyof EditorState>(key: K, value: EditorState[K]) {
    setData(prev => ({ ...prev, [key]: value }))
  }

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
        }),
      })
      if (!res.ok) throw new Error('Failed to save')
      toast.success('Shranjeno!')
      router.refresh()
    } catch {
      toast.error('Napaka pri shranjevanju')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32, paddingBottom: 28, borderBottom: `1px solid ${RULE}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 10 }}>Uredi povabilo</div>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 40, lineHeight: 0.95, color: INK }}>
            {data.partner1_name || '—'} &amp; {data.partner2_name || '—'}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button onClick={() => router.back()}
            style={{ padding: '10px 18px', border: `1px solid ${RULE}`, background: 'transparent', color: MUTE, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
            Nazaj
          </button>
          <button onClick={save} disabled={saving}
            style={{ padding: '10px 24px', border: 'none', background: saving ? MUTE : INK, color: CREAM, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background .2s' }}>
            {saving ? 'Shranjujem…' : 'Shrani spremembe'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${RULE}`, marginBottom: 32, overflowX: 'auto' }}>
        {TABS.map((t, i) => (
          <button key={t.key} onClick={() => setTab(i)}
            style={{
              padding: '11px 20px', whiteSpace: 'nowrap',
              fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: tab === i ? INK : MUTE,
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: tab === i ? `2px solid ${INK}` : '2px solid transparent',
              marginBottom: -1, transition: 'color .15s', fontFamily: 'inherit',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >

          {/* ── Par ── */}
          {tab === 0 && (
            <>
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
              <SectionToggle label="Vaša zgodba" icon={Heart} enabled={data.show_story} onToggle={() => set('show_story', !data.show_story)}>
                <TextArea rows={4} value={data.story} onChange={v => set('story', v)} placeholder="Spoznala sva se na poletnem festivalu..." />
              </SectionToggle>
              <Field label="Osebno sporočilo gostom">
                <TextArea rows={3} value={data.personal_message} onChange={v => set('personal_message', v)} placeholder="Z veseljem vas vabimo..." />
              </Field>
            </>
          )}

          {/* ── Lokacija ── */}
          {tab === 1 && (
            <>
              <SectionLabel icon={MapPin}>Prizorišče</SectionLabel>
              <Field label="Ime prizorišča">
                <TextInput value={data.venue_name} onChange={v => set('venue_name', v)} placeholder="Grand Hotel Portorož" />
              </Field>
              <Field label="Naslov" hint="Gostje bodo dobili direkten link na Google Maps.">
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
            </>
          )}

          {/* ── Program ── */}
          {tab === 2 && (
            <SectionToggle label="Program dneva" icon={Clock} enabled={data.show_program} onToggle={() => set('show_program', !data.show_program)}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ fontSize: 13, color: MUTE }}>Dodaj vrstni red dogajanja.</p>
                <TimelineEditor events={data.timeline} onChange={v => set('timeline', v)} />
              </div>
            </SectionToggle>
          )}

          {/* ── Podrobnosti ── */}
          {tab === 3 && (
            <>
              <SectionToggle label="Dress code" icon={Heart} enabled={data.show_dress_code} onToggle={() => set('show_dress_code', !data.show_dress_code)}>
                <TextInput value={data.dress_code} onChange={v => set('dress_code', v)} placeholder="Slovesno, zemeljski toni" />
              </SectionToggle>
              <SectionToggle label="Politika otrok" enabled={data.show_children_policy} onToggle={() => set('show_children_policy', !data.show_children_policy)}>
                <Select value={data.children_policy} onChange={v => set('children_policy', v)} options={[
                  { value: '', label: '— ni navedeno —' },
                  { value: 'welcome', label: '👶 Otroci so dobrodošli' },
                  { value: 'infants_only', label: '🍼 Samo dojenčki' },
                  { value: 'adults_only', label: '🥂 Samo odrasli' },
                ]} />
              </SectionToggle>
              <SectionToggle label="Wedding hashtag" icon={Hash} enabled={data.show_hashtag} onToggle={() => set('show_hashtag', !data.show_hashtag)}>
                <TextInput value={data.hashtag} onChange={v => set('hashtag', v)} placeholder="#AnaInMarko2025" />
              </SectionToggle>
              <SectionToggle label="Glasba / Playlist" icon={Music} enabled={data.show_music} onToggle={() => set('show_music', !data.show_music)}>
                <TextInput value={data.music_playlist_url} onChange={v => set('music_playlist_url', v)} placeholder="https://open.spotify.com/playlist/..." />
              </SectionToggle>
              <SectionToggle label="Kontaktna oseba" icon={Phone} enabled={data.show_contact} onToggle={() => set('show_contact', !data.show_contact)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <Field label="Ime"><TextInput value={data.contact_name} onChange={v => set('contact_name', v)} placeholder="Maja Novak" /></Field>
                    <Field label="Telefon / WhatsApp"><TextInput value={data.contact_phone} onChange={v => set('contact_phone', v)} placeholder="+386 41 123 456" /></Field>
                  </div>
                  <Field label="Email"><TextInput type="email" value={data.contact_email} onChange={v => set('contact_email', v)} placeholder="maja@email.com" /></Field>
                </div>
              </SectionToggle>
            </>
          )}

          {/* ── Extras ── */}
          {tab === 4 && (
            <>
              <SectionToggle label="Prevoz & parkiranje" icon={Car} enabled={data.show_transport} onToggle={() => set('show_transport', !data.show_transport)}>
                <TextArea rows={3} value={data.transport_notes} onChange={v => set('transport_notes', v)} placeholder="Shuttle bus iz Ljubljane vsako uro od 14:00." />
              </SectionToggle>

              <SectionToggle label="Nastanitev" icon={Hotel} enabled={data.show_accommodation} onToggle={() => set('show_accommodation', !data.show_accommodation)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {data.accommodation.map((acc, i) => (
                    <div key={i} style={{ border: `1px solid ${RULE}`, padding: 12, background: WHITE, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12, color: MUTE }}>Hotel {i + 1}</span>
                        <button type="button" onClick={() => set('accommodation', data.accommodation.filter((_, j) => j !== i))}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0504A', padding: 2 }}><Trash2 size={13} /></button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <input value={acc.name} onChange={e => set('accommodation', data.accommodation.map((a, j) => j === i ? { ...a, name: e.target.value } : a))} placeholder="Hotel Kempinski" style={inputStyle} />
                        <input value={acc.price_range ?? ''} onChange={e => set('accommodation', data.accommodation.map((a, j) => j === i ? { ...a, price_range: e.target.value } : a))} placeholder="€€€" style={inputStyle} />
                      </div>
                      <input value={acc.address ?? ''} onChange={e => set('accommodation', data.accommodation.map((a, j) => j === i ? { ...a, address: e.target.value } : a))} placeholder="Naslov" style={inputStyle} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        <input value={acc.url ?? ''} onChange={e => set('accommodation', data.accommodation.map((a, j) => j === i ? { ...a, url: e.target.value } : a))} placeholder="https://hotel.com" style={inputStyle} />
                        <input value={acc.discount_code ?? ''} onChange={e => set('accommodation', data.accommodation.map((a, j) => j === i ? { ...a, discount_code: e.target.value } : a))} placeholder="Koda: POROKA25" style={inputStyle} />
                      </div>
                    </div>
                  ))}
                  <AddButton onClick={() => set('accommodation', [...data.accommodation, { name: '', address: '', url: '', discount_code: '', price_range: '', notes: '' }])} label="Dodaj hotel" />
                </div>
              </SectionToggle>

              <SectionToggle label="Darila / Gift registry" icon={Gift} enabled={data.show_gift_registry} onToggle={() => set('show_gift_registry', !data.show_gift_registry)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {data.gift_registry.map((g, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input value={g.name} onChange={e => set('gift_registry', data.gift_registry.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} placeholder="Zalando wishlist" style={{ ...inputStyle, flex: 1 }} />
                      <input value={g.url} onChange={e => set('gift_registry', data.gift_registry.map((x, j) => j === i ? { ...x, url: e.target.value } : x))} placeholder="https://..." style={{ ...inputStyle, flex: 2 }} />
                      <button type="button" onClick={() => set('gift_registry', data.gift_registry.filter((_, j) => j !== i))}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0504A', padding: 6, flexShrink: 0 }}><Trash2 size={13} /></button>
                    </div>
                  ))}
                  <AddButton onClick={() => set('gift_registry', [...data.gift_registry, { name: '', url: '' }])} label="Dodaj gift registry" />
                </div>
              </SectionToggle>

              <SectionToggle label="Pogosta vprašanja (FAQ)" icon={HelpCircle} enabled={data.show_faq} onToggle={() => set('show_faq', !data.show_faq)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {data.faq.map((f, i) => (
                    <div key={i} style={{ border: `1px solid ${RULE}`, padding: 12, background: WHITE }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: MUTE }}>Vprašanje {i + 1}</span>
                        <button type="button" onClick={() => set('faq', data.faq.filter((_, j) => j !== i))}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C0504A', padding: 0 }}><Trash2 size={13} /></button>
                      </div>
                      <input value={f.question} onChange={e => set('faq', data.faq.map((x, j) => j === i ? { ...x, question: e.target.value } : x))} placeholder="Ali je potrebna formalna obleka?" style={{ ...inputStyle, marginBottom: 6 }} />
                      <textarea value={f.answer} onChange={e => set('faq', data.faq.map((x, j) => j === i ? { ...x, answer: e.target.value } : x))} placeholder="Ja, prosimo za cocktail attire." rows={2} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
                    </div>
                  ))}
                  <AddButton onClick={() => set('faq', [...data.faq, { question: '', answer: '' }])} label="Dodaj vprašanje" />
                </div>
              </SectionToggle>
            </>
          )}

          {/* ── RSVP ── */}
          {tab === 5 && (
            <>
              <SectionLabel icon={Users}>RSVP nastavitve</SectionLabel>

              <Field label="Način prijave">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {RSVP_MODE_OPTIONS.map(opt => {
                    const active = data.rsvp_mode === opt.value
                    return (
                      <button key={opt.value} type="button" onClick={() => set('rsvp_mode', opt.value)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px',
                          border: `2px solid ${active ? ACC : RULE}`,
                          background: active ? ACC + '0D' : WHITE,
                          cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'all .15s',
                        }}>
                        <span style={{ fontSize: 18, flexShrink: 0 }}>{opt.icon}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 13.5, color: active ? INK : MUTE, fontWeight: active ? 500 : 400 }}>{opt.label}</p>
                          <p style={{ fontSize: 11.5, color: MUTE, marginTop: 2 }}>{opt.desc}</p>
                        </div>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${active ? ACC : RULE}`, background: active ? ACC : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {active && <div style={{ width: 6, height: 6, borderRadius: '50%', background: WHITE }} />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </Field>

              {(data.rsvp_mode === 'contact' || data.rsvp_mode === 'both') && !data.contact_phone && (
                <div style={{ padding: '12px 16px', border: `1px solid ${ACC}30`, background: ACC + '08', fontSize: 12.5, color: MUTE }}>
                  💡 Ne pozabi dodati kontaktnih podatkov v zavihku "Podrobnosti".
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
                  { key: 'show_countdown' as const, label: '⏱ Pokaži countdown timer do poroke' },
                  { key: 'show_gallery' as const, label: '📸 Pokaži galerijo fotografij' },
                ].map(({ key, label }) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '12px 14px', border: `1px solid ${RULE}`, background: WHITE }}>
                    <input type="checkbox" checked={data[key]} onChange={e => set(key, e.target.checked)}
                      style={{ width: 16, height: 16, cursor: 'pointer', accentColor: ACC }} />
                    <span style={{ fontSize: 14, color: INK }}>{label}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* ── Jezik ── */}
          {tab === 6 && (
            <>
              <Field label="Jezik povabila">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {LANGUAGE_OPTIONS.map(opt => (
                    <button key={opt.value} type="button"
                      onClick={() => { set('language', opt.value); set('labels', { ...DEFAULT_LABELS[opt.value] ?? DEFAULT_LABELS['sl'] }) }}
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
              </Field>

              <p style={{ fontSize: 12.5, color: MUTE }}>Vsako besedilo lahko prilagodite.</p>

              {LABEL_FIELD_GROUPS.map(group => (
                <div key={group.group}>
                  <div style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: MUTE, marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${RULE}` }}>
                    {group.group}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {group.fields.map(field => (
                      <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label style={{ fontSize: 10.5, color: MUTE }}>{field}</label>
                        <input value={data.labels?.[field] ?? ''} onChange={e => set('labels', { ...data.labels, [field]: e.target.value })}
                          style={{ padding: '7px 10px', border: `1px solid ${RULE}`, background: WHITE, fontSize: 12.5, color: INK, outline: 'none', fontFamily: 'inherit' }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Sticky save bar */}
      <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid ${RULE}`, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <button onClick={() => router.back()}
          style={{ padding: '11px 20px', border: `1px solid ${RULE}`, background: 'transparent', color: MUTE, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
          Nazaj
        </button>
        <button onClick={save} disabled={saving}
          style={{ padding: '11px 28px', border: 'none', background: saving ? MUTE : INK, color: CREAM, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background .2s' }}>
          {saving ? 'Shranjujem…' : 'Shrani spremembe'}
        </button>
      </div>
    </div>
  )
}
