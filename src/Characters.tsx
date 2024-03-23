import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Button, Dialog, Progress } from "@material-tailwind/react"
import { Encounter } from './Encounter'
import { ToastContainer, toast } from 'react-toastify'

import Tavern from './Tavern'
import { IMG_MAGE_ICON8, IMG_ROGUE_ICON8, IMG_WARRIOR_ICON8 } from './Constants'
export interface Character {
  name: string
  level: number
  exp: number
  nextLevelExp: number
  class: string /** Class Name */
  health: number
  maxHealth: number
  attack: number
  buffAttack: number
  buffDefense: number
  maxBuffs: number
}

export interface CharacterClass {
  name: string
  description: string
  imageName: string
  credit: string
}

export interface Item {
  name: string
  description: string
  baseValue: number
  rarity: ItemRarity
  buffHealth?: number
  buffAttack?: number
  buffDefense?: number
}

export interface ItemRarity {
  name: string
  /* starting from 1 - value * 1.25 **/
  valueModifier: number
}

export interface CharacterBag {

}

export interface CharacterEquip {

}

export interface Mob {
  name: string
  type: string
  level: number
  health: number
  maxHealth: number,
  attack: number
  buffAttack: number
  buffDefense: number
}

const goblin: Mob = {
  name: 'Goblin',
  type: 'Hostile Creature',
  attack: 1,
  health: 10,
  maxHealth: 10,
  level: 1,
  buffAttack: 0,
  buffDefense: 1
}

const classes: CharacterClass[] = [
  {
    name: 'Warrior', 
    description: 'A valiant knight clad in formidable armor, wielding a mighty blade with unmatched skill, standing as the indomitable champion of the battlefield.',
    imageName: 'warrior',
    credit: IMG_WARRIOR_ICON8
  },
  {
    name: 'Mage', 
    description: 'A master of arcane arts, weaving spells and conjuring elements, wielding the powers of magic to shape reality and bend the forces of nature to their will.',
    imageName: 'mage',
    credit: IMG_MAGE_ICON8
  },
  {
    name: 'Rogue', 
    description: 'A stealthy shadow-dancer, adept in the arts of deception and subterfuge, wielding daggers and bows to strike from the shadows with lethal precision.',
    imageName: 'rogue',
    credit: IMG_ROGUE_ICON8
  }
]

export interface Image {

}

const charactersList: Readonly<Character[]> = [
  {
    name: 'Hayz', level: 20, exp: 0, nextLevelExp: 200, health: 200, maxHealth: 200,
    attack: 1, buffAttack: 0, buffDefense: 0, maxBuffs: 0,
    class: 'Warrior'
  },
  {
    name: 'Lithos', level: 1, exp: 0, nextLevelExp: 100, health: 69, maxHealth: 100,
    attack: 1, buffAttack: 0, buffDefense: 0, maxBuffs: 0,
    class: 'Mage'
  },
  {
    name: 'Velouria', level: 1, exp: 0, nextLevelExp: 100, health: 25, maxHealth: 100,
    attack: 1, buffAttack: 0, buffDefense: 0, maxBuffs: 0,
    class: 'Rogue'
  }
]

const toastMessages = [
  'Welcome back, adventurer! Your characters have hit the gym and are now stronger than ever!',
  'Greetings, hero! Your characters have been sharpened and are ready to slice through challenges!',
  'Ahoy, brave soul! Your characters have been buffed and are now more resilient!',
  'Hail, mighty warrior! Your characters have been infused with power and are ready to conquer!',
  'Welcome back, champion! Your characters have been blessed with new buffs and are eager to unleash their might!'
];

export function randomize(chance: number): boolean {
  const randomNumber = Math.random() * 100
  return randomNumber < chance
}

export default function Characters() {
  const [encounterShown, setEncounterShown] = useState(false)
  const [showTavern, setShowTavern] = useState(false)
  const [characters, setCharacters]: [Character[], any] = useState([])
  const [mob, setMob]: [Mob, any] = useState({...goblin})
  const [character, setCharacter] = useState(undefined)

  useEffect(() => {
    /** Load Characters */
    applyWelcomeBuffs();

  }, []);

  function getRandomToastMessage() {
    const randomIndex = Math.floor(Math.random() * toastMessages.length);
    return toastMessages[randomIndex];
  }
  
  function applyWelcomeBuffs() {
    const newCharactersList = charactersList.map(prevCharacter => ({
      ...prevCharacter,
      buffAttack: prevCharacter.buffAttack + 1,
      buffDefense: prevCharacter.buffDefense + 1
    }));
    setCharacters(newCharactersList);
  }

  function doCharacterExperience(c: Character, exp: number){
    c.exp += exp
    if(c.exp >= c.nextLevelExp){
      c.exp = 0
      c.nextLevelExp += 10
      c.level += 1
      toast(`${c.name} is now level ${c.level}!`, {type: 'success'})
    }
  }

  function doCharacterDamage(c: Character, damage: number){
    c.health -= damage
    if(c.health <= 0){
      c.health = 0
      toast(`${c.name} has passed out!`)
    }
  }

  const handleEncounterEvent = (updatedCharacter: Character, updatedMob: Mob) => {
    setCharacters(() => {
      return characters.map(character => {
        if (character.name === updatedCharacter.name) {
          return { ...updatedCharacter };
        }
        return character;
      });
    });
    setMob({ ...updatedMob });
  };

  const handleGrindClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    const dupe = [...characters]
    const character = dupe.find(c => c.name === name)
    if(typeof character !== 'undefined'){
      doCharacterExperience(character, 1)
      doCharacterDamage(character, 1)
    }
    if(randomize(100)){
      /** Show Monster */
      setMob({...goblin})
      setCharacter({...character as any})
      setEncounterShown(true)
    }
    setCharacters(dupe)
  }, [characters])

  const handleQuestClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    const updatedCharacters = characters.map(character => {
      if (character.name === name) {
        doCharacterExperience(character, 7)
      }
      return character
    })
    setCharacters(updatedCharacters)
  }, [characters])

  const handleDungeonClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    const updatedCharacters = characters.map(character => {
      if (character.name === name) {
        doCharacterExperience(character, 12)
      }
      return character
    })

    setCharacters(updatedCharacters)
  }, [characters])

  const handleRaidClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    const updatedCharacters = characters.map(character => {
      if (character.name === name) {
        doCharacterExperience(character, 20)
      }
      return character
    })

    setCharacters(updatedCharacters)
  }, [characters])

  const handleTavernClick = useCallback((e: any) => {
    setShowTavern(true)
    const name = e.target.id.split('___')[0]
    const updatedCharacters = characters.map(character => {
      if (character.name === name) {
        character.health += 10
        if(character.health > character.maxHealth){
          character.health = character.maxHealth
        }
      }
      return character
    })

    setCharacters(updatedCharacters)
  }, [characters])

  const handleTavernSleep = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    const updatedCharacters = characters.map(character => {
      if (character.name === name) {
        character.health += 10
        if(character.health > character.maxHealth){
          character.health = character.maxHealth
        }
      }
      return character
    })

    setCharacters(updatedCharacters)
  }, [])

  const handleTavernBuff = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    const updatedCharacters = characters.map(character => {
      if(randomize(50)){
        character.buffAttack += 1
      } else {
        character.buffDefense += 1
      }
      if (character.name === name) {
        character.health += 10
        if(character.health > character.maxHealth){
          character.health = character.maxHealth
        }
      }
      return character
    })

    setCharacters(updatedCharacters)
  }, [])

  const getButtonDisabled = (character: Character, levelRequirement: number) => {
    return character.level < levelRequirement
  }

  const view = useMemo(() => {
    return (
      <>
        <Tavern showTavern={showTavern} setShowTavern={setShowTavern as any} handleClose={() => setShowTavern(false)} handleSleep={() => {}} handleTrade={() => {}}></Tavern>
        <Dialog open={encounterShown} handler={setEncounterShown} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Encounter character={character as any} mob={mob as any} handleEncounterEvent={handleEncounterEvent} setShowEncounter={setEncounterShown}></Encounter>
        </Dialog>
        <ul className="divide-y divide-gray-200">
          {characters.map((character) => (
            <li key={character.name} className="py-4">
            <div className="ml-3">
              <img className="h-12 w-15 rounded-full" src={`img/classes/${classes?.find(c => c.name === character.class)}`} alt="" />
              <p className="text-lg font-lg text-gray-900">{character.name} - {character.level}</p>
              <p className="text-sm font-sm">{character.class}</p>
              <p className="text-sm font-sm">Status: {character.health === 0 ? 'Dead' : 'Alive' }</p>

              <Progress 
                value={+((character.health / character.maxHealth) * 100).toFixed(2)} 
      
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined} 
                variant="gradient"
                color={((character.health / character.maxHealth) * 100) <= 50 ? 'red' : 'teal'}
              />
              <p className="text-sm font-sm">Health: {((character.health / character.maxHealth) * 100).toFixed(2)}% [{character.health}/{character.maxHealth}]</p>
              <Progress 
                value={+((character.exp / character.nextLevelExp) * 100).toFixed(2)} 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined} 
                variant="gradient"
                color='purple'
              />
              <p className="text-sm font-sm">Experience: {((character.exp / character.nextLevelExp) * 100).toFixed(2)}% [{character.exp}/{character.nextLevelExp}]</p>
              <Button disabled={character.health <= 0 || getButtonDisabled(character, 0)} id={`${character.name}___grind`} color='red' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleGrindClick}>
                Grind
              </Button>
              <Button disabled={character.health <= 0 || getButtonDisabled(character, 0)} id={`${character.name}___quest`} color='blue' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleQuestClick}>
                Quest
              </Button>
              <Button disabled={character.health <= 0 || getButtonDisabled(character, 5)} id={`${character.name}___dungeon`} color='amber' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleDungeonClick}>
                Dungeon [Lvl 5+]
              </Button>
              <Button disabled={character.health <= 0 || getButtonDisabled(character, 10)} id={`${character.name}___raid`} color='cyan' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleRaidClick}>
                Raid [Lvl 10+]
              </Button>

              <Button id={`${character.name}___tavern`} onClick={handleTavernClick} disabled={getButtonDisabled(character, 0) || character.health >= character.maxHealth} color='teal' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Tavern [HP +25%]
              </Button>

              <br/> <br/>
              <Button variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Bags</Button>
              <Button variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Equipment</Button>
            </div>
          </li>
          ))}
        </ul>
      </>
    )
  }, [characters, character, mob, encounterShown])

  return view
}
