import { InventoryTab } from './inventory'

export interface Player {
  level: number
  exp: number
  nextLevelExp: number
  inventory: InventoryTab
  gold: number
}
