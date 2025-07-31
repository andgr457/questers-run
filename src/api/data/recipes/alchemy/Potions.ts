import { IRecipe } from '../../../interfaces/entities/IRecipe'

export const POTIONS_ALCHEMY_RECIPES: IRecipe[] = [
  {
    id: 'health-potion-recipe-1',
    title: 'Simple Health Potion',
    description: 'Heals a small amount of health.',
    profession: 'alchemy',
    level: 1,
    professionLevel: 0,
    stamina: 5,
    mana: 5,
    craftedItemId: 'health-potion-1',
    recipeItems: [
      {
        quantity: 3,
        resourceId: 'herb-1'
      },
      {
        quantity: 1,
        resourceId: 'vegetable-1'
      }
    ]
  },
  {
    id: 'mana-potion-recipe-1',
    title: 'Simple Mana Potion',
    description: 'Restores a small amount of mana.',
    profession: 'alchemy',
    level: 1,
    stamina: 5,
    mana: 5,
    professionLevel: 0,
    craftedItemId: 'mana-potion-1',
    recipeItems: [
      {
        quantity: 3,
        resourceId: 'herb-3'
      },
      {
        quantity: 1,
        resourceId: 'vegetable-1'
      }
    ]
  },
  {
    id: 'stamina-potion-recipe-1',
    title: 'Simple Stamina Potion',
    description: 'Restores a small amount of stamina.',
    profession: 'alchemy',
    level: 2,
    stamina: 15,
    mana: 5,
    professionLevel: 0,
    craftedItemId: 'stamina-potion-1',
    recipeItems: [
      {
        quantity: 3,
        resourceId: 'herb-3'
      },
      {
        quantity: 1,
        resourceId: 'vegetable-1'
      }
    ]
  }
]