import React from 'react'
import { Progress } from '@material-tailwind/react'
import { CLASSES } from '../entity/Constants';
import { Character } from '../entity/entity.interface';
import { doEntityAttack } from '../entity/entity.service';

interface CharacterProps {
  character: Character
}

const CharacterComponent: React.FC<CharacterProps> = ({ character }) => {
  return (
    <div className=''>
      <img 
        className='h-16 w-16 mx-auto mb-4' 
        src={`img/classes/${CLASSES?.find(clz => clz.name === character.class)?.imageName}`} 
        alt='' 
      />
      <h5 className='text-center mb-2 font-sans text-xl font-semibold leading-snug text-blue-gray-900'>
        {character.name} - {character.class} - Level {character.level}
      </h5>
      <p className='text-center font-sans text-base text-xs font-light leading-relaxed text-inherit'>
        Buffs [{character.buffCount}/{character.maxBuffs}]
        [+{character.buffAttack.toFixed(2)} Attack] [+{character.buffDefense.toFixed(2)} Defense] [+{character.buffCrit.toFixed(2)} Critical]<br/>
        Stats [{doEntityAttack(character, character.buffAttack)} Damage] [{(doEntityAttack(character, character.buffAttack) * character.buffCrit).toFixed(2)} Crit Damage]
        [{character.critChance + character.buffCrit}% Crit Chance] [{character.hitChance}% Hit Chance]

      </p>
      
      <div className='mt-4'>
        <Progress 
          value={+((character.health / character.maxHealth) * 100).toFixed(2)}
          variant='gradient'
          color={((character.health / character.maxHealth) * 100) <= 50 ? 'red' : 'teal'} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
        <p className='text-center mt-1 text-sm font-sm'>
          Health: {((character.health / character.maxHealth) * 100).toFixed(2)}% [{character.health.toFixed(2)}/{character.maxHealth.toFixed(2)}]
        </p>
        
        <Progress 
          value={+((character.exp / character.nextLevelExp) * 100).toFixed(2)}
          variant='gradient'
          color='purple' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
        <p className='text-center mt-1 text-sm font-sm'>
          Experience: {((character.exp / character.nextLevelExp) * 100).toFixed(2)}% [{character.exp.toFixed(2)}/{character.nextLevelExp.toFixed(2)}]
        </p>
      </div>
    </div>
  )
}

export default CharacterComponent;
