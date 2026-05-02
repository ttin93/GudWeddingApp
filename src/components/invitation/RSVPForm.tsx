'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import type { Package, RSVPResponse } from '@/types'

const schema = z.object({
  guest_name: z.string().min(1, 'Please enter your name'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  attending: z.boolean(),
  adults: z.coerce.number().int().min(1).max(20).default(1),
  children: z.coerce.number().int().min(0).max(20).default(0),
  menu_choice: z.enum(['meat', 'fish', 'vegetarian', 'vegan']).optional(),
  allergies: z.string().max(200).optional(),
  message: z.string().max(500).optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  invitationId: string
  packageType: Package
  accentColor?: string
  onSubmit?: (data: FormData) => Promise<void>
  existingRSVP?: RSVPResponse | null
}

export function RSVPForm({ invitationId, packageType, accentColor = '#8B6B4A', onSubmit, existingRSVP }: Props) {
  const [submitted, setSubmitted] = useState(!!existingRSVP)
  const [attending, setAttending] = useState<boolean | null>(existingRSVP?.attending ?? null)
  const isEleganceOrAbove = packageType === 'elegance' || packageType === 'signature'
  const isSignature = packageType === 'signature'

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues: {
      attending: existingRSVP?.attending ?? true,
      adults: existingRSVP?.adults ?? 1,
      children: existingRSVP?.children ?? 0,
    },
  })

  async function submit(data: FormData) {
    try {
      if (onSubmit) {
        await onSubmit(data)
      } else {
        const res = await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, invitation_id: invitationId }),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Failed to submit')
        }
      }
      setSubmitted(true)
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10 space-y-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ background: accentColor + '20' }}>
          <CheckCircle2 size={32} style={{ color: accentColor }} />
        </div>
        <h3 className="text-xl font-serif" style={{ color: '#1C1C1C' }}>
          {attending ? 'See you there!' : 'Thank you for letting us know'}
        </h3>
        <p className="text-sm" style={{ color: '#6B6B6B' }}>
          {attending
            ? "We can't wait to celebrate with you."
            : 'You will be missed. Thank you for your kind response.'}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      {/* Attending toggle */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-[#1C1C1C]">Will you be attending?</p>
        <div className="grid grid-cols-2 gap-3">
          {[{ value: true, label: '✓ Joyfully accept' }, { value: false, label: '✗ Regretfully decline' }].map(({ value, label }) => (
            <button
              key={String(value)}
              type="button"
              onClick={() => {
                setAttending(value)
                setValue('attending', value)
              }}
              className={cn(
                'py-3 px-4 rounded-sm border text-sm transition-all',
                attending === value
                  ? 'border-2 font-medium'
                  : 'border-[#E8E2DA] text-[#6B6B6B] hover:border-[#C4A882]'
              )}
              style={attending === value ? { borderColor: accentColor, color: accentColor, background: accentColor + '10' } : {}}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {attending !== null && (
        <>
          <Input
            label="Your name"
            id="name"
            placeholder="Sophie Martin"
            error={errors.guest_name?.message}
            {...register('guest_name')}
          />

          <Input
            label="Email (optional — for confirmation)"
            type="email"
            id="email"
            placeholder="sophie@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          {attending && isEleganceOrAbove && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Adults"
                type="number"
                id="adults"
                min={1}
                max={20}
                {...register('adults')}
              />
              {isSignature && (
                <Input
                  label="Children"
                  type="number"
                  id="children"
                  min={0}
                  max={20}
                  {...register('children')}
                />
              )}
            </div>
          )}

          {attending && isSignature && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1C1C1C]">Menu preference</label>
              <div className="grid grid-cols-2 gap-2">
                {(['meat', 'fish', 'vegetarian', 'vegan'] as const).map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm">
                    <input type="radio" value={opt} {...register('menu_choice')} className="accent-[#8B6B4A]" />
                    <span className="capitalize">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {isEleganceOrAbove && (
            <Textarea
              label={attending ? 'Allergies or dietary notes (optional)' : undefined}
              id="allergies"
              placeholder="Any dietary requirements..."
              className="min-h-[70px]"
              {...register('allergies')}
            />
          )}

          {isEleganceOrAbove && (
            <Textarea
              label="Message to the couple (optional)"
              id="message"
              placeholder="A warm wish or note..."
              className="min-h-[80px]"
              {...register('message')}
            />
          )}

          <Button
            type="submit"
            size="md"
            className="w-full"
            loading={isSubmitting}
            style={{ background: accentColor, color: 'white' }}
          >
            Send RSVP
          </Button>
        </>
      )}
    </form>
  )
}
