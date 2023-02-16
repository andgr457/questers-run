import { Rarity } from './rarity.interfaces'

export type WeaponType = 'melee' | 'ranged' | 'magic'  | 'shield'

export interface WeaponBase {
  id: string
  name: string
  description: string
  rarity: Rarity
  twoHanded: boolean
  range?: number 
  damage: number //if ranged, this + ammo dmg
  cooldown: number //0 if no cooldown
  weight: number
  level: number //required level to use
  ammunitionType?: AmmunitionType
  type: WeaponType
  durability: number
  repairCost: number
  offhand: boolean
}

export interface Weapon extends WeaponBase {
  currentDurability: number
  broken: boolean
}

export type AmmunitionType = 'arrow' | 'bullet'

export interface Ammunition {
  id: string
  name: string
  description: string
  rarity: Rarity
  damage: number
  level: number //required level to use
  type: AmmunitionType
}
