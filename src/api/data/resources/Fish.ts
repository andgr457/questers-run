import { ILootResource } from '../../interfaces/entities/ILoot';

export const FISH_LOOT: ILootResource[] = [
  {
    id: 'fish-1',
    title: 'Silverfin Darter',
    description: 'A quick shimmering river fish pirzed for its delivate flavor.',
    chance: .07,
    gold: 5,
    rarity: 'common',
    type: 'resource',
    recipeIds: [
      'fish-cooking-1'
    ],
    resourceType: 'fish'
  },
  {
    id: 'fish-2',
    title: 'Mudscale Perch',
    description: 'A hardy, bottom-feeding fish often caught by novice anglers.',
    chance: .04,
    gold: 5,
    rarity: 'uncommon',
    type: 'resource',
    recipeIds: [
      'fish-cooking-1'
    ],
    resourceType: 'fish'
  }
]