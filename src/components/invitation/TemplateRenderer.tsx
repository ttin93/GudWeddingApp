import type { Invitation, RSVPResponse } from '@/types'
import { ToscanaTemplate } from './templates/ToscanaTemplate'
import { BotanicaTemplate } from './templates/BotanicaTemplate'
import { HeritageTemplate } from './templates/HeritageTemplate'
import { EliaRoseTemplate } from './templates/EliaRoseTemplate'
import { NoirTemplate } from './templates/NoirTemplate'
import { NocturneTemplate } from './templates/NocturneTemplate'
import { PromesseTemplate } from './templates/PromesseTemplate'
import { RosewoodTemplate } from './templates/RosewoodTemplate'
import { VeneziaTemplate } from './templates/VeneziaTemplate'
import { RivieraTemplate } from './templates/RivieraTemplate'
import { CoastalTemplate } from './templates/CoastalTemplate'
import { ScandiTemplate } from './templates/ScandiTemplate'
import { WatercolorTemplate } from './templates/WatercolorTemplate'

interface Props {
  invitation: Invitation
  existingRSVP?: RSVPResponse | null
}

export function TemplateRenderer({ invitation, existingRSVP }: Props) {
  const props = { invitation, existingRSVP }

  switch (invitation.template_id) {
    case 'toscana':    return <ToscanaTemplate {...props} />
    case 'riviera':    return <RivieraTemplate {...props} />
    case 'coastal':    return <CoastalTemplate {...props} />
    case 'scandi':     return <ScandiTemplate {...props} />
    case 'watercolor': return <WatercolorTemplate {...props} />
    case 'heritage':   return <HeritageTemplate {...props} />
    case 'eliarose':   return <EliaRoseTemplate {...props} />
    case 'noir':       return <NoirTemplate {...props} />
    case 'nocturne':   return <NocturneTemplate {...props} />
    case 'promesse':   return <PromesseTemplate {...props} />
    case 'rosewood':   return <RosewoodTemplate {...props} />
    case 'venezia':    return <VeneziaTemplate {...props} />
    case 'botanica':
    default:           return <BotanicaTemplate {...props} />
  }
}
