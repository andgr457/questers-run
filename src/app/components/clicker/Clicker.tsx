import { useCallback, useEffect, useState } from 'react'
import { IPlayer } from '../../../api/interfaces/entities/IPlayer'
import { ICharacter } from '../../../api/interfaces/entities/character/ICharacter'
import ClickerPlayer from './components/ClickerPlayer'
import { CharacterService } from '../../../api/services/CharacterService'
import { LoggerService } from '../../../api/services/LoggerService'
import { ICharacterClass } from '../../../api/interfaces/entities/character/ICharacterClass'
import { CharacterClassRepository } from '../../../api/repositories/CharacterClassRepository'
import { QuestRepository } from '../../../api/repositories/QuestRepository'
import { IQuest } from '../../../api/interfaces/entities/IQuest'
import ClickerCharacter from './components/ClickerCharacter'
import { QuestService } from '../../../api/services/QuestService'
import ClickerQuestBoard, { ClickerQuestBoardProps } from './components/ClickerQuestBoard'

export default function Clicker(){
  const loggerService = new LoggerService('Clicker')
  const questRepo = new QuestRepository(loggerService)
  const characterClassRepo = new CharacterClassRepository(loggerService)
  
  const [player, setPlayer] = useState<IPlayer>(undefined)
  const [characterServices, setCharacterServices] = useState<CharacterService[]>(undefined)
  const [quests, setQuests] = useState<IQuest[]>(undefined)
  const [questServices, setQuestServices] = useState<Map<string, QuestService>>(new Map())
  const [questStates, setQuestStates] = useState<Record<string, { timeLeft: number; isComplete: boolean }>>({})

  const [showQuestsParams, setShowQuestsParams] = useState<ClickerQuestBoardProps>(undefined)

  useEffect(() => {
    //load player & load characters

    //test
    setQuests(questRepo.list())
    
    const characterClass: ICharacterClass = characterClassRepo.getById('knight')
    const hayzlit: ICharacter = {
      id: 'creator',
      classId: 'knight',
      status: 'Town',
      experience: 0,
      experienceNextLevel: 100,
      gold: 0,
      armorIds: [],
      lootIds: [],
      weaponIds: [],
      level: 1,
      name: 'Hayzlit',
      equippedArmor: [],
      equippedWeapons: [],
      loot: [],
      health: 5,
      maxHealth: 100,
      mana: 100,
      maxMana: 100,
      stamina: 100,
      maxStamina: 100,
      agility: characterClass.statModifiersPerLevel.agility,
      strength: characterClass.statModifiersPerLevel.strength,
      willpower: characterClass.statModifiersPerLevel.willpower
    }
    const derp: ICharacter = {
      id: 'derp',
      classId: 'knight',
      status: 'Town',
      experience: 0,
      experienceNextLevel: 100,
      gold: 0,
      armorIds: [],
      lootIds: [],
      weaponIds: [],
      level: 1,
      name: 'Derp',
      equippedArmor: [],
      equippedWeapons: [],
      loot: [],
      health: 100,
      maxHealth: 100,
      mana: 100,
      maxMana: 100,
      stamina: 100,
      maxStamina: 100,
      agility: characterClass.statModifiersPerLevel.agility,
      strength: characterClass.statModifiersPerLevel.strength,
      willpower: characterClass.statModifiersPerLevel.willpower
    }
    setCharacterServices([new CharacterService(loggerService, {character: hayzlit, characterClass}), new CharacterService(loggerService, {character: derp, characterClass})])
  }, [])

  const handleModifyCharacter = useCallback((characterService: CharacterService) => {
    setCharacterServices(prevChars => {
      return prevChars.map(c => {
        if (c.character.id === characterService.character.id) {
          return new CharacterService(loggerService, {
            character: { ...characterService.character },
            characterClass: characterService.characterClass,
            buffs: characterService.buffs,
            quest: characterService.quest
          });
        }
        return c;
      });
    });
  }, []);

  const handleShowQuestSelection = useCallback((level: number, characterId: string) => {
    setShowQuestsParams({characterService: characterServices.find(cs => cs.character.id === characterId), show: true, onQuestSelect: handleQuestSelect, onClose: handleHideQuestSelection})
  }, [quests, characterServices])

  const handleHideQuestSelection = useCallback(() => {
    setShowQuestsParams({characterService: undefined, show: false, onQuestSelect: undefined, onClose: undefined})
  }, [])

  const handleQuestSelect = useCallback((questId: string, characterId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest) return;

    const characterService = characterServices.find(c => c.character.id === characterId);
    if (!characterService) return;

    if (quest.stamina > characterService.character.stamina) {
      // Not enough stamina to start the quest
      return;
    }

    const questService = new QuestService(
      loggerService,
      quest,
      characterService,
      (timeLeft: number, isComplete: boolean) => {
        setQuestStates(prev => ({
          ...prev,
          [characterId]: { timeLeft, isComplete }
        }));
      },
      () => {
        // XP reward logic on quest complete
        console.log('Quest completed for:', characterId);

        setCharacterServices(prevChars =>
          prevChars.map(c => {
            if (c.character.id === characterId) {
              // Update character status and XP
              c.character.status = 'Town';
              c.addXp(quest.experience);

              // Create new CharacterService with updated character
              return new CharacterService(loggerService, {
                character: { ...c.character },
                characterClass: c.characterClass,
                buffs: c.buffs,
                quest: undefined
              });
            }
            return c;
          })
        );
      }
    );

    questService.startQuest();

    setQuestServices(prev => {
      const next = new Map(prev);
      next.set(characterId, questService);
      return next;
    });

    // Update character status to 'Questing' and reduce stamina
    setCharacterServices(prevChars =>
      prevChars.map(c => {
        if (c.character.id === characterId) {
          c.character.status = 'Questing';
          c.character.stamina -= quest.stamina;

          return new CharacterService(loggerService, {
            character: { ...c.character },
            characterClass: c.characterClass,
            buffs: c.buffs,
            quest: c.quest
          });
        }
        return c;
      })
    );

    // Close quest selection UI
    setShowQuestsParams({
      characterService: undefined,
      show: false,
      onQuestSelect: undefined,
      onClose: undefined
    });
  }, [quests, characterServices, loggerService, setQuestServices, setQuestStates, setCharacterServices, setShowQuestsParams]);


  return <div>
    <ClickerQuestBoard onClose={showQuestsParams?.onClose} characterService={showQuestsParams?.characterService} onQuestSelect={showQuestsParams?.onQuestSelect} show={showQuestsParams?.show ?? false} />
    <ClickerPlayer player={player} />
    <div style={{flexWrap: 'wrap', display: 'flex', gap: '5px'}}>
      {characterServices?.map(c => (
        <ClickerCharacter
          key={c.character.id}
          characterService={c}
          onModifyCharacter={handleModifyCharacter}
          onQuest={handleShowQuestSelection}
          questService={questServices.get(c.character.id)}
        />
      ))}
    </div>
  </div>
}