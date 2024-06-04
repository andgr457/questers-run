import { ItemLink } from './item'

export interface Inventory {
  title: string
  tabs: InventoryTab[]
  maxTabs: number
}

export interface InventoryTab {
  title: string
  items: ItemLink[]
  maxItems: number
}