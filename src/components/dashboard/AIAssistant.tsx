'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Sparkles, X, RefreshCw, Check } from 'lucide-react'

const INK  = '#1A1714'
const MUTE = '#6e6359'
const ACC  = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE = '#E8E2D9'

type AIType = 'message' | 'schedule' | 'dresscode'
const TYPE_CONFIG: Record<AIType, { label: string; placeholder: string; hint: string }> = {
  message: { label: 'Personal message', placeholder: "We've been together 5 years, met in Florence, garden wedding theme...", hint: 'Share details about your story and what you want guests to feel.' },
  schedule: { label: 'Day schedule', placeholder: 'Ceremony at 11:00, photos at 13:00, cocktails at 15:00, dinner at 17:00...', hint: 'List your events with times and AI will format them beautifully.' },
  dresscode: { label: 'Dress code', placeholder: 'Black tie optional, garden party feel, spring colours welcome...', hint: 'Describe the vibe and AI will write an elegant description.' },
}

interface Props { onClose: () => void; invitationId: string }

export function AIAssistant({ onClose, invitationId }: Props) {
  const [type, setType] = useState<AIType>('message')
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<{ input: string }>()

  async function generate(data: { input: string }) {
    setLoading(true); setResult('')
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, input: data.input }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setResult(type === 'schedule' ? JSON.stringify(json.result, null, 2) : json.result)
    } catch (e) {
      toast.error((e as Error).message || 'Generation failed')
    } finally { setLoading(false) }
  }

  function copyResult() { navigator.clipboard.writeText(result); toast.success('Copied!') }
  const config = TYPE_CONFIG[type]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,23,20,0.7)', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 480, background: '#FBFAF6', border: `1px solid ${RULE}`, position: 'relative' }}>
        {/* Corner accents */}
        {[{ top:-4,left:-4,borderRight:'none',borderBottom:'none' },{ top:-4,right:-4,borderLeft:'none',borderBottom:'none' },{ bottom:-4,left:-4,borderRight:'none',borderTop:'none' },{ bottom:-4,right:-4,borderLeft:'none',borderTop:'none' }].map((s,i) => (
          <div key={i} style={{ position:'absolute', width:12, height:12, border:`1px solid ${ACC}`, ...s }} />
        ))}

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${RULE}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sparkles size={15} style={{ color: ACC }} />
            <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: MUTE }}>AI Writing Assistant</span>
          </div>
          <button onClick={onClose} style={{ color: MUTE, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Type selector */}
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${RULE}`, marginBottom: -1 }}>
            {(Object.keys(TYPE_CONFIG) as AIType[]).map((t) => (
              <button key={t} onClick={() => { setType(t); setResult('') }} style={{
                padding: '8px 16px',
                fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: type === t ? INK : MUTE,
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: type === t ? `2px solid ${INK}` : '2px solid transparent',
                marginBottom: -1, transition: 'color .2s',
              }}>
                {TYPE_CONFIG[t].label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(generate)} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTE }}>{config.label}</label>
              <textarea
                placeholder={config.placeholder}
                rows={4}
                {...register('input', { required: 'Please describe what you need' })}
                style={{
                  width: '100%', padding: '12px 14px',
                  background: CREAM, border: `1px solid ${errors.input ? '#c0392b' : RULE}`,
                  fontSize: 13, color: INK, fontFamily: 'var(--font-instrument)',
                  resize: 'vertical', outline: 'none', lineHeight: 1.6,
                }}
              />
              {errors.input && <span style={{ fontSize: 11, color: '#c0392b' }}>{errors.input.message}</span>}
            </div>
            <p style={{ fontSize: 12, color: MUTE, lineHeight: 1.5 }}>{config.hint}</p>
            <button type="submit" disabled={loading} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '13px 20px', width: '100%',
              background: INK, color: CREAM,
              fontFamily: 'var(--font-instrument)', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase',
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
              transition: 'background .2s',
            }}>
              <Sparkles size={13} />
              {loading ? 'Generating…' : 'Generate'}
            </button>
          </form>

          {/* Result */}
          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ background: CREAM, border: `1px solid ${RULE}`, padding: '16px' }}>
                <pre style={{ fontSize: 13, color: INK, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-instrument)', lineHeight: 1.7 }}>{result}</pre>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => handleSubmit(generate)()} style={{
                  display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px',
                  border: `1px solid ${RULE}`, background: 'none', color: MUTE,
                  fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  <RefreshCw size={12} />
                  Regenerate
                </button>
                <button onClick={copyResult} style={{
                  display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px',
                  border: `1px solid ${INK}`, background: INK, color: CREAM,
                  fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  <Check size={12} />
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
