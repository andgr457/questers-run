import { IQuest } from '../interfaces/entities/IQuest';
import { IRepository } from './IRepository';
import { Repository } from './Repository';


export class QuestRepository extends Repository implements IRepository<IQuest> {
  list(params?: IQuest): IQuest[] {
    return QUESTS
    //TODO implement params
  }
}

const QUESTS: IQuest[] = [
  {
    id: 'explore-1',
    title: 'Explore the Woods',
    description: 'Adventure through the woods of Velmorra',
    experience: 15,
    level: 1,
    eventSpread: 3,
    time: 20,
    stamina: 20,
    possibleLootIds: [
      'herb-1'
    ],
    possibleMobIds: [
      
    ],
  },
  {
    id: 'goblins-1',
    title: 'Fight the Goblins',
    description: 'Thin out the goblin forces to defend local villages.',
    experience: 25,
    level: 2,
    eventSpread: 5,
    time: 60,
    stamina: 40,
    possibleLootIds: [

    ],
    possibleMobIds: [

    ],
  }
]