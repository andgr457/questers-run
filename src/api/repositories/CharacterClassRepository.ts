import { ICharacterClass } from '../interfaces/entities/character/ICharacterClass';
import { IRepository } from './IRepository';
import { Repository } from './Repository';

export class CharacterClassRepository extends Repository implements IRepository<ICharacterClass> {
  list(params?: ICharacterClass): ICharacterClass[] {
    return CHARACTER_CLASSES
  }
}

const CHARACTER_CLASSES: ICharacterClass[] = [
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