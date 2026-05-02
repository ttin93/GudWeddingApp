import type { Invitation, RSVPResponse } from '@/types'
import { BotanicaTemplate } from './templates/BotanicaTemplate'
import { ModernTemplate } from './templates/ModernTemplate'
import { HeritageTemplate } from './templates/HeritageTemplate'
import { EliaRoseTemplate } from './templates/EliaRoseTemplate'
import { NoirTemplate } from './templates/NoirTemplate'
import { NocturneTemplate } from './templates/NocturneTemplate'
import { PromesseTemplate } from './templates/PromesseTemplate'
import { RosewoodTemplate } from './templates/RosewoodTemplate'

interface Props {
  invitation: Invitation
  existingRSVP?: RSVPResponse | null
}

export function TemplateRenderer({ invitation, existingRSVP }: Props) {
  const props = { invitation, existingRSVP }

  switch (invitation.template_id) {
    case 'modern':     return <ModernTemplate invitation={invitation} />
    case 'heritage':   return <HeritageTemplate invitation={invitation} />
    case 'eliarose':   return <EliaRoseTemplate {...props} />
    case 'noir':       return <NoirTemplate {...props} />
    case 'nocturne':   return <NocturneTemplate {...props} />
    case 'promesse':   return <PromesseTemplate {...props} />
    case 'rosewood':   return <RosewoodTemplate {...props} />
    case 'botanica':
    default:           return <BotanicaTemplate invitation={invitation} />
  }
}
