import { ILootConsumable } from '../../../interfaces/entities/ILoot';

export const VEGETABLES_COOKING_LOOT: ILootConsumable[] = [
  {
    id: 'vegetable-cooking-loot-1',
    title: 'Fried Bulbs',
    description: 'Fried vegetables slow roasted over a camp fire.',
    chance: 0.1,
    gold: 3,
    rarity: 'uncommon',
    type: 'consumable',
    defense: 2,
    dps: 1,
    health: 10,
    mana: 5,
    stamina: 20
  }
]