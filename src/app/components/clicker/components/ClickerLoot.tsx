import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import { CharacterService } from '../../../../api/services/CharacterService'
import ClickerResourceTypes from './ClickerResourceTypes'
import ClickerRarity from './ClickerRarity'
import { AllLoot } from '../../../../api/repositories/LootRepository'
import ClickerLootTypes from './ClickerLootTypes'
import { PackageOpen, Zap } from 'lucide-react'

export interface ClickerLootProps {
  show: boolean
  onClose: () => void
  characterService: CharacterService
}

export default function ClickerLoot(props: ClickerLootProps) {
  const groupedLoot = props.characterService.character.loot.reduce((groups, lootItem) => {
    const existing = groups[lootItem.id]
    if (!existing) {
      groups[lootItem.id] = { ...lootItem, quantity: 1 }
    } else {
      existing.quantity += 1
    }
    return groups
  }, {} as Record<string, Partial<AllLoot> & { quantity: number }>)

  return (
    <Dialog
      size="lg"
      open={props.show}
      handler={props.onClose}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      className="bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-200 text-gray-900 rounded-2xl shadow-xl border-4 border-yellow-600"
    >
      <DialogHeader
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="border-b border-yellow-600 text-2xl font-bold flex items-center gap-2"
      >
        <PackageOpen className="w-6 h-6 text-yellow-700" />
        Loot <span style={{fontSize: '.7rem'}}>{props.characterService.character.name}</span>
        <div style={{flexWrap: 'wrap', display: 'flex', gap: '15px', fontSize: '.5em'}}>
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

      <DialogBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="max-h-[70vh] overflow-y-auto p-4 space-y-4"
      >

        <div className='flex flex-row gap-1 flex-wrap'>

          {Object.values(groupedLoot).map((l) => (
            <div
              key={l.id}
              style={{width: '100%'}}
              className="p-4 rounded-xl shadow-md border transition-all cursor-pointer bg-amber-50 border-yellow-600 hover:shadow-lg hover:border-yellow-500 mb-3"
            >
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-semibold flex items-center gap-2 text-yellow-900">


                    <span style={{ fontWeight: 'lighter', fontSize: '1.5rem' }}>
                      {l.title} {l.quantity > 1 && <span className="text-sm">×{l.quantity}</span>}
                    </span>
                    <div className='flex flex-row gap-1'>
                      <ClickerLootTypes type={l.type} />
                      <ClickerResourceTypes type={l.resourceType} />
                      <ClickerRarity rarity={l.rarity} />
                    </div>
                  </div>

                  <div className="text-sm text-gray-700">
                    {l.description}
                    <br />
                    <span style={{ fontSize: '.64rem' }}>
                      {l.rarity.toUpperCase()} {(l.chance * 100).toFixed(1)}% GP {l.gold}
                    </span>
                  </div>
                </div>

              </div>
          ))}
        </div>

      </DialogBody>

      <DialogFooter
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="border-t border-yellow-600 pt-3"
      >
        <Button
          onClick={props.onClose}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="bg-gray-700 hover:bg-orange-600 text-white rounded-xl px-6 py-2 shadow-md"
        >
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
