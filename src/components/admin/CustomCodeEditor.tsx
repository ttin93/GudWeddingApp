'use client'

import { useState, useTransition } from 'react'
import { Code2, Save, Eye, RefreshCw, ChevronDown, ChevronUp, Crown, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const INK  = '#1A1714'
const MUTE = '#6e6359'
const ACC  = '#8C5E3A'
const CREAM = '#F7F4EF'
const RULE  = '#E2DDD5'
const SOFT  = '#F4F1EC'

interface Invitation {
  id: string
  slug: string
  partner1_name: string
  partner2_name: string
  user_id: string
  package: string
  custom_css?: string | null
  custom_js?: string | null
  custom_head_html?: string | null
}

interface Props {
  invitations: Invitation[]
  filterUserId?: string
}

type Tab = 'css' | 'js' | 'head'

const tabInfo: Record<Tab, { label: string; placeholder: string; lang: string; description: string }> = {
  css: {
    label: 'Custom CSS',
    lang: 'css',
    placeholder: `/* Custom styles injected into this invitation */
.my-custom-section {
  background: linear-gradient(135deg, #f8f0e8, #f0e8e0);
  padding: 60px 24px;
  text-align: center;
}

.my-custom-section h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  color: #2C1810;
}`,
    description: 'Injected as <style> in the invitation page. Scoped to the client\'s invitation.',
  },
  js: {
    label: 'Custom JS',
    lang: 'javascript',
    placeholder: `// Custom JavaScript for this invitation
// Runs after the page loads (DOMContentLoaded)

document.addEventListener('DOMContentLoaded', function() {
  // Example: custom confetti on load
  console.log('Custom code loaded for this invitation');

  // Add custom elements, track events, etc.
  // Do not use eval() or dangerous patterns.
});`,
    description: 'Injected as <script defer> before </body>. Has access to the full DOM.',
  },
  head: {
    label: 'Head HTML',
    lang: 'html',
    placeholder: `<!-- Custom HTML injected in <head> -->
<!-- Use for: fonts, meta tags, structured data, etc. -->

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet">

<meta property="og:title" content="Custom OG title">
<meta property="og:image" content="https://your-cdn.com/custom-og.jpg">`,
    description: 'Injected in the <head> tag. Ideal for custom fonts, Open Graph meta, and structured data.',
  },
}

async function saveCustomCode(invitationId: string, css: string, js: string, headHtml: string) {
  const res = await fetch(`/api/admin/custom-code/${invitationId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ custom_css: css, custom_js: js, custom_head_html: headHtml }),
  })
  if (!res.ok) throw new Error('Failed to save')
}

function CodePanel({
  invitation,
  onSaved,
}: {
  invitation: Invitation
  onSaved: (id: string, css: string, js: string, head: string) => void
}) {
  const [activeTab, setActiveTab] = useState<Tab>('css')
  const [css, setCss] = useState(invitation.custom_css ?? '')
  const [js, setJs] = useState(invitation.custom_js ?? '')
  const [head, setHead] = useState(invitation.custom_head_html ?? '')
  const [expanded, setExpanded] = useState(false)
  const [isPending, startTransition] = useTransition()

  const hasCode = css.trim() || js.trim() || head.trim()

  function handleSave() {
    startTransition(async () => {
      try {
        await saveCustomCode(invitation.id, css, js, head)
        onSaved(invitation.id, css, js, head)
        toast.success(`Saved for ${invitation.partner1_name} & ${invitation.partner2_name}`)
      } catch {
        toast.error('Failed to save — check API route')
      }
    })
  }

  const valueMap: Record<Tab, string> = { css, js, head }
  const setterMap: Record<Tab, (v: string) => void> = { css: setCss, js: setJs, head: setHead }

  return (
    <div style={{ border: `1px solid ${RULE}`, background: CREAM, marginBottom: 16 }}>
      {/* Header */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 24px', cursor: 'pointer',
          borderBottom: expanded ? `1px solid ${RULE}` : 'none',
        }}
        onClick={() => setExpanded(e => !e)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Crown size={14} style={{ color: '#2D4A3E' }} />
          <div>
            <span style={{ fontSize: 14, color: INK }}>
              {invitation.partner1_name} &amp; {invitation.partner2_name}
            </span>
            <span style={{ fontSize: 11, color: MUTE, marginLeft: 10 }}>/invite/{invitation.slug}</span>
          </div>
          {hasCode && (
            <span style={{
              fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
              padding: '2px 7px', background: '#2D4A3E15', color: '#2D4A3E',
            }}>
              Custom code active
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            href={`/invite/${invitation.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: MUTE, textDecoration: 'none',
              padding: '5px 10px', border: `1px solid ${RULE}`,
            }}
          >
            <Eye size={11} />
            Preview
          </a>
          {expanded ? <ChevronUp size={14} style={{ color: MUTE }} /> : <ChevronDown size={14} style={{ color: MUTE }} />}
        </div>
      </div>

      {/* Editor */}
      {expanded && (
        <div style={{ padding: '0' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${RULE}` }}>
            {(Object.keys(tabInfo) as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: activeTab === tab ? INK : MUTE,
                  background: activeTab === tab ? CREAM : SOFT,
                  border: 'none',
                  borderBottom: activeTab === tab ? `2px solid ${ACC}` : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'color .15s, background .15s',
                }}
              >
                {tabInfo[tab].label}
                {valueMap[tab].trim() && (
                  <span style={{ marginLeft: 6, width: 5, height: 5, borderRadius: '50%', background: ACC, display: 'inline-block' }} />
                )}
              </button>
            ))}
          </div>

          {/* Description */}
          <div style={{ padding: '12px 20px', background: SOFT, borderBottom: `1px solid ${RULE}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle size={12} style={{ color: MUTE, flexShrink: 0 }} />
            <p style={{ fontSize: 11.5, color: MUTE }}>{tabInfo[activeTab].description}</p>
          </div>

          {/* Textarea code editor */}
          <div style={{ position: 'relative' }}>
            <textarea
              value={valueMap[activeTab]}
              onChange={e => setterMap[activeTab](e.target.value)}
              spellCheck={false}
              style={{
                width: '100%',
                minHeight: 280,
                padding: '20px 24px',
                fontFamily: '"Fira Code", "Cascadia Code", "Consolas", monospace',
                fontSize: 12.5,
                lineHeight: 1.7,
                background: '#1A1714',
                color: '#D4CFC9',
                border: 'none',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
              } as React.CSSProperties}
              placeholder={tabInfo[activeTab].placeholder}
            />
          </div>

          {/* Save button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 24px', borderTop: `1px solid ${RULE}`, gap: 12 }}>
            {hasCode && (
              <button
                onClick={() => { setCss(''); setJs(''); setHead(''); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px', border: `1px solid ${RULE}`,
                  fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: MUTE, background: 'none', cursor: 'pointer',
                }}
              >
                <RefreshCw size={12} />
                Clear all
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={isPending}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 24px',
                background: isPending ? MUTE : INK, color: CREAM,
                fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase',
                border: 'none', cursor: isPending ? 'not-allowed' : 'pointer',
                transition: 'background .15s',
              }}
            >
              {isPending ? <RefreshCw size={12} className="animate-spin" /> : <Save size={12} />}
              {isPending ? 'Saving…' : 'Save & Deploy'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function CustomCodeEditor({ invitations, filterUserId }: Props) {
  const [localInvs, setLocalInvs] = useState(invitations)

  function handleSaved(id: string, css: string, js: string, head: string) {
    setLocalInvs(prev => prev.map(inv =>
      inv.id === id ? { ...inv, custom_css: css, custom_js: js, custom_head_html: head } : inv
    ))
  }

  return (
    <div>
      <div style={{ marginBottom: 48, paddingBottom: 28, borderBottom: `1px solid ${RULE}` }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 10 }}>
          Signature clients only
        </div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 48, lineHeight: 0.95, color: INK, marginBottom: 12 }}>
          Custom Code
        </h1>
        <p style={{ fontSize: 13, color: MUTE, maxWidth: 640 }}>
          Inject custom CSS, JavaScript, and HTML head tags into a client&apos;s invitation page.
          Available only for <strong style={{ color: INK }}>Signature</strong> package clients.
          Changes are deployed immediately on save.
        </p>
        {filterUserId && (
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: MUTE }}>Filtered to user: {filterUserId.slice(0, 16)}…</span>
            <a href="/admin/custom-code" style={{ fontSize: 11, color: ACC, textDecoration: 'underline' }}>Show all</a>
          </div>
        )}
      </div>

      {/* Warning banner */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '16px 20px', background: '#FFF8E8',
        border: `1px solid #E8D68A`,
        marginBottom: 32,
      }}>
        <Code2 size={16} style={{ color: '#8C6A00', flexShrink: 0, marginTop: 1 }} />
        <div>
          <p style={{ fontSize: 12.5, color: '#5A4400', fontWeight: 500, marginBottom: 2 }}>Custom code is executed directly in the client&apos;s invitation</p>
          <p style={{ fontSize: 12, color: '#7A6020' }}>
            Verify all code before saving. JavaScript has access to the invitation DOM.
            Never inject untrusted third-party scripts or capture user input via JS.
          </p>
        </div>
      </div>

      {localInvs.length === 0 ? (
        <div style={{ border: `1px solid ${RULE}`, padding: '64px 40px', textAlign: 'center', background: CREAM }}>
          <Crown size={28} style={{ color: MUTE, marginBottom: 16, margin: '0 auto 16px' }} />
          <p style={{ fontSize: 15, color: MUTE, marginBottom: 8 }}>No Signature clients yet</p>
          <p style={{ fontSize: 13, color: MUTE }}>
            Custom code injection is available when a client purchases the Signature package.
          </p>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: MUTE, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 20, height: 1, background: MUTE, display: 'inline-block' }} />
            {localInvs.length} Signature {localInvs.length === 1 ? 'invitation' : 'invitations'}
          </div>
          {localInvs.map(inv => (
            <CodePanel key={inv.id} invitation={inv} onSaved={handleSaved} />
          ))}
        </div>
      )}
    </div>
  )
}
