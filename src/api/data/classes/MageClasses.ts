import { ICharacterClass } from '../../interfaces/entities/character/ICharacterClass'

export const MAGE_CLASSES: ICharacterClass[] = [
  {
    id: 'wizard',
    name: 'Wizard',
    statModifiersPerLevel: {
      health: 7,
      mana: 15,
      stamina: 10,
      agility: 1,
      strength: 1,
      willpower: 3
    }
  },
  {
    id: 'battlemage',
    name: 'Battle Mage',
    statModifiersPerLevel: {
      health: 10,
      mana: 10,
      stamina: 10,
      agility: 2,
      strength: 2,
      willpower: 2
    }
  },
]