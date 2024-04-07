import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Badge, Button, ButtonGroup, Dialog, Progress } from "@material-tailwind/react"
import { Encounter } from './Encounter'
import { ToastContainer, toast } from 'react-toastify'

import Tavern from './Tavern'
import { BAGS, CLASSES, IMG_MAGE_ICON8, IMG_ROGUE_ICON8, IMG_WARRIOR_ICON8, ITEM_SOAP } from './Constants'
import Bags from './Bags'
import NewCharacter from './NewCharacter'
import CharacterComponent from './CharacterComponent'
import CharacterSaver from './Save'
import CharacterLoader from './Load'
import { doCharacterExperience } from './entity/entity.service'
import { Mob, Item, Character, Bag } from './entity/entity.interface'

const goblin: Mob = {
  name: 'Goblin',
  type: 'Hostile Creature',
  attack: 1,
  health: 10,
  maxHealth: 10,
  level: 1,
  defense: 1,
  expGiven: 25
}

const troll: Mob = {
  name: 'Troll',
  attack: 4,
  health: 50,
  level: 5,
  maxHealth: 50,
  type: 'Dungeon Boss',
  defense: 2,
  expGiven: 50
}

const dragon: Mob = {
  name: 'Dragon',
  attack: 10,
  health: 250,
  level: 15,
  maxHealth: 250,
  type: 'Raid Boss',
  defense: 5,
  expGiven: 100
}

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
    if(updatedMob.health <= 0){
      updatedMob.health = 0
      toast(`${updatedCharacter.name} took out a ${mob.name}!`, {type: 'success'})
    } else if(updatedCharacter.health <= 0){
      toast(`${updatedCharacter.name} passed out...`, {type: 'error'})
    }
    setMob({ ...updatedMob });
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
      if(doCharacterExperience(character, 1))
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
    
    if(randomize(35)){
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
    const dupe = [...characters]
    const character = dupe.find(c => c.name === name)
    if(typeof character === 'undefined') return
    
    if(randomize(35)){
      setMob({...dragon})
      setCharacter({...character as any})
      setEncounterShown(true)
    } else {
      doCharacterExperience(character, 20)
      doCharacterDamage(character, 1)
    }
    setCharacters(dupe)
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
    setCharacters(updatedCharacters)
  }, [characters, character, setShowTavern])

  const handleTavernBuff = useCallback(() => {
    const updatedCharacters = characters.map(c => {
      if (c.name === character?.name) {
        if(c.buffCount >= c.maxBuffs){
          toast(`${c.name} could not meditate any longer.`, { type: 'error' });
          return c
        }
        if(randomize(50)){
          c.buffAttack += 1
          c.buffCount += 1
          toast(`${c.name} feels stronger and ready for the next challenge! +1 Attack`, { type: 'info' });
        } else if(randomize(50)) {
          c.buffDefense += 1
          c.buffCount += 1
          toast(`${c.name} feel stronger and ready for the next challenge! +1 Defense`, { type: 'info' });
        } else {
          toast(`${c.name} calmed their mind, but did not receive a blessing.`, { type: 'info' });
        }
        return c
      }
      return c
    })
    setCharacters(updatedCharacters)
  }, [characters, character])

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

  const handleLoadCharacters = useCallback((characters: Character[]) => {
    setCharacters(characters)
  }, [])

  const getBagItemsCount = (c: Character) => {
    if(!c) return
    let count = 0
    for(const bag of c?.bags){
      count += bag.items.length
    }
    return count
  }

  const view = useMemo(() => {
    const bagItemCount = getBagItemsCount(character)
    return (
      <>
        <NewCharacter characterNames={characters.map(c => c.name.toLowerCase())} addCharacter={handleAddCharacter} setShowNewCharacter={setShowNewCharacter} showNewCharacter={showNewCharacter}></NewCharacter>
        <Tavern character={character as any} handleTavernSleep={handleTavernSleep} handleTavernBuff={handleTavernBuff as any} showTavern={showTavern} setShowTavern={setShowTavern as any}></Tavern>
        <Dialog open={encounterShown} handler={() => {}} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Encounter doCharacterExperience={doCharacterExperience} character={character as any} mob={mob as any} handleEncounterEvent={handleEncounterEvent} setShowEncounter={setEncounterShown}></Encounter>
        </Dialog>
        <Bags bags={bags as any} setShowBags={setShowBags} showBags={showBags}></Bags>

        <Button color='amber' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined} onClick={handleNewCharacterClick}>New Character</Button>
        <CharacterSaver characters={characters}></CharacterSaver>
        <CharacterLoader onLoad={handleLoadCharacters}></CharacterLoader>
          {characters.map((c) => (
            <>
            <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md rounded-xl w-full sm:w-96">
              <CharacterComponent character={c}></CharacterComponent>
              <ButtonGroup placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="flex divide-x row">
                <Button disabled={c.health <= 0 || getButtonDisabled(c, 0)} id={`${c.name}___grind`} color='red' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleGrindClick}>
                    Grind
                  </Button>
                  <Button disabled={c.health <= 0 || getButtonDisabled(c, 0)} id={`${c.name}___quest`} color='blue' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleQuestClick}>
                    Quest
                  </Button>
                  <Button disabled={c.health <= 0 || getButtonDisabled(c, 5)} id={`${c.name}___dungeon`} color='amber' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleDungeonClick}>
                    Dungeon
                  </Button>
                  <Button disabled={c.health <= 0 || getButtonDisabled(c, 10)} id={`${c.name}___raid`} color='cyan' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleRaidClick}>
                    Raid
                  </Button>
                </div>

                </ButtonGroup>
                <ButtonGroup placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="flex divide-x row">

                  <Button id={`${c.name}___tavern`} onClick={handleTavernClick} color='teal' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Tavern [+ HP]
                  </Button>
                  <Badge content={getBagItemsCount(c)}>
                    <Button id={`${c.name}___bags`} onClick={handleBagsClick} variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Bags</Button>
                  </Badge>
                  <Button variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Equipment</Button>
</div>
                </ButtonGroup>
              <div className="p-4 sm:p-6">
                
              



              <br/> <br/>


              &nbsp;&nbsp;&nbsp;
              
              </div>
            </div>
            </>
          ))}
      </>
    )
  }, [showNewCharacter, setShowNewCharacter, characters, character, mob, encounterShown, bags, setShowBags, showTavern, showBags, setShowTavern, handleTavernBuff, handleTavernSleep])

  return view
}
