export interface QuestLine {
  title: string
  description: string
  levelRequirement: number
  quests: Quest[]
}

export interface Quest {
  prerequisiteQuestId?: string
  levelRequirement: number
  title: string
  description: string
  rewards: QuestReward[]
}

export interface QuestReward {
  title: string
  description: string
  type: 'experience' | 'money'
  amount: number
}
