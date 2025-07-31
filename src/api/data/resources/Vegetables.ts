import { ILootResource } from '../../interfaces/entities/ILoot'

export const VEGETABLES_LOOT: ILootResource[] = [
  {
    id: 'vegetable-1',
    title: 'Sunbulb',
    description: 'A golden root vegetable that grows toward the light.',
    type: 'resource',
    recipeIds: [
      'healing-potion-1',
      'mana-potion-1',
      'stamina-potion-1'
    ],
    chance: .11,
    gold: 1,
    rarity: 'common',
    resourceType: 'vegetable'
  },
  {
    id: 'vegetable-2',
    title: 'Dawnbulb',
    description: 'A golden root vegetable that grows in the mornings.',
    type: 'resource',
    recipeIds: [
      'stamina-potion-1'
    ],
    chance: .08,
    gold: 2,
    rarity: 'uncommon',
    resourceType: 'vegetable'
  }
]