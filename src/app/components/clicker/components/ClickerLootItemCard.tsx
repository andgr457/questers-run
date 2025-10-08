import React from 'react'
import { ILoot, ILootResource, ILootArmor, ILootWeapon, ILootConsumable } from '../../../../api/interfaces/entities/ILoot'
import ClickerResourceTypes from './ClickerResourceTypes'
import ClickerRarity from './ClickerRarity'
import ClickerLootTypes from './ClickerLootTypes'

interface ClickerLootItemCardProps {
  item: Partial<ILoot>
  quantity?: number // how many player owns, default 0
}

export const ClickerLootItemCard: React.FC<ClickerLootItemCardProps> = ({ item, quantity = 0 }) => {
  const owned = quantity > 0

  // Styles for owned vs unowned
  const baseClasses = `flex flex-col gap-2 p-4 rounded-xl border transition-all cursor-pointer shadow-md`
  const ownedClasses = owned ? 'bg-gray-50 border-gray-600 hover:shadow-lg hover:border-gray-500' : 'bg-gray-100 border-gray-300 opacity-40 cursor-default'

  return (
    <div className={`${baseClasses} ${ownedClasses}`}>
      <div className="flex items-center gap-2">
        <ClickerRarity rarity={item.rarity} />
        <span className="font-semibold text-lg">
          {item.title} {owned && <span className="text-sm">×{quantity}</span>}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <ClickerLootTypes type={item.type} />
        {item.type === 'resource' && (item as ILootResource).resourceType && (
          <ClickerResourceTypes type={(item as ILootResource).resourceType} />
        )}
      </div>

      <div className="text-sm text-gray-700">
        {item.description}
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-1">
        <span title={`${(item.chance * 100).toFixed(1)}% drop chance`}>{(item.chance * 100).toFixed(1)}%</span>
        <span title={`Gold value`}>GP {item.gold}</span>
        {/* Show stats for armor / weapon / consumable */}
        {item.type === 'armor' && (
          <span title={`Defense`}>DEF {(item as ILootArmor).defense}</span>
        )}
        {item.type === 'weapon' && (
          <>
            <span title={`DPS`}>DPS {(item as ILootWeapon).dps}</span>
            <span title={`Stamina`}>STA {(item as ILootWeapon).stamina}</span>
            <span title={`Mana`}>MANA {(item as ILootWeapon).mana}</span>
          </>
        )}
        {item.type === 'consumable' && (
          <>
            {(item as ILootConsumable).health && <span title="Health">HP {(item as ILootConsumable).health}</span>}
            {(item as ILootConsumable).stamina && <span title="Stamina">STA {(item as ILootConsumable).stamina}</span>}
            {(item as ILootConsumable).mana && <span title="Mana">MANA {(item as ILootConsumable).mana}</span>}
          </>
        )}
      </div>
    </div>
  )
}
