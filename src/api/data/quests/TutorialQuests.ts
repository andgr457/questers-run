import { IQuest } from '../../interfaces/entities/IQuest'

export const TUTORIAL_QUESTS: IQuest[] = [
  {
    id: 'quest-1',
    title: 'Explore the Woods',
    description: 'Adventure through the woods of Velmorra',
    experience: 7,
    level: 1,
    eventSpread: 3,
    time: 10,
    stamina: 10,
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
    id: 'quest-2',
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
  },
  {
    id: "quest-3",
    title: "Catch of the Day",
    description: "The village cook is running low on fresh fish for tonight's stew. Head to the shallow river near the docks and catch a Silverfin Darter and a Mudscale Perch.",
    experience: 8,
    level: 1,
    eventSpread: 3,
    time: 20,
    stamina: 25,
    gold: 3,
    possibleLootIds: [
      "fish-1",
      "fish-2",
      "vegetable-1"
    ],
    possibleMobIds: [],
    types: [
      "gather",
      "fishing"
    ]
  }

]