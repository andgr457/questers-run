import { Currency } from './currency'
import { InventoryTab } from './inventory'

export interface Player {
  level: number
  exp: number
  nextLevelExp: number
  inventory: InventoryTab
  currency: Currency
}

const MAX_PLAYER_LEVEL = 10

export class PlayerClass implements Player {
  level: number
  exp: number
  nextLevelExp: number
  inventory: InventoryTab
  currency: Currency

  constructor(player?: Player){
    if(player){
      this.level = player.level
      this.exp = player.exp
      this.nextLevelExp = player.nextLevelExp
      this.inventory = player.inventory
      this.currency = player.currency
    } else {
      this.level = 1
      this.exp = 0
      this.nextLevelExp = this.determinePlayerNextLevelExp()
      this.inventory = {
        title: 'Player Inventory',
        items: [],
        maxItems: 10
      }
      this.currency = {
        copper: 0,
        gold: 0,
        platinum: 0,
        silver: 0
      }
    }
  }

  doPlayerExperience(amount: number): void {
    if(this.level >= MAX_PLAYER_LEVEL) return
  
    this.exp += amount
    if(this.exp >= this.nextLevelExp){
      const leftOverExp = Math.max(this.exp - this.nextLevelExp, 0)
      this.doPlayerLevelUp()
      this.exp += leftOverExp
    }
  }

  doPlayerLevelUp(): void {
    this.exp = 0
    this.level += 1
    this.nextLevelExp = this.determinePlayerNextLevelExp()
  }

  determinePlayerNextLevelExp(): number {
    return (this.level + .5) * 300
  }
}
