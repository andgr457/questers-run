export interface ICharacterClass {
  id: string
  name: string
  statModifiersPerLevel: {
    health: number
    mana: number
    stamina: number
    strength: number
    willpower: number
    agility: number
  }
}