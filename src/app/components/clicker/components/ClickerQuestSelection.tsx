import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import { IQuest } from '../../../../api/interfaces/entities/IQuest'
import { BookOpen, Leaf, Map, MapPin, Sword, Swords, Zap } from 'lucide-react'
import { ILoot, ILootResource } from '../../../../api/interfaces/entities/ILoot'
import { IMob } from '../../../../api/interfaces/entities/IMob'

export interface ClickerQuestSelectionProps {
  show: boolean
  level: number
  characterId: string
  onQuestSelect: (questId: string, characterId: string) => void
  onClose: () => void
  quests: IQuest[]
  resourceLoot: ILootResource[]
  mobs: IMob[]
}

export default function ClickerQuestSelection(props: ClickerQuestSelectionProps) {
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
        {props?.quests?.map((q) => {
          const isLocked = q.level > props.level

          return (
            <div
              key={q.id}
              className={`p-4 rounded-xl shadow-md border transition-all cursor-pointer 
                ${isLocked 
                  ? 'bg-gray-200 border-gray-300 opacity-60 cursor-not-allowed' 
                  : 'bg-amber-50 border-yellow-600 hover:shadow-lg hover:border-yellow-500'
                }`}
              onClick={() => !isLocked && props.onQuestSelect(q.id, props.characterId)}
            >
              {/* Title + Description */}
              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold flex items-center gap-2 text-yellow-900">
                  {/* Quest Type Icons */}
                  <div className="flex items-center gap-1 mr-2">
                    {q.types?.includes('explore') && (
                      <span title="Explore" className="inline-block">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </span>
                    )}
                    {q.types?.includes('gather') && (
                      <span title="Gather" className="inline-block">
                        <Leaf className="w-5 h-5 text-emerald-600" />
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
                  </div>


                  {/* Quest Title */}
                  <span style={{fontWeight: 'lighter', fontSize: '1.5rem'}}>{q.title}</span>
                </div>
                <div className="text-sm text-gray-700">
                  {q.description}<br/>
                  <span style={{fontSize: '.64rem'}}>XP {q.experience} GP {q.gold} </span>

                </div>
                <div className="text-sm text-gray-700">
                  LOOT
                  {q.possibleLootIds.map(id => {
                    const resource = props.resourceLoot.find(rl => rl.id === id)
                    if(!resource){
                      return null
                    }
                    return <div style={{fontSize: '.7rem'}}>
                      <span style={{fontWeight: 'bolder'}} title={resource.description}>{resource.title}</span> {resource.chance * 100}% chance p/t <br/><span style={{fontSize: '.64rem'}}></span>
                    </div>
                  })}
                </div>
                <div className="text-sm text-gray-700">
                  MOBS
                  {q.possibleMobIds.length === 0 ? 'Hmm...' :
                    q.possibleMobIds.map(id => {
                      const mob = props.mobs.find(rl => rl.id === id)
                      if(!mob){
                        return null
                      }
                      return <div style={{fontSize: '.7rem'}}>
                        <span style={{fontWeight: 'bolder'}} title={mob.description}>{mob.name}</span> {(mob.chance * 100).toFixed(2)}% chance p/t <br/><span style={{fontSize: '.64rem'}}>XP {mob.experience} GP {mob.gold} DPS {mob.dps}</span>
                      </div>
                    })
                  }
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
              {isLocked && (
                <div className="mt-2 text-xs text-red-500 italic">
                  Requires higher level to unlock
                </div>
              )}
            </div>
          )
        })}
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
