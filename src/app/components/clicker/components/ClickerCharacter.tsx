import { Button } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { useFloatingNotifications } from '../hooks/useFloatingNotifications';
import { CharacterService } from '../../../../api/services/CharacterService';
import { QuestService } from '../../../../api/services/QuestService';
import FloatingNotify from '../../common/FloatingNotify';
import NotificationList from '../../common/NotificationList';
import ClickerProgress from './ClickerProgress';
import ClickerBag from './ClickerBag';

interface ClickerCharacterProps {
  characterService: CharacterService;
  questService: QuestService;
  onModifyCharacter: (characterService: CharacterService) => void;
  onQuest: (level: number, characterId: string) => void;
}

export default function ClickerCharacter(props: ClickerCharacterProps) {
  const { characterService, questService, onModifyCharacter, onQuest } = props;
  const [tick, setTick] = useState(0);
  const { notifications, addNotification } = useFloatingNotifications();
  const [isBagVisible, setIsBagVisible] = useState(false)
  const toggleBag = () => setIsBagVisible(prev => !prev)

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!questService) return;

    const handler = (event) => {
      switch (event.type) {
        case "quest-start":
          addNotification(`Started: ${event.questName}`);
          onModifyCharacter(characterService)
          break;
        case "quest-complete":
          addNotification(`Completed: ${event.questName}`);
          addNotification(`+${event.experience.toFixed(2)} XP`);
          characterService.addXp(event.experience)
          characterService.character.gold += event.gold
          characterService.character.status = 'Walking home...'
          onModifyCharacter(characterService)
          break;
        case "quest-failed":
          addNotification(`Quest Failed: ${event.questName}`);
          characterService.character.status = 'Crawling to the nearest town...'
          onModifyCharacter(characterService)
          break;
        case "gain-xp":
          addNotification(`+${event.experience.toFixed(2)} XP`);
          characterService.addXp(event.experience)
          onModifyCharacter(characterService)
          break;
        case "gain-gold":
          addNotification(`+${event.gold} Gold`);
          characterService.character.gold += event.gold
          onModifyCharacter(characterService)
          break;
        case "loot-drop":
          addNotification(`+${event.itemName}`, event?.icon);
          characterService.character.loot.push(event.loot)
          onModifyCharacter(characterService)
          break;
        case "mob-kill":
          addNotification(`Killed ${event.mobName} 💀`);
          characterService.character.gold += event.gold
          onModifyCharacter(characterService)
          break;
        case 'damage-taken':
          addNotification(`❌ You took ${event.damage.toFixed(2)} damage!`);
          characterService.takeDamage(event.damage)
          onModifyCharacter(characterService)
          break;
        case "character-died":
          addNotification(`💀 You were slain by ${event.mobName}!`);
          characterService.character.status = '💀'
          onModifyCharacter(characterService)

          break;
      }
    };

    questService.onEvent(handler);

    return () => {
      questService.offEvent(handler);
    };
  }, [questService, characterService, addNotification]); // ✅ only changes when questService changes

  const onTavern = () => {
    characterService.character.status = 'At the pub down the road...'
    const healthGain = characterService.character.maxHealth * 0.05;
    const manaGain = characterService.character.maxMana * 0.05; // fixed: was using maxHealth
    const staminaGain = characterService.character.maxStamina * 0.05;

    // Add and clamp values
    characterService.character.health = Math.min(
      characterService.character.health + healthGain,
      characterService.character.maxHealth
    );

    characterService.character.mana = Math.min(
      characterService.character.mana + manaGain,
      characterService.character.maxMana
    );

    characterService.character.stamina = Math.min(
      characterService.character.stamina + staminaGain,
      characterService.character.maxStamina
    );

    addNotification(
      `zZzZzZz +${healthGain} HP +${manaGain} MP +${staminaGain} ST`
    );

    onModifyCharacter(characterService);
  };

  const onLoot = () => {
    characterService.character.status = 'Ruffling through their bags...'
    

    addNotification(
      `Bag check success!`
    );

    onModifyCharacter(characterService);
  };


  return (
    <div className="p-14 bg-black-50 rounded-xl shadow-lg max-w-3xl mx-auto">
    <div className="relative overflow-hidden space-y-6">

      {/* Hey, this is ChatGPT shining bright ✨ — your friendly AI assistant! */}

      <NotificationList notifications={notifications} />

      <h2 className="text-4xl font-extrabold text-teal-900">{characterService.character.name}</h2>

      <div className="flex gap-10 flex-wrap text-black-800 font-semibold">
        <div>Level: {characterService.character.level}</div>
        <div>Experience: {characterService.character.experience.toFixed(2)} / {characterService.character.experienceNextLevel}</div>
      </div>

      <ClickerProgress
        type="addition"
        color="purple"
        total={characterService.character.experienceNextLevel}
        left={characterService.character.experience}
      />

      <div className="text-black-800 font-semibold">Gold: {characterService.character.gold ?? 0}</div>
      <div className="text-green-800 font-semibold">Status: {characterService.character.status}</div>

      <ClickerProgress
        color="orange"
        type="addition"
        left={questService?.timeLeft ?? 0}
        total={questService?.quest?.time ?? 0}
      />

      <div className="space-y-4">
        {[
          { label: 'Health', color: 'green', current: characterService.character.health, max: characterService.character.maxHealth },
          { label: 'Mana', color: 'blue', current: characterService.character.mana, max: characterService.character.maxMana },
          { label: 'Stamina', color: 'yellow', current: characterService.character.stamina, max: characterService.character.maxStamina },
        ].map(({ label, color, current, max }) => (
          <div key={label} className="flex flex-col gap-1">
            <div className="flex justify-between font-medium text-black-900">
              <span>{label}:</span>
              <span>{current.toFixed(2)} / {max}</span>
            </div>
            <ClickerProgress color={color} left={current} total={max} />
          </div>
        ))}
      </div>

      <div className="text-black-900 font-semibold">
        DPS: {characterService.getDps().toFixed(2)} | Strength: {characterService.character.strength} &nbsp;|&nbsp; Agility: {characterService.character.agility} &nbsp;|&nbsp; Willpower: {characterService.character.willpower}
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        <Button
          color="blue"
          disabled={typeof questService?.timeLeft !== 'undefined' && questService.timeLeft !== 0}
          onClick={() => onQuest(characterService.character.level, characterService.character.id)}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          QUESTS
        </Button>

        <Button
          color="green"
          disabled={typeof questService?.timeLeft !== 'undefined' && questService.timeLeft !== 0}
          onClick={() => onTavern()}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          TAVERN
        </Button>

        <Button
          color="brown"
          disabled={typeof questService?.timeLeft !== 'undefined' && questService.timeLeft !== 0}
          onClick={toggleBag}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          LOOT
        </Button>
        {isBagVisible && (
          <ClickerBag
            characterService={characterService}
            show={isBagVisible}
            onClose={() => setIsBagVisible(false)}
          />
        )}
      </div>
    </div>
  </div>
  );
}
