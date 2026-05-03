import { notFound } from 'next/navigation'
import { TemplateDemoClient } from '@/components/demo/TemplateDemoClient'
import type { TemplateId } from '@/types'

const VALID: TemplateId[] = ['botanica', 'modern', 'heritage', 'eliarose', 'noir', 'nocturne', 'promesse', 'rosewood', 'editorial', 'venezia']

export default async function TemplateDemoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!VALID.includes(id as TemplateId)) notFound()
  return <TemplateDemoClient templateId={id as TemplateId} />
}

export function generateStaticParams() {
  return [
    { id: 'botanica' }, { id: 'modern' }, { id: 'heritage' },
    { id: 'eliarose' }, { id: 'noir' }, { id: 'nocturne' },
    { id: 'promesse' }, { id: 'rosewood' }, { id: 'editorial' }, { id: 'venezia' },
  ]
}
