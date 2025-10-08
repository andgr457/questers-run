import { DIMENSIONS, REALMS, REGIONS } from '../data/world/World';
import { IRepository } from '../interfaces/entities/IRepository';
import { IDimension, IRealm, IRegion } from '../interfaces/entities/IWorld';
import { Repository } from './Repository';

export class DimensionRepository extends Repository implements IRepository<IDimension> {
  private ALL_DIMENSIONS = [...DIMENSIONS];

  list(params?: Partial<IDimension>): IDimension[] {
    if (!params) return this.ALL_DIMENSIONS;

    return this.ALL_DIMENSIONS.filter(d =>
      Object.entries(params).every(([key, value]) => d[key as keyof IDimension] === value)
    );
  }

  getById(id: string): IDimension {
    return this.ALL_DIMENSIONS.find(d => d.id === id);
  }
}

export class RealmRepository extends Repository implements IRepository<IRealm> {
  private ALL_REALMS = [...REALMS];

  list(params?: Partial<IRealm>): IRealm[] {
    if (!params) return this.ALL_REALMS;

    return this.ALL_REALMS.filter(r =>
      Object.entries(params).every(([key, value]) => r[key as keyof IRealm] === value)
    );
  }

  getById(id: string): IRealm {
    return this.ALL_REALMS.find(r => r.id === id);
  }

  listByDimension(dimensionId: string): IRealm[] {
    return this.ALL_REALMS.filter(r => r.dimensionId === dimensionId);
  }
}

export class RegionRepository extends Repository implements IRepository<IRegion> {
  private ALL_REGIONS = [...REGIONS];

  list(params?: Partial<IRegion>): IRegion[] {
    if (!params) return this.ALL_REGIONS;

    return this.ALL_REGIONS.filter(r =>
      Object.entries(params).every(([key, value]) => r[key as keyof IRegion] === value)
    );
  }

  getById(id: string): IRegion {
    return this.ALL_REGIONS.find(r => r.id === id);
  }

  listByRealm(realmId: string): IRegion[] {
    return this.ALL_REGIONS.filter(r => r.realmId === realmId);
  }
}
