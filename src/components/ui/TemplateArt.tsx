import { TEMPLATES } from '@/types'

const fraunces   = 'var(--font-fraunces), "Fraunces", Georgia, serif'
const parisienne = 'var(--font-parisienne), "Parisienne", cursive'
const limelight  = 'var(--font-limelight), "Limelight", cursive'

export function TemplateArt({ id, p1 = 'Lorena', p2 = 'Viktor' }: { id: string; p1?: string; p2?: string }) {
  switch (id) {
    case 'riviera': return (
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg,#F0E2C7,#E8C9A4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#5A2D1F', textAlign: 'center', fontFamily: fraunces, position: 'relative', padding: '20px' }}>
        <div style={{ position: 'absolute', inset: 18, border: '1px solid rgba(90,45,31,.25)' }} />
        <div style={{ fontSize: 8, letterSpacing: '.36em', textTransform: 'uppercase', marginBottom: 12, color: '#A24A2A' }}>— Wedding Invitation —</div>
        <div style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 44, lineHeight: 1.05, position: 'relative', zIndex: 2 }}>{p1}</div>
        <div style={{ fontFamily: parisienne, fontSize: 38, color: '#A24A2A', margin: '-2px 0', position: 'relative', zIndex: 2 }}>&amp;</div>
        <div style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 44, lineHeight: 1.05, position: 'relative', zIndex: 2 }}>{p2}</div>
        <div style={{ marginTop: 20, fontStyle: 'italic', fontSize: 10, letterSpacing: '.18em', color: '#7B3B22', position: 'relative', zIndex: 2 }}>12 · 09 · 2026 · Portorož</div>
      </div>
    )
    case 'coastal': return (
      <div style={{ width: '100%', height: '100%', background: '#EBE6DC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '20px 18px 48px', textAlign: 'center', color: '#3F4A3A', fontFamily: fraunces, position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '38%', maxWidth: 130, color: '#7B8568', opacity: .85 }} viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
          <path d="M50 58 V20"/><path d="M50 30 C40 25 30 24 25 18 C30 22 40 26 50 28"/><path d="M50 26 C60 21 70 20 75 14 C70 18 60 22 50 24"/><ellipse cx="50" cy="14" rx="6" ry="9"/><ellipse cx="46" cy="13" rx="3" ry="5" transform="rotate(-25 46 13)"/><ellipse cx="54" cy="13" rx="3" ry="5" transform="rotate(25 54 13)"/>
        </svg>
        <div style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 32, color: '#3F4A3A', lineHeight: 1.1, position: 'relative', zIndex: 2 }}>{p1}<span style={{ display: 'block' }}>&amp; {p2}</span></div>
        <div style={{ fontSize: 8, letterSpacing: '.32em', textTransform: 'uppercase', marginTop: 28, color: '#9B6B7A', position: 'relative', zIndex: 2 }}>— Save the Date —</div>
        <div style={{ fontFamily: parisienne, fontSize: 18, color: '#9B6B7A', marginTop: 6, position: 'relative', zIndex: 2 }}>12 · 09 · 26</div>
      </div>
    )
    case 'darkgrid': return (
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg,#0E0C09,#1B1611)', position: 'relative', overflow: 'hidden', color: '#E5D2A8', fontFamily: fraunces, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px 18px' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(229,210,168,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(229,210,168,.06) 1px,transparent 1px)`, backgroundSize: '32px 32px' }} />
        <div style={{ fontSize: 7.5, letterSpacing: '.36em', textTransform: 'uppercase', color: '#B89055', position: 'relative', textAlign: 'center' }}>— Wedding Invitation —</div>
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ fontWeight: 400, fontSize: 26, letterSpacing: '.04em', lineHeight: 1.15 }}>{p1.toUpperCase()}</div>
          <div style={{ fontStyle: 'italic', color: '#B89055', fontSize: 22, margin: '2px 0' }}>&amp;</div>
          <div style={{ fontWeight: 400, fontSize: 26, letterSpacing: '.04em', lineHeight: 1.15 }}>{p2.toUpperCase()}</div>
        </div>
        <div style={{ fontSize: 7.5, letterSpacing: '.32em', textTransform: 'uppercase', textAlign: 'center', color: '#9B7E55', position: 'relative' }}>12 · 09 · 2026 · Portorož</div>
      </div>
    )
    case 'gatsby': return (
      <div style={{ width: '100%', height: '100%', background: '#0A0805', color: '#D4AF6A', fontFamily: limelight, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 14, border: '2px double #B8924A' }} />
        <div style={{ position: 'absolute', inset: 22, border: '1px solid #6B5430' }} />
        <div style={{ fontSize: 14, letterSpacing: '.18em', lineHeight: 1.3, position: 'relative', zIndex: 2, marginTop: 8 }}>{p1.toUpperCase()}</div>
        <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 26, margin: '6px 0', color: '#E5C885', position: 'relative', zIndex: 2 }}>&amp;</div>
        <div style={{ fontSize: 14, letterSpacing: '.18em', lineHeight: 1.3, position: 'relative', zIndex: 2 }}>{p2.toUpperCase()}</div>
        <div style={{ fontFamily: limelight, fontSize: 26, letterSpacing: '.18em', color: '#D4AF6A', marginTop: 14, position: 'relative', zIndex: 2 }}>2026</div>
      </div>
    )
    case 'scandi': return (
      <div style={{ width: '100%', height: '100%', background: '#F8F5EE', color: '#2A2825', fontFamily: fraunces, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '28px 18px', textAlign: 'center', position: 'relative' }}>
        <div style={{ width: 30, height: 1, background: '#8AA08A', margin: '0 auto' }} />
        <div style={{ fontSize: 7.5, letterSpacing: '.4em', textTransform: 'uppercase', color: '#8AA08A', margin: '14px 0' }}>Save the date</div>
        <div style={{ fontWeight: 300, fontSize: 32, lineHeight: 1.1, letterSpacing: '-.005em' }}>{p1}<span style={{ fontStyle: 'italic', color: '#8AA08A', display: 'block', fontSize: 20, margin: '4px 0' }}>and</span>{p2}</div>
        <div style={{ fontSize: 8, letterSpacing: '.32em', textTransform: 'uppercase', color: '#8AA08A', margin: '14px 0' }}>12 · 09 · 2026</div>
        <div style={{ width: 30, height: 1, background: '#8AA08A', margin: '0 auto' }} />
      </div>
    )
    case 'watercolor': return (
      <div style={{ width: '100%', height: '100%', background: 'radial-gradient(ellipse at 30% 20%,#F5D8D8,#EFD3DE 35%,#DCC9E0 70%,#C9BBD5)', color: '#7A4D5A', fontFamily: parisienne, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '24px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 70%,rgba(255,255,255,.4),transparent 50%)' }} />
        <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 9, letterSpacing: '.3em', textTransform: 'uppercase', color: '#9B6677', position: 'relative', zIndex: 2 }}>— Save the date —</div>
        <div style={{ fontSize: 44, lineHeight: 1, color: '#5C3A4B', position: 'relative', zIndex: 2, margin: '12px 0' }}>{p1}</div>
        <div style={{ fontFamily: fraunces, fontWeight: 300, fontStyle: 'italic', fontSize: 30, color: '#9B6677', position: 'relative', zIndex: 2 }}>&amp;</div>
        <div style={{ fontSize: 44, lineHeight: 1, color: '#5C3A4B', position: 'relative', zIndex: 2, margin: '4px 0 12px' }}>{p2}</div>
        <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontWeight: 300, fontSize: 12, color: '#9B6677', position: 'relative', zIndex: 2 }}>12 · 09 · 2026</div>
      </div>
    )
    case 'azulejo': return (
      <div style={{ width: '100%', height: '100%', backgroundImage: 'repeating-conic-gradient(#1E3A5F 0deg 90deg,#FBF7EE 90deg 180deg)', backgroundSize: '22px 22px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 28, background: '#FBF7EE', border: '1px solid #1E3A5F' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#1E3A5F', fontFamily: fraunces }}>
          <div style={{ fontSize: 7.5, letterSpacing: '.36em', textTransform: 'uppercase', color: '#C7553D', marginBottom: 12 }}>— Wedding —</div>
          <div style={{ fontWeight: 300, fontStyle: 'italic', fontSize: 28, lineHeight: 1.1 }}>{p1}<span style={{ fontFamily: parisienne, fontStyle: 'normal', color: '#C7553D', fontSize: 24, margin: '0 6px', display: 'inline-block' }}>&amp;</span>{p2}</div>
          <div style={{ fontSize: 8, letterSpacing: '.28em', textTransform: 'uppercase', color: '#1E3A5F', marginTop: 12 }}>12 · 09 · 2026</div>
        </div>
      </div>
    )
    case 'industrial': return (
      <div style={{ width: '100%', height: '100%', background: '#23231F', color: '#D9D2BD', fontFamily: fraunces, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '18px', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(45deg,rgba(217,210,189,.04) 25%,transparent 25%),linear-gradient(-45deg,rgba(217,210,189,.04) 25%,transparent 25%)', backgroundSize: '8px 8px' }} />
        <div style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 80, lineHeight: 1, color: '#A8623A', position: 'absolute', right: 10, top: 10, letterSpacing: '-.04em' }}>12</div>
        <div style={{ fontSize: 7.5, letterSpacing: '.36em', textTransform: 'uppercase', color: '#8A9268', position: 'relative', zIndex: 2, marginBottom: 6 }}>— Wedding · Sept 2026 —</div>
        <div style={{ fontStyle: 'italic', fontWeight: 300, fontSize: 28, lineHeight: 1.05, color: '#D9D2BD', position: 'relative', zIndex: 2 }}>{p1}<br /><span style={{ fontStyle: 'italic' }}>&amp; {p2}</span></div>
        <div style={{ fontSize: 7.5, letterSpacing: '.32em', textTransform: 'uppercase', color: '#A8623A', marginTop: 12, position: 'relative', zIndex: 2 }}>Portorož · Slovenia</div>
      </div>
    )
    default: {
      const tmpl = TEMPLATES.find(x => x.id === id)
      if (!tmpl) return null
      const c = tmpl.colors
      const dark = parseInt(c.background.slice(1, 3), 16) < 80
      return (
        <div style={{ width: '100%', height: '100%', background: c.background, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', position: 'relative' }}>
          {dark && <div style={{ position: 'absolute', inset: 0, opacity: .03, background: `repeating-linear-gradient(45deg, ${c.text} 0px, ${c.text} 1px, transparent 1px, transparent 8px)` }} />}
          <div style={{ fontSize: 8, letterSpacing: '.3em', textTransform: 'uppercase', color: c.textMuted, marginBottom: 16 }}>Wedding Invitation</div>
          <div style={{ fontFamily: parisienne, fontSize: 40, lineHeight: 1.1, color: c.primary }}>{p1}</div>
          <div style={{ fontFamily: fraunces, fontStyle: 'italic', fontSize: 18, color: c.accent, margin: '4px 0', fontWeight: 300 }}>&amp;</div>
          <div style={{ fontFamily: parisienne, fontSize: 40, lineHeight: 1.1, color: c.primary }}>{p2}</div>
          <div style={{ width: 28, height: 1, background: c.accent, margin: '14px auto' }} />
          <div style={{ fontSize: 8, letterSpacing: '.22em', textTransform: 'uppercase', color: c.textMuted }}>12.09.2026 · Portorož</div>
        </div>
      )
    }
  }
}
