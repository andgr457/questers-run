import React, { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import { Award, MapPin, Leaf, Sword, BookOpen, Fish, Zap, Clock } from 'lucide-react';
import { QuestRepository } from '../../../../api/repositories/QuestRepository';
import { DimensionRepository, RealmRepository, RegionRepository } from '../../../../api/repositories/WorldRepository';
import { CharacterService } from '../../../../api/services/CharacterService';
import { LoggerService } from '../../../../api/services/LoggerService';
import ClickerDialogCharacter from './ClickerDialogCharacter';
import ClickerLootTypes from './ClickerLootTypes';
import { MobRepository } from '../../../../api/repositories/MobRepository';

export interface ClickerQuestTabsProps {
  show: boolean;
  characterService: CharacterService;
  onQuestSelect: (questId: string, characterId: string) => void;
  onClose: () => void;
}

export default function ClickerQuestBoard(props: ClickerQuestTabsProps) {
  const loggerService = new LoggerService('ClickerQuestTabs');
  const questRepo = new QuestRepository(loggerService);
  const dimRepo = new DimensionRepository(loggerService);
  const realmRepo = new RealmRepository(loggerService);
  const regionRepo = new RegionRepository(loggerService);
  const mobRepo = new MobRepository(loggerService)

  const dimensions = dimRepo.list();

  // Default to first dimension/realm/region
  const defaultDimension = dimensions[0];
  const defaultRealm = defaultDimension ? realmRepo.listByDimension(defaultDimension.id)[0] : null;
  const defaultRegion = defaultRealm ? regionRepo.listByRealm(defaultRealm.id)[0] : null;

  const [activeDimension, setActiveDimension] = useState(defaultDimension?.id || null);
  const [activeRealm, setActiveRealm] = useState(defaultRealm?.id || null);
  const [activeRegion, setActiveRegion] = useState(defaultRegion?.id || null);

  const character = props.characterService?.character;
  if (!character) return null;
  const playerLevel = character.level;

  const realms = activeDimension ? realmRepo.listByDimension(activeDimension) : [];
  const regions = activeRealm ? regionRepo.listByRealm(activeRealm) : [];

  const allQuests = questRepo.list();
  const filteredQuests = activeRegion ? allQuests.filter(q => q.regionId === activeRegion) : [];

  const mobs = mobRepo.list();

  return (
    <Dialog size="lg" open={props.show} handler={props.onClose} className="bg-gradient-to-br text-gray-900 rounded-2xl shadow-xl border-4 border-gray-400"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

      <DialogHeader className="border-b text-2xl font-bold flex items-center gap-2"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Award className="w-6 h-6 text-gray-700" />
        QUESTS
      </DialogHeader>

      <DialogBody className="max-h-[70vh] overflow-y-auto p-4 space-y-4"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <ClickerDialogCharacter characterService={props.characterService} />

        {/* Dimension Tabs */}
        <div className="flex gap-2 flex-wrap">
          {dimensions.map(d => (
            <Button
              key={d.id}
              size="sm"
              variant={activeDimension === d.id ? 'filled' : 'outlined'}
              onClick={() => {
                setActiveDimension(d.id);
                const firstRealm = realmRepo.listByDimension(d.id)[0];
                setActiveRealm(firstRealm?.id || null);
                const firstRegion = firstRealm ? regionRepo.listByRealm(firstRealm.id)[0] : null;
                setActiveRegion(firstRegion?.id || null);
              } }
              className={activeDimension === d.id ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              {d.name.toUpperCase()}
            </Button>
          ))}
        </div>

        {/* Realm Tabs */}
        {realms.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {realms.map(r => (
              <Button
                key={r.id}
                size="sm"
                variant={activeRealm === r.id ? 'filled' : 'outlined'}
                onClick={() => {
                  setActiveRealm(r.id);
                  const firstRegion = regionRepo.listByRealm(r.id)[0];
                  setActiveRegion(firstRegion?.id || null);
                } }
                className={activeRealm === r.id ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                {r.name.toUpperCase()}
              </Button>
            ))}
          </div>
        )}

        {/* Region Tabs */}
        {regions.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {regions.map(reg => (
              <Button
                key={reg.id}
                size="sm"
                variant={activeRegion === reg.id ? 'filled' : 'outlined'}
                onClick={() => setActiveRegion(reg.id)}
                className={activeRegion === reg.id ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                {reg.name.toUpperCase()}
              </Button>
            ))}
          </div>
        )}

        {/* Quest List */}
        <div className="flex flex-col gap-4 mt-4">
          {filteredQuests
            .slice() // create a copy so original array isn’t mutated
            .sort((a, b) => a.level - b.level)
            .map(q => {
              const isLocked = q.level > playerLevel || character.stamina < q.stamina || character.health <= 0;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl shadow-md border transition-all cursor-pointer gap-4 ${
                    isLocked ? 'bg-gray-200 border-gray-300 opacity-60 cursor-not-allowed' : 'hover:shadow-lg hover:border-gray-600'
                  }`}
                  onClick={() => !isLocked && props.onQuestSelect(q.id, character.id)}
                >
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-semibold text-gray-900">{q.title}</div>
                    <div className="text-lg font-semibold text-gray-900">Lvl {q.level}</div>
                    <div className="text-sm text-gray-700">{q.description}</div>
                    <div>XP {q.experience}</div>
                    {/* Requirements */}
                    <div className="mt-3 flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-orange-500">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span>{q.stamina} Stamina</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-silver-500" />
                        <span className="text-silver-600">{q.time}s</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-sm">
                      {q.possibleMobIds.map(id => {
                        const mob = mobs.find(rl => rl.id === id)
                        if(!mob){
                          return null
                        }
                        return <div style={{fontSize: '.7rem'}}>
                          <span style={{fontWeight: 'bolder'}} title={mob.description}>{mob.name} Lvl {mob.level}</span> {(mob.chance * 100).toFixed(1)}% chance p/t <br/><span style={{fontSize: '.64rem'}}>XP {mob.experience} GP {mob.gold} DPS {mob.dps}</span>
                        </div>
                      })
                    }
                    {q.possibleMobIds.length === 0 && <div style={{fontSize: '.7rem'}}>No Danger</div>}
                    </div>
                  
                  </div>
                </div>
              );
            })}
        </div>
      </DialogBody>

      <DialogFooter className="border-t border-gray-400 pt-3"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Button onClick={props.onClose} className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl px-6 py-2 shadow-md"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
