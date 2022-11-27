import { DateTime } from "luxon"

export interface Character {
  name: string
  level: number
  image: string
  classType: 'warrior' | 'mage' | 'rogue'
  stats: CharacterStats
  skills: CharacterSkill[]
  experience: number
  money: number
}

export interface CharacterStats {
  health: number
  mana: number
  stamina: number
}

export interface CharacterSkill {
  name: string
  healthModifier: number
  manaModifier: number
  staminaModifier: number
  isSelf: boolean
  cooldownStarted: DateTime
  cooldownMillis: number
}