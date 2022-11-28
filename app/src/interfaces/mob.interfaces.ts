export interface Mob {
  image: string
  level: number
  title: string
  description: string
  stats: MobStats
  attack: number
  defense: number
  zoneIds?: string[]
}

export interface MobStats {
  health: number
  mana: number
  stamina: number
}