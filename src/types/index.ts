export type Package = 'essential' | 'elegance' | 'signature'
export type TemplateId = 'botanica' | 'modern' | 'heritage' | 'eliarose' | 'noir' | 'nocturne' | 'promesse' | 'rosewood'

export interface TimelineEvent {
  time: string
  title: string
  description?: string
  emoji?: string
}

export interface AccommodationItem {
  name: string
  address?: string
  url?: string
  discount_code?: string
  price_range?: string
  notes?: string
}

export interface GiftRegistryItem {
  name: string
  url: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Invitation {
  id: string
  user_id: string
  slug: string
  partner1_name: string
  partner2_name: string
  wedding_date: string
  template_id: TemplateId
  venue_name?: string
  venue_address?: string
  venue_lat?: number
  venue_lng?: number
  ceremony_time?: string
  reception_time?: string
  dress_code?: string
  personal_message?: string
  story?: string
  timeline: TimelineEvent[]
  languages: string[]
  rsvp_deadline?: string
  max_guests?: number
  show_gallery: boolean
  show_countdown: boolean
  package: Package
  active_until?: string
  is_active: boolean
  view_count: number
  // Extra sections
  hashtag?: string
  contact_name?: string
  contact_phone?: string
  contact_email?: string
  children_policy?: 'welcome' | 'adults_only' | 'infants_only'
  transport_notes?: string
  accommodation?: AccommodationItem[]
  gift_registry?: GiftRegistryItem[]
  faq?: FAQItem[]
  music_playlist_url?: string
  labels?: Record<string, string>
  // Section visibility (null/undefined = visible)
  show_story?: boolean
  show_program?: boolean
  show_dress_code?: boolean
  show_children_policy?: boolean
  show_hashtag?: boolean
  show_music?: boolean
  show_contact?: boolean
  show_transport?: boolean
  show_accommodation?: boolean
  show_gift_registry?: boolean
  show_faq?: boolean
  created_at: string
  updated_at: string
}

export interface RSVPResponse {
  id: string
  invitation_id: string
  guest_name: string
  email?: string
  attending: boolean
  adults: number
  children: number
  menu_choice?: 'meat' | 'fish' | 'vegetarian' | 'vegan'
  allergies?: string
  message?: string
  created_at: string
}

export interface InvitationPhoto {
  id: string
  invitation_id: string
  storage_path: string
  display_order: number
  created_at: string
}

export interface Payment {
  id: string
  user_id: string
  invitation_id: string
  stripe_session_id: string
  stripe_payment_id?: string
  package: Package
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

export interface TemplateColors {
  background: string
  primary: string
  accent: string
  text: string
  textMuted: string
}

export interface TemplateFonts {
  heading: string
  body: string
  script: string
}

export interface TemplateConfig {
  id: TemplateId
  name: string
  category: 'contemporary' | 'timeless' | 'romance'
  colors: TemplateColors
  fonts: TemplateFonts
  previewImage: string
}

export const PACKAGES = {
  essential: {
    id: 'essential' as Package,
    price: 69,
    duration: 6,
    popular: false,
    name: 'Essential',
    features: [
      'Digital invitation page',
      'RSVP (Yes/No)',
      'QR code sharing',
      '1 language',
      'Basic analytics',
      'Active 6 months',
    ],
  },
  elegance: {
    id: 'elegance' as Package,
    price: 89,
    duration: 12,
    popular: true,
    name: 'Elegance',
    features: [
      'Everything in Essential',
      'Google Maps integration',
      'Event schedule / timeline',
      'Dress code section',
      'Photo gallery (up to 10 photos)',
      'Detailed RSVP (menu, message)',
      'Wedding countdown',
      'Guest export CSV',
      '2 languages',
      'Active 12 months',
    ],
  },
  signature: {
    id: 'signature' as Package,
    price: 119,
    duration: 12,
    popular: false,
    name: 'Signature',
    features: [
      'Everything in Elegance',
      'Advanced RSVP (adults, children, allergies)',
      'Photo gallery (up to 20 photos)',
      'Add to calendar button',
      'Wedding schedule reminder',
      'Menu selection for guests',
      'Template change option',
      '3 languages',
      'Priority support',
      'Active 12 months',
    ],
  },
} as const

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'botanica',
    name: 'Botanica',
    category: 'timeless',
    colors: {
      background: '#FAF8F5',
      primary: '#C4847A',
      accent: '#2D4A3E',
      text: '#1C1C1C',
      textMuted: '#6B6B6B',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Cormorant Garamond',
      script: 'Great Vibes',
    },
    previewImage: '/templates/botanica.jpg',
  },
  {
    id: 'modern',
    name: 'Modern',
    category: 'contemporary',
    colors: {
      background: '#F5F5F3',
      primary: '#7A8C7A',
      accent: '#2D2D2D',
      text: '#1C1C1C',
      textMuted: '#6B6B6B',
    },
    fonts: {
      heading: 'DM Serif Display',
      body: 'Inter',
      script: 'Dancing Script',
    },
    previewImage: '/templates/modern.jpg',
  },
  {
    id: 'heritage',
    name: 'Heritage',
    category: 'timeless',
    colors: {
      background: '#F4F1EB',
      primary: '#B8960C',
      accent: '#2C4A2C',
      text: '#1C1C1C',
      textMuted: '#5A5A5A',
    },
    fonts: {
      heading: 'Cormorant Garamond',
      body: 'Libre Baskerville',
      script: 'Pinyon Script',
    },
    previewImage: '/templates/heritage.jpg',
  },
  {
    id: 'eliarose',
    name: 'Elia Rose',
    category: 'romance',
    colors: {
      background: '#FDF8F8',
      primary: '#C09080',
      accent: '#C4A882',
      text: '#2C1810',
      textMuted: '#8C6B5A',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Lato',
      script: 'Great Vibes',
    },
    previewImage: '/templates/eliarose.jpg',
  },
  {
    id: 'noir',
    name: 'Noir',
    category: 'contemporary',
    colors: {
      background: '#1C1C1C',
      primary: '#F5F0E8',
      accent: '#C4A862',
      text: '#F5F0E8',
      textMuted: '#A0A0A0',
    },
    fonts: {
      heading: 'Bebas Neue',
      body: 'Montserrat',
      script: 'Pinyon Script',
    },
    previewImage: '/templates/noir.jpg',
  },
]
