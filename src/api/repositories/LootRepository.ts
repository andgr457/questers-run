import { POTION_LOOT } from '../data/consumables/alchemy/Potions'
import { FISH_COOKING_LOOT } from '../data/consumables/cooking/Fish'
import { VEGETABLES_COOKING_LOOT } from '../data/consumables/cooking/Vegetables'
import { FISH_LOOT } from '../data/resources/Fish'
import { FISH_JUNK_LOOT } from '../data/resources/Fish.junk'
import { HERBS_LOOT } from '../data/resources/Herbs'
import { VEGETABLES_LOOT } from '../data/resources/Vegetables'
import { ILootArmor, ILootConsumable, ILootResource } from '../interfaces/entities/ILoot'
import { IRepository } from './IRepository'
import { Repository } from './Repository'

export type AllLoot = ILootArmor & ILootConsumable & ILootResource

export class LootRepository extends Repository implements IRepository<Partial<AllLoot>> {
  private allLoot: Partial<AllLoot>[] = [
    /** Consumables */
    ...POTION_LOOT,
    ...VEGETABLES_COOKING_LOOT,
    ...FISH_COOKING_LOOT,
    /** Resources */
    ...HERBS_LOOT,
    ...VEGETABLES_LOOT,
    ...FISH_LOOT,
    /** Junk */
    ...FISH_JUNK_LOOT
  ]

  list(params?: Partial<AllLoot>): Partial<AllLoot>[] {
    if(params?.type){
      return this.allLoot.filter(l => l.type === params?.type)
    }
    if(params?.id){
      return this.allLoot.filter(l => l.id === params?.id)
    }
    return this.allLoot
  }

  getById(id: string): Partial<AllLoot> {
    return this.allLoot.find(l => l.id === id)
  }
}