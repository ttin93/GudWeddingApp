import { notFound } from 'next/navigation'
import { TemplateDemoClient } from '@/components/demo/TemplateDemoClient'
import type { TemplateId } from '@/types'

const VALID: TemplateId[] = [
  'botanica', 'modern', 'heritage', 'eliarose', 'noir', 'nocturne',
  'promesse', 'rosewood', 'editorial', 'venezia',
  'riviera', 'coastal', 'darkgrid', 'gatsby', 'scandi', 'watercolor', 'azulejo', 'industrial',
]

export default async function TemplateDemoPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = await params
  if (!VALID.includes(id as TemplateId)) notFound()
  return <TemplateDemoClient templateId={id as TemplateId} />
}

export function generateStaticParams() {
  return VALID.map(id => ({ id }))
}
