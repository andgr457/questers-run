import { TUTORIAL_QUESTS } from '../data/quests/TutorialQuests'
import { IQuest } from '../interfaces/entities/IQuest'
import { IRepository } from './IRepository'
import { Repository } from './Repository'


export class QuestRepository extends Repository implements IRepository<IQuest> {
  private ALL_QUESTS = [
    ...TUTORIAL_QUESTS,
    // ...TUTORIAL_QUESTS, //testing UI
  ]

  list(params?: IQuest): IQuest[] {
    if (!params) return this.ALL_QUESTS;

    return this.ALL_QUESTS.filter(r =>
      Object.entries(params).every(([key, value]) => r[key as keyof IQuest] === value)
    );
  }

  getById(id: string): IQuest {
    return this.ALL_QUESTS.find(m => m.id === id)
  }
}
