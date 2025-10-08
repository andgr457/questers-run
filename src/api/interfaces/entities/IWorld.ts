// Interfaces
export interface IDimension {
  id: string;
  name: string;
  description: string;
}

export interface IRealm {
  id: string;
  dimensionId: string; // Relation to Dimension
  name: string;
  description: string;
}

export interface IRegion {
  id: string;
  realmId: string; // Relation to Realm
  name: string;
  description: string;
}
