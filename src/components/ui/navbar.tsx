'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NajinDanWordmark } from './NajinDanLogo'
import { Button } from './button'
import { cn } from '@/lib/utils/cn'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#E8E2DA] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <NajinDanWordmark size={22} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/templates" className="text-sm text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors">
              Templates
            </Link>
            <Link href="/pricing" className="text-sm text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors">
              Pricing
            </Link>
            <Link href="/demo" className="text-sm text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors">
              Demo
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button variant="gold" size="sm">Create Invitation</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[#1C1C1C]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        'md:hidden border-t border-[#E8E2DA] bg-white overflow-hidden transition-all duration-300',
        open ? 'max-h-64' : 'max-h-0'
      )}>
        <nav className="flex flex-col px-4 py-4 gap-4">
          <Link href="/templates" className="text-sm text-[#6B6B6B]" onClick={() => setOpen(false)}>Templates</Link>
          <Link href="/pricing" className="text-sm text-[#6B6B6B]" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/demo" className="text-sm text-[#6B6B6B]" onClick={() => setOpen(false)}>Demo</Link>
          <div className="flex flex-col gap-2 pt-2 border-t border-[#E8E2DA]">
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">Sign in</Button>
            </Link>
            <Link href="/register" onClick={() => setOpen(false)}>
              <Button variant="gold" size="sm" className="w-full">Create Invitation</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
