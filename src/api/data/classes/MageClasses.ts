import { ICharacterClass } from '../../interfaces/entities/character/ICharacterClass'

export const MAGE_CLASSES: ICharacterClass[] = [
  {
    id: 'wizard',
    name: 'Knight',
    statModifiersPerLevel: {
      health: 10,
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
      health: 7,
      mana: 5,
      stamina: 10,
      agility: 3,
      strength: 2,
      willpower: 1
    }
  },
]