import { BaseEntity } from './base.entity'

export interface Mob extends BaseEntity {
  imageName: string
  expGiven: number
  type: string
  foundIn: string[]
  chanceToShow: number
}