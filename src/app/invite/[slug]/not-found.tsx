import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#F8F4EF]">
      <span className="font-script text-4xl text-[#8B6B4A] mb-6">NajinDan</span>
      <h1 className="font-serif text-3xl text-[#1C1C1C] mb-3">Invitation not found</h1>
      <p className="text-[#6B6B6B] mb-8 max-w-sm">
        This invitation may have expired or the link might be incorrect. Check with the couple for the correct link.
      </p>
      <Link href="/">
        <Button variant="gold">Create your own invitation</Button>
      </Link>
    </div>
  )
}
