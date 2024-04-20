import { useCallback, useMemo, useState } from 'react'
import { Badge, Button, Dialog } from "@material-tailwind/react"
import { Encounter } from './Encounter'
import { toast } from 'react-toastify'
import Tavern from './Tavern'
import NewCharacter from './NewCharacter'
import CharacterComponent from './CharacterComponent'
import CharacterSaver from './Save'
import Loader from './Load'
import { determinePlayerNextLevelExp, doCharacterExperience, getRandomMob } from './entity/entity.service'
import { Mob, Character, Bag, Player } from './entity/entity.interface'
import Bags from './Bags'
import PlayerComponent from './PlayerComponent'

export function randomize(chance: number): boolean {
  const randomNumber = Math.random() * 100
  return randomNumber < chance
}

export default function Characters() {
  const [encounterShown, setEncounterShown] = useState(false)
  const [showTavern, setShowTavern] = useState(false)
  const [characters, setCharacters]: [Character[], any] = useState([])
  const [mob, setMob]: [Mob, any] = useState(undefined as any)
  const [character, setCharacter]: [Character, any] = useState(undefined as any)
  const [bags, setBags]: [Bag[], any] = useState([])
  const [showBags, setShowBags]: [boolean, any] = useState(false)
  const [showNewCharacter, setShowNewCharacter]: [boolean, any] = useState(false)
  const [player, setPlayer]: [Player, any] = useState({exp: 0, level: 1, nextLevelExp: determinePlayerNextLevelExp(1)})

  function doCharacterDamage(c: Character, damage: number){
    c.health -= damage
    if(c.health <= 0){
      c.health = 0
      toast(`${c.name} has passed out!`, {type:'error'})
    }
  }

  const handleEncounterEvent = useCallback((updatedCharacter: Character, updatedMob: Mob) => {
    if(updatedMob.health <= 0){
      updatedMob.health = 0
      toast(`${updatedCharacter.name} took out a ${mob.name}!`, {type: 'success'})
    } else if(updatedCharacter.health <= 0){
      toast(`${updatedCharacter.name} passed out...`, {type: 'error'})
    }

    setMob({ ...updatedMob })
    setCharacters(() => {
      return characters.map(character => {
        if (character.name === updatedCharacter.name) {
          return { ...updatedCharacter }
        }
        return character;
      })
    })
    setPlayer(player)
  }, [characters, mob?.name, player])

  const handleGrindClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    const dupe = [...characters]
    const character = dupe.find(c => c.name === name)
    if(typeof character === 'undefined') return
    const mob = getRandomMob('Grind')
    if(randomize(mob.chanceToShow)){
      setMob(mob)
      setCharacter({...character as any})
      setEncounterShown(true)
    } else {
      if(doCharacterExperience(player, character, 1 * (character.level + .5)) === true){
        toast(`${character.name} is now level ${character.level}!`, {type: 'success'})
      }
      doCharacterDamage(character, 1)
    }
    setCharacters(dupe)
    setPlayer(player)
  }, [characters, player])

  const handleQuestClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    const dupe = [...characters]
    const character = dupe.find(c => c.name === name)
    if(typeof character === 'undefined') return
    const mob = getRandomMob('Quest')
    if(randomize(mob.chanceToShow)){
      setMob(mob)
      setCharacter({...character as any})
      setEncounterShown(true)
    } else {
      if(doCharacterExperience(player, character, 5 * (character.level + .5)) === true){
        toast(`${character.name} is now level ${character.level}!`, {type: 'success'})
      }
      doCharacterDamage(character, 1)
    }
    setCharacters(dupe)
    setPlayer(player)
  }, [characters, player])

  const handleDungeonClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    const dupe = [...characters]
    const character = dupe.find(c => c.name === name)
    if(typeof character === 'undefined') return
    const mob = getRandomMob('Dungeon')
    if(randomize(mob.chanceToShow)){
      setMob(mob)
      setCharacter({...character as any})
      setEncounterShown(true)
    } else {
      if(doCharacterExperience(player, character, 10 * (character.level + .5)) === true){
        toast(`${character.name} is now level ${character.level}!`, {type: 'success'})
      }
      doCharacterDamage(character, 1)
    }
    setCharacters(dupe)
    setPlayer(player)
  }, [characters, player])

  const handleRaidClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    const dupe = [...characters]
    const character = dupe.find(c => c.name === name)
    if(typeof character === 'undefined') return
    const mob = getRandomMob('Raid')
    if(randomize(mob.chanceToShow)){
      setMob(mob)
      setCharacter({...character as any})
      setEncounterShown(true)
    } else {
      if(doCharacterExperience(player, character, 20 * (character.level + .5)) === true){
        toast(`${character.name} is now level ${character.level}!`, {type: 'success'})
      }
      doCharacterDamage(character, 1)
    }
    setCharacters(dupe)
    setPlayer(player)
  }, [characters, player])

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
      }
      return c
    })
    setCharacters(updatedCharacters)
  }, [characters, character])

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
        } else if(randomize(50)){
          c.buffCrit += .1
          c.buffCount += 1
          toast(`${c.name} feel stronger and ready for the next challenge! +1 Defense`, { type: 'info' });
        } else {
          toast(`${c.name} calmed their mind, but did not receive a blessing.`, { type: 'info' });
        }
        return c
      }
      return c
    })
    setShowTavern(false)
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

  const handleNewCharacterClick = useCallback(() => {
    setShowNewCharacter(true)
  }, [])

  const handleLoadCharacters = useCallback((c: Character[], p: Player) => {
    setCharacters(c)
    setPlayer(p)
  }, [])

  const getBagItemsCount = (c: Character) => {
    if(!c) return
    let count = 0
    for(const bag of c?.bags){
      count += bag.items.length
    }
    return count
  }

  const getEquipmentCount = (c: Character) => {
    if(!c) return
    return c.equipment.length
  }

  const view = useMemo(() => {
    return (
      <>
        <NewCharacter characterNames={characters.map(c => c.name.toLowerCase())} addCharacter={handleAddCharacter} setShowNewCharacter={setShowNewCharacter} showNewCharacter={showNewCharacter}></NewCharacter>
        <Tavern character={character as any} handleTavernSleep={handleTavernSleep} handleTavernBuff={handleTavernBuff as any} showTavern={showTavern} setShowTavern={setShowTavern as any}></Tavern>
        <Dialog size='xxl' open={encounterShown} handler={() => {}} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Encounter player={player} character={character as any} mob={mob as any} handleEncounterEvent={handleEncounterEvent} setShowEncounter={setEncounterShown}></Encounter>
        </Dialog>
        <Bags bags={bags as any} setShowBags={setShowBags} showBags={showBags}></Bags>
        
        <PlayerComponent player={player}></PlayerComponent>
        <Button color='amber' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined} onClick={handleNewCharacterClick}>New Character</Button>
        <CharacterSaver characters={characters} player={player}></CharacterSaver>
        <Loader onLoad={handleLoadCharacters}></Loader>
        <div className='flex flex-wrap'>
        {characters.map((c) => (
        <>
        <div>

        <CharacterComponent character={c}></CharacterComponent>
        <div>
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
        <div>
        <Button id={`${c.name}___tavern`} onClick={handleTavernClick} color='teal' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Tavern [+ HP]
                </Button>
                <Badge content={getBagItemsCount(c)}>
                    <Button id={`${c.name}___bags`} onClick={handleBagsClick} variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Bags
                    </Button>
                </Badge>
                <Badge content={getEquipmentCount(c)}>
                    <Button variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Equipment
                    </Button>
                </Badge>
        </div>
        </div>
        </>
))}
</div>
      </>
    )
  }, [characters, handleAddCharacter, showNewCharacter, character, handleTavernSleep, handleTavernBuff, showTavern, encounterShown, player, mob, handleEncounterEvent, bags, showBags, handleNewCharacterClick, handleLoadCharacters, handleGrindClick, handleQuestClick, handleDungeonClick, handleRaidClick, handleTavernClick, handleBagsClick])

  return view
}
