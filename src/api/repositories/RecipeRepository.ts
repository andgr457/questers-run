import { POTIONS_ALCHEMY_RECIPES } from '../data/recipes/alchemy/Potions'
import { FISH_COOKING_RECIPES } from '../data/recipes/cooking/Fish'
import { VEGETABLES_COOKING_RECIPES } from '../data/recipes/cooking/Vegetables'
import { IRecipe } from '../interfaces/entities/IRecipe'
import { IRepository } from './IRepository'
import { Repository } from './Repository'

export class RecipeRepository extends Repository implements IRepository<IRecipe> {
  private ALL_RECIPES = [
    /** Alchemy */
    ...POTIONS_ALCHEMY_RECIPES,

    /** Cooking */
    ...VEGETABLES_COOKING_RECIPES,
    ...FISH_COOKING_RECIPES,
  ]

  list(params?: Partial<IRecipe>): IRecipe[] {
    if (!params) return this.ALL_RECIPES;

    return this.ALL_RECIPES.filter(r =>
      Object.entries(params).every(([key, value]) => r[key as keyof IRecipe] === value)
    );
  }
  
  getById(id: string): IRecipe {
    return this.ALL_RECIPES.find(r => r.id === id)
  }
}
