import { IRecipe } from '../../../interfaces/entities/IRecipe'

export const VEGETABLES_COOKING_RECIPES: IRecipe[] = [
  {
    id: 'vegetable-cooking-1',
    title: 'Fried Bulbs',
    description: 'Cooked bulbs over a camp fire.',
    professionLevel: 2,
    level: 3,
    craftedItemId: 'vegetable-cooking-loot-1',
    profession: 'cooking',
    stamina: 10,
    mana: 5,
    recipeItems: [
      {
        quantity: 3,
        resourceId: 'vegetable-2'
      }
    ]
  }
]