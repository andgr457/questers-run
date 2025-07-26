import { InventoryTab } from './inventory'

export interface  Player {
  name: string
  level: number
  exp: number
  nextLevelExp: number
  inventory: InventoryTab
  gold: number
}
