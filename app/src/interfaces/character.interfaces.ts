import { DateTime } from "luxon"

export interface Character {
  id: string
  name: string
  level: number
  classType: 'Warrior' | 'Mage' | 'Rogue'
  stats: CharacterStats
  status: 'Idle' | 'Questing' | 'In the Tavern' | 'Unconscious'
  skills: CharacterSkill[]
  experience: number
  experienceToNextLevel: number
  money: number
}

export interface CharacterStats {
  health: number
  mana: number
  stamina: number
  dexterity: number
}

export interface CharacterSkill {
  id: string
  name: string
  healthModifier: number
  manaModifier: number
  staminaModifier: number
  isSelf: boolean
  cooldownStarted: DateTime
  cooldownMillis: number
}