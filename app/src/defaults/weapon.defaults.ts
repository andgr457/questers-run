import { WeaponBase } from '../interfaces/weapons.interfaces';

export const DefaultWarriorWeapons: WeaponBase[] = [
  {
    id: 'default_warrior_sword',
    name: 'Rusty Sword',
    description: 'An old sword.',
    cooldown: 1,
    damage: 2,
    durability: 100,
    level: 0,
    rarity: 'common',
    repairCost: 2,
    twoHanded: false,
    type: 'melee',
    weight: 3,
    offhand: false
  },
  {
    id: 'default_warrior_shield',
    name: 'Rusty Sword',
    description: 'An old shield.',
    cooldown: 5,
    damage: 0,
    durability: 100,
    level: 0,
    rarity: 'common',
    repairCost: 2,
    twoHanded: false,
    type: 'shield',
    weight: 5,
    offhand: true
  }
]