'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TEMPLATES, type TemplateId, type Package } from '@/types'
import { cn } from '@/lib/utils/cn'

// ─── Step schemas ─────────────────────────────────────────────────────────────
const step1Schema = z.object({
  partner1_name: z.string().min(1, 'Required'),
  partner2_name: z.string().min(1, 'Required'),
  wedding_date: z.string().min(1, 'Required'),
})

const step2Schema = z.object({
  template_id: z.string().min(1, 'Please choose a template'),
})

const step3Schema = z.object({
  venue_name: z.string().optional(),
  venue_address: z.string().optional(),
  ceremony_time: z.string().optional(),
  reception_time: z.string().optional(),
  dress_code: z.string().optional(),
  personal_message: z.string().max(500).optional(),
})

const step4Schema = z.object({
  rsvp_deadline: z.string().optional(),
  max_guests: z.coerce.number().int().min(1).max(2000).optional().or(z.literal('')),
})

type WizardData = z.infer<typeof step1Schema> &
  z.infer<typeof step2Schema> &
  z.infer<typeof step3Schema> &
  z.infer<typeof step4Schema> & { package?: Package }

// ─── Step indicators ──────────────────────────────────────────────────────────
const STEPS = [
  { label: 'Couple' },
  { label: 'Style' },
  { label: 'Details' },
  { label: 'RSVP' },
  { label: 'Review' },
]

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {STEPS.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all',
            i < current ? 'bg-[#8B6B4A] text-white' :
            i === current ? 'bg-[#1C1C1C] text-white' :
            'bg-[#E8E2DA] text-[#6B6B6B]'
          )}>
            {i < current ? <Check size={14} /> : i + 1}
          </div>
          <span className={cn(
            'hidden sm:block text-xs',
            i === current ? 'text-[#1C1C1C] font-medium' : 'text-[#6B6B6B]'
          )}>{s.label}</span>
          {i < STEPS.length - 1 && (
            <div className={cn('w-8 h-px', i < current ? 'bg-[#8B6B4A]' : 'bg-[#E8E2DA]')} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Individual steps ─────────────────────────────────────────────────────────
function Step1({ form }: { form: ReturnType<typeof useForm<WizardData>> }) {
  const { register, formState: { errors } } = form
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl text-[#1C1C1C] mb-1">About the couple</h2>
        <p className="text-sm text-[#6B6B6B]">Tell us who's getting married and when.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Partner 1 name" id="p1" placeholder="Emma" error={errors.partner1_name?.message} {...register('partner1_name')} />
        <Input label="Partner 2 name" id="p2" placeholder="James" error={errors.partner2_name?.message} {...register('partner2_name')} />
      </div>
      <Input label="Wedding date" type="date" id="date" error={errors.wedding_date?.message} {...register('wedding_date')} />
    </div>
  )
}

function Step2({ form }: { form: ReturnType<typeof useForm<WizardData>> }) {
  const { setValue, watch, formState: { errors } } = form
  const selected = watch('template_id')

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl text-[#1C1C1C] mb-1">Choose your style</h2>
        <p className="text-sm text-[#6B6B6B]">Pick the template that matches your vision.</p>
      </div>
      {errors.template_id && <p className="text-sm text-red-600">{errors.template_id.message}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setValue('template_id', t.id)}
            className={cn(
              'text-left rounded-sm border-2 overflow-hidden transition-all',
              selected === t.id ? 'border-[#8B6B4A] shadow-md' : 'border-[#E8E2DA] hover:border-[#C4A882]'
            )}
          >
            <div
              className="aspect-[3/4] flex flex-col items-center justify-center p-4"
              style={{ background: t.colors.background }}
            >
              <div style={{ color: t.colors.primary, fontFamily: 'var(--font-script)', fontSize: '18px' }}>
                {t.name}
              </div>
              <div className="w-6 h-px my-2" style={{ background: t.colors.accent }} />
              <div className="text-xs" style={{ color: t.colors.textMuted }}>Wedding</div>
            </div>
            <div className="px-3 py-2 border-t border-[#E8E2DA] bg-white">
              <div className="text-xs font-medium text-[#1C1C1C]">{t.name}</div>
              <div className="text-xs text-[#6B6B6B] capitalize">{t.category}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function Step3({ form }: { form: ReturnType<typeof useForm<WizardData>> }) {
  const { register } = form
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl text-[#1C1C1C] mb-1">Wedding details</h2>
        <p className="text-sm text-[#6B6B6B]">All fields are optional — add what you have now.</p>
      </div>
      <Input label="Venue name" id="venue" placeholder="The Grand Ballroom" {...register('venue_name')} />
      <Input label="Venue address" id="addr" placeholder="123 Rose Garden, Florence" {...register('venue_address')} />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Ceremony time" type="time" id="ceremony" {...register('ceremony_time')} />
        <Input label="Reception time" type="time" id="reception" {...register('reception_time')} />
      </div>
      <Input label="Dress code" id="dress" placeholder="Black tie optional" {...register('dress_code')} />
      <Textarea
        label="Personal message to guests"
        id="msg"
        placeholder="Write something personal, or use the AI assistant ✨"
        {...register('personal_message')}
      />
    </div>
  )
}

function Step4({ form }: { form: ReturnType<typeof useForm<WizardData>> }) {
  const { register } = form
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl text-[#1C1C1C] mb-1">RSVP settings</h2>
        <p className="text-sm text-[#6B6B6B]">Set a deadline and guest limit (optional).</p>
      </div>
      <Input label="RSVP deadline" type="date" id="deadline" {...register('rsvp_deadline')} />
      <Input label="Max guests expected" type="number" id="max" placeholder="150" {...register('max_guests')} />
    </div>
  )
}

function Step5({ data }: { data: WizardData }) {
  const template = TEMPLATES.find((t) => t.id === data.template_id)
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl text-[#1C1C1C] mb-1">Ready to create?</h2>
        <p className="text-sm text-[#6B6B6B]">Here's a summary of your invitation.</p>
      </div>
      <div className="bg-[#F8F4EF] rounded-sm border border-[#E8E2DA] divide-y divide-[#E8E2DA]">
        {[
          ['Couple', `${data.partner1_name} & ${data.partner2_name}`],
          ['Date', data.wedding_date],
          ['Template', template?.name ?? data.template_id],
          ['Venue', data.venue_name || '—'],
          ['Dress code', data.dress_code || '—'],
          ['RSVP deadline', data.rsvp_deadline || '—'],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between px-4 py-3 text-sm">
            <span className="text-[#6B6B6B]">{label}</span>
            <span className="font-medium text-[#1C1C1C]">{value}</span>
          </div>
        ))}
      </div>
      <div className="bg-[#F0EBE3] rounded-sm p-4 border border-[#E8E2DA]">
        <p className="text-sm text-[#6B6B6B] flex items-start gap-2">
          <Sparkles size={16} className="text-[#8B6B4A] mt-0.5 shrink-0" />
          Your invitation will be created as a draft. You can edit everything and activate it after payment.
        </p>
      </div>
    </div>
  )
}

// Fields to validate per step
const STEP_FIELDS: Array<(keyof WizardData)[]> = [
  ['partner1_name', 'partner2_name', 'wedding_date'],
  ['template_id'],
  [],
  [],
  [],
]

// Combined schema for the full wizard
const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema)

export function InvitationWizard() {
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<WizardData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(fullSchema as any),
    mode: 'onTouched',
  })

  async function next() {
    const fields = STEP_FIELDS[step]
    const valid = fields.length > 0 ? await form.trigger(fields) : true
    if (!valid) return
    if (step < STEPS.length - 1) setStep((s) => s + 1)
  }

  async function submit() {
    setSubmitting(true)
    try {
      const values = form.getValues()
      const res = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast.success('Invitation created!')
      router.push(`/dashboard/${data.id}`)
    } catch (e) {
      toast.error((e as Error).message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const variants = {
    enter: { opacity: 0, x: 24 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="font-script text-3xl text-[#8B6B4A]">Invitia</span>
          <p className="text-sm text-[#6B6B6B] mt-1">Create your invitation</p>
        </div>

        <StepIndicator current={step} />

        <div className="bg-white border border-[#E8E2DA] rounded-sm p-8 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {step === 0 && <Step1 form={form} />}
              {step === 1 && <Step2 form={form} />}
              {step === 2 && <Step3 form={form} />}
              {step === 3 && <Step4 form={form} />}
              {step === 4 && <Step5 data={form.getValues()} />}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8 pt-6 border-t border-[#E8E2DA]">
            <Button
              variant="ghost"
              size="md"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ChevronLeft size={16} />
              Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button variant="gold" size="md" onClick={next}>
                Continue
                <ChevronRight size={16} />
              </Button>
            ) : (
              <Button variant="gold" size="md" onClick={submit} loading={submitting}>
                Create Invitation
                <Check size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
