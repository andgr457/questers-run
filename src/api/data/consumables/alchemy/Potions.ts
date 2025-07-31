import { ILootConsumable } from '../../../interfaces/entities/ILoot'

// #region POTIONS
export const POTION_LOOT: ILootConsumable[] = [
  {
    id: 'health-potion-1',
    chance: .05,
    description: 'Heals a small amount health on use.',
    gold: 5,
    rarity: 'common',
    title: 'Simple Health Potion',
    type: 'consumable',
    defense: 0,
    dps: 0,
    health: 25,
    mana: 0,
    stamina: 0
  },
  {
    id: 'mana-potion-1',
    chance: .05,
    description: 'Restores a small amount mana on use.',
    gold: 5,
    rarity: 'common',
    title: 'Simple Mana Potion',
    type: 'consumable',
    defense: 0,
    dps: 0,
    health: 0,
    mana: 25,
    stamina: 0
  },
  {
    id: 'stamina-potion-1',
    chance: .05,
    description: 'Heals a small amount health on use.',
    gold: 5,
    rarity: 'common',
    title: 'Simple Stamina Potion',
    type: 'consumable',
    defense: 0,
    dps: 0,
    health: 25,
    mana: 0,
    stamina: 0
  }
]