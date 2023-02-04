import { Mob } from "./mob.interfaces"

export interface QuestLine {
  id: string
  title: string
  description: string
}

export interface Quest {
  id: string
  questLineId: string
  prerequisiteQuestId?: string
  levelRequirement: number
  title: string
  description: string
  rewards: QuestReward[]
  mobs: Mob[]
  mobPropbability: number
  timeLengthDays: number
  timeLengthHours: number
  timeLengthMinutes: number
}

export interface QuestReward {
  id: string
  title: string
  description: string
  type: 'experience' | 'money'
  amount: number
}

export interface QuestTimer {
  characterIds: string[]
  questId: string
  timeStarted: string
}
