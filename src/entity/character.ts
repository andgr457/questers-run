import { BaseEntity } from './base.entity'
import { Currency } from './currency'
import { Inventory } from './inventory'
import { ItemLink } from './item'

export interface Character extends BaseEntity {
    currency: Currency
    inventory: Inventory
    equipment: ItemLink[]
    class: string
    exp: number
    nextLevelExp: number
    buffCount: number
    maxBuffs: number
    buffAttack: number
    buffDefense: number
    buffCrit: number
    critChance: number
}