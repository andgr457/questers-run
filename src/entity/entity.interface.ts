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
  attack: number
  defense: number
}

export interface Character extends BaseEntity {
  class: string /** Class Name */
  exp: number
  nextLevelExp: number
  buffCount: number
  buffAttack: number
  buffDefense: number
  buffCrit: number
  maxBuffs: number
  bags: Bag[]
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
  startCrit: number
}

export interface Mob extends BaseEntity {
  expGiven: number
  type: string
}