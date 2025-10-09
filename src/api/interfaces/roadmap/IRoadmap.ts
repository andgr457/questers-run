export interface IRoadmap {
  id: string
  title: string
  subtitle?: string
  description?: string // short summary of the item or goal

  category?: 'feature' | 'content' | 'system' | 'balance' | 'ui' | 'bugfix' | 'other'
  status: 'planned' | 'in-progress' | 'completed' | 'delayed' | 'cancelled'

  priority?: number // optional weight for ordering or importance (e.g. 1 = high)
  plannedReleaseDate?: string // ISO date or version tag, e.g. "2025-11" or "v0.4.0"
  actualReleaseDate?: string // filled in when complete

  milestone?: string // name or version milestone (e.g., "Alpha 1.0", "Beta 2")
  dependencies?: string[] // list of roadmap IDs this depends on
  progress?: number // 0–100 percentage complete

  notes?: string // developer notes, rationale, or changelog-style updates
  lastUpdated?: string // timestamp for display or sorting
}
