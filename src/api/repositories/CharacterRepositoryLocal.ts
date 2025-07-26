import { ICharacter, ICharacterCreate, ICharacterUpdate } from '../interfaces/entities/ICharacter';
import { IRepository } from './IRepository';

interface CharacterListParams {
  name?: string
  level_gt?: number
  level_lt?: number
  class?: string
}

/** This helps service data from the local brower. */
export class CharacterRepositoryLocal implements IRepository<CharacterListParams, ICharacter, ICharacterCreate, ICharacterUpdate> {
  getById(id: string): Promise<ICharacter> {
    throw new Error('Method not implemented.')
  }
  list(params?: CharacterListParams): Promise<ICharacter[]> {
    throw new Error('Method not implemented.')
  }
  create(object: ICharacterCreate): Promise<ICharacter> {
    throw new Error('Method not implemented.')
  }
  update(object: ICharacterUpdate): Promise<ICharacter> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

}