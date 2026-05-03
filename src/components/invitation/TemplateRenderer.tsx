import type { Invitation, RSVPResponse } from '@/types'
import { BotanicaTemplate } from './templates/BotanicaTemplate'
import { ModernTemplate } from './templates/ModernTemplate'
import { HeritageTemplate } from './templates/HeritageTemplate'
import { EliaRoseTemplate } from './templates/EliaRoseTemplate'
import { NoirTemplate } from './templates/NoirTemplate'
import { NocturneTemplate } from './templates/NocturneTemplate'
import { PromesseTemplate } from './templates/PromesseTemplate'
import { RosewoodTemplate } from './templates/RosewoodTemplate'
import { EditorialTemplate } from './templates/EditorialTemplate'
import { VeneziaTemplate } from './templates/VeneziaTemplate'
import { RivieraTemplate } from './templates/RivieraTemplate'
import { CoastalTemplate } from './templates/CoastalTemplate'
import { DarkGridTemplate } from './templates/DarkGridTemplate'
import { GatsbyTemplate } from './templates/GatsbyTemplate'
import { ScandiTemplate } from './templates/ScandiTemplate'
import { WatercolorTemplate } from './templates/WatercolorTemplate'
import { AzulejoTemplate } from './templates/AzulejoTemplate'
import { IndustrialTemplate } from './templates/IndustrialTemplate'

interface Props {
  invitation: Invitation
  existingRSVP?: RSVPResponse | null
}

export function TemplateRenderer({ invitation, existingRSVP }: Props) {
  const props = { invitation, existingRSVP }

  switch (invitation.template_id) {
    case 'riviera':    return <RivieraTemplate {...props} />
    case 'coastal':    return <CoastalTemplate {...props} />
    case 'darkgrid':   return <DarkGridTemplate {...props} />
    case 'gatsby':     return <GatsbyTemplate {...props} />
    case 'scandi':     return <ScandiTemplate {...props} />
    case 'watercolor': return <WatercolorTemplate {...props} />
    case 'azulejo':    return <AzulejoTemplate {...props} />
    case 'industrial': return <IndustrialTemplate {...props} />
    case 'modern':     return <ModernTemplate {...props} />
    case 'heritage':   return <HeritageTemplate {...props} />
    case 'eliarose':   return <EliaRoseTemplate {...props} />
    case 'noir':       return <NoirTemplate {...props} />
    case 'nocturne':   return <NocturneTemplate {...props} />
    case 'promesse':   return <PromesseTemplate {...props} />
    case 'rosewood':   return <RosewoodTemplate {...props} />
    case 'editorial':  return <EditorialTemplate {...props} />
    case 'venezia':    return <VeneziaTemplate {...props} />
    case 'botanica':
    default:           return <BotanicaTemplate {...props} />
  }
}
