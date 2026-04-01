import { CRMember } from './CRMember'
import { Level } from './Level'

export type CRGuildStatus = 'ok' | 'suspended'

export interface CRGuild {
  name: string
  level: Level
  guildmaster: CRMember
  status: CRGuildStatus
  suspendedUntil: string | undefined
  gold: number
  xp: number
}
