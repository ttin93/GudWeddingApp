import type { Invitation } from '@/types'
import { BotanicaTemplate } from './templates/BotanicaTemplate'
import { ModernTemplate } from './templates/ModernTemplate'
import { HeritageTemplate } from './templates/HeritageTemplate'

interface Props {
  invitation: Invitation
}

export function TemplateRenderer({ invitation }: Props) {
  switch (invitation.template_id) {
    case 'modern':
      return <ModernTemplate invitation={invitation} />
    case 'heritage':
      return <HeritageTemplate invitation={invitation} />
    case 'botanica':
    default:
      return <BotanicaTemplate invitation={invitation} />
  }
}
