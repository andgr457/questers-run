import { IMob } from '../../interfaces/entities/IMob'

// #region GOBLINS
export const GOLBLIN_MOBS: IMob[] = [
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
    name: 'Mind Goblin',
    description: 'A trickster of sort. Do not fall for his quips.',
    defense: 2,
    dps: 13,
    experience: 8,
    level: 1,
    type: 'rare',
    chance: .15,
    gold: 2,
    agility: 2
  },
  {
    id: 'goblin-3',
    name: 'Papa Goblin',
    description: 'Big daddy hot papa mamma mia.',
    defense: 3,
    dps: 16,
    experience: 12,
    level: 2,
    type: 'elite',
    chance: .07,
    gold: 12,
    agility: 3
  },
]