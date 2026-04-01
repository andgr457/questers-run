import { CRMember } from '../interfaces/CRMember';

export interface CRRecruit extends CRMember {
  cost: number
}

export const RECRUITS: CRRecruit[] = [
  {
    id: 'm_hayse',
    name: 'Hayse',
    class: 'Ranger',
    gold: 0,
    hp: 100,
    level: {
      value: 1,
      nextLevelXP: 100
    },
    sanity: 100,
    stamina: 100,
    status: 'idle',
    xp: 0,
    cost: 20
  },
  {
    id: 'm_eli',
    name: 'Eli',
    class: 'Knight',
    gold: 0,
    hp: 100,
    level: {
      value: 1,
      nextLevelXP: 100
    },
    sanity: 100,
    stamina: 100,
    status: 'idle',
    xp: 0,
    cost: 20
  },
  {
    id: 'm_lor',
    name: 'Lor',
    class: 'Priest',
    gold: 0,
    hp: 110,
    level: {
      value: 2,
      nextLevelXP: 200
    },
    sanity: 100,
    stamina: 100,
    status: 'idle',
    xp: 0,
    cost: 20
  }
]