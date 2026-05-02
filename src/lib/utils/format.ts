import { format, parseISO, differenceInDays } from 'date-fns'

export function formatDate(date: string | Date, pattern = 'MMMM d, yyyy') {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, pattern)
}

export function formatTime(time: string) {
  const [h, m] = time.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${m} ${ampm}`
}

export function daysUntilWedding(weddingDate: string) {
  return differenceInDays(parseISO(weddingDate), new Date())
}

export function generateSlug(partner1: string, partner2: string, year: number) {
  const clean = (s: string) =>
    s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  return `${clean(partner1)}-${clean(partner2)}-${year}`
}
