import { Profession } from './IProfession'

export interface IRecipe {
  id: string
  title: string
  description: string
  level: number
  stamina: number
  mana: number
  professionLevel: number
  profession: Profession
  craftedItemId: string
  recipeItems: IRecipeItem[]
}

export interface IRecipeItem {
  resourceId: string
  quantity: number
}

export interface IRecipeAlchemy extends IRecipe {

}