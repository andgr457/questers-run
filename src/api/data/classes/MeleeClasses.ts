import { ICharacterClass } from '../../interfaces/entities/character/ICharacterClass'

export const MELEE_CLASSES: ICharacterClass[] = [
  {
    id: 'knight',
    name: 'Knight',
    statModifiersPerLevel: {
      health: 20,
      mana: 5,
      stamina: 10,
      agility: 2,
      strength: 3,
      willpower: 1
    }
  }
]