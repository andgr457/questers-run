import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import { BookOpen, Fish, Leaf, Map, MapPin, Sword, Zap } from 'lucide-react'
import ClickerResourceTypes from './ClickerResourceTypes'
import { LoggerService } from '../../../../api/services/LoggerService'
import { QuestRepository } from '../../../../api/repositories/QuestRepository'
import { LootRepository } from '../../../../api/repositories/LootRepository'
import { MobRepository } from '../../../../api/repositories/MobRepository'
import { CharacterService } from '../../../../api/services/CharacterService'

export interface ClickerQuestBoardProps {
  show: boolean
  characterService: CharacterService
  onQuestSelect: (questId: string, characterId: string) => void
  onClose: () => void
}

export default function ClickerQuestBoard(props: ClickerQuestBoardProps) {
  if(!props.characterService) return

  const loggerService = new LoggerService('ClickerQuestSelection')
  const questRepo = new QuestRepository(loggerService)
  const lootRepo = new LootRepository(loggerService)
  const mobRepo = new MobRepository(loggerService)

  const quests = questRepo.list().sort((a,b) => a.level - b.level)
  const loot = lootRepo.list()
  const mobs = mobRepo.list()

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
      {/* Header */}
      <DialogHeader
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="border-b border-yellow-600 text-2xl font-bold flex items-center gap-2"
      >
        <Map className="w-6 h-6 text-yellow-700" />
        Quest Board
      </DialogHeader>

      {/* Quest List */}
      <DialogBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        className="max-h-[70vh] overflow-y-auto p-4 space-y-4"
      >
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
          {quests?.map((q) => {
            const isLockedLevel = q.level > props?.characterService.character.level
            const isLockedHealthOrEnergy = props?.characterService.character.stamina < q.stamina || props?.characterService?.character.health <= 0
            const isLocked = isLockedLevel || isLockedHealthOrEnergy

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl shadow-md border transition-all cursor-pointer 
                  ${isLocked
                    ? 'bg-gray-200 border-gray-300 opacity-60 cursor-not-allowed' 
                    : 'bg-amber-50 border-yellow-600 hover:shadow-lg hover:border-yellow-500'
                  }`}
                style={{width: '30%'}}
                onClick={() => !isLocked && props.onQuestSelect(q.id, props?.characterService.character.id)}
              >
                {/* Title + Description */}
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-semibold flex items-center gap-2 text-yellow-900">
                    {/* Quest Title */}
                    <span style={{fontWeight: 'lighter', fontSize: '1.5rem'}}>{q.title}</span>
                                        {/* Quest Type Icons */}
                    <div className="flex items-center gap-1 mr-2">
                      {q.types?.includes('explore') && (
                        <span title="Explore" className="inline-block">
                          <MapPin className="w-5 h-5 text-orange-600" />
                        </span>
                      )}
                      {q.types?.includes('gather') && (
                        <span title="Gather" className="inline-block">
                          <Leaf className="w-5 h-5 text-green-600" />
                        </span>
                      )}
                      {q.types?.includes('combat') && (
                        <span title="Combat" className="inline-block">
                          <Sword className="w-5 h-5 text-red-600" />
                        </span>
                      )}
                      {q.types?.includes('research') && (
                        <span title="Research" className="inline-block">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </span>
                      )}
                      {q.types?.includes('fishing') && (
                        <span title="Research" className="inline-block">
                          <Fish className="w-5 h-5 text-blue-600" />
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    {q.description}

                  </div>
                  <div className="text-sm text-gray-700">
                    REWARDS
                    <span style={{fontSize: '.7rem'}}><br/>XP {q.experience} GP {q.gold} </span>

                  </div>
                  <div className="text-sm text-gray-700">
                    LOOT
                    {q.possibleLootIds.length === 0 ? <div style={{fontSize: '.7rem'}}>None</div> : ''}
                    {q.possibleLootIds.map(id => {
                      const item = loot.find(rl => rl.id === id)
                      if(!item){
                        return null
                      }
                      return <div style={{fontSize: '.7rem', display: 'flex', flexWrap: 'wrap', gap: '3px'}}>
                        <div>
                          <ClickerResourceTypes type={item.resourceType}></ClickerResourceTypes>
                        </div>
                        <span style={{fontWeight: 'bolder'}} title={item.description}>
                           {item.title}
                        </span> 
                        {(item.chance * 100).toFixed(1)}% chance p/t
                      </div>
                    })}
                  </div>
                  <div className="text-sm text-gray-700">
                    MOBS
                    {q.possibleMobIds.map(id => {
                        const mob = mobs.find(rl => rl.id === id)
                        if(!mob){
                          return null
                        }
                        return <div style={{fontSize: '.7rem'}}>
                          <span style={{fontWeight: 'bolder'}} title={mob.description}>{mob.name}</span> {(mob.chance * 100).toFixed(2)}% chance p/t <br/><span style={{fontSize: '.64rem'}}>XP {mob.experience} GP {mob.gold} DPS {mob.dps}</span>
                        </div>
                      })
                    }
                    {q.possibleMobIds.length === 0 && <div style={{fontSize: '.7rem'}}>None</div>}
                      
                  </div>
                </div>

                {/* Requirements */}
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-800 font-bold">Lvl {q.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="text-blue-600">{q.stamina} Stamina</span>
                  </div>
                </div>

                {/* Lock Notice */}
                {isLockedLevel && (
                  <div className="mt-2 text-xs text-red-500 italic">
                    Requires Lvl {q.level}
                  </div>
                )}
                {isLockedHealthOrEnergy && (
                  <div className="mt-2 text-xs text-red-500 italic">
                    Visit the tavern to restore health and stamina.
                  </div>
                )}
              </div>
            )
          })}
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
          className="bg-yellow-700 hover:bg-yellow-600 text-white rounded-xl px-6 py-2 shadow-md"
        >
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
