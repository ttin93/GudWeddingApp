'use client'

import { useState } from 'react'
import { EnvelopeIntro } from './EnvelopeIntro'
import { TemplateRenderer } from './TemplateRenderer'
import { TEMPLATES } from '@/types'
import type { Invitation, RSVPResponse } from '@/types'

interface Props {
  invitation: Invitation
  existingRSVP?: RSVPResponse | null
  forceIntro?: boolean
}

export function InvitationWithIntro({ invitation, existingRSVP, forceIntro = false }: Props) {
  const [introSeen, setIntroSeen] = useState(false)

  const tpl         = TEMPLATES.find(t => t.id === invitation.template_id)
  const accentColor = tpl?.colors.primary ?? '#9C6B3D'
  const paperColor  = tpl?.colors.background ?? '#FAF8F5'

  const showIntro = invitation.show_intro !== false

  return (
    <>
      {showIntro && !introSeen && (
        <EnvelopeIntro
          partner1={invitation.partner1_name}
          partner2={invitation.partner2_name}
          accentColor={accentColor}
          paperColor={paperColor}
          forceShow={forceIntro}
          onComplete={() => setIntroSeen(true)}
        />
      )}
      <TemplateRenderer invitation={invitation} existingRSVP={existingRSVP} />
    </>
  )
}
