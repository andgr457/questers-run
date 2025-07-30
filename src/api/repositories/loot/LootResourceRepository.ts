import { ILootResource } from '../../interfaces/entities/ILoot';
import { IRepository } from '../IRepository';
import { Repository } from '../Repository';

export class LootResourceRepository extends Repository implements IRepository<ILootResource> {
  list(params?: ILootResource): ILootResource[] {
    return [...HERBS]
  }
}

const HERBS: ILootResource[] = [
  {
    id: 'herb-1',
    title: 'Sunleaf',
    description: 'A basic herb used in potion crafting.',
    type: 'resource',
    recipeIds: [
      'healing-potion-1',
      'mana-potion-1',
      'stamina-potion-1'
    ],
    chance: .5,
    price: 2,
    rarity: 'common'
  }
]