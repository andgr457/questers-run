import { ILootConsumable } from '../../../interfaces/entities/ILoot'

export const FISH_COOKING_LOOT: ILootConsumable[] = [
  {
    id: 'fish-cooking-loot-1',
    title: 'Fisherman\'s Shore Stew',
    description: 'A quick shimmering river fish pirzed for its delivate flavor',
    chance: .07,
    gold: 5,
    rarity: 'common',
    type: 'consumable',
    defense: 1,
    dps: 2,
    health: 20,
    mana: 20,
    stamina: 20
  }
]