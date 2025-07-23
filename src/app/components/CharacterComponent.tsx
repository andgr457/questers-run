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
  return (<div>
    
    <span>
      <table>
        <thead></thead>
        <tbody className='clicker-table'>
          <tr>
            <td>
            <span className='clicker-header'>{character.name}</span>

            </td>
            <td>
            <span className='clicker-header'>{character.class}</span>
            </td>
            <td style={{width: '150px'}}>
            <span  className='clicker-label'>LVL {character.level}</span>
            </td>
          </tr>
          <tr>
            <td>
              <img 
                src={`img/classes/${CLASSES?.find(clz => clz.name === character.class)?.imageName}`} 
                alt='' 
              />
                  <div>
                  <span>{character.gold}</span>
                  <img 
                    src={`img/custom/qr-gold-1.png`} 
                    alt="gold" 
                    style={{ display: 'inline-block', verticalAlign: 'middle'}}
                  />
                </div>
            </td>
            <td colSpan={2}>

              {/* Progress Bars */}
              <table>
                <thead></thead>
                <tbody>
                  <tr>
                    <td>
                    <Progress 
                      value={+((healthLeft) * 100).toFixed(2)}
                      variant='gradient'
                      color={((healthLeft) * 100) <= 50 ? 'red' : 'teal'} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
                    <span className='text-center mt-1 text-sm font-sm'>
                      HP: {((healthLeft) * 100).toFixed(2)}% [{character.health.toFixed(2)}/{character.maxHealth.toFixed(2)}]
                    </span>
                    </td>
                    </tr>
                    <tr>
                    <td>
                      <div>
                        <Progress 
                          value={+((manaLeft ?? 0) * 100).toFixed(2)}
                          variant='gradient'
                          color='blue' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
                        <p className='text-center mt-1 text-sm font-sm'>
                          MP: {((manaLeft ?? 0) * 100).toFixed(2)}% [{character.mana.toFixed(2)}/{character.maxMana.toFixed(2)}]
                        </p>
                      </div>
                    </td>
                    </tr>
                    <tr>
                    <td>
                      <Progress 
                        value={+((character.exp / character.nextLevelExp) * 100).toFixed(2)}
                        variant='gradient'
                        color='purple' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
                      <p className='text-center mt-1 text-sm font-sm'>
                        XP: {((character.exp / character.nextLevelExp) * 100).toFixed(2)}% [{character.exp.toFixed(2)}/{character.nextLevelExp.toFixed(2)}]
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

            </td>
          </tr>

              
          <tr>

          </tr>

          <tr>
            <td colSpan={2}>
              <span className='clicker-header'>STATS</span><br/>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span className='clicker-label'>ATTACK</span><br/>
                    </td>
                    <td>
                      {character.attack.toFixed(1)}
                    </td>
                    <td>
                      + {character.buffAttack.toFixed(1)}
                    </td>
                    <td>
                      <span className='clicker-label'>HIT</span><br/>
                      
                    </td>
                    <td>
                      {character.hitChance.toFixed(1)}
                    </td>
                    <td>
                      {character.buffHit.toFixed(1)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className='clicker-label'>DEFENSE</span><br/>

                    </td>
                    <td>
                      {character.defense.toFixed(1)}

                    </td>
                    <td>
                      + {character.buffDefense.toFixed(1)}
                    </td>
                    <td>
                      <span className='clicker-label'>CRIT</span><br/>

                    </td>
                    <td>
                      {character.critChance.toFixed(1)}

                    </td>
                    <td>
                      + {character.buffCrit.toFixed(1)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
    
            
          </tr>
          <tr>
          <table>
                <tbody>

                  <tr>
                    <td>
                      <span className='clicker-label'>DEFENSE</span><br/>

                    </td>
                    <td>
                      {character.defense.toFixed(1)}

                    </td>
                    <td>
                      + {character.buffDefense.toFixed(1)}

                    </td>

                  </tr>
                </tbody>
              </table>
          </tr>
        </tbody>
      </table>


    </span>
    
    




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
