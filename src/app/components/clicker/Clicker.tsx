import { useCallback, useEffect, useState } from 'react'
import { IPlayer } from '../../../api/interfaces/entities/IPlayer'
import { ICharacter } from '../../../api/interfaces/entities/character/ICharacter'
import ClickerPlayer from './components/ClickerPlayer'
import { CharacterService } from '../../../api/services/CharacterService'
import { LoggerService } from '../../../api/services/LoggerService'
import { ICharacterClass } from '../../../api/interfaces/entities/character/ICharacterClass'
import { Button } from '@material-tailwind/react'
import ClickerQuestSelection, { ClickerQuestSelectionProps } from './components/ClickerQuestSelection'
import { CharacterClassRepository } from '../../../api/repositories/CharacterClassRepository'
import { QuestRepository } from '../../../api/repositories/QuestRepository'
import { IQuest } from '../../../api/interfaces/entities/IQuest'
import ClickerCharacter from './components/ClickerCharacter'
import { QuestService } from '../../../api/services/QuestService'

export default function Clicker(){
  const loggerService = new LoggerService('Clicker')
  const questRepo = new QuestRepository(loggerService)
  const characterClassRepo = new CharacterClassRepository(loggerService)

  const [player, setPlayer] = useState<IPlayer>(undefined)
  const [characterServices, setCharacterServices] = useState<CharacterService[]>(undefined)
  const [quests, setQuests] = useState<IQuest[]>(undefined)
  const [questServices, setQuestServices] = useState<Map<string, QuestService>>(new Map())
  const [questStates, setQuestStates] = useState<Record<string, { timeLeft: number; isComplete: boolean }>>({})

  const [showQuestsParams, setShowQuestsParams] = useState<ClickerQuestSelectionProps>(undefined)

  useEffect(() => {
    //load player & load characters

    //test
    setQuests(questRepo.list())
    
    const characterClass: ICharacterClass = characterClassRepo.list().find(c => c.id = 'knight')
    const hayzlit: ICharacter = {
      id: 'creator',
      classId: 'knight',
      status: 'Town',
      experience: 0,
      experienceNextLevel: 100,
      level: 1,
      name: 'Hayzlit',
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
    const derp: ICharacter = {
      id: 'derp',
      classId: 'knight',
      status: 'Town',
      experience: 0,
      experienceNextLevel: 100,
      level: 1,
      name: 'Hayzlit',
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

  const handleAddXp = useCallback((characterId: string, xp: number) => {
    setCharacterServices(prevChars => {
      return prevChars.map(c => {
        if (c.character.id === characterId) {
          c.addXp(xp)
          return new CharacterService(loggerService, {
            character: { ...c.character },
            characterClass: c.characterClass,
            buffs: c.buffs,
            quest: c.quest
          })
        }
        return c
      })
    })
  }, [characterServices])

  const handleShowQuestSelection = useCallback((level: number, characterId: string) => {
    setShowQuestsParams({quests: quests, characterId, level, show: true, onQuestSelect: handleQuestSelect, onClose: handleHideQuestSelection})
  }, [quests])

  const handleHideQuestSelection = useCallback(() => {
    setShowQuestsParams({quests: undefined, characterId: undefined, level: undefined, show: false, onQuestSelect: undefined, onClose: undefined})
  }, [])

  const handleQuestSelect = useCallback((questId: string, characterId: string) => {
    const quest = quests.find(q => q.id === questId)
    if (!quest) return

    const characterService = characterServices.find(c => c.character.id === characterId)
    if(quest.stamina > characterService.character.stamina){
      return
    }

    const questService = new QuestService(
      loggerService,
      quest,
      characterId,
      (timeLeft, isComplete) => {
        setQuestStates(prev => ({
          ...prev,
          [characterId]: { timeLeft, isComplete }
        }))
      },
      () => {
        // ✅ XP reward logic here
        console.log('Quest completed for:', characterId)

        setCharacterServices(prevChars => {
        return prevChars.map(c => {
            if (c.character.id === characterId) {
              c.character.status = 'Town'
              c.addXp(quest.experience)
              return new CharacterService(loggerService, {
                character: { ...c.character },
                characterClass: c.characterClass,
                buffs: c.buffs,
                quest: undefined
              })
            }
            return c
          })
        })
      }
    )

    questService.startQuest()

    setQuestServices(prev => {
      const next = new Map(prev)
      next.set(characterId, questService)
      return next
    })

    // If you need to set quest status on character data, do it explicitly
    setCharacterServices(prevChars => {
      return prevChars.map(c => {
        if (c.character.id === characterId) {
          c.character.status = 'Questing'
          c.character.stamina -= quest.stamina
          return new CharacterService(loggerService, {
            character: { ...c.character },
            characterClass: c.characterClass,
            buffs: c.buffs,
            quest: c.quest
          })
        }
        return c
      })
    })

    setShowQuestsParams({quests: undefined, characterId: undefined, level: undefined, show: false, onQuestSelect: undefined, onClose: undefined})
  }, [quests])

  return <div>
    <ClickerQuestSelection quests={quests} onClose={showQuestsParams?.onClose} characterId={showQuestsParams?.characterId} level={showQuestsParams?.level} onQuestSelect={showQuestsParams?.onQuestSelect} show={showQuestsParams?.show ?? false} />
    <ClickerPlayer player={player} />
    {characterServices?.map(c => (
      <ClickerCharacter
        key={c.character.id}
        characterData={c}
        onQuest={handleShowQuestSelection}
        onAddXp={handleAddXp}
        questService={questServices.get(c.character.id)}
      />
    ))}
  </div>
}