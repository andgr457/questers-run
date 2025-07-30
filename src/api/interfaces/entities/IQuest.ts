export type QuestEventType =
  | { type: "quest-start"; questName: string }
  | { type: "quest-complete"; questName: string }
  | { type: "quest-failed"; questName: string }
  | { type: "gain-xp"; amount: number }
  | { type: "gain-gold"; amount: number }
  | { type: "loot-drop"; itemName: string; icon?: string }
  | { type: "mob-kill"; mobName: string }
  | { type: 'damage-taken'; damage: string}
  | { type: "character-died" }

export type QuestEventCallback = (event: QuestEventType) => void

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
