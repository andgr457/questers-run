import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  DialogHeader,
  DialogBody,
  Select,
  Option
} from '@material-tailwind/react'
import CharacterComponent from './CharacterComponent'
import { chanceCheck } from './clicker/Clicker'
import MobComponent from './MobComponent'
import { doCharacterExperience, getCharacterCritDamage, getCharacterDamage, getDamageAfterDefense, getEnemyDamage } from '../entity/entity.service';
import { Character } from '../entity/character';
import { Mob } from '../entity/mob';
import { PlayerClass } from '../entity/player';
import { ALL_ITEMS } from '../entity/Constants';
import { BaseItem } from '../entity/item';

interface EncounterProps {
  character: Character
  mob: Mob
  player: PlayerClass
  handleEncounterEvent: any
  setShowEncounter: any
}

interface Potion extends BaseItem {
  quantity: number
}

export function Encounter(props: EncounterProps) {
  const [character] = useState<Character>(props.character)
  const [mob] = useState<Mob>(props.mob)
  const [player] = useState<PlayerClass>(props.player)
  const [encounterEvents, setEncounterEvents] = useState<string[]>([])
  const [potions, setPotions] = useState<Potion[]>([])
  const [selectedPotion, setSelectedPotion] = useState('')

  useEffect(() => {
    if(!character.inventory.tabs) return

    const potions = []
    for(const tab of character.inventory.tabs){
      for(const item of tab.items){
        const itemData = ALL_ITEMS.find(i => i.name === item.name)
        if(itemData?.type === 'Consumable'){
          potions.push({...itemData, quantity: item.quantity})
        }
      }
    }
    setPotions([...potions])
  }, [character.inventory.tabs])

  const handleRunClicked = useCallback(() => {
    if (chanceCheck(50)) {
      props.setShowEncounter(false);
    } else {
      if (chanceCheck(mob.hitChance)) {
        setEncounterEvents((prevEvents) => [...prevEvents, `${mob.name} hit ${character.name} for ${mob.attack}...`]);
        character.health -= getDamageAfterDefense(character, mob.attack);
        if(character.health <= 0){
          character.health = 0
          props.setShowEncounter(false)
        }
      } else {
        setEncounterEvents((prevEvents) => [...prevEvents, `${mob.name} missed ${character.name}!`]);
      }
  
      props.handleEncounterEvent(character, mob, player);
    }
  }, [props, mob, character, player]);

  const handleAttackClicked = useCallback(() => {

    /** Character Attack */
    if (chanceCheck(character.hitChance)) {
      let characterAttack = 0
      if(chanceCheck(character.critChance + character.buffCrit)){
        characterAttack = getCharacterCritDamage(character)
        setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} critically hit for ${characterAttack.toFixed(2)} on ${mob.name}...`])
      } else {
        characterAttack = getCharacterDamage(character)
        setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} hit ${mob.name} for ${characterAttack.toFixed(2)}...`]);
      }
      mob.health -= characterAttack;
    } else {
      setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} missed ${mob.name}!`]);
    }

    /** Mob Health Check */
    if (mob.health <= 0) {
      doCharacterExperience(player, character, mob.expGiven * mob.level)
      player.gold += mob.expGiven
      character.gold += mob.expGiven
      props.setShowEncounter(false)
      setEncounterEvents([]);
    }

    /** Mob attack */
    if (chanceCheck(mob.hitChance)) {
      const damage = getEnemyDamage(character, mob)
      character.health -= damage
      setEncounterEvents((prevEvents) => [...prevEvents, `${mob.name} hit ${character.name} for ${damage}...`]);
    } else {
      setEncounterEvents((prevEvents) => [...prevEvents, `${mob.name} missed ${character.name}!`]);
    }

    /** Character Health Check */
    if(character.health <= 0){
      character.health = 0
      props.setShowEncounter(false)
      setEncounterEvents([]);
    }

    props.handleEncounterEvent(character, mob, player);
  }, [props, mob, character, player]);

  const handlePotionClicked = useCallback(() => {
    console.log(selectedPotion)
    if(selectedPotion?.trim() === '') {
      setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} does not have a potion prepared...`]);
      return
    }
    
    const potion = potions.find(p => p.name === selectedPotion)
    if(potion.quantity === 0){
      setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} has no more ${potion.name}s left...`]);
      return
    }

    for(const stat of potion.buffStats){
      let index = 0
      let capitolized = stat.field[0].toUpperCase()
      for(const value of stat.field as any){
        if(index === 0){
          index += 1
          continue
        }
        index += 1
        capitolized += `${value}`
        console.log(value)
      }
      const maxStatField = `max${capitolized}`
      console.log(maxStatField)

      if(character[stat.field] === character[maxStatField]){
        character[stat.field] = character[maxStatField]
        setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} is already at max ${stat.field}...`]);
        continue
      }
      character[stat.field] += stat.value
      if(character[stat.field] >= character[maxStatField]){
        character[stat.field] = character[maxStatField]
      }
      setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} consumed ${potion.name} for ${stat.value} points of ${stat.field}...`]);
    }

    potion.quantity -= 1
    for(const tab of character.inventory.tabs){
      // const newItems = []
      for(const item of tab.items){
        if(item.name === potion.name){
          item.quantity = potion.quantity
        }
        // if(item.quantity > 0){
        //   newItems.push(item)
        // } 
      }
      // tab.items = newItems
    }
  }, [character, potions, selectedPotion])

  const setPotion = useCallback((e: any) => {
    setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} prepares ${e}...`]);
    setSelectedPotion(e)
  }, [character])

  const view = useMemo(() => {
    return (
      <>
    <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Encounter with a {mob.type} {mob.name}!</DialogHeader>
    <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} className='w-full overflow-hidden'>
    <div className='overflow-y-auto scrollable-y'>
    <table style={{width: '100%'}}>
        <tr>
            <td style={{width: '50%'}}>
                <CharacterComponent character={character}></CharacterComponent>
            </td>
            <td style={{width: '50%'}}>
                <MobComponent mob={mob}></MobComponent>
            </td>
        </tr>
        <tr>
            <td colSpan={3}>
                <Button disabled={mob.health <= 0} variant='gradient' color='green' onClick={handleAttackClicked} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <span>Attack</span>
                </Button>
                <Button
                    variant='text'
                    color='red'
                    onClick={handleRunClicked}
                    className='mr-1' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <span>Run</span>
                </Button>
                <Button
                  disabled={potions.length === 0}
                  variant='gradient'
                  color='green'
                  onClick={handlePotionClicked}
                  className='mr-1' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                >
                  Potion
                </Button>
                <div className="w-72">
                  <Select onChange={setPotion} label="Select Potion" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {potions.map(hp => {
                      return (
                        <Option key={hp.name} value={hp.name}>{hp.name} [{hp.quantity}]</Option>
                      )
                    })}
                  </Select>
                </div>
            </td>
        </tr>
    </table>
    <div
          className={`flex-grow bg-gray-100 p-4`}
        >
          <h2 className="text-xl font-bold mb-2">Action Log</h2>
          <div className="bg-white rounded-md shadow-md p-4 h-full max-h-[50vh] md:max-h-full overflow-y-auto">
          {encounterEvents.slice().reverse().map((e, index) => (
              <p key={index} className='text-sm font-sm'>{e}</p>
          ))}
          </div>
        </div>
</div>

    </DialogBody>
</>

    );
  }, [setPotion, character, mob, handleAttackClicked, handleRunClicked, encounterEvents, potions, handlePotionClicked]);

  return view;
}
