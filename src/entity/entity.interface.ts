export interface Player {
  level: number
  exp: number
  nextLevelExp: number
}

export interface Bag extends Item {
  slots: number
  items: Item[]
}

export interface Item {
  name: string
  description: string
  baseValue: number
  rarity: string // matches with ItemRarity
  quantity?: number
  buffHealth?: number
  buffAttack?: number
  buffDefense?: number
}

export interface ItemRarity {
  name: string
  /* starting from 1 - value * 1.25 **/
  valueModifier: number
}

export interface BaseEntity {
  name: string
  level: number
  health: number
  maxHealth: number
  mana: number
  maxMana: number
  attack: number
  defense: number
  hitChance: number
}

export type ClassName = 'Warrior' | 'Mage' | 'Rogue'

export interface Character extends BaseEntity {
  class: ClassName
  exp: number
  nextLevelExp: number
  buffCount: number
  buffAttack: number
  buffDefense: number
  buffCrit: number
  maxBuffs: number
  bags: Bag[]
  equipment: Equipment[]
  critChance: number
}

export interface Equipment {
  itemName: string
}

export interface CharacterClass {
  name: string
  description: string
  imageName: string
  credit: string
  attacks: string
  startAttack: number
  startDefense: number
  startHealth: number
  startMana: number
  startCrit: number
  startHitChance: number
  startCritChance: number
}

export interface Mob extends BaseEntity {
  imageName: string
  expGiven: number
  type: string
  foundIn: string[]
  chanceToShow: number
}