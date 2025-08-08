import { ICharacterClass } from '../../interfaces/entities/character/ICharacterClass'

export const MELEE_CLASSES: ICharacterClass[] = [
  {
    id: 'knight',
    name: 'Knight',
    statModifiersPerLevel: {
      health: 18,
      mana: 5,
      stamina: 10,
      agility: 2,
      strength: 3,
      willpower: 1
    }
  },
  {
    id: 'rogue',
    name: 'Rogue',
    statModifiersPerLevel: {
      health: 13,
      mana: 7,
      stamina: 20,
      agility: 3,
      strength: 2,
      willpower: 1
    }
  },
]