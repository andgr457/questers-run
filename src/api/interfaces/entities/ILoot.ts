export type ILootRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
export type ILootType = 'resource' | 'consumable' | 'armor' | 'weapon' | 'junk'

export interface ILoot {
  id: string
  rarity: ILootRarity
  title: string
  description: string
  chance: number
  gold: number
  type: ILootType
}

export type ILootResourceType = 'herb' | 'ore' | 'vegetable' | 'fruit' | 'meat' | 'fish' | 'worm' | 'leather' | 'ingot' | 'junk'

export interface ILootResource extends ILoot {
  recipeIds: string[]
  resourceType: ILootResourceType
}

export interface ILootArmor extends ILoot {
  slot: 'head' | 'torso' | 'legs' | 'feet' | 'hands' | 'neck' | 'ring-1' | 'ring-2' | 'shield'
  defense: number
  attributes: Array<{
    field: string
    value: number
  }>
}

export interface ILootWeapon extends ILoot {
  slot: 'left' | 'right'
  dps: number
  stamina: number
  mana: number
  health?: number // >:B
}

export interface ILootConsumable extends ILoot {
  health?: number
  mana?: number
  stamina?: number
  dps?: number
  defense?: number
}