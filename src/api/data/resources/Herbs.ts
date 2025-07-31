import { ILootResource } from '../../interfaces/entities/ILoot'

export const HERBS_LOOT: ILootResource[] = [
  {
    id: 'herb-1',
    title: 'Sunleaf',
    description: 'A fiery herb used in potion crafting.',
    type: 'resource',
    recipeIds: [
      'healing-potion-1',
    ],
    chance: .09,
    gold: 2,
    rarity: 'common',
    resourceType: 'herb'
  },
  {
    id: 'herb-2',
    title: 'Dawnleaf',
    description: 'A morning dew herb used in potion crafting.',
    type: 'resource',
    recipeIds: [
      'stamina-potion-1'
    ],
    chance: .09,
    gold: 2,
    rarity: 'common',
    resourceType: 'herb'
  },
  {
    id: 'herb-3',
    title: 'Lunaleaf',
    description: 'A nocturnal herb used in potion crafting.',
    type: 'resource',
    recipeIds: [
      'mana-potion-1'
    ],
    chance: .09,
    gold: 2,
    rarity: 'common',
    resourceType: 'herb'
  }
]
