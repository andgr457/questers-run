import { useEffect, useState } from 'react'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import { CharacterService } from '../../../../api/services/CharacterService'
import ClickerResourceTypes from './ClickerResourceTypes'
import ClickerRarity from './ClickerRarity'
import { AllLoot, LootRepository } from '../../../../api/repositories/LootRepository'
import ClickerLootTypes from './ClickerLootTypes'
import { PackageOpen } from 'lucide-react'
import ClickerDialogCharacter from './ClickerDialogCharacter'
import { ClickerInventoryViewer } from './ClickerInventoryViewer'
import { LoggerService } from '../../../../api/services/LoggerService'

export interface ClickerLootProps {
  show: boolean
  onClose: () => void
  characterService: CharacterService
}

/**
 * @file ClickerLoot.tsx
 * @description
 * Main inventory view for a character. Displays all loot items in a modal.
 * Provides top-level tabs for loot type filtering (All, Resource, Consumable, Armor, Weapon, Junk)
 * and sub-tabs for subcategories (e.g., Armor slots, Resource types).
 *
 * Features:
 * - Full character inventory display.
 * - Tabs/sub-tabs for filtering by type and subtype.
 * - Uses LootItemCard to render each item safely using Partial<ILoot>.
 * - Standalone, reusable, TypeScript-safe.
 *
 * Props:
 * @prop {boolean} show - Whether the modal is visible.
 * @prop {() => void} onClose - Callback to close the modal.
 * @prop {CharacterService} characterService - Service containing character info and loot.
 *
 * Usage:
 * <ClickerLoot show={showLoot} onClose={handleClose} characterService={characterService} />
 */

export default function ClickerLoot(props: ClickerLootProps) {
  const loggerService = new LoggerService('ClickerLoot')
  
  const [activeTab, setActiveTab] = useState<string>('all')
  const [allLoot, setAllLoot] = useState([])

  const lootRepo = new LootRepository(loggerService)

  useEffect(() => {
    setAllLoot(lootRepo.list())
  }, [])

  // Group loot by id and count quantities
  const groupedLoot = props.characterService.character.loot.reduce((groups, lootItem) => {
    const existing = groups[lootItem.id]
    if (!existing) {
      groups[lootItem.id] = { ...lootItem, quantity: 1 }
    } else {
      existing.quantity += 1
    }
    return groups
  }, {} as Record<string, Partial<AllLoot> & { quantity: number }>)

  // Derive loot type categories dynamically
  const lootTypes = Array.from(
    new Set(Object.values(groupedLoot).map((l) => l.type || 'misc'))
  )

  const filteredLoot = Object.values(groupedLoot).filter(
    (l) => activeTab === 'all' || l.type === activeTab
  )

  return (
    <Dialog
      size="lg"
      open={props.show}
      handler={props.onClose}
      className="bg-gradient-to-br text-gray-900 rounded-2xl shadow-xl border-4 border-yellow-600"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
      {/* Header */}
      <DialogHeader className="border-b text-2xl font-bold flex items-center gap-2"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div>
          <PackageOpen className="w-6 h-6 text-yellow-700" />
        </div>
        <div>
          LOOT
        </div> 

        <div className="flex flex-wrap gap-4 text-xs ml-auto">
          <ClickerRarity>
            <div>RARITY</div>
          </ClickerRarity>
          <ClickerResourceTypes>
            <div>RESOURCES</div>
          </ClickerResourceTypes>
          <ClickerLootTypes>
            <div>TYPES</div>
          </ClickerLootTypes>
        </div>
      </DialogHeader>
      <ClickerDialogCharacter characterService={props?.characterService} />
      {/* Body */}
      <DialogBody className="max-h-[70vh] overflow-y-auto p-4 space-y-4 bg-gray-50"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <ClickerInventoryViewer characterService={props?.characterService} loot={allLoot} />

      </DialogBody>

      {/* Footer */}
      <DialogFooter className="border-t border-gray-600 pt-3"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Button
          onClick={props.onClose}
          className="bg-gray-700 hover:bg-orange-600 text-white rounded-xl px-6 py-2 shadow-md"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
