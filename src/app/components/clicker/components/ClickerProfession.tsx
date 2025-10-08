import { Button, Collapse, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import { CharacterService } from '../../../../api/services/CharacterService';
import { Profession } from '../../../../api/interfaces/entities/IProfession';
import ClickerResourceTypes from './ClickerResourceTypes';
import { RecipeRepository } from '../../../../api/repositories/RecipeRepository';
import { LoggerService } from '../../../../api/services/LoggerService';
import { AllLoot, LootRepository } from '../../../../api/repositories/LootRepository';
import ClickerLootTypes from './ClickerLootTypes';
import { Hammer } from 'lucide-react';
import ClickerDialogCharacter from './ClickerDialogCharacter';
import { ClickerInventoryViewer } from './ClickerInventoryViewer';
import { useState } from 'react';

interface ClickerProfessionProps {
  show: boolean
  onClose: () => void
  characterService: CharacterService
  profession: Profession
  statField: string
}
export default function ClickerProfession(props: ClickerProfessionProps){
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  const loggerService = new LoggerService('ClickerProfession')
  const recipeRepo = new RecipeRepository(loggerService)
  const lootRepo = new LootRepository(loggerService)
  const allLoot = lootRepo.list()

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
      handler={props.onClose}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      className="bg-gradient-to-br text-gray-900 rounded-2xl shadow-xl border-4 border-yellow-600"
    >
      <DialogHeader
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="border-b text-2xl font-bold flex items-center gap-2"
      >
        <div>
          <Hammer className="w-6 h-6 text-yellow-700" />
        </div>
        <div>
          {props.profession.toUpperCase()}
        </div>        
      </DialogHeader>
      <ClickerDialogCharacter characterService={props?.characterService} />
      <DialogBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="max-h-[70vh] overflow-y-auto p-4 space-y-4"
      >
          <Collapse open={false} >
            <ClickerInventoryViewer characterService={props?.characterService} loot={allLoot} />
          </Collapse>
          <div>
            {/* Button to toggle collapse */}
            <button
              onClick={() => setIsInventoryOpen(!isInventoryOpen)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              LOOT
            </button>

            {/* Collapse */}
            <Collapse open={isInventoryOpen}>
              <ClickerInventoryViewer
                characterService={props?.characterService}
                loot={allLoot}
              />
            </Collapse>
          </div>

          <div style={{display: 'flex', flexWrap: 'wrap', gap: '5'}}>

          {
          recipeRepo.list({profession: props.profession}).sort((a,b) => a.level - b.level).map(r => {
            const item = lootRepo.getById(r.craftedItemId)
            return (
              <div 
              key={r.id}
                  className={`p-4 rounded-xl shadow-md border transition-all cursor-pointer gap-4 hover:shadow-lg hover:border-gray-600'`}
              >
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-semibold flex items-center gap-2 text-yellow-900">
                  <ClickerLootTypes type={item.type} profession={props.profession} />
                    <span style={{ fontWeight: 'lighter', fontSize: '1.5rem' }}>
                      {r.title}
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">Lvl {r.level}</div>
                  <div className="text-sm text-gray-700">{r.description}</div>
                  
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
                      const item = allLoot.find(rr => rr.id === ri.resourceId)
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