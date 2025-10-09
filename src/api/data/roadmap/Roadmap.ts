import { IRoadmap } from '../../interfaces/roadmap/IRoadmap'

export const ROADMAP_ITEMS: IRoadmap[] = [
  // 🏗️ INFRASTRUCTURE & CORE SETUP
  {
    id: 'r001',
    title: 'GitHub Repository & Deployment Pipeline',
    subtitle: 'Base development infrastructure',
    description: 'Set up GitHub repo, static hosting, domain, and automated deployment from main branch.',
    category: 'system',
    status: 'completed',
    milestone: 'v0.1.0',
    progress: 100,
    plannedReleaseDate: '2025-09-30',
    actualReleaseDate: '2025-09-30',
    lastUpdated: '2025-10-01T00:00:00Z'
  },
  {
    id: 'r002',
    title: 'Service & Repository Layer Architecture',
    subtitle: 'OOP service pattern for game entities',
    description: 'Implement service/repository structure for Characters, Quests, Loot, Professions, and Worlds.',
    category: 'system',
    status: 'completed',
    milestone: 'v0.1.1',
    progress: 100,
    plannedReleaseDate: '2025-10-02',
    actualReleaseDate: '2025-10-02',
    lastUpdated: '2025-10-02T00:00:00Z'
  },

  // 🧍‍♂️ CORE GAME SYSTEMS
  {
    id: 'r010',
    title: 'Character Management System',
    subtitle: 'Create, view, and manage multiple characters',
    description: 'Add character creation, stats dialog, progress bars, and character deletion/reset.',
    category: 'feature',
    status: 'completed',
    milestone: 'v0.2.0',
    progress: 100,
    plannedReleaseDate: '2025-10-05',
    actualReleaseDate: '2025-10-05',
    lastUpdated: '2025-10-05T00:00:00Z'
  },
  {
    id: 'r011',
    title: 'Inventory and Loot Systems',
    subtitle: 'Loot collection, rarity, and item detail displays',
    description: 'Implement loot items, rarity system, inventory viewer with filtering, and loot item cards.',
    category: 'feature',
    status: 'completed',
    milestone: 'v0.2.0',
    progress: 100,
    plannedReleaseDate: '2025-10-05',
    actualReleaseDate: '2025-10-05',
    lastUpdated: '2025-10-05T00:00:00Z'
  },
  {
    id: 'r012',
    title: 'Quest Board System',
    subtitle: 'Quests with randomization and completion logic',
    description: 'Add quest repository, filtering, and clicker integration for rewards and progress.',
    category: 'feature',
    status: 'in-progress',
    milestone: 'v0.3.0',
    progress: 80,
    plannedReleaseDate: '2025-10-10',
    lastUpdated: '2025-10-08T00:00:00Z'
  },

  // ⚔️ GAMEPLAY EXPANSIONS
  {
    id: 'r020',
    title: 'Equipment System',
    subtitle: 'Equip and manage character weapons and gear',
    description: 'Add component to equip items, update stats dynamically, and integrate with loot data.',
    category: 'feature',
    status: 'planned',
    milestone: 'v0.4.0',
    progress: 0,
    plannedReleaseDate: '2025-10-20',
    dependencies: ['r011'],
    lastUpdated: '2025-10-08T00:00:00Z'
  },
  {
    id: 'r021',
    title: 'Shoppe System',
    subtitle: 'Buying, selling, and shop inventory scaling',
    description: 'Implement shoppe with buy/sell interface, item pricing, and stock based on character level.',
    category: 'feature',
    status: 'planned',
    milestone: 'v0.4.1',
    progress: 0,
    plannedReleaseDate: '2025-10-25',
    dependencies: ['r011', 'r020'],
    lastUpdated: '2025-10-08T00:00:00Z'
  },

  // 🏰 ADVANCED SYSTEMS
  {
    id: 'r030',
    title: 'Character Limit & Party Mechanics',
    subtitle: 'Limit characters by level; unlock dungeons and raids',
    description: 'Introduce character cap scaling and unlockable team formations for dungeon runs and raids.',
    category: 'feature',
    status: 'planned',
    milestone: 'v0.5.0',
    progress: 0,
    plannedReleaseDate: '2025-11-05',
    dependencies: ['r010', 'r012', 'r020'],
    lastUpdated: '2025-10-08T00:00:00Z'
  },
  {
    id: 'r031',
    title: 'Dungeon System',
    subtitle: 'Interactive, multi-character dungeon management',
    description: 'Add dungeon gameplay requiring player management of character roles, health, and stamina.',
    category: 'feature',
    status: 'planned',
    milestone: 'v0.5.1',
    progress: 0,
    plannedReleaseDate: '2025-11-15',
    dependencies: ['r030'],
    lastUpdated: '2025-10-08T00:00:00Z'
  },
  {
    id: 'r032',
    title: 'Raid System',
    subtitle: 'Ten-character cooperative raids with complex encounters',
    description: 'Develop raid scenarios requiring player coordination of multiple characters and resource timing.',
    category: 'feature',
    status: 'planned',
    milestone: 'v0.6.0',
    progress: 0,
    plannedReleaseDate: '2025-12-01',
    dependencies: ['r031'],
    lastUpdated: '2025-10-08T00:00:00Z'
  },

  // 🌍 WORLD SYSTEMS
  {
    id: 'r040',
    title: 'World & Region Expansion',
    subtitle: 'Multi-dimensional realm system',
    description: 'Expand the world service to include dimensions, realms, and regions with unique quests.',
    category: 'content',
    status: 'planned',
    milestone: 'v0.6.1',
    progress: 0,
    plannedReleaseDate: '2025-12-15',
    dependencies: ['r012', 'r030'],
    lastUpdated: '2025-10-08T00:00:00Z'
  },

  // 🎨 POLISH & UI
  {
    id: 'r050',
    title: 'UI/UX Overhaul',
    subtitle: 'Refine layout, colors, and transitions',
    description: 'Improve usability, introduce animations, and unify style across components using Tailwind and shadcn.',
    category: 'ui',
    status: 'planned',
    milestone: 'v0.7.0',
    progress: 0,
    plannedReleaseDate: '2025-12-20',
    dependencies: ['r040'],
    lastUpdated: '2025-10-08T00:00:00Z'
  }
]
