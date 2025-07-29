export interface ICharacter {
  id: string
  status: string
  classId: string
  name: string
  level: number
  experience: number
  experienceNextLevel: number
  health: number
  maxHealth: number
  mana: number
  maxMana: number
  stamina: number
  maxStamina: number
  strength: number
  willpower: number
  agility: number
}

export interface ICharacterCreate {
  name: string
  classId: string
}

export interface ICharacterUpdate {
  name: string
}