import { Rarity } from './rarity.interfaces'

export type ArmorSlot = 
'Head' | 'Chest' | 'Legs' | 'Feet' | 'Hands' |
'Shoulders' | 'Wrist' | 'Neck' | 'Ring' | 'Waist'

export type ArmorType = 'Heavy' | 'Medium' | 'Light' | 'None'

export type ArmorMaterial = 'Metal' | 'Leather' | 'Cloth'

export interface ArmorBase {
  id: string
  name: string
  description: string
  rarity: Rarity
  slot: ArmorSlot
  type: ArmorType
  material: ArmorMaterial
  protection: number
  durability: number
  price: number
  weight: number
  repairCost: number
}

export interface Armor {
  currentDurability: number
  broken: boolean
}

