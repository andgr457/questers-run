import { Level } from './Level'

export type CRMemberStatus = 'idle' | 'working' | 'vacation'

export interface CRMember {
  id: string
  name: string
  class: string
  xp: number
  level: Level
  hp: number
  stamina: number
  gold: number
  sanity: number
  status: CRMemberStatus
}