import { InventorySlot } from './inventory.interfaces'

export interface Vault {
  id: string
  name: string
  tabs: VaultTabs[]
}

export interface VaultTabs {
  id: string
  name: string
  contents: InventorySlot[]
}