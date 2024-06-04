export interface CharacterClass {
  name: string
  description: string
  imageName: string
  credit: string
  attacks: string
  startAttack: number
  startDefense: number
  startHealth: number
  startMana: number
  startCrit: number
  startHitChance: number
  startCritChance: number
}

export interface ClassAttack {
  name: string
  class: string
}