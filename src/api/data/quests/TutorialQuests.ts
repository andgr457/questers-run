import { IQuest } from '../../interfaces/entities/IQuest'

export const TUTORIAL_QUESTS: IQuest[] = [
  {
    id: 'explore-1',
    title: 'Explore the Woods',
    description: 'Adventure through the woods of Velmorra',
    experience: 7,
    level: 1,
    eventSpread: 3,
    time: 10,
    stamina: 35,
    gold: 0,
    possibleLootIds: [
      'herb-1',
      'herb-2',
      'vegetable-1'
    ],
    possibleMobIds: [
      'goblin-1'
    ],
    types: [
      'explore',
      'gather',
      'combat'
    ]
  },
  {
    id: 'goblins-1',
    title: 'Fight the Goblins',
    description: 'Thin out the goblin forces in the woods to defend the local villagers.',
    experience: 15,
    level: 2,
    eventSpread: 5,
    time: 30,
    stamina: 60,
    gold: 5,
    possibleLootIds: [
      'herb-3',
      'herb-2',
      'vegetable-2'
    ],
    possibleMobIds: [
      'goblin-1',
      'goblin-2',
      'goblin-3'
    ],
    types: [
      'combat',
      'gather'
    ]
  }
]