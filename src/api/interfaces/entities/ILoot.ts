export interface ILoot {
  id: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  title: string
  description: string
  chance: number
  price: number
  type: 'resource' | 'consumable' | 'armor' | 'weapon'
}

export interface ILootResource extends ILoot {
  recipeIds: string[]
  
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