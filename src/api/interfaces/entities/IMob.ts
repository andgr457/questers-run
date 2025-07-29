import { ICharacterBuff } from './character/ICharacterBuff'

export interface IMob {
  id: string
  name: string
  type: 'common' | 'elite' | 'rare' | 'boss'
  dps: number
  level: number
  defense: number
  experience: number
  buffTriggers?: Array<{
    buffId: string
    /** Percent of health when the buff will trigger */
    buffHealthPercent?: number
    /** Time in seconds when the buff will trigger */
    buffTime: number
  }>
}