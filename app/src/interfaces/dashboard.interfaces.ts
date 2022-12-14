export interface DashboardStatistics {
  amounts?: {
    characters?: number
    questLines?: number
    quests?: number
    mobs?: number
    zones?: number
  }
  questsCompleted?: number
  mobsKilled?: number
}