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
    return this.ALL_QUESTS
    //TODO implement params
  }
}
