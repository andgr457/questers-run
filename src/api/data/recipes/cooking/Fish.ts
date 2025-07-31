import { IRecipe } from '../../../interfaces/entities/IRecipe'

export const FISH_COOKING_RECIPES: IRecipe[] = [
  {
    id: 'fish-cooking-recipe-1',
    title: 'Fisherman\'s Shore Stew',
    description: 'A hearty, no-frills stew made from freshly caught Silverfin Darter and Mudscale Perch.',
    craftedItemId: 'fish-cooking-loot-1',
    level: 1,
    mana: 5,
    profession: 'cooking',
    professionLevel: 1,
    recipeItems: [
      {
        quantity: 1,
        resourceId: 'fish-1'
      },
      {
        quantity: 1,
        resourceId: 'fish-2'
      }
    ],
    stamina: 10
  }
]