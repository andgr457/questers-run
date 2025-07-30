import { Button } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { useFloatingNotifications } from '../hooks/useFloatingNotifications';
import { CharacterService } from '../../../../api/services/CharacterService';
import { QuestService } from '../../../../api/services/QuestService';
import FloatingNotify from '../../common/FloatingNotify';
import NotificationList from '../../common/NotificationList';

interface ClickerCharacterProps {
  characterService: CharacterService;
  questService: QuestService;
  onQuest: (level: number, characterId: string) => void;
  onAddXp: (characterId: string, xp: number) => void;
}

export default function ClickerCharacter(props: ClickerCharacterProps) {
  const { characterService, questService, onQuest, onAddXp } = props;
  const [tick, setTick] = useState(0);
  const { notifications, addNotification } = useFloatingNotifications();

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!questService) return;

    const handler = (event) => {
      switch (event.type) {
        case "quest-start":
          addNotification(`Quest Started: ${event.questName}`, "/icons/quest-start.png");
          break;
        case "quest-complete":
          addNotification(`Quest Complete: ${event.questName}`, "/icons/quest-complete.png");
          break;
        case "quest-failed":
          addNotification(`Quest Failed: ${event.questName}`, "/icons/quest-failed.png");
          break;
        case "gain-xp":
          addNotification(`+${event.amount} XP`, "/icons/xp.png");
          break;
        case "gain-gold":
          addNotification(`+${event.amount} Gold`, "/icons/gold.png");
          break;
        case "loot-drop":
          addNotification(event.itemName, event.icon);
          break;
        case "mob-kill":
          addNotification(`Killed ${event.mobName}`, "/icons/skull.png");
          break;
        case 'damage-taken':
          addNotification(`❌ You took damage!`);
          break;
        case "character-died":
          addNotification(`💀 You died!`);
          break;
      }
    };

    questService.onEvent(handler);

    return () => {
      questService.offEvent(handler);
    };
  }, [questService, addNotification]); // ✅ only changes when questService changes

  useEffect(() => {
    questService?.onEvent((event) => {
      
    });
  }, [questService, addNotification]);

  const service = characterService;

  return (
    <div style={{padding: '55px'}}>
      <div className="relative overflow-hidden">
        <NotificationList notifications={notifications} />

        {service.character.name}
        <div>Level: {service.character.level}</div>
        <div>Experience: {service.character.experience} / {service.character.experienceNextLevel}</div>
        <div>Status: {service.character.status}</div>
        <div>Health: {service.character.health}/{service.character.maxHealth} Mana: {service.character.mana}/{service.character.maxMana} Stamina: {service.character.stamina}/{service.character.maxStamina}</div>
        <div>Strength: {service.character.strength} Agility: {service.character.agility} Willpower: {service.character.willpower}</div>
        <div>Quest: {questService?.timeLeft === 0 ? `${questService?.quest?.title} Complete!` : `${questService?.quest?.title ?? ''} ${questService?.getQuestTimeLeft() ?? ''}`}</div>
        <div>
          <Button disabled={typeof service.quest !== 'undefined'} onClick={() => onQuest(service.character.level, service.character.id)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>QUESTS</Button>
          <Button onClick={() => onAddXp(service.character.id, 5)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>ADD XP</Button>
        </div>


      </div>
    </div>
  );
}
