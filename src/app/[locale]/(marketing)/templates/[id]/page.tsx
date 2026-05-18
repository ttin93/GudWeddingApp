import { notFound } from 'next/navigation'
import { TemplateDemoClient } from '@/components/demo/TemplateDemoClient'
import type { TemplateId } from '@/types'

const VALID: TemplateId[] = [
  'toscana',
  'botanica', 'heritage', 'eliarose', 'noir', 'nocturne',
  'promesse', 'rosewood', 'venezia',
  'riviera', 'coastal', 'scandi', 'watercolor',
]

export default async function TemplateDemoPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = await params
  if (!VALID.includes(id as TemplateId)) notFound()
  return <TemplateDemoClient templateId={id as TemplateId} />
}

export function generateStaticParams() {
  const locales = ['sl', 'hr', 'en']
  return locales.flatMap(locale => VALID.map(id => ({ locale, id })))
}
