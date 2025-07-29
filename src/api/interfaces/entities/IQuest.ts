export interface IQuest {
  id: string
  title: string
  description: string
  level: number
  experience: number
  /** Number of seconds the quest lasts */
  time: number
  /** Number of seconds to spread event triggers during the quest */
  eventSpread: number
  possibleLootIds: string[]
  possibleMobIds: string[]
  stamina: number
  /** When the quest was started utc  */
  startDate?: string
}
