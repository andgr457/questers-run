import { IMob } from '../interfaces/entities/IMob';
import { IRepository } from './IRepository';
import { Repository } from './Repository';

export class MobRepository extends Repository implements IRepository<IMob> {
  list(params?: IMob): IMob[] {
    return [...MOBS_COMMON]
  }
}

const MOBS_COMMON: IMob[] = [
  {
    id: 'goblin-1',
    name: 'Frail Goblin',
    defense: 1,
    dps: 5,
    experience: 5,
    level: 1,
    type: 'common',
    chance: .5
  }
]