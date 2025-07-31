export type Profession = 'alchemy' | 'fishing' | 'cooking' | 'smithing' 

export interface IProfession {
  id: string
  title: string
  description: string
  level: number
  recipeIds: string[]
}