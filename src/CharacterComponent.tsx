import React from 'react';
import { Progress } from '@material-tailwind/react';
import { Character } from './Characters';
import { CLASSES } from './Constants';

interface CharacterProps {
  character: Character;
}

const CharacterComponent: React.FC<CharacterProps> = ({ character }) => {
  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md rounded-xl w-full sm:w-96">
      <div className="p-4 sm:p-6">
        <img 
          className="h-16 w-16 rounded-full mx-auto mb-4" 
          src={`img/classes/${CLASSES?.find(clz => clz.name === character.class)?.imageName}`} 
          alt="" 
        />
        <h5 className="text-center mb-2 font-sans text-xl font-semibold leading-snug text-blue-gray-900">
          {character.name} - {character.class} - Level {character.level}
        </h5>
        <p className="text-center font-sans text-base font-light leading-relaxed text-inherit">
          Buffs [{character.buffCount}/{character.maxBuffs}]: 
          [+{character.buffAttack ?? 0} Attack] [+{character.buffDefense} Defense]
        </p>
        
        <div className="mt-4">
          <Progress 
            value={+((character.health / character.maxHealth) * 100).toFixed(2)}
            variant="gradient"
            color={((character.health / character.maxHealth) * 100) <= 50 ? 'red' : 'teal'} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <p className="text-center mt-1 text-sm font-sm">
            Health: {((character.health / character.maxHealth) * 100).toFixed(2)}% [{character.health}/{character.maxHealth}]
          </p>
          
          <Progress 
            value={+((character.exp / character.nextLevelExp) * 100).toFixed(2)}
            variant="gradient"
            color='purple' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <p className="text-center mt-1 text-sm font-sm">
            Experience: {((character.exp / character.nextLevelExp) * 100).toFixed(2)}% [{character.exp}/{character.nextLevelExp}]
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterComponent;
