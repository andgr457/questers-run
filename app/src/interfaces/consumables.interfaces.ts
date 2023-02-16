import { Rarity } from './rarity.interfaces'

export interface ConsumableBase {
  id: string
  name: string
  description: string
  rarity: Rarity
  stackable: boolean
  modifiers: {
    hp: number
    mana: number
    stamina: number
  }
  price: number
  cooldown: number
}
