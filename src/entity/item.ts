export interface ItemLink {
  name: string
  quantity?: number
}

export interface BuffStat {
  name: string
  field: string
  value: number
}

export interface BaseItem {
  name: string
  type: 'Consumable' | 'Armor' | 'Weapon'
  category: string
  description: string
  rarity: string // matches with ItemRarity
  buffStats: BuffStat[]
  baseValue: number
  requiredLevel: number
  stackable: boolean // can stack on itself
  hash: string // compare for stacking
  value: number // in copper
  gridSize: {x: number, y: number}
}
  
export interface Gear extends BaseItem {
  equipSlot?: string //can equip as gear
}

export interface Weapon extends Gear {
  isTwoHanded: boolean
  baseDamage: number
}

export interface Armor extends Gear {
  baseDefense: number
}