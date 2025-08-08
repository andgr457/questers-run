import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import { CharacterService } from '../../../../api/services/CharacterService';
import { Profession } from '../../../../api/interfaces/entities/IProfession';
import ClickerResourceTypes from './ClickerResourceTypes';
import { RecipeRepository } from '../../../../api/repositories/RecipeRepository';
import { LoggerService } from '../../../../api/services/LoggerService';
import { AllLoot, LootRepository } from '../../../../api/repositories/LootRepository';
import ClickerLootTypes from './ClickerLootTypes';
import { Hammer } from 'lucide-react';

interface ClickerProfessionProps {
  show: boolean
  onClose: () => void
  characterService: CharacterService
  profession: Profession
  statField: string
}
export default function ClickerProfession(props: ClickerProfessionProps){
  const loggerService = new LoggerService('ClickerProfession')
  const recipeRepo = new RecipeRepository(loggerService)
  const lootRepo = new LootRepository(loggerService)

  const groupedLoot = props.characterService.character.loot.filter(l => l.type === 'resource').reduce((groups, lootItem: Partial<AllLoot>) => {
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
      handler={undefined}
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
        <div>
          <Hammer className="w-6 h-6 text-yellow-700" />
        </div>
        <div>
          {props.profession.toUpperCase()} RECIPES
        </div>        
      </DialogHeader>

      {/* Quest List */}
      <DialogBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="max-h-[70vh] overflow-y-auto p-4 space-y-4"
      >
          <div className='flex flex-row gap-3'>
            <div>
              {props.characterService.character.name}
            </div>
            <div>
              {props.characterService.character.stamina} Stamina
            </div>
            <div>
              {props.characterService.character.mana} Mana
            </div>
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '5'}}>

          {
          recipeRepo.list({profession: props.profession}).sort((a,b) => a.level - b.level).map(r => {
            const item = lootRepo.list().find(l => l.id === r.craftedItemId)
            return (
              <div style={{width: '100%'}} className="p-4 rounded-xl shadow-md border transition-all cursor-pointer bg-amber-50 border-yellow-600 hover:shadow-lg hover:border-yellow-500 mb-3">
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-semibold flex items-center gap-2 text-yellow-900">
                    <ClickerLootTypes type={item.type} profession={props.profession} />
                    <span style={{ fontWeight: 'lighter', fontSize: '1.5rem' }}>
                      {r.title}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700">
                    {r.description}
                    <br />
                    <span style={{ fontSize: '.64rem' }}>
                      {item.health} HP {item.mana} MP {item.stamina} STAM {item.gold} GP
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span style={{ fontWeight: 'lighter', fontSize: '1.2rem' }}>
                    INGREDIENTS
                  </span>
                  <div>
                    {r.recipeItems.map(ri => {
                      const item = lootRepo.list().find(rr => rr.id === ri.resourceId)
                      return (
                        <div style={{display: 'flex', gap: '7px', fontSize: 'smaller'}}>
                          {ri.quantity}x <span style={{fontWeight: 'bolder'}} title={item.description}>{item.title}</span> <ClickerResourceTypes type={item.resourceType} />
                        </div>
                      )
                    })}
                  </div>
                  
                </div>
                <div className="flex flex-col gap-1">
                  <span style={{ fontWeight: 'lighter', fontSize: '1.2rem' }}>
                    CRAFT
                  </span>
                  <div style={{fontWeight: 'ligher'}}>
                    Requires {r.stamina} STAM {r.mana} MP
                  </div>
                  <div>
                    <div className="mt-2 text-xs text-black-500 italic">
                      Requires Lvl {r.level}
                    </div>
                    {props.characterService.character.level >= r.level && <div className="mt-2 text-xs text-red-500 italic">
                      <Button
                        onClick={undefined}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                        className={`bg-blue-700 ${props.characterService.character.level >= r.level ? 'hover:bg-green-600' : 'hover:bg-red-600'} text-white rounded-xl px-6 py-2 shadow-md`}
                      >
                        CRAFT x1
                      </Button>
                    </div>}
                  </div>
                </div>
              </div>
            )
          })
          }
          </div>

          <div className='flex flex-row gap-3'>
          {Object.values(groupedLoot).map((l) => (
            <div
              key={l.id}
              className="p-4 rounded-xl shadow-md border transition-all cursor-pointer bg-amber-50 border-yellow-600 hover:shadow-lg hover:border-yellow-500 mb-3"
            >
              <div className='flex flex-row gap-10'>
                <div className="text-lg font-semibold flex items-center gap-2 text-yellow-900">
                  <span title={l.description} style={{ fontWeight: 'lighter', fontSize: '1.25rem' }}>
                    {l.title} {l.quantity > 1 && <span className="text-sm">×{l.quantity}</span>}
                  </span>
                </div>
              </div>

            </div>
          ))}
          </div>
      </DialogBody>

      {/* Footer */}
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