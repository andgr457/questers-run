import { DateTime } from "luxon"

export interface Character {
  id: string
  name: string
  level: number
  classType: 'Warrior' | 'Mage' | 'Rogue'
  stats: CharacterStats
  skills: CharacterSkill[]
  experience: number
  experienceToNextLevel: number
  money: number
}

export interface CharacterStats {
  health: number
  mana: number
  stamina: number
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