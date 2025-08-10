import { ILootResource } from '../../interfaces/entities/ILoot';

export const FISH_JUNK_LOOT: ILootResource[] = [
  {
    id: 'fish-junk-1',
    title: 'Mossy Stick',
    description: 'An ageless piece of technology.',
    chance: .17,
    gold: 1,
    rarity: 'common',
    type: 'resource',
    recipeIds: [],
    resourceType: 'junk'
  },
  {
    id: 'fish-junk-2',
    title: 'Lily Pad',
    description: 'A hardy, bottom-feeding fish often caught by novice anglers.',
    chance: .11,
    gold: 2,
    rarity: 'uncommon',
    type: 'resource',
    recipeIds: [],
    resourceType: 'junk'
  },
  {
    id: 'fish-junk-3',
    title: 'Muddy Boots',
    description: 'Boots left behind by ancestors.',
    chance: .08,
    gold: 4,
    rarity: 'uncommon',
    type: 'resource',
    recipeIds: [],
    resourceType: 'junk'
  }
]