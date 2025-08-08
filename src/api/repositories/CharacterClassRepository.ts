import { MAGE_CLASSES } from '../data/classes/MageClasses'
import { MELEE_CLASSES } from '../data/classes/MeleeClasses'
import { ICharacterClass } from '../interfaces/entities/character/ICharacterClass'
import { IRepository } from './IRepository'
import { Repository } from './Repository'

export class CharacterClassRepository extends Repository implements IRepository<ICharacterClass> {
  private ALL_CLASSES = [
    ...MELEE_CLASSES,
    ...MAGE_CLASSES
  ]

  list(params?: ICharacterClass): ICharacterClass[] {
    return this.ALL_CLASSES
  }

  getById(id: string): ICharacterClass {
    return this.ALL_CLASSES.find(c => c.id === id)
  }
}