import { ILoot, ILootArmor, ILootWeapon } from '../ILoot'

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
  gold: number

  // Unequipped inventory items
  lootIds: string[]
  loot: ILoot[]

  // Equipped gear
  armorIds: string[]
  equippedArmor: ILootArmor[]
  weaponIds: string[]
  equippedWeapons: ILootWeapon[]
}


export interface ICharacterCreate {
  name: string
  classId: string
}

export interface ICharacterUpdate {
  name: string
}