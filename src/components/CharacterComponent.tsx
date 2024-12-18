import React from 'react'
import { Progress } from '@material-tailwind/react'
import { CLASSES } from '../entity/Constants';
import { getCharacterCritDamage, getCharacterDamage } from '../entity/entity.service';
import { Character } from '../entity/character';
import TooltipCustomAnimation from './ToolTipAnimated';

interface CharacterProps {
  character: Character
}

const CharacterComponent: React.FC<CharacterProps> = ({ character }) => {
  const healthLeft = character.health / character.maxHealth
  const manaLeft = character.mana / character.maxMana
  return (
    <div style={{padding: '15px'}}>
          <p style={{textAlign: 'center'}}><strong>{character.name}</strong><br/>{character.class} </p>
      <img 
      className='h-16 w-16 mx-auto mb-4' 
      src={`img/classes/${CLASSES?.find(clz => clz.name === character.class)?.imageName}`} 
      alt='' 
    />
    <p style={{textAlign: 'center'}}>Level {character.level} </p>
    <div style={{ textAlign: 'center' }}>
      <span>{character.gold}</span>
      <img 
        src={`img/custom/qr-gold-1.png`} 
        alt="gold" 
        style={{ display: 'inline-block', verticalAlign: 'middle'}}
      />
    </div>

      

    <Progress 
          value={+((healthLeft) * 100).toFixed(2)}
          variant='gradient'
          color={((healthLeft) * 100) <= 50 ? 'red' : 'teal'} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
        <p className='text-center mt-1 text-sm font-sm'>
          Health: {((healthLeft) * 100).toFixed(2)}% [{character.health.toFixed(2)}/{character.maxHealth.toFixed(2)}]
        </p>

        {character.mana > 0 ? 
        <div>
          <Progress 
            value={+((manaLeft) * 100).toFixed(2)}
            variant='gradient'
            color='blue' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <p className='text-center mt-1 text-sm font-sm'>
            Mana: {((manaLeft) * 100).toFixed(2)}% [{character.mana.toFixed(2)}/{character.maxMana.toFixed(2)}]
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
              
                <TooltipCustomAnimation content={
                  `Attack ${character.buffAttack.toFixed(2)} Defense ${character.buffDefense.toFixed(2)} Critical ${character.buffCrit.toFixed(2)}`
                  } color={undefined} text={`Buffs [${character.buffCount}/${character.maxBuffs}]`}></TooltipCustomAnimation>
                
                
                <TooltipCustomAnimation content={
                  `${character.defense} + ${character.buffDefense}`
                  } color={undefined} text={
                    `Defense [${character.defense + character.buffDefense}]`
                    }></TooltipCustomAnimation>

                <TooltipCustomAnimation content={
                  `${character.attack} + ${character.buffAttack}`
                  } color={undefined} text={
                    `Damage [${getCharacterDamage(character).toFixed(2)}]`
                    }></TooltipCustomAnimation>

                <TooltipCustomAnimation content={
                  `${getCharacterDamage(character)} * ${character.buffCrit}`
                  } color={undefined} text={
                    `Crit Damage [${getCharacterCritDamage(character).toFixed(2)}]`
                    }></TooltipCustomAnimation>

                <TooltipCustomAnimation content={
                  `${character.critChance} + ${character.buffCrit}`
                  } color={undefined} text={
                    `Crit Chance [${character.critChance + character.buffCrit}%]`
                    }></TooltipCustomAnimation>
                    
                <TooltipCustomAnimation content={
                  `${character.hitChance}`
                  } color={undefined} text={
                    `Hit Chance [${character.hitChance}%]`
                    }></TooltipCustomAnimation>

            </div>


    </div>
  )
}

export default CharacterComponent;
