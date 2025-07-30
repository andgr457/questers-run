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
    description: 'A lost goblin looking for his group.',
    defense: 1,
    dps: 10,
    experience: 4,
    level: 1,
    type: 'common',
    chance: .15,
    gold: 2,
    agility: 2
  },
  {
    id: 'goblin-2',
    name: 'Papa Goblin',
    description: 'Big daddy hot papa mamma mia.',
    defense: 3,
    dps: 15,
    experience: 10,
    level: 2,
    type: 'elite',
    chance: .07,
    gold: 12,
    agility: 3
  },
]