import { AllLoot } from '../../repositories/LootRepository'

export type QuestEventType =
  | { type: "quest-start"; questName: string }
  | { type: "quest-complete"; questName: string, experience: number, gold: number }
  | { type: "quest-failed"; questName: string }
  | { type: "gain-xp"; experience: number }
  | { type: "gain-gold"; gold: number }
  | { type: "loot-drop"; itemName: string; icon?: string, loot: Partial<AllLoot> }
  | { type: "mob-kill"; mobName: string, experience: number, gold: number }
  | { type: 'damage-taken'; damage: number}
  | { type: "character-died" }

export type QuestEventCallback = (event: QuestEventType) => void

export type QuestType = 'explore' | 'gather' | 'combat' | 'research'

export interface IQuest {
  id: string
  title: string
  description: string
  level: number
  experience: number
  gold: number
  /** Number of seconds the quest lasts */
  time: number
  /** Number of seconds to spread event triggers during the quest */
  eventSpread: number
  possibleLootIds: string[]
  possibleMobIds: string[]
  stamina: number
  /** When the quest was started utc  */
  startDate?: string
  types: string[]
  regionId: string
}
