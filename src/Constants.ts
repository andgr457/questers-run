import { Bag, CharacterClass, Item, ItemRarity } from "./Characters"
import { Attack } from "./QuickEncounter"

export const IMG_ZZZ__ICON8 = '<a target="_blank" href="https://icons8.com/icon/6374/sleep">Sleep</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>'
export const IMG_MAGE_ICON8 = '<a target="_blank" href="https://icons8.com/icon/TYJEetqy7xCk/mage">mage</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>'
export const IMG_ROGUE_ICON8 = '<a target="_blank" href="https://icons8.com/icon/ZqDbnyVTvEPy/rogue">Rogue</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>'
export const IMG_WARRIOR_ICON8 = '<a target="_blank" href="https://icons8.com/icon/7Us820vzFood/warrior">Warrior</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>'

export const CLASSES: CharacterClass[] = [
    {
      name: 'Warrior', 
      description: 'A valiant knight clad in formidable armor, wielding a mighty blade with unmatched skill, standing as the indomitable champion of the battlefield.',
      imageName: 'warrior.png',
      credit: IMG_WARRIOR_ICON8,
      attacks: 'Warrior',
      startAttack: 3,
      startDefense: 2,
      startHealth: 110
    },
    {
      name: 'Mage', 
      description: 'A master of arcane arts, weaving spells and conjuring elements, wielding the powers of magic to shape reality and bend the forces of nature to their will.',
      imageName: 'mage.png',
      credit: IMG_MAGE_ICON8,
      attacks: 'Mage',
      startAttack: 2,
      startDefense: -1,
      startHealth: 90
    },
    {
      name: 'Rogue', 
      description: 'A stealthy shadow-dancer, adept in the arts of deception and subterfuge, wielding daggers and bows to strike from the shadows with lethal precision.',
      imageName: 'rogue.png',
      credit: IMG_ROGUE_ICON8,
      attacks: 'Rogue',
      startAttack: 4,
      startDefense: -1,
      startHealth: 95
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
        class: 'Warrior',
        name: 'Side Slash'
    },
    {
        class: 'Warrior',
        name: 'Power Chop'
    },
    {
        class: 'Rogue',
        name: 'Backstab'
    },
    {
        class: 'Rogue',
        name: 'Kidney Shot'
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
