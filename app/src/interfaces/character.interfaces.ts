import { InventorySlot } from './inventory.interfaces'

export type ClassType = 'Warrior' | 'Mage' | 'Rogue'
export type CharacterStatus = 
'Idle' | 'Questing' | 'In the Tavern' | 'Unconscious'

export interface Character {
  id: string
  name: string
  level: number
  classType: ClassType
  stats: CharacterStats
  status: CharacterStatus
  skills: CharacterSkill[]
  experience: number
  experienceToNextLevel: number
  money: number
  inventory?: CharacterInventory
  equipment?: CharacterEquipmentSlots
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
  modifiers: {
    hp: number
    mana: number
    stamina: number
    dexterity: number
  }
  isSelf: boolean
  cooldown: number
}

export interface CharacterInventory {
  maxInventory: 24
  inventory: InventorySlot[]
}

export interface CharacterEquipmentSlots {
  headId: string
  shouldersId: string
  chestId: string
  handsId: string
  wristId: string
  legsId: string
  waistId: string
  feetId: string
  neckId: string
  ringId: string
}
