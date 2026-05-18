import Link from 'next/link'
import { NajinDanWordmark } from './NajinDanLogo'

export function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-[#A0A0A0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <NajinDanWordmark size={26} dark />
            <p className="mt-3 text-sm leading-relaxed">
              Elegant digital wedding invitations that your guests will love.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/templates" className="hover:text-white transition-colors">Templates</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/demo" className="hover:text-white transition-colors">Live Demo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/demo" className="hover:text-white transition-colors">Live Demo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">© {new Date().getFullYear()} NajinDan. All rights reserved.</p>
          <p className="text-xs">Made with love for every couple ♥</p>
        </div>
      </div>
    </footer>
  )
}
