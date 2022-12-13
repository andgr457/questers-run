export interface QuestLine {
  id: string
  title: string
  description: string
  levelRequirement: number
  quests: Quest[]
}

export interface Quest {
  id: string
  prerequisiteQuestId?: string
  levelRequirement: number
  title: string
  description: string
  rewards: QuestReward[]
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
  characterId: string
  questId: string
  timeStarted: string
}
