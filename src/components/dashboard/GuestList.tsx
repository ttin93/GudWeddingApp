'use client'

import { useState } from 'react'
import { Download, Users } from 'lucide-react'
import { formatDate } from '@/lib/utils/format'
import type { RSVPResponse } from '@/types'

const INK  = '#1A1714'
const MUTE = '#6e6359'
const ACC  = '#8C7B6B'
const RULE = '#E8E2D9'
const CREAM = '#F7F4EF'

function exportCSV(responses: RSVPResponse[], filename: string) {
  const headers = ['Name', 'Email', 'Attending', 'Adults', 'Children', 'Menu', 'Allergies', 'Message', 'Date']
  const rows = responses.map((r) => [
    r.guest_name, r.email ?? '', r.attending ? 'Yes' : 'No',
    r.adults, r.children, r.menu_choice ?? '', r.allergies ?? '', r.message ?? '', formatDate(r.created_at),
  ])
  const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

interface Props { responses: RSVPResponse[]; invitationId: string }

export function GuestList({ responses, invitationId }: Props) {
  const [filter, setFilter] = useState<'all' | 'yes' | 'no'>('all')
  const filtered = responses.filter((r) => filter === 'all' ? true : filter === 'yes' ? r.attending : !r.attending)

  const tabs = [
    { key: 'all', label: `All (${responses.length})` },
    { key: 'yes', label: `Attending (${responses.filter(r => r.attending).length})` },
    { key: 'no',  label: `Declined (${responses.filter(r => !r.attending).length})` },
  ] as const

  return (
    <div style={{ border: `1px solid ${RULE}`, background: '#FBFAF6' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${RULE}` }}>
        <span style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: MUTE }}>
          Guest list ({responses.length})
        </span>
        <button
          onClick={() => exportCSV(responses, `guests-${invitationId}.csv`)}
          disabled={responses.length === 0}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '7px 14px', border: `1px solid ${RULE}`,
            fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: responses.length === 0 ? MUTE : INK,
            background: 'none', cursor: responses.length === 0 ? 'not-allowed' : 'pointer',
            opacity: responses.length === 0 ? 0.5 : 1,
            transition: 'background .2s',
          }}
        >
          <Download size={12} />
          Export CSV
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${RULE}` }}>
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              padding: '10px 20px',
              fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: filter === key ? INK : MUTE,
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: filter === key ? `2px solid ${INK}` : '2px solid transparent',
              marginBottom: -1, transition: 'color .2s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px', textAlign: 'center' }}>
          <Users size={28} style={{ color: RULE, marginBottom: 12 }} />
          <p style={{ fontSize: 13, color: MUTE }}>No responses yet.</p>
        </div>
      ) : (
        <div>
          {filtered.map((r, i) => (
            <div key={r.id} style={{
              padding: '16px 24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16,
              borderTop: i > 0 ? `1px solid ${RULE}` : 'none',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: INK }}>{r.guest_name}</span>
                  <span style={{
                    fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '2px 7px',
                    background: r.attending ? '#e8f5e9' : '#fdf0ee',
                    color: r.attending ? '#2e7d32' : '#c0392b',
                    border: `1px solid ${r.attending ? '#a5d6a7' : '#f5c6c0'}`,
                  }}>
                    {r.attending ? 'Attending' : 'Declined'}
                  </span>
                </div>
                {r.email && <p style={{ fontSize: 11.5, color: MUTE }}>{r.email}</p>}
                <div style={{ display: 'flex', gap: 16, marginTop: 4, fontSize: 11.5, color: MUTE }}>
                  {r.attending && <span>{r.adults} adult{r.adults > 1 ? 's' : ''}{r.children > 0 ? `, ${r.children} child${r.children > 1 ? 'ren' : ''}` : ''}</span>}
                  {r.menu_choice && !r.guest_menus?.length && <span>🍽 {r.menu_choice}</span>}
                </div>
                {r.guest_menus && r.guest_menus.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                    {r.guest_menus.map((gm, gi) => (
                      <span key={gi} style={{
                        fontSize: 11, padding: '2px 8px',
                        border: `1px solid ${RULE}`, color: MUTE,
                        background: '#FDFCFA',
                      }}>
                        {gm.label}: {gm.menu}
                      </span>
                    ))}
                  </div>
                )}
                {r.message && (
                  <p style={{ fontSize: 12, color: ACC, marginTop: 6, fontFamily: 'var(--font-cormorant)', fontStyle: 'italic' }}>"{r.message}"</p>
                )}
              </div>
              <span style={{ fontSize: 11, color: MUTE, flexShrink: 0, letterSpacing: '0.04em' }}>{formatDate(r.created_at)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
