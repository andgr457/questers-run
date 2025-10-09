import { Heart, Zap, Bubbles, Coins, TestTube } from 'lucide-react';
import { CharacterService } from '../../../../api/services/CharacterService';
import { useState, useEffect } from 'react';

interface ClickerDialogCharacterProps {
  characterService: CharacterService
}
export default function ClickerDialogCharacter(props: ClickerDialogCharacterProps) {
  const { characterService } = props;

  // Force re-render by using tick from parent
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 500);
    return () => clearInterval(interval);
  }, []);

  const character = characterService.character;
  const characterClass = characterService.characterClass;

  return (
    <div className="sticky -top-2 z-49 bg-white flex flex-col sm:flex-row gap-3 p-2 shadow-sm rounded-2xl bg-gray-100">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        <h2 className="text-4xl font-extrabold text-teal-900">
          {character?.name}
          <span className="block text-sm font-normal">
            {characterClass?.name.toUpperCase()} {character?.level}
          </span>
        </h2>
      </div>

      <div className="sticky -top-2 z-48 bg-white flex flex-col sm:flex-row gap-3 p-2 shadow-sm rounded-2xl">
        <div title="Experience" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }} className="text-purple-500">
          <TestTube />
          XP {character?.experience.toFixed(2)}
        </div>

        <div title="Health" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }} className="text-red-500">
          <Heart />
          HP {character?.health.toFixed(2)}
        </div>

        <div title="Stamina" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }} className="text-orange-500">
          <Zap />
          SP {character?.stamina.toFixed(2)}
        </div>

        <div title="Mana" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }} className="text-blue-500">
          <Bubbles />
          MP {character?.mana.toFixed(2)}
        </div>

        <div title="GP" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }} className="text-green-500">
          <Coins />
          GP {character?.gold.toLocaleString()}
        </div>
      </div>
    </div>
  );
}