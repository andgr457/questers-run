import { Button } from '@material-tailwind/react'
import { useState, useEffect, useCallback } from 'react'
import { useFloatingNotifications } from '../hooks/useFloatingNotifications'
import { CharacterService } from '../../../../api/services/CharacterService'
import { QuestService } from '../../../../api/services/QuestService'
import NotificationList from '../../common/NotificationList'
import ClickerProgress from './ClickerProgress'
import ClickerProfession from './ClickerProfession'
import { CharacterClassRepository } from '../../../../api/repositories/CharacterClassRepository'
import { LoggerService } from '../../../../api/services/LoggerService'
import { ICharacter } from '../../../../api/interfaces/entities/character/ICharacter'
import ClickerLoot from './ClickerLoot'
import ClickerDialogCharacter from './ClickerDialogCharacter'
import { RecipeRepository } from '../../../../api/repositories/RecipeRepository'
import { LootRepository } from '../../../../api/repositories/LootRepository'

interface ClickerCharacterProps {
  characterService: CharacterService
  questService: QuestService
  onModifyCharacter: (characterService: CharacterService) => void
  onQuest: (level: number, characterId: string) => void
  onSaveCharacter: (character: ICharacter) => void  // new prop
}


export default function ClickerCharacter(props: ClickerCharacterProps) {
  const loggerService = new LoggerService('ClickerCharacter')
  const characterClassRepo = new CharacterClassRepository(loggerService)
  const recipeRepo = new RecipeRepository(loggerService)
  const lootRepo = new LootRepository(loggerService)
  const characterClass = characterClassRepo.getById(props.characterService.character.classId)

  const { characterService, questService, onModifyCharacter, onQuest, onSaveCharacter } = props

  const [tick, setTick] = useState(0)
  const { notifications, addNotification } = useFloatingNotifications()
  const [isLootVisible, setIsLootVisible] = useState(false)
  const [isAlchemyVisible, setIsAlchemyVisible] = useState(false)
  const [isCookingVisible, setIsCookingVisible] = useState(false)

  const toggleLoot = () => setIsLootVisible((prev) => !prev)
  const toggleAlchemy = () => setIsAlchemyVisible((prev) => !prev)
  const toggleCooking = () => setIsCookingVisible((prev) => !prev)

  // useEffect(() => {
  //   const interval = setInterval(() => setTick((t) => t + 1), 1000)
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    if (!questService) return

    const handler = (event: any) => {
      switch (event.type) {
        case 'quest-start':
          addNotification(`Started: ${event.questName}`)
          characterService.character.status = event.questName
          console.log(characterService.character.status)
          onModifyCharacter(characterService)
          onSaveCharacter(characterService.character)
          break
        case 'quest-complete':
          addNotification(`Completed: ${event.questName}`)
          addNotification(`+${event.experience.toFixed(2)} XP`)
          characterService.addXp(event.experience)
          characterService.character.gold += event.gold
          characterService.character.status = 'Resting'
          onModifyCharacter(characterService)
          onSaveCharacter(characterService.character)
          break
        case 'quest-failed':
          addNotification(`Quest Failed: ${event.questName}`)
          characterService.character.status = 'Woke up at the nearest tavern.'
          onModifyCharacter(characterService)
          onSaveCharacter(characterService.character)
          break
        case 'gain-xp':
          addNotification(`+${event.experience.toFixed(2)} XP`)
          characterService.addXp(event.experience)
          onModifyCharacter(characterService)
          onSaveCharacter(characterService.character)
          break
        case 'gain-gold':
          addNotification(`+${event.gold} Gold`)
          characterService.character.gold += event.gold
          onModifyCharacter(characterService)
          onSaveCharacter(characterService.character)
          break
        case 'loot-drop':
          addNotification(`+${event.itemName}`, event?.icon)
          characterService.character.loot.push(event.loot)
          onModifyCharacter(characterService)
          onSaveCharacter(characterService.character)
          break
        case 'mob-kill':
          addNotification(`Killed ${event.mobName} 💀`)
          characterService.character.gold += event.gold
          onModifyCharacter(characterService)
          onSaveCharacter(characterService.character)
          break
        case 'damage-taken':
          addNotification(`❌ You took ${event.damage.toFixed(2)} damage!`)
          characterService.takeDamage(event.damage)
          onModifyCharacter(characterService)
          onSaveCharacter(characterService.character)
          break
        case 'character-died':
          addNotification(`💀 You were slain by ${event.mobName}!`)
          characterService.character.status = '💀'
          onModifyCharacter(characterService)
          onSaveCharacter(characterService.character)
          break
      }
    }

    questService.onEvent(handler)

    return () => {
      questService.offEvent(handler)
    }
  }, [questService, characterService, addNotification, onModifyCharacter])

  const handleCharacterCraft = useCallback((recipeId: string) => {
    const recipe = recipeRepo.getById(recipeId)
    const loot = characterService.character.loot
    for(const recipeItem of recipe.recipeItems){
      for(let i = 0; i < recipeItem.quantity; i++){
        const index = loot.findIndex(item => item.id === recipeItem.resourceId)
        if (index !== -1) {
          loot.splice(index, 1)
        } else {
          // Stop early if no more matching items are found
          break
        }
      }
    }
    const lootItem = lootRepo.getById(recipe.craftedItemId)
    characterService.character.loot.push(lootItem)

    onModifyCharacter(characterService)
    onSaveCharacter(characterService.character)
    addNotification(`+${recipe.title} crafted!`)
  }, [characterService, recipeRepo, lootRepo, onModifyCharacter, onSaveCharacter])

  const onTavern = () => {
    // characterService.character.status = 'Resting'
    const healthGain = characterService.character.maxHealth * 0.05
    const manaGain = characterService.character.maxMana * 0.05
    const staminaGain = characterService.character.maxStamina * 0.05

    characterService.character.health = Math.min(
      characterService.character.health + healthGain,
      characterService.character.maxHealth,
    )
    characterService.character.mana = Math.min(
      characterService.character.mana + manaGain,
      characterService.character.maxMana,
    )
    characterService.character.stamina = Math.min(
      characterService.character.stamina + staminaGain,
      characterService.character.maxStamina,
    )

    addNotification(`zzz +${healthGain.toFixed(2)} HP +${manaGain.toFixed(2)} MP +${staminaGain.toFixed(2)} ST`)

    onModifyCharacter(characterService)
  }

  return (
    <div className="p-14 bg-black-50 rounded-xl shadow-lg max-w-3xl mx-auto">
      <div className="relative overflow-hidden space-y-6">
        <NotificationList notifications={notifications} />
        <ClickerDialogCharacter characterService={characterService} />

<       div key={'XP'} className="flex flex-col gap-1">
          <div className="flex justify-between font-medium text-black-900">
            <span>XP:</span>
            <span>
              {characterService.character.experience.toFixed(0)} / {characterService.character.experienceNextLevel.toFixed(0)}
            </span>
          </div>
          <ClickerProgress color={'purple'} left={characterService.character.experience} total={characterService.character.experienceNextLevel} />
        </div>
        <div className="text-green-800 font-semibold">Status: {characterService?.character?.status}</div>

        {questService && questService.quest && questService.timeLeft > 0 && <>
          <ClickerProgress
            color="orange"
            type="addition"
            left={questService?.timeLeft ?? 0}
            total={questService?.quest?.time ?? 0}
          />
          <div>
            {questService?.timeLeft} / {questService?.quest?.time} seconds
          </div>
        </>
        }

        <div className="space-y-4">
          {[
            {
              label: 'Health',
              color: 'green',
              current: characterService.character.health,
              max: characterService.character.maxHealth,
            },
            {
              label: 'Mana',
              color: 'blue',
              current: characterService.character.mana,
              max: characterService.character.maxMana,
            },
            {
              label: 'Stamina',
              color: 'yellow',
              current: characterService.character.stamina,
              max: characterService.character.maxStamina,
            },
          ].map(({ label, color, current, max }) => (
            <div key={label} className="flex flex-col gap-1">
              <div className="flex justify-between font-medium text-black-900">
                <span>{label}:</span>
                <span title={`${current}/${max}`}>
                  {current.toFixed(0)} / {max.toFixed(0)}
                </span>
              </div>
              <ClickerProgress color={color} left={current} total={max} />
            </div>
          ))}
        </div>

        <div className="text-silver-500 mt-2 flex flex-wrap gap-4 mt-6">
          <span>DPS: {characterService.getDps().toFixed(2)}</span>
          <span>Strength: {characterService.character.strength.toFixed(2)}</span>
          <span>Agility: {characterService.character.agility.toFixed(2)}</span>
          <span>Willpower: {characterService.character.willpower.toFixed(2)}</span>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <Button
            color="blue"
            disabled={questService?.timeLeft !== undefined && questService.timeLeft !== 0}
            onClick={() => onQuest(characterService.character.level, characterService.character.id)} 
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
            >
            QUESTS
          </Button>

          <Button
            color="green"
            disabled={questService?.timeLeft !== undefined && questService.timeLeft !== 0}
            onClick={onTavern}
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            TAVERN
          </Button>

          <Button
            color="amber"
            disabled={questService?.timeLeft !== undefined && questService.timeLeft !== 0}
            onClick={toggleLoot}
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            LOOT
          </Button>

          <Button
            color="purple"
            disabled={questService?.timeLeft !== undefined && questService.timeLeft !== 0}
            onClick={toggleAlchemy}
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            ALCHEMY
          </Button>

          <Button
            color="orange"
            disabled={questService?.timeLeft !== undefined && questService.timeLeft !== 0}
            onClick={toggleCooking}
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            COOKING
          </Button>

          {isLootVisible && (
            <ClickerLoot
              characterService={characterService}
              onClose={() => {setIsLootVisible(false)}}
              show={isLootVisible}
            />
          )}
          {isAlchemyVisible && (
            <ClickerProfession
              handleCharacterCraft={handleCharacterCraft}
              statField="mana"
              characterService={characterService}
              onClose={() => setIsAlchemyVisible(false)}
              profession="alchemy"
              show={isAlchemyVisible}
            />
          )}
          {isCookingVisible && (
            <ClickerProfession
              handleCharacterCraft={handleCharacterCraft}
              statField="stamina"
              characterService={characterService}
              onClose={() => setIsCookingVisible(false)}
              profession="cooking"
              show={isCookingVisible}
            />
          )}
        </div>
      </div>
    </div>
  )
}
