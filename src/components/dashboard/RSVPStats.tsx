import { CheckCircle2, XCircle } from 'lucide-react'
import type { RSVPResponse } from '@/types'

const INK  = '#1A1714'
const MUTE = '#6e6359'
const ACC  = '#8C7B6B'
const RULE = '#E8E2D9'
const CREAM = '#F7F4EF'

export function RSVPStats({ responses }: { responses: RSVPResponse[] }) {
  const attending = responses.filter((r) => r.attending)
  const declined = responses.filter((r) => !r.attending)
  const totalGuests = attending.reduce((s, r) => s + r.adults + r.children, 0)
  const rate = responses.length > 0 ? Math.round((responses.length / (responses.length + 5)) * 100) : 0

  return (
    <div style={{ border: `1px solid ${RULE}`, background: '#FBFAF6' }}>
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${RULE}` }}>
        <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: MUTE }}>RSVP Summary</span>
      </div>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Attending', value: attending.length, sub: `${totalGuests} total guests`, icon: CheckCircle2, ok: true },
            { label: 'Declined', value: declined.length, sub: 'Sent regrets', icon: XCircle, ok: false },
          ].map(({ label, value, sub, icon: Icon, ok }) => (
            <div key={label} style={{ background: CREAM, border: `1px solid ${RULE}`, padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTE }}>{label}</span>
                <Icon size={13} style={{ color: ok ? '#2e7d32' : '#c0392b' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 36, lineHeight: 1, color: INK }}>{value}</div>
              <div style={{ fontSize: 11, color: MUTE, marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>

        {responses.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: MUTE, marginBottom: 6, letterSpacing: '0.08em' }}>
              <span>Response rate</span>
              <span>{rate}%</span>
            </div>
            <div style={{ height: 2, background: RULE, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: ACC, width: `${rate}%`, transition: 'width .6s ease' }} />
            </div>
          </div>
        )}

        {responses.length === 0 && (
          <p style={{ fontSize: 13, color: MUTE, textAlign: 'center', padding: '16px 0' }}>No responses yet.</p>
        )}
      </div>
    </div>
  )
}
