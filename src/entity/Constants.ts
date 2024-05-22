import { Attack } from '../components/QuickEncounter'
import { CharacterClass, Bag, ItemRarity, Item, Mob } from './entity.interface'

export const IMG_ZZZ__ICON8 = 'https://icons8.com/icon/6374/sleep'
export const IMG_MAGE_ICON8 = 'https://icons8.com/icon/TYJEetqy7xCk/mage'
export const IMG_ROGUE_ICON8 = 'https://icons8.com/icon/ZqDbnyVTvEPy/rogue'
export const IMG_WARRIOR_ICON8 = 'https://icons8.com/icon/7Us820vzFood/warrior'
// export const IMG_WARRIOR_ICON8 = '<a target="_blank" href="https://icons8.com/icon/7Us820vzFood/warrior">Warrior</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>'

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
      startCritChance: 20
    },
    {
      name: 'Mage', 
      description: 'A master of arcane arts, weaving spells and conjuring elements, wielding the powers of magic to shape reality and bend the forces of nature to their will.',
      imageName: 'mage.png',
      credit: IMG_MAGE_ICON8,
      attacks: 'Mage',
      startAttack: 2,
      startDefense: -1,
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
      startDefense: -1,
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
        startDefense: -1,
        startHealth: 10,
        startMana: 10,
        startCrit: 1.7,
        startHitChance: 80,
        startCritChance: 25
    }
  ]

export const ATTACKS: Attack[] = [
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

export const BAGS: Bag[] = [
    {
        items: [],
        name: 'Pillowcase',
        slots: 4,
        rarity: 'Common',
        baseValue: 1,
        description: `Can't really use it to sleep with anymore.`
    },
    {
        items: [],
        name: 'Snap Close',
        slots: 1,
        baseValue: 1,
        description: 'Hold some apple slices.',
        rarity: 'Common'
    },
    {
        items: [],
        name: 'Brown Backpack',
        baseValue: 2,
        description: 'Provides bad back posture due to the time spent in school.',
        rarity: 'Common',
        slots: 6
    },
    {
        items: [],
        name: 'Mule',
        baseValue: 2,
        description: 'Eee ahhh!',
        rarity: 'Slick',
        slots: 6
    },
    {
        items: [],
        name: 'Mavrick the Mule',
        baseValue: 50,
        description: 'Eee ahhh, eeeeee awww, eee ahhh!',
        rarity: 'Unique',
        slots: 12
    }
]

export const ITEM_RARITIES: ItemRarity[] = [
    {
        name: 'Basic',
        valueModifier: 1 //1 * value
    },
    {
        name: 'Neat',
        valueModifier: 2
    },
    {
        name: 'Slick',
        valueModifier: 3
    },
    {
        name: 'Bruh',
        valueModifier: 4
    },
    {
        name: 'Legend',
        valueModifier: 5
    },
    {
        name: 'Unique',
        valueModifier: 6
    }
    
]
export const ITEM_SOAP: Item = {name: 'Soap', baseValue: 1, rarity: 'Basic', description: 'This mystical bar of cleanliness promises to wash away your trouble... Maybe a few enemies if you can get a grip on it!'}

export const STOCK_NAMES: string[] = [
    'Thalindor', 'Eliria', 'Grommash', 'Lysandra', 'Calenon', 'Neridia', 'Thundar', 'Seraphina', 'Zephyrus', 'Lyria',
    'Faelar', 'Aeris', 'Valthor', 'Elysium', 'Maelis', 'Darian', 'Liora', 'Elandrial', 'Sylvara', 'Valen',
    'Aurelia', 'Daelor', 'Thyria', 'Eolande', 'Talon', 'Ilyndra', 'Raelin', 'Caelum', 'Nerion', 'Lunara',
    'Draven', 'Ithilien', 'Seren', 'Elandra', 'Varian', 'Liora', 'Arannis', 'Fenris', 'Talindra', 'Elys',
    'Aerion', 'Lysandra', 'Caelia', 'Thalor', 'Virel', 'Elara', 'Mithral', 'Sylas', 'Talira', 'Zirelia',
    'Arvandor', 'Calindra', 'Zephyra', 'Eryndor', 'Thalara', 'Glyndor', 'Meloria', 'Xandros', 'Feralyn', 'Nymeria',
    'Tavaris', 'Oriana', 'Valoria', 'Zenithra', 'Galadriel', 'Korinth', 'Mythoria', 'Aldoria', 'Orinthal', 'Sylthar',
    'Ferelda', 'Ilarion', 'Kendar', 'Yvresse', 'Elowen', 'Vandor', 'Xelara', 'Thorian', 'Ylandra', 'Zelphyr'
]

export const TypeColors = {
    'Common': 'gray',
    'Elite': 'green',
    'Boss': 'purple',
    'Rare': 'gold'
}

export const MOBS: Mob[] = [
    {
        name: 'Goblin',
        type: 'Common',
        attack: 3,
        health: 25,
        maxHealth: 25,
        mana: 0,
        maxMana: 0,
        level: 1,
        defense: 1,
        expGiven: 25,
        foundIn: [MODES.GRIND, MODES.QUEST, MODES.DUNGEON, MODES.RAID],
        imageName: 'goblin.png',
        chanceToShow: 10,
        hitChance: 33,

    },
    {
        name: 'Theif',
        type: 'Common',
        attack: 5,
        health: 30,
        maxHealth: 30,
        mana: 0,
        maxMana: 0,
        level: 2,
        defense: 2,
        expGiven: 40,
        foundIn: [MODES.GRIND, MODES.QUEST, MODES.DUNGEON, MODES.RAID],
        imageName: 'theif.png',
        chanceToShow: 15,
        hitChance: 45,
    },
    {
        name: 'Wolf',
        type: 'Common',
        attack: 5,
        health: 30,
        maxHealth: 30,
        mana: 0,
        maxMana: 0,
        level: 2,
        defense: 2,
        expGiven: 40,
        foundIn: [MODES.GRIND, MODES.QUEST, MODES.DUNGEON, MODES.RAID],
        imageName: 'golbin.png',
        chanceToShow: 15,
        hitChance: 45,
    },
    {
        name: 'Troll',
        attack: 10,
        health: 50,
        level: 3,
        maxHealth: 50,
        mana: 0,
        maxMana: 0,
        type: 'Elite',
        defense: 2,
        expGiven: 65,
        chanceToShow: 10,
        foundIn: [MODES.QUEST, MODES.DUNGEON, MODES.RAID],
        imageName: 'troll.png',
        hitChance: 35
    },
    {
        name: 'Dragon',
        attack: 15,
        health: 150,
        level: 4,
        maxHealth: 150,
        mana: 30,
        maxMana: 30,
        type: 'Rare',
        defense: 5,
        expGiven: 100,
        foundIn: [MODES.DUNGEON, MODES.RAID],
        imageName: 'dragon.png',
        chanceToShow: 60,
        hitChance: 40
    }
]