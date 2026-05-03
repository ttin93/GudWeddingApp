import { BotanicaTemplate } from '@/components/invitation/templates/BotanicaTemplate'
import type { Invitation } from '@/types'

const demoInvitation: Invitation = {
  id: 'demo',
  user_id: 'demo',
  slug: 'demo',
  partner1_name: 'Emma',
  partner2_name: 'James',
  wedding_date: '2026-09-20',
  template_id: 'botanica',
  venue_name: 'Villa Rosa Garden',
  venue_address: 'Via della Rosa 12, Florence, Italy',
  venue_lat: 43.769562,
  venue_lng: 11.255814,
  ceremony_time: '11:00',
  reception_time: '14:00',
  dress_code: 'Garden party elegance — florals and linen welcome.',
  personal_message: 'After seven years of adventures, laughter, and growing together, we are beyond thrilled to celebrate this next chapter with the people we love most.',
  timeline: [
    { time: '11:00', title: 'Ceremony', description: 'Exchange of vows in the garden', emoji: '💍' },
    { time: '12:00', title: 'Champagne & Photos', description: 'Celebrate with a glass and capture the moment', emoji: '🥂' },
    { time: '14:00', title: 'Wedding Luncheon', description: 'Seated garden reception', emoji: '🌿' },
    { time: '18:00', title: 'Dancing & Desserts', description: 'Live music, wedding cake, and dancing under the stars', emoji: '🎶' },
  ],
  languages: ['en'],
  rsvp_deadline: '2026-09-01',
  max_guests: 80,
  show_gallery: true,
  show_countdown: true,
  package: 'elegance',
  is_active: true,
  view_count: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export default function DemoPage() {
  return <BotanicaTemplate invitation={demoInvitation} />
}
