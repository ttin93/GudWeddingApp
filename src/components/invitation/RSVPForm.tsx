'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Check, X, Users, UtensilsCrossed, MessageSquare, Mail, Baby, User } from 'lucide-react'
import type { Package, RSVPResponse } from '@/types'
import type { InvitationLabels } from '@/lib/utils/labels'

const MENU_OPTIONS = ['meat', 'fish', 'vegetarian', 'vegan'] as const
type MenuOption = typeof MENU_OPTIONS[number]

const schema = z.object({
  guest_name: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  attending: z.boolean(),
  adults: z.coerce.number().int().min(1).max(20).default(1),
  children: z.coerce.number().int().min(0).max(20).default(0),
  children_ages: z.string().max(100).optional(),
  menu_choice: z.enum(['meat', 'fish', 'vegetarian', 'vegan']).optional(),
  allergies: z.string().max(300).optional(),
  message: z.string().max(600).optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  invitationId: string
  packageType: Package
  accentColor?: string
  bgColor?: string
  textColor?: string
  mutedColor?: string
  labels?: Partial<InvitationLabels>
  onSubmit?: (data: FormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

const MENU_ICONS: Record<string, string> = { meat: '🥩', fish: '🐟', vegetarian: '🥗', vegan: '🌱' }
const MENU_SL: Record<string, string> = { meat: 'Meso', fish: 'Ribe', vegetarian: 'Vegetarijansko', vegan: 'Vegansko' }

function ConfirmationCard({
  data,
  guestMenus,
  accentColor,
  bgColor,
  textColor,
  mutedColor,
  labels,
}: {
  data: FormData
  guestMenus: Array<{ label: string; menu: string }>
  accentColor: string
  bgColor: string
  textColor: string
  mutedColor: string
  labels: Partial<InvitationLabels>
}) {
  const totalGuests = data.adults + (data.children ?? 0)

  return (
    <div style={{ textAlign: 'center', padding: '8px 0' }}>
      {/* Icon */}
      <div style={{
        width: 64, height: 64, borderRadius: '50%', margin: '0 auto 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: data.attending ? accentColor + '18' : accentColor + '08',
        border: `2px solid ${data.attending ? accentColor + '40' : accentColor + '20'}`,
      }}>
        {data.attending
          ? <Check size={28} style={{ color: accentColor }} strokeWidth={2.5} />
          : <X size={28} style={{ color: mutedColor }} strokeWidth={2.5} />
        }
      </div>

      {/* Thank you */}
      <h3 style={{
        fontFamily: 'var(--font-cormorant), Georgia, serif',
        fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
        fontWeight: 300,
        color: textColor,
        marginBottom: 6,
        fontStyle: 'italic',
      }}>
        {labels.thank_you ?? 'Hvala!'}
      </h3>

      {data.attending ? (
        <>
          {/* Guest info card */}
          <div style={{
            margin: '24px auto 0',
            maxWidth: 340,
            border: `1px solid ${accentColor}30`,
            background: accentColor + '08',
            padding: '20px 24px',
            textAlign: 'left',
          }}>
            {/* Name + guest count */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              marginBottom: 14, paddingBottom: 14,
              borderBottom: `1px solid ${accentColor}20`,
            }}>
              <div>
                <p style={{ fontSize: 16, fontWeight: 500, color: textColor, fontFamily: 'var(--font-cormorant), Georgia, serif', fontStyle: 'italic' }}>
                  {data.guest_name}
                </p>
                {data.email && (
                  <p style={{ fontSize: 11.5, color: mutedColor, marginTop: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Mail size={10} /> {data.email}
                  </p>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontSize: 13, color: accentColor, fontWeight: 500,
                }}>
                  <Users size={13} />
                  {totalGuests} {totalGuests === 1 ? 'gost' : totalGuests < 5 ? 'gosti' : 'gostov'}
                </div>
              </div>
            </div>

            {/* Adults / children breakdown */}
            <div style={{ display: 'flex', gap: 16, marginBottom: guestMenus.length > 0 || data.menu_choice || data.children_ages ? 14 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: textColor }}>
                <User size={13} style={{ color: accentColor }} />
                <span>{data.adults} {data.adults === 1 ? 'odrasli' : 'odrasli'}</span>
              </div>
              {(data.children ?? 0) > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: textColor }}>
                  <Baby size={13} style={{ color: accentColor }} />
                  <span>{data.children} {data.children === 1 ? 'otrok' : 'otroci'}</span>
                  {data.children_ages && (
                    <span style={{ color: mutedColor, fontSize: 12 }}>({data.children_ages})</span>
                  )}
                </div>
              )}
            </div>

            {/* Menu — per-person or single */}
            {(guestMenus.length > 0 || data.menu_choice) && (
              <div style={{ paddingTop: 14, borderTop: `1px solid ${accentColor}20` }}>
                {guestMenus.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {guestMenus.map((gm, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: textColor }}>
                        <UtensilsCrossed size={12} style={{ color: accentColor, flexShrink: 0 }} />
                        <span style={{ color: mutedColor, minWidth: 60 }}>{gm.label}:</span>
                        <span>{MENU_ICONS[gm.menu] ?? ''} {MENU_SL[gm.menu] ?? gm.menu}</span>
                      </div>
                    ))}
                  </div>
                ) : data.menu_choice ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: textColor }}>
                    <UtensilsCrossed size={13} style={{ color: accentColor }} />
                    <span>{MENU_ICONS[data.menu_choice]} {MENU_SL[data.menu_choice]}</span>
                  </div>
                ) : null}
              </div>
            )}

            {/* Allergies */}
            {data.allergies && (
              <div style={{ marginTop: 10, fontSize: 12, color: mutedColor, fontStyle: 'italic' }}>
                ⚠️ {data.allergies}
              </div>
            )}

            {/* Message */}
            {data.message && (
              <div style={{
                marginTop: 14, paddingTop: 14,
                borderTop: `1px solid ${accentColor}20`,
                display: 'flex', gap: 8, fontSize: 13, color: textColor,
              }}>
                <MessageSquare size={13} style={{ color: accentColor, marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontStyle: 'italic' }}>"{data.message}"</span>
              </div>
            )}
          </div>

          <p style={{ fontSize: 13, color: mutedColor, marginTop: 20 }}>
            {labels.thank_you_attending ?? 'Veselimo se vašega obiska.'}
          </p>
        </>
      ) : (
        <p style={{ fontSize: 14, color: mutedColor, marginTop: 12 }}>
          {labels.thank_you_not_attending ?? 'Žal nam je, da ne boste prisotni.'}
        </p>
      )}
    </div>
  )
}

export function RSVPForm({
  invitationId,
  packageType,
  accentColor = '#8B6B4A',
  bgColor = '#FAFAF8',
  textColor = '#1A1714',
  mutedColor = '#8C7B6B',
  labels = {},
  onSubmit,
  existingRSVP,
}: Props) {
  const [submitted, setSubmitted] = useState(!!existingRSVP)
  const [attending, setAttending] = useState<boolean | null>(existingRSVP?.attending ?? null)
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)
  const [guestMenus, setGuestMenus] = useState<Array<{ label: string; menu: string }>>([])
  const [submittedMenus, setSubmittedMenus] = useState<Array<{ label: string; menu: string }>>([])

  const isEleganceOrAbove = packageType === 'elegance' || packageType === 'signature'
  const isSignature = packageType === 'signature'

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues: {
      attending: existingRSVP?.attending ?? true,
      adults: existingRSVP?.adults ?? 1,
      children: existingRSVP?.children ?? 0,
    },
  })

  const adultsVal = watch('adults') ?? 1
  const childrenVal = watch('children') ?? 0
  const showPerPersonMenu = isEleganceOrAbove && attending && adultsVal > 1

  function setGuestMenu(idx: number, menu: string) {
    setGuestMenus(prev => {
      const next = [...prev]
      next[idx] = { label: `Gost ${idx + 1}`, menu }
      return next
    })
  }

  function ensureGuestMenus(count: number) {
    setGuestMenus(prev => {
      const next = Array.from({ length: count }, (_, i) => prev[i] ?? { label: `Gost ${i + 1}`, menu: '' })
      return next
    })
  }

  async function submit(data: FormData) {
    try {
      const menus = showPerPersonMenu ? guestMenus : []
      if (onSubmit) {
        await onSubmit(data)
      } else {
        const res = await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            invitation_id: invitationId,
            guest_menus: menus.length > 0 ? menus : undefined,
          }),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Napaka')
        }
      }
      setSubmittedMenus(showPerPersonMenu ? guestMenus : [])
      setSubmittedData(data)
      setSubmitted(true)
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  if (submitted && submittedData) {
    return <ConfirmationCard data={submittedData} guestMenus={submittedMenus} accentColor={accentColor} bgColor={bgColor} textColor={textColor} mutedColor={mutedColor} labels={labels} />
  }

  const fieldStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    border: `1px solid ${accentColor}35`,
    background: bgColor,
    fontSize: 14, color: textColor,
    outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color .15s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 10, letterSpacing: '0.25em',
    textTransform: 'uppercase', color: mutedColor, marginBottom: 6,
  }

  return (
    <form onSubmit={handleSubmit(submit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Attending toggle */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { value: true, label: labels.attending_yes ?? 'Pridem', icon: '✓' },
          { value: false, label: labels.attending_no ?? 'Ne morem priti', icon: '✗' },
        ].map(({ value, label, icon }) => (
          <button
            key={String(value)}
            type="button"
            onClick={() => { setAttending(value); setValue('attending', value) }}
            style={{
              padding: '14px 16px',
              border: `2px solid ${attending === value ? accentColor : accentColor + '25'}`,
              background: attending === value ? accentColor + '12' : 'transparent',
              color: attending === value ? textColor : mutedColor,
              fontSize: 13, letterSpacing: '0.05em', cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all .15s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <span style={{ opacity: attending === value ? 1 : 0.4 }}>{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {attending !== null && (
        <>
          {/* Name */}
          <div>
            <label style={labelStyle}>{labels.your_name ?? 'Ime in priimek'}</label>
            <input
              {...register('guest_name')}
              placeholder="Dragovan"
              style={{ ...fieldStyle, ...(errors.guest_name ? { borderColor: '#C05050' } : {}) }}
            />
            {errors.guest_name && <p style={{ fontSize: 11, color: '#C05050', marginTop: 4 }}>Obvezno polje</p>}
          </div>

          {/* Email */}
          <div>
            <label style={labelStyle}>{labels.your_email ?? 'E-naslov (opcijsko)'}</label>
            <input
              {...register('email')}
              type="email"
              placeholder="dragovan@email.com"
              style={fieldStyle}
            />
          </div>

          {/* Guests */}
          {attending && (
            <div>
              <label style={labelStyle}>{labels.adults ?? 'Število gostov'}</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ ...labelStyle, fontSize: 9, display: 'flex', alignItems: 'center', gap: 5 }}><User size={10} style={{ color: accentColor }} /> {labels.adults ?? 'Odrasli'}</label>
                  <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${accentColor}35`, background: bgColor }}>
                    <button type="button"
                      onClick={() => { const v = Math.max(1, adultsVal - 1); setValue('adults', v); ensureGuestMenus(v) }}
                      style={{ padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: mutedColor }}>−</button>
                    <span style={{ flex: 1, textAlign: 'center', fontSize: 16, color: textColor }}>{adultsVal}</span>
                    <button type="button"
                      onClick={() => { const v = Math.min(20, adultsVal + 1); setValue('adults', v); ensureGuestMenus(v) }}
                      style={{ padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: mutedColor }}>+</button>
                  </div>
                </div>
                <div>
                  <label style={{ ...labelStyle, fontSize: 9, display: 'flex', alignItems: 'center', gap: 5 }}><Baby size={10} style={{ color: accentColor }} /> {labels.children ?? 'Otroci'}</label>
                  <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${accentColor}35`, background: bgColor }}>
                    <button type="button"
                      onClick={() => setValue('children', Math.max(0, childrenVal - 1))}
                      style={{ padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: mutedColor }}>−</button>
                    <span style={{ flex: 1, textAlign: 'center', fontSize: 16, color: textColor }}>{childrenVal}</span>
                    <button type="button"
                      onClick={() => setValue('children', Math.min(20, childrenVal + 1))}
                      style={{ padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: mutedColor }}>+</button>
                  </div>
                </div>
              </div>

              {/* Children ages */}
              {childrenVal > 0 && (
                <div style={{ marginTop: 10 }}>
                  <label style={{ ...labelStyle, fontSize: 9 }}>Starost otrok</label>
                  <input
                    {...register('children_ages')}
                    placeholder="npr. 5 in 8 let"
                    style={{ ...fieldStyle, fontSize: 13 }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Menu */}
          {attending && isEleganceOrAbove && (
            <div>
              <label style={labelStyle}>{labels.menu_choice ?? 'Izbira menija'}</label>

              {showPerPersonMenu ? (
                // Per-person menu pickers
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {Array.from({ length: adultsVal }, (_, i) => (
                    <div key={i}>
                      <p style={{ fontSize: 11, color: accentColor, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
                        Gost {i + 1}
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                        {([
                          { val: 'meat', label: labels.menu_meat ?? 'Meso', emoji: '🥩' },
                          { val: 'fish', label: labels.menu_fish ?? 'Ribe', emoji: '🐟' },
                          { val: 'vegetarian', label: labels.menu_vegetarian ?? 'Vegetarijansko', emoji: '🥗' },
                          { val: 'vegan', label: labels.menu_vegan ?? 'Vegansko', emoji: '🌱' },
                        ] as const).map(({ val, label, emoji }) => {
                          const selected = guestMenus[i]?.menu === val
                          return (
                            <button key={val} type="button"
                              onClick={() => setGuestMenu(i, val)}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '9px 12px', cursor: 'pointer',
                                border: `1px solid ${selected ? accentColor : accentColor + '25'}`,
                                background: selected ? accentColor + '12' : bgColor,
                                fontSize: 12.5, color: selected ? textColor : mutedColor,
                                fontFamily: 'inherit', transition: 'all .12s',
                              }}>
                              <span>{emoji}</span>
                              <span>{label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Single menu picker
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {([
                    { val: 'meat', label: labels.menu_meat ?? 'Meso', emoji: '🥩' },
                    { val: 'fish', label: labels.menu_fish ?? 'Ribe', emoji: '🐟' },
                    { val: 'vegetarian', label: labels.menu_vegetarian ?? 'Vegetarijansko', emoji: '🥗' },
                    { val: 'vegan', label: labels.menu_vegan ?? 'Vegansko', emoji: '🌱' },
                  ] as const).map(({ val, label, emoji }) => (
                    <label key={val} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '11px 14px', border: `1px solid ${accentColor}25`,
                      cursor: 'pointer', fontSize: 13, color: textColor,
                      background: bgColor,
                    }}>
                      <input type="radio" value={val} {...register('menu_choice')}
                        style={{ accentColor, width: 14, height: 14 }} />
                      <span>{emoji} {label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Allergies */}
          {isEleganceOrAbove && (
            <div>
              <label style={labelStyle}>{labels.allergies ?? 'Alergije / posebne zahteve (opcijsko)'}</label>
              <textarea
                {...register('allergies')}
                rows={2}
                placeholder="Laktozna intoleranca, oreški..."
                style={{ ...fieldStyle, resize: 'none', lineHeight: 1.5 }}
              />
            </div>
          )}

          {/* Message */}
          {isEleganceOrAbove && (
            <div>
              <label style={labelStyle}>{labels.message_label ?? 'Sporočilo paru (opcijsko)'}</label>
              <textarea
                {...register('message')}
                rows={3}
                placeholder="Iskrene čestitke..."
                style={{ ...fieldStyle, resize: 'none', lineHeight: 1.5 }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '14px 24px',
              background: isSubmitting ? '#C4B8AF' : accentColor,
              color: '#FDFCFA',
              border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
              fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase',
              fontFamily: 'inherit',
              transition: 'background .2s',
              width: '100%',
            }}
          >
            {isSubmitting ? '…' : (labels.submit_rsvp ?? 'Pošlji potrditev')}
          </button>
        </>
      )}
    </form>
  )
}
