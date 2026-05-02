'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import { BarChart3, Users, Code2, LayoutDashboard, LogOut, Shield } from 'lucide-react'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const ACC   = '#8C5E3A'
const CREAM = '#F7F4EF'
const RULE  = '#E2DDD5'
const BG    = '#FAFAF7'

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/custom-code', label: 'Custom Code', icon: Code2 },
]

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()

  return (
    <aside style={{
      position: 'fixed', top: 0, left: 0, height: '100%', width: 260,
      display: 'flex', flexDirection: 'column',
      borderRight: `1px solid ${RULE}`,
      background: BG,
      zIndex: 40,
    }}>
      {/* Logo / Admin badge */}
      <div style={{ padding: '28px 24px 20px', borderBottom: `1px solid ${RULE}` }}>
        <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 8 }}>
          <Shield size={16} style={{ color: ACC }} />
          <span style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 17, color: INK }}>Super Admin</span>
        </Link>
        <p style={{ fontSize: 11, color: MUTE, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userEmail}</p>
      </div>

      <div style={{ padding: '20px 24px 10px', fontSize: 9.5, letterSpacing: '0.3em', color: MUTE, textTransform: 'uppercase' }}>
        Platform
      </div>

      <nav style={{ flex: 1, padding: '0 12px' }}>
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link key={href} href={href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', marginBottom: 2,
              fontSize: 13, color: active ? INK : MUTE,
              background: active ? CREAM : 'transparent',
              borderLeft: active ? `2px solid ${ACC}` : '2px solid transparent',
              transition: 'color .2s, background .2s',
              textDecoration: 'none',
            }}>
              <Icon size={15} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div style={{ padding: '16px 12px', borderTop: `1px solid ${RULE}` }}>
        <Link href="/dashboard" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '9px 12px', marginBottom: 4,
          fontSize: 12.5, color: MUTE,
          textDecoration: 'none',
        }}>
          ← Dashboard
        </Link>
        <form action={logout}>
          <button type="submit" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '9px 12px',
            fontSize: 12.5, color: MUTE,
            background: 'none', border: 'none', cursor: 'pointer',
          }}>
            <LogOut size={14} />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
