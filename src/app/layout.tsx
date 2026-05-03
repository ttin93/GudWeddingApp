import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  DM_Serif_Display,
  Instrument_Sans,
  Pinyon_Script,
  Great_Vibes,
  Playfair_Display,
  DM_Mono,
  Cinzel,
} from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  variable: '--font-dm-serif',
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const pinyonScript = Pinyon_Script({
  variable: '--font-pinyon',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const greatVibes = Great_Vibes({
  variable: '--font-script',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmMono = DM_Mono({
  variable: '--font-mono-dm',
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Invitia — One link. Everything your guests need.',
  description:
    'A single, beautifully composed page for the day — schedule, registry, RSVP, dress code, directions — wrapped in your typography, sent in a sentence.',
  keywords: 'digital wedding invitation, online wedding invite, RSVP, wedding website',
  openGraph: {
    title: 'Invitia — One link. Everything your guests need.',
    description: 'Elegant digital wedding invitations. Create yours in minutes.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSerif.variable} ${instrumentSans.variable} ${pinyonScript.variable} ${greatVibes.variable} ${playfairDisplay.variable} ${dmMono.variable} ${cinzel.variable} h-full`}
    >
      <body className="min-h-full flex flex-col" style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' } as React.CSSProperties}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
