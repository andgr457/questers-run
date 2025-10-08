import { IQuest } from '../../interfaces/entities/IQuest'
import { FISH_JUNK_LOOT } from '../resources/Fish.junk'

export const TUTORIAL_QUESTS: IQuest[] = [
  {
    id: 'quest-1',
    title: 'Explore the Woods',
    description: 'What am I even doing in Velmorra?',
    experience: 5,
    level: 1,
    eventSpread: 3,
    time: 10,
    stamina: 5,
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
    ],
    regionId: 'reg1'
  },
  {
    id: 'quest-2',
    title: 'Fight the Goblins',
    description: 'Thin out the goblin forces in the woods to defend the local villagers.',
    experience: 8,
    level: 2,
    eventSpread: 5,
    time: 30,
    stamina: 15,
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
    ],
    regionId: 'reg1'
  },
  {
    id: "quest-3",
    title: "Catch of the Day",
    description: "The village cook is running low on fresh fish for tonight's stew. Head to the shallow river near the docks and catch a Silverfin Darter and a Mudscale Perch.",
    experience: 2,
    level: 1,
    eventSpread: 3,
    time: 60,
    stamina: 5,
    gold: 3,
    possibleLootIds: [
      "fish-1",
      "fish-2",
      "vegetable-1",
      ...FISH_JUNK_LOOT.map(jl => jl.id)
    ],
    possibleMobIds: [],
    types: [
      "gather",
      "fishing"
    ],
    regionId: 'reg1'
  },
  {
    id: "quest-4",
    title: "Sam's Horse",
    description: "Somebody took Sam's horse and he needs someone to get it back for him while he tends to his farm.",
    experience: 3,
    level: 2,
    eventSpread: 3,
    time: 40,
    stamina: 15,
    gold: 3,
    possibleLootIds: [
      'herb-3',
      'vegetable-1',
      'vegetable-2'
    ],
    possibleMobIds: [
      'goblin-1',
      'goblin-2',
      'goblin-3'
    ],
    types: [
      "combat",
      "explore"
    ],
    regionId: 'reg2'
  }

]