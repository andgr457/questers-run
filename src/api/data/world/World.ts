import { IDimension, IRealm, IRegion } from '../../interfaces/entities/IWorld';

// ===== Dimensions =====
export const DIMENSIONS: IDimension[] = [
  { id: 'd1', name: 'Aetherion', description: 'A mystical world of magic, floating cities, and ley lines.' },
  { id: 'd2', name: 'Noctyra', description: 'A shadowy twilight realm of illusions and dreams.' },
  { id: 'd3', name: 'Solarynth', description: 'A radiant dimension of deserts, golden plains, and celestial cycles.' }
];

// ===== Realms =====
export const REALMS: IRealm[] = [
  // Aetherion
  { id: 'r1', dimensionId: 'd1', name: 'Velmorra', description: 'Lush forests, crystal rivers, starting realm.' },
  { id: 'r2', dimensionId: 'd1', name: 'Thalnara', description: 'Stormy coastal realm with pirate enclaves.' },
  { id: 'r3', dimensionId: 'd1', name: 'Cindralith', description: 'Volcanic mountains and obsidian wastelands.' },

  // Noctyra
  { id: 'r4', dimensionId: 'd2', name: 'Umbralis', description: 'Perpetual dusk forests inhabited by shadowy spirits.' },
  { id: 'r5', dimensionId: 'd2', name: 'Lumivale', description: 'Bioluminescent crystal caverns.' },
  { id: 'r6', dimensionId: 'd2', name: 'Echowynd', description: 'Misty floating archipelagos guided by echoes.' },

  // Solarynth
  { id: 'r7', dimensionId: 'd3', name: 'Helioryn', description: 'Golden deserts dotted with oasis cities.' },
  { id: 'r8', dimensionId: 'd3', name: 'Skyreach', description: 'Towering plateaus and cliffside fortresses.' },
  { id: 'r9', dimensionId: 'd3', name: 'Miragefen', description: 'Shimmering salt flats with magical illusions.' }
];

// ===== Regions =====
export const REGIONS: IRegion[] = [
  // Velmorra
  { id: 'reg1', realmId: 'r1', name: 'Eastern Timberlands', description: 'Fishing and logging hub of Velmorra.' },
  { id: 'reg2', realmId: 'r1', name: 'Crystal Shore', description: 'Coastal region famous for its sparkling beaches.' },

  // Thalnara
  { id: 'reg3', realmId: 'r2', name: 'Storm Coast', description: 'Rough seas and pirate hideouts.' },
  { id: 'reg4', realmId: 'r2', name: 'Windspire Cliffs', description: 'Tall cliffs battered by constant storms.' },

  // Cindralith
  { id: 'reg5', realmId: 'r3', name: 'Obsidian Fields', description: 'Jagged black stone plains of the volcanic realm.' },
  { id: 'reg6', realmId: 'r3', name: 'Molten Peaks', description: 'Active volcanoes and lava rivers.' },

  // Umbralis
  { id: 'reg7', realmId: 'r4', name: 'Duskmire', description: 'Swampy, shadowed forest floor.' },
  { id: 'reg8', realmId: 'r4', name: 'Shadowgrove', description: 'Dense woods with magical illusions.' },

  // Lumivale
  { id: 'reg9', realmId: 'r5', name: 'Glowcaves', description: 'Crystal caverns glowing with bioluminescence.' },

  // Echowynd
  { id: 'reg10', realmId: 'r6', name: 'Mist Isles', description: 'Floating islands shrouded in fog.' },

  // Helioryn
  { id: 'reg11', realmId: 'r7', name: 'Golden Expanse', description: 'Rolling desert plains and oasis cities.' },

  // Skyreach
  { id: 'reg12', realmId: 'r8', name: 'Cliffside Bastion', description: 'Fortresses perched atop massive cliffs.' },

  // Miragefen
  { id: 'reg13', realmId: 'r9', name: 'Salt Mirrors', description: 'Shimmering salt flats hiding illusions.' }
];
