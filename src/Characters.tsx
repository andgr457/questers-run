import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Button, Dialog, Progress } from "@material-tailwind/react"
import { Encounter } from './Encounter'
import { ToastContainer, toast } from 'react-toastify'

import Tavern from './Tavern'
import { BAGS, CLASSES, IMG_MAGE_ICON8, IMG_ROGUE_ICON8, IMG_WARRIOR_ICON8, ITEM_SOAP } from './Constants'
import Bags from './Bags'
import NewCharacter from './NewCharacter'

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
  bags: Bag[]
}

export interface CharacterClass {
  name: string
  description: string
  imageName: string
  credit: string
  attacks: string
  startAttack: number
  startDefense: number
  startHealth: number
}

export interface Item {
  name: string
  description: string
  baseValue: number
  rarity: string // matches with ItemRarity
  quantity?: number
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

const troll: Mob = {
  name: 'Troll',
  attack: 4,
  health: 50,
  buffAttack: 1,
  buffDefense: 3,
  level: 5,
  maxHealth: 50,
  type: 'Dungeon Boss'
}

export interface Bag extends Item {
  slots: number
  items: Item[]
}

export interface Image {

}

const charactersList: Readonly<Character[]> = [
  {
    name: 'Hayz', level: 20, exp: 0, nextLevelExp: 200, health: 200, maxHealth: 200,
    attack: 1, buffAttack: 0, buffDefense: 0, maxBuffs: 0,
    class: 'Warrior',
    bags: [
      {...BAGS.find(b => b.name === 'Pillowcase') as Bag, items: [{...ITEM_SOAP}]}
    ]
  },
  {
    name: 'Lithos', level: 1, exp: 0, nextLevelExp: 100, health: 69, maxHealth: 100,
    attack: 1, buffAttack: 0, buffDefense: 0, maxBuffs: 0,
    class: 'Mage',
    bags: [
      {...BAGS.find(b => b.name === 'Pillowcase') as Bag}
    ]
  },
  {
    name: 'Velouria', level: 1, exp: 0, nextLevelExp: 100, health: 25, maxHealth: 100,
    attack: 1, buffAttack: 0, buffDefense: 0, maxBuffs: 0,
    class: 'Rogue',
    bags: [
      {...BAGS.find(b => b.name === 'Pillowcase') as Bag}
    ]
  }
]

const welcomeMessages = [
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
  const [character, setCharacter]: [Character, any] = useState(undefined as any)
  const [bags, setBags]: [Bag[], any] = useState([])
  const [showBags, setShowBags]: [boolean, any] = useState(false)
  const [showNewCharacter, setShowNewCharacter]: [boolean, any] = useState(false)

  useEffect(() => {
    /** Load Characters */
    applyWelcomeBuffs();

  }, []);

  function getRandomToastMessage() {
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    return welcomeMessages[randomIndex];
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
      toast(`${c.name} has passed out!`, {type:'error'})
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
    if(updatedMob.health <= 0){
      toast(`${updatedCharacter.name} took out a ${mob.name}!`, {type: 'success'})
    } else if(updatedCharacter.health <= 0){
      toast(`${updatedCharacter.name} passed out...`, {type: 'error'})
    }
  };

  const handleGrindClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    const dupe = [...characters]
    const character = dupe.find(c => c.name === name)
    if(typeof character === 'undefined') return

    if(randomize(5)){
      setMob({...goblin})
      setCharacter({...character as any})
      setEncounterShown(true)
    } else {
      doCharacterExperience(character, 1)
      doCharacterDamage(character, 1)
    }
    setCharacters(dupe)
  }, [characters])

  const handleQuestClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    const dupe = [...characters]
    const character = dupe.find(c => c.name === name)
    if(typeof character === 'undefined') return
    
    if(randomize(15)){
      setMob({...goblin})
      setCharacter({...character as any})
      setEncounterShown(true)
    } else {
      doCharacterExperience(character, 5)
      doCharacterDamage(character, 1)
    }
    setCharacters(dupe)
  }, [characters])

  const handleDungeonClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    const dupe = [...characters]
    const character = dupe.find(c => c.name === name)
    if(typeof character === 'undefined') return
    
    if(randomize(15)){
      setMob({...troll})
      setCharacter({...character as any})
      setEncounterShown(true)
    } else {
      doCharacterExperience(character, 10)
      doCharacterDamage(character, 1)
    }
    setCharacters(dupe)
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
    const name = e.target.id.split('___')[0]
    setCharacter(characters.find(c => c.name === name) as any)
    setShowTavern(true)
  }, [characters])

  const handleTavernSleep = useCallback(() => {
    const updatedCharacters = characters.map(c => {
      if (c.name === character?.name) {
        c.health += 10 + character.level
        if(c.health > c.maxHealth){
          c.health = c.maxHealth
        }
        toast(`Rest Here Weary ${character.name}, For Great Adventures Lie Ahead! +${10 + character.level} HP`, { type: 'success' });
      }
      return c
    })
    setShowTavern(false)
    setCharacters(updatedCharacters)
  }, [characters, character, setShowTavern])

  const handleTavernBuff = useCallback(() => {
    const updatedCharacters = characters.map(c => {
      if (c.name === character?.name) {
        if(randomize(50)){
          c.buffAttack += 1
          toast(`${character.name} feels stronger and ready for the next challenge! +1 Attack`, { type: 'info' });
        } else {
          c.buffDefense += 1
          toast(`${character.name} feel stronger and ready for the next challenge! +1 Defense`, { type: 'info' });
        }
        return c
      }
      return c
    })
    setShowTavern(false)
    setCharacters(updatedCharacters)
  }, [characters])

  const handleBagsClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    setBags(characters.find(c => c.name === name)?.bags as Bag[])
    setShowBags(true)
  }, [characters])

  const getButtonDisabled = (c: Character, levelRequirement: number) => {
    return c.level < levelRequirement
  }

  const handleAddCharacter = useCallback((c: Character) => {
    const newCharacters = [...characters, c]
    setShowNewCharacter(false)
    setCharacters(newCharacters)
    toast(`${c.name} has joined the realm!`, {type: 'success'})
  }, [characters]) 

  const handleNewCharacterClick = useCallback((e: any) => {
    setShowNewCharacter(true)
  }, [])

  const view = useMemo(() => {
    return (
      <>
        <NewCharacter characterNames={characters.map(c => c.name.toLowerCase())} addCharacter={handleAddCharacter} setShowNewCharacter={setShowNewCharacter} showNewCharacter={showNewCharacter}></NewCharacter>
        <Tavern character={character as any} handleTavernSleep={handleTavernSleep} handleTavernBuff={handleTavernBuff as any} showTavern={showTavern} setShowTavern={setShowTavern as any}></Tavern>
        <Dialog open={encounterShown} handler={setEncounterShown} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Encounter doCharacterExperience={doCharacterExperience} character={character as any} mob={mob as any} handleEncounterEvent={handleEncounterEvent} setShowEncounter={setEncounterShown}></Encounter>
        </Dialog>
        <Bags bags={bags as any} setShowBags={setShowBags} showBags={showBags}></Bags>
        <Button onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined} onClick={handleNewCharacterClick}>New Character</Button>
        <ul className="divide-y divide-gray-200">
          {characters.map((character) => (
            <li key={character.name} className="py-4">
            <div className="ml-3">
              <img className="h-12 w-15 rounded-full" src={`img/classes/${CLASSES?.find(c => c.name === character.class)?.imageName}`} alt="" />
              <p className="text-lg font-lg text-gray-900">{character.name} - {character.level}</p>
              <p className="text-sm font-sm">{character.class}</p>
              <p className="text-sm font-sm">Status: {character.health === 0 ? 'Dead' : 'Alive' }</p>

              <p className="text-sm font-sm">Buffs: [+{character.buffAttack ?? 0 } Attack] [+{character.buffDefense} Defense]</p>
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

              <Button id={`${character.name}___tavern`} onClick={handleTavernClick} color='teal' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Tavern [+{10 + character.level} HP]
              </Button>

              <br/> <br/>
              <Button id={`${character.name}___bags`} onClick={handleBagsClick} variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Bags</Button>
              <Button variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Equipment</Button>
            </div>
          </li>
          ))}
        </ul>
      </>
    )
  }, [showNewCharacter, setShowNewCharacter, characters, character, mob, encounterShown, bags, setShowBags, showTavern, showBags, setShowTavern, handleTavernBuff, handleTavernSleep])

  return view
}
