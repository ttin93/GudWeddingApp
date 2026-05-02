import type { Invitation, Package } from '@/types'

const BASE: Invitation = {
  id: 'demo',
  user_id: 'demo',
  slug: 'demo',
  partner1_name: 'Lorena',
  partner2_name: 'Viktor',
  wedding_date: '2026-09-12',
  template_id: 'botanica',
  venue_name: 'Villa Rosa',
  venue_address: 'Via dei Fiori 12, Tuscany, Italy',
  venue_lat: 43.769562,
  venue_lng: 11.255814,
  ceremony_time: '16:30',
  reception_time: '18:00',
  dress_code: 'Garden party elegance — florals and natural tones welcome.',
  personal_message:
    'After seven years of adventures, laughter, and growing together, we are beyond thrilled to celebrate this next chapter with the people we love most. Thank you for being part of our story.',
  story:
    'We met on a rainy Tuesday at the Uffizi Gallery in Florence — both reaching for the same audio guide. The rest, as they say, is history.',
  timeline: [
    { time: '16:30', title: 'Ceremony', description: 'Exchange of vows in the garden pavilion', emoji: '💍' },
    { time: '17:15', title: 'Champagne & Canapés', description: 'Celebrate with a glass under the pergola', emoji: '🥂' },
    { time: '18:00', title: 'Wedding Dinner', description: 'Seated reception in the rose garden', emoji: '🌿' },
    { time: '21:00', title: 'Dancing & Desserts', description: 'Live music and the wedding cake', emoji: '🎶' },
    { time: '00:00', title: 'Farewell', description: 'Carriages at midnight', emoji: '✨' },
  ],
  languages: ['en'],
  rsvp_deadline: '2026-09-01',
  max_guests: 80,
  show_gallery: true,
  show_countdown: true,
  package: 'signature',
  is_active: true,
  view_count: 0,
  hashtag: '#LorenaViktor2026',
  contact_name: 'Lorena & Viktor',
  contact_email: 'hello@lorenaviktor.com',
  contact_phone: '+39 055 123 4567',
  children_policy: 'welcome',
  transport_notes: 'A shuttle bus will run between Hotel Excelsior and the venue at 15:45 and return at 01:00.',
  accommodation: [
    { name: 'Hotel Villa Cora', address: 'Viale Machiavelli 18, Florence', url: 'https://example.com', price_range: '€€€', discount_code: 'LORVIK10' },
    { name: 'B&B Le Rose', address: 'Via dei Fiori 3, Tuscany', url: 'https://example.com', price_range: '€€' },
  ],
  gift_registry: [
    { name: 'Our Honeymoon Fund', url: 'https://example.com' },
    { name: 'La Rinascente Registry', url: 'https://example.com' },
  ],
  faq: [
    { question: 'Is there parking at the venue?', answer: 'Yes, free parking is available on-site for up to 50 cars.' },
    { question: 'What if it rains?', answer: 'The ceremony will move indoors to the beautiful Villa Rosa salon.' },
    { question: 'Can I bring a plus-one?', answer: 'Please check with us — space is limited to our RSVP list.' },
  ],
  music_playlist_url: 'https://open.spotify.com/playlist/example',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export function buildDemoInvitation(templateId: string, plan: Package = 'elegance'): Invitation {
  const inv: Invitation = {
    ...BASE,
    template_id: templateId as Invitation['template_id'],
    package: plan,
  }

  if (plan === 'essential') {
    return {
      ...inv,
      venue_address: undefined,
      venue_lat: undefined,
      venue_lng: undefined,
      timeline: [],
      dress_code: undefined,
      personal_message: undefined,
      story: undefined,
      show_gallery: false,
      show_countdown: false,
      accommodation: [],
      gift_registry: [],
      faq: [],
      hashtag: undefined,
      contact_name: undefined,
      contact_email: undefined,
      transport_notes: undefined,
      children_policy: undefined,
      music_playlist_url: undefined,
    }
  }

  if (plan === 'elegance') {
    return {
      ...inv,
      show_gallery: true,
      show_countdown: true,
      accommodation: [],
      gift_registry: [],
      faq: [],
      hashtag: undefined,
      music_playlist_url: undefined,
    }
  }

  return inv
}

export const PLAN_FEATURES: Record<Package, { label: string; features: string[]; locked: string[] }> = {
  essential: {
    label: 'Essential',
    features: ['Names & date', 'Venue name', 'Ceremony time', 'Basic RSVP'],
    locked: ['Event schedule', 'Dress code', 'Google Maps', 'Photo gallery', 'Countdown', 'Detailed RSVP'],
  },
  elegance: {
    label: 'Elegance',
    features: ['Everything in Essential', 'Event schedule', 'Dress code', 'Google Maps', 'Photo gallery', 'Countdown', 'Detailed RSVP'],
    locked: ['Accommodation', 'Gift registry', 'FAQ section', 'Menu selection', 'Add to calendar'],
  },
  signature: {
    label: 'Signature',
    features: ['Everything in Elegance', 'Accommodation', 'Gift registry', 'FAQ', 'Menu selection', 'Add to calendar', 'Music playlist'],
    locked: [],
  },
}
