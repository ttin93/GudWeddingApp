'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import { LayoutDashboard, Users, Settings, LogOut, Plus, Shield } from 'lucide-react'
import type { User } from '@supabase/supabase-js'

const INK   = '#1A1714'
const MUTE  = '#6e6359'
const ACC   = '#8C7B6B'
const CREAM = '#F7F4EF'
const RULE  = '#E8E2D9'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/guests', label: 'Guests', icon: Users },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function DashboardSidebar({ user, isAdmin = false }: { user: User; isAdmin?: boolean }) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside style={{
        display: 'none',
        position: 'fixed', top: 0, left: 0, height: '100%', width: 240,
        flexDirection: 'column',
        borderRight: `1px solid ${RULE}`,
        background: '#FBFAF6',
        zIndex: 40,
      }}
        className="md-sidebar"
      >
        <style>{`
          @media (min-width: 768px) { .md-sidebar { display: flex !important; } .md-main { margin-left: 240px !important; } .mobile-nav { display: none !important; } }
        `}</style>

        {/* Logo */}
        <div style={{ padding: '28px 24px 20px', borderBottom: `1px solid ${RULE}` }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-dm-serif)', fontSize: 16, color: INK, textDecoration: 'none' }}>
            <span style={{ fontSize: 8, color: ACC }}>◉</span>
            NajinDan
          </Link>
          <p style={{ fontSize: 11, color: MUTE, marginTop: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
        </div>

        {/* Section label */}
        <div style={{ padding: '20px 24px 10px', fontSize: 9.5, letterSpacing: '0.3em', color: MUTE, textTransform: 'uppercase' }}>
          Navigation
        </div>

        {/* Nav */}
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

        {/* Bottom */}
        <div style={{ padding: '16px 12px', borderTop: `1px solid ${RULE}` }}>
          <Link href="/dashboard/invitation/new" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '11px 16px', marginBottom: 8,
            background: INK, color: CREAM,
            fontFamily: 'var(--font-instrument)', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background .2s',
          }}>
            <Plus size={13} />
            New invitation
          </Link>
          {isAdmin && (
            <Link href="/admin" style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 12px', marginBottom: 4,
              fontSize: 12, color: '#8C5E3A',
              background: 'none', border: `1px solid #E8D5C8`,
              textDecoration: 'none',
              letterSpacing: '0.1em',
              transition: 'color .2s',
            }}>
              <Shield size={13} />
              Super Admin
            </Link>
          )}
          <form action={logout}>
            <button type="submit" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', padding: '9px 12px',
              fontSize: 12.5, color: MUTE,
              background: 'none', border: 'none', cursor: 'pointer',
              transition: 'color .2s',
            }}>
              <LogOut size={14} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="mobile-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
        height: 60, background: '#FBFAF6', borderBottom: `1px solid ${RULE}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-dm-serif)', fontSize: 16, color: INK, textDecoration: 'none' }}>
          <span style={{ fontSize: 8, color: ACC }}>◉</span>
          NajinDan
        </Link>
        <Link href="/dashboard/invitation/new" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: INK,
          textDecoration: 'none',
        }}>
          <Plus size={13} />
          New
        </Link>
      </div>
      <div className="mobile-nav" style={{ height: 60 }} />

      {/* Mobile bottom nav */}
      <nav className="mobile-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
        background: '#FBFAF6', borderTop: `1px solid ${RULE}`,
        display: 'flex',
      }}>
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link key={href} href={href} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '10px 0', gap: 4,
              fontSize: 10, letterSpacing: '0.1em',
              color: active ? INK : MUTE,
              textDecoration: 'none',
            }}>
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>
    </>
  )
}
