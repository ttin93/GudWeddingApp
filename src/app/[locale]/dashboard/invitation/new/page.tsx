import { setRequestLocale } from 'next-intl/server'
import { InvitationWizard } from '@/components/dashboard/InvitationWizard'

export default async function NewInvitationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <InvitationWizard />
}
