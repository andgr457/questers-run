import { ROADMAP_ITEMS } from '../../data/roadmap/Roadmap';
import { IRoadmap } from '../../interfaces/roadmap/IRoadmap';
import { Repository } from '../Repository';

export class RoadmapRepository extends Repository {
  private ALL_ROADMAP_ITEMS = [
    ...ROADMAP_ITEMS,
  ]

  list(params?: IRoadmap): IRoadmap[] {
    if (!params) return this.ALL_ROADMAP_ITEMS;

    return this.ALL_ROADMAP_ITEMS.filter(r =>
      Object.entries(params).every(([key, value]) => r[key as keyof IRoadmap] === value)
    );
  }

  getById(id: string): IRoadmap {
    return this.ALL_ROADMAP_ITEMS.find(c => c.id === id)
  }
}