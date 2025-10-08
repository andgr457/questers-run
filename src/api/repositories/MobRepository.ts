import { GOLBLIN_MOBS } from '../data/mobs/Goblins'
import { IMob } from '../interfaces/entities/IMob'
import { IRepository } from '../interfaces/entities/IRepository'
import { Repository } from './Repository'

export class MobRepository extends Repository implements IRepository<IMob> {
  private ALL_MOBS = [
    /** Goblins */
    ...GOLBLIN_MOBS
  ]

  list(params?: IMob): IMob[] {
    if (!params) return this.ALL_MOBS;

    return this.ALL_MOBS.filter(r =>
      Object.entries(params).every(([key, value]) => r[key as keyof IMob] === value)
    );
  }

  getById(id: string): IMob {
    return this.ALL_MOBS.find(m => m.id === id)
  }
}
