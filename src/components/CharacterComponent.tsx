import React from 'react'
import { Progress } from '@material-tailwind/react'
import { CLASSES } from '../entity/Constants';
import { doEntityAttack } from '../entity/entity.service';
import { Character } from '../entity/character';

interface CharacterProps {
  character: Character
}

const CharacterComponent: React.FC<CharacterProps> = ({ character }) => {
  return (
    <div style={{padding: '15px'}}>
          <p style={{textAlign: 'center'}}><strong>{character.name}</strong><br/>{character.class} </p>
      <img 
      className='h-16 w-16 mx-auto mb-4' 
      src={`img/classes/${CLASSES?.find(clz => clz.name === character.class)?.imageName}`} 
      alt='' 
    />
    <p style={{textAlign: 'center'}}>Level {character.level}</p>
    <p style={{textAlign: 'center'}}>
    {character.gold} <span style={{color: '#A38A00'}}>Gold</span>    
      </p>

    <Progress 
          value={+((character.health / character.maxHealth) * 100).toFixed(2)}
          variant='gradient'
          color={((character.health / character.maxHealth) * 100) <= 50 ? 'red' : 'teal'} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
        <p className='text-center mt-1 text-sm font-sm'>
          Health: {((character.health / character.maxHealth) * 100).toFixed(2)}% [{character.health.toFixed(2)}/{character.maxHealth.toFixed(2)}]
        </p>

        {character.mana > 0 ? 
        <div>
          <Progress 
            value={+((character.mana / character.maxMana) * 100).toFixed(2)}
            variant='gradient'
            color='blue' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <p className='text-center mt-1 text-sm font-sm'>
            Mana: {((character.mana / character.maxMana) * 100).toFixed(2)}% [{character.mana.toFixed(2)}/{character.maxMana.toFixed(2)}]
          </p>
        </div>
          : ''
      }
        
        
        <Progress 
          value={+((character.exp / character.nextLevelExp) * 100).toFixed(2)}
          variant='gradient'
          color='purple' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
        <p className='text-center mt-1 text-sm font-sm'>
          Experience: {((character.exp / character.nextLevelExp) * 100).toFixed(2)}% [{character.exp.toFixed(2)}/{character.nextLevelExp.toFixed(2)}]
        </p>
        <div style={{marginLeft: '15px', textAlign: 'left', alignItems: 'unset', fontSize: '.8em'}}>
              <p style={{color: `${character.buffCount < character.maxBuffs ? 'green' : ''}` }}>Buffs [{character.buffCount}/{character.maxBuffs}] [+{character.buffAttack.toFixed(2)} Attack] [+{character.buffDefense.toFixed(2)} Defense] [+{character.buffCrit.toFixed(2)} Critical]</p>
              [{character.defense + character.buffDefense} Defense [{character.defense} + {character.buffDefense}]]
              [{doEntityAttack(character, character.buffAttack)} Damage [{character.attack} + {character.buffAttack}]] [{(doEntityAttack(character, character.buffAttack) * character.buffCrit).toFixed(2)} Crit Dmg [({character.attack} + {character.buffAttack}) * {character.buffCrit}]]
              [{character.critChance + character.buffCrit}% Crit [{character.critChance} + {character.buffCrit}]] [{character.hitChance}% Hit]
            </div>
            <div className='mt-4'>
      </div>

    </div>
  )
}

export default CharacterComponent;
