import { CharacterClass, ClassAttack } from './classes'
import { BaseItem } from './item'
import { Mob } from './mob'

export const IMG_ZZZ__ICON8 = 'https://icons8.com/icon/6374/sleep'
export const IMG_MAGE_ICON8 = 'https://icons8.com/icon/TYJEetqy7xCk/mage'
export const IMG_ROGUE_ICON8 = 'https://icons8.com/icon/ZqDbnyVTvEPy/rogue'
export const IMG_WARRIOR_ICON8 = 'https://icons8.com/icon/7Us820vzFood/warrior'

export enum MODES {
  GRIND = 'Grind',
  QUEST = 'Quest',
  DUNGEON = 'Dungeon',
  RAID = 'Raid'
}

export const CLASSES: CharacterClass[] = [
    {
      name: 'Warrior', 
      description: 'A valiant knight clad in formidable armor, wielding a mighty blade with unmatched skill, standing as the indomitable champion of the battlefield.',
      imageName: 'warrior.png',
      credit: IMG_WARRIOR_ICON8,
      attacks: 'Warrior',
      startAttack: 3,
      startDefense: 2,
      startHealth: 20,
      startMana: 0,
      startCrit: 1.5,
      startHitChance: 85,
      startCritChance: 20,
    },
    {
      name: 'Mage', 
      description: 'A master of arcane arts, weaving spells and conjuring elements, wielding the powers of magic to shape reality and bend the forces of nature to their will.',
      imageName: 'mage.png',
      credit: IMG_MAGE_ICON8,
      attacks: 'Mage',
      startAttack: 2,
      startDefense: 0,
      startHealth: 10,
      startMana: 10,
      startCrit: 1.7,
      startHitChance: 80,
      startCritChance: 25
    },
    {
      name: 'Rogue', 
      description: 'A stealthy shadow-dancer, adept in the arts of deception and subterfuge, wielding daggers and bows to strike from the shadows with lethal precision.',
      imageName: 'rogue.png',
      credit: IMG_ROGUE_ICON8,
      attacks: 'Rogue',
      startAttack: 4,
      startDefense: 0,
      startHealth: 15,
      startMana: 0,
      startCrit: 2,
      startHitChance: 95,
      startCritChance: 50
    },
    {
        name: 'Shaman',
        description: 'A mystical shaman draped in ceremonial robes, channeling the ancient energies of nature with unparalleled wisdom, standing as the steadfast guardian of life and spirit.',
        imageName: 'rogue.png',
        credit: IMG_ROGUE_ICON8,
        attacks: 'Shaman',
        startAttack: 3,
        startDefense: 0,
        startHealth: 10,
        startMana: 10,
        startCrit: 1.7,
        startHitChance: 80,
        startCritChance: 25
    }
  ]



export const LESSER_HEALING_POTION: BaseItem = {
    name: 'Lesser Healing Potion',
    baseValue: 4,
    buffStats: [{
        field: 'health',
        name: 'Heal HP',
        value: 5
    }],
    category: 'Healing Potion',
    description: 'Go heal yourself.',
    hash: undefined,
    rarity: 'Common',
    requiredLevel: 1,
    stackable: true,
    type: 'Consumable',
    value: 5,
    gridSize: {
        x: 1,
        y: 1
    }
}

export const GREATER_HEALING_POTION: BaseItem = {
    name: 'Greater Healing Potion',
    baseValue: 8,
    buffStats: [{
        field: 'health',
        name: 'Heal HP',
        value: 14
    }],
    category: 'Healing Potion',
    description: 'Go heal yourself.',
    hash: undefined,
    rarity: 'Common',
    requiredLevel: 1,
    stackable: true,
    type: 'Consumable',
    value: 20,
    gridSize: {
        x: 1,
        y: 1
    }
}

export const LESSER_MANA_POTION: BaseItem = {
    name: 'Lesser Mana Potion',
    baseValue: 4,
    buffStats: [{
        field: 'mana',
        name: 'Recover Mana',
        value: 5
    }],
    category: 'Mana Potion',
    description: 'Recover some mana.',
    hash: undefined,
    rarity: 'Common',
    requiredLevel: 1,
    stackable: true,
    type: 'Consumable',
    value: 5,
    gridSize: {
        x: 1,
        y: 1
    }
}


export const GREATER_MANA_POTION: BaseItem = {
    name: 'Greater Healing Potion',
    baseValue: 8,
    buffStats: [{
        field: 'mana',
        name: 'Recover Mana',
        value: 14
    }],
    category: 'Mana Potion',
    description: 'Recover a lot of mana.',
    hash: undefined,
    rarity: 'Common',
    requiredLevel: 1,
    stackable: true,
    type: 'Consumable',
    value: 20,
    gridSize: {
        x: 1,
        y: 1
    }
}

export const POTIONS: BaseItem[] = [
    {...LESSER_HEALING_POTION},
    {...GREATER_HEALING_POTION},
    {...LESSER_MANA_POTION},
    {...GREATER_MANA_POTION}
]

export const ALL_ITEMS: BaseItem[] = [...POTIONS]

export const ATTACKS: ClassAttack[] = [
    {
        class: 'Mage',
        name: 'Ice Blast'
    },
    {
        class: 'Mage',
        name: 'Fire Ball'
    },
    {
        class: 'Mage',
        name: 'Mana Ray'
    },
    {
        class: 'Mage',
        name: 'Nova Bubble'
    },
    {
        class: 'Warrior',
        name: 'Side Slash'
    },
    {
        class: 'Warrior',
        name: 'Power Chop'
    },
    {
        class: 'Warrior',
        name: 'Hilt Smash'
    },
    {
        class: 'Warrior',
        name: 'Enraged Jab'
    },
    {
        class: 'Rogue',
        name: 'Backstab'
    },
    {
        class: 'Rogue',
        name: 'Kidney Shot'
    },
    {
        class: 'Rogue',
        name: 'Stealth Gib'
    },
    {
        class: 'Rogue',
        name: 'Long Rend'
    }
]

export const MOBS: Mob[] = [
    {
        name: 'Goblin',
        type: 'Common',
        attack: 1,
        health: 6,
        maxHealth: 6,
        mana: 0,
        maxMana: 0,
        level: 1,
        defense: 1,
        expGiven: 6,
        foundIn: [MODES.GRIND, MODES.QUEST, MODES.DUNGEON, MODES.RAID],
        imageName: 'goblin.png',
        chanceToShow: 10,
        hitChance: 33,

    },
    {
        name: 'Theif',
        type: 'Common',
        attack: 2,
        health: 5,
        maxHealth: 30,
        mana: 0,
        maxMana: 0,
        level: 2,
        defense: 2,
        expGiven: 5,
        foundIn: [MODES.GRIND, MODES.QUEST, MODES.DUNGEON, MODES.RAID],
        imageName: 'theif.png',
        chanceToShow: 15,
        hitChance: 45,
    },
    {
        name: 'Wolf',
        type: 'Common',
        attack: 2,
        health: 5,
        maxHealth: 30,
        mana: 0,
        maxMana: 0,
        level: 2,
        defense: 2,
        expGiven: 7,
        foundIn: [MODES.GRIND, MODES.QUEST, MODES.DUNGEON, MODES.RAID],
        imageName: 'golbin.png',
        chanceToShow: 15,
        hitChance: 45,
    },
    {
        name: 'Troll',
        attack: 4,
        health: 30,
        level: 3,
        maxHealth: 50,
        mana: 0,
        maxMana: 0,
        type: 'Elite',
        defense: 2,
        expGiven: 15,
        chanceToShow: 10,
        foundIn: [MODES.QUEST, MODES.DUNGEON, MODES.RAID],
        imageName: 'troll.png',
        hitChance: 35
    },
    {
        name: 'Dragon',
        attack: 6,
        health: 40,
        level: 4,
        maxHealth: 150,
        mana: 40,
        maxMana: 40,
        type: 'Rare',
        defense: 5,
        expGiven: 30,
        foundIn: [MODES.DUNGEON, MODES.RAID],
        imageName: 'dragon.png',
        chanceToShow: 60,
        hitChance: 40
    }
]