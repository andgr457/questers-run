import { ArmorBase } from '../interfaces/armor.interfaces';

export const DefaultWarriorArmor: ArmorBase[] = [
  {
    id: 'default_warrior_head',
    durability: 100,
    material: 'Metal',
    name: 'Rusty Helm',
    description: 'An old helm.',
    price: 1,
    protection: 1,
    rarity: 'common',
    repairCost: 1,
    slot: 'Head',
    type: 'Heavy',
    weight: 2
  },
  {
    id: 'default_warrior_chest',
    durability: 100,
    material: 'Metal',
    name: 'Rusty Chestplate',
    description: 'An old chestplate.',
    price: 1,
    protection: 3,
    rarity: 'common',
    repairCost: 2,
    slot: 'Chest',
    type: 'Heavy',
    weight: 4
  },
  {
    id: 'default_warrior_legs',
    durability: 100,
    material: 'Metal',
    name: 'Rusty Legplates',
    description: 'Old legplates.',
    price: 1,
    protection: 3,
    rarity: 'common',
    repairCost: 2,
    slot: 'Legs',
    type: 'Heavy',
    weight: 4
  },
  {
    id: 'default_warrior_feet',
    durability: 100,
    material: 'Metal',
    name: 'Rusty Boots',
    description: 'A pair of old boots.',
    price: 1,
    protection: 3,
    rarity: 'common',
    repairCost: 2,
    slot: 'Feet',
    type: 'Heavy',
    weight: 2
  },
  {
    id: 'default_warrior_hands',
    durability: 100,
    material: 'Metal',
    name: 'Rusty Gauntlets',
    description: 'A pair of old gauntlets.',
    price: 1,
    protection: 3,
    rarity: 'common',
    repairCost: 2,
    slot: 'Hands',
    type: 'Heavy',
    weight: 2
  }
]
