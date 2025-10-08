import React, { useState, useMemo } from 'react'
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react'
import { Shield, Sword, FlaskConical, Leaf, Package, Star } from 'lucide-react'
import { CharacterService } from '../../../../api/services/CharacterService'
import { ILoot, ILootType, ILootResource, ILootArmor, ILootWeapon, ILootConsumable } from '../../../../api/interfaces/entities/ILoot'
import { ClickerLootItemCard } from './ClickerLootItemCard'
import { AllLoot } from '../../../../api/repositories/LootRepository'

// ---- Props ----
export interface ClickerInventoryViewerProps {
  loot: Partial<AllLoot>[]
  characterService: CharacterService
}

// ---- Main Component ----
export const ClickerInventoryViewer: React.FC<ClickerInventoryViewerProps> = ({ loot, characterService }) => {
  // ---- Active Tabs ----
  const [activeType, setActiveType] = useState<ILootType | 'all'>('all')
  const [activeSub, setActiveSub] = useState<string | 'all'>('all')

  // ---- Group character loot for easy lookup ----
  const playerLootMap = useMemo(() => {
    return characterService.character.loot.reduce<Record<string, number>>((map, l) => {
      map[l.id] = (map[l.id] || 0) + 1
      return map
    }, {})
  }, [characterService.character.loot])

  // ---- Filtered Loot ----
  const filteredLoot = useMemo(() => {
    let filtered = loot

    if (activeType !== 'all') filtered = filtered.filter(l => l.type === activeType)
    if (activeSub !== 'all') {
      filtered = filtered.filter(l => (l as any).slot === activeSub || (l as any).resourceType === activeSub)
    }

    return filtered
  }, [loot, activeType, activeSub])

  // ---- Sub-tabs per category ----
  const subTabs = useMemo(() => {
    switch (activeType) {
      case 'armor':
        return ['head', 'torso', 'legs', 'feet', 'hands', 'neck', 'ring-1', 'ring-2', 'shield']
      case 'weapon':
        return ['left', 'right']
      case 'resource':
        return ['herb', 'ore', 'vegetable', 'fruit', 'meat', 'fish', 'worm', 'leather', 'ingot', 'junk']
      default:
        return []
    }
  }, [activeType])

  const types: { key: ILootType | 'all'; label: string; icon: JSX.Element }[] = [
    { key: 'all', label: 'All', icon: <Star className="w-4 h-4" /> },
    { key: 'resource', label: 'Resources', icon: <Leaf className="w-4 h-4" /> },
    { key: 'consumable', label: 'Consumables', icon: <FlaskConical className="w-4 h-4" /> },
    { key: 'armor', label: 'Armor', icon: <Shield className="w-4 h-4" /> },
    { key: 'weapon', label: 'Weapons', icon: <Sword className="w-4 h-4" /> },
    { key: 'junk', label: 'Junk', icon: <Package className="w-4 h-4" /> },
  ]

  return (
    <div className="p-4 bg-gradient-to-br from-gray-100 via-white to-gray-50 rounded-2xl border-2 border-gray-200 shadow-lg">
      {/* Type Tabs */}
      <Tabs value={activeType}>
        <TabsHeader className="bg-gray-200 rounded-xl"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {types.map(t => (
            <Tab
              key={t.key}
              value={t.key}
              onClick={() => { setActiveType(t.key); setActiveSub('all') } }  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              <div className="flex items-center gap-2 text-gray-900">
                {t.icon}
                <span>{t.label.toLocaleUpperCase()}</span>
              </div>
            </Tab>
          ))}
        </TabsHeader>

        <TabsBody  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <TabPanel key={activeType} value={activeType}>
            {/* Sub Tabs */}
            {subTabs.length > 0 && (
              <Tabs value={activeSub} className="mt-3">
                <TabsHeader className="bg-gray-100 rounded-xl"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <Tab key="all" value="all" onClick={() => setActiveSub('all')}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    ALL
                  </Tab>
                  {subTabs.map(s => (
                    <Tab key={s} value={s} onClick={() => setActiveSub(s)}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      {s.toLocaleUpperCase()}
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
            )}

            {/* Loot Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
              {filteredLoot.map(item => {
                const quantity = playerLootMap[item.id] || 0
                return (
                  <ClickerLootItemCard
                    key={item.id}
                    item={item}
                    quantity={quantity} // highlight owned items
                  />
                )
              })}
              {filteredLoot.length === 0 && (
                <div className="text-center text-gray-500 col-span-full italic py-4">
                  No items found.
                </div>
              )}
            </div>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  )
}
