import { GOLBLIN_MOBS } from '../data/mobs/Goblins'
import { IMob } from '../interfaces/entities/IMob'
import { IRepository } from './IRepository'
import { Repository } from './Repository'

export class MobRepository extends Repository implements IRepository<IMob> {
  private ALL_MOBS = [
    /** Goblins */
    ...GOLBLIN_MOBS
  ]

  list(params?: IMob): IMob[] {
    return [...this.ALL_MOBS]
  }

  getById(id: string): IMob {
    return this.ALL_MOBS.find(m => m.id === id)
  }
}
