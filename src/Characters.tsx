import { useCallback, useMemo, useState } from 'react'
import { Badge, Button, Dialog } from "@material-tailwind/react"
import { Encounter } from './Encounter'
import { toast } from 'react-toastify'
import Tavern from './Tavern'
import NewCharacter from './NewCharacter'
import CharacterComponent from './CharacterComponent'
import CharacterSaver from './Save'
import Loader from './Load'
import { doCharacterExperience, getRandomMob } from './entity/entity.service'
import { Mob, Character, Bag, Player } from './entity/entity.interface'
import Bags from './Bags'

export function randomize(chance: number): boolean {
  const randomNumber = Math.random() * 100
  return randomNumber < chance
}

interface CharactersProps {
  setPlayer: (player: Player) => void
  player: Player
  setCharacters: (characters: Character[]) => void
  characters: Character[]
}

export default function Characters(props: CharactersProps) {
  const [bags, setBags]: [Bag[], any] = useState([])
  const [mob, setMob]: [Mob, any] = useState(undefined as any)
  const [character, setCharacter]: [Character, any] = useState(undefined as any)
  
  const [encounterShown, setEncounterShown] = useState(false)
  const [showTavern, setShowTavern] = useState(false)
  const [showBags, setShowBags]: [boolean, any] = useState(false)
  const [showNewCharacter, setShowNewCharacter]: [boolean, any] = useState(false)
  

  function doCharacterDamage(c: Character, damage: number){
    c.health -= damage
    if(c.health <= 0){
      c.health = 0
      toast(`${c.name} has passed out!`, {type:'error'})
    }
  }

  const handleEncounterEvent = useCallback((updatedCharacter: Character, updatedMob: Mob, updatedPlayer: Player) => {
    if(!mob) return
    if(updatedMob.health <= 0){
      updatedMob.health = 0
      toast(`${updatedCharacter.name} took out a ${mob.name}!`, {type: 'success'})
    } else if(updatedCharacter.health <= 0){
      toast(`${updatedCharacter.name} passed out...`, {type: 'error'})
    }

    setMob({ ...updatedMob })
    props.setCharacters(props.characters.map(character => {
        if (character.name === updatedCharacter.name) {
          return { ...updatedCharacter }
        }
        return character;
      })
    )
    props.setPlayer({...updatedPlayer})
  }, [mob, props])

const grind = useCallback((name: string, subject: string, characters: Character[], player: Player) => {
    const dupe = [...characters]
    const character = dupe.find(c => c.name === name)
    if(typeof character === 'undefined') return
    const mob = getRandomMob(subject)
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
    props.setCharacters(dupe)
    props.setPlayer(player)
}, [props])

  const handleGrindClick = useCallback((e: any) => {
    grind(e.target.id.split('___')[0], 'Grind', props.characters, props.player)
  }, [grind, props.characters, props.player])

  const handleQuestClick = useCallback((e: any) => {
    grind(e.target.id.split('___')[0], 'Quest', props.characters, props.player)
  }, [grind, props.characters, props.player])

  const handleDungeonClick = useCallback((e: any) => {
    grind(e.target.id.split('___')[0], 'Dungeon', props.characters, props.player)
  }, [grind, props.characters, props.player])

  const handleRaidClick = useCallback((e: any) => {
    grind(e.target.id.split('___')[0], 'Raid', props.characters, props.player)
  }, [grind, props.characters, props.player])

  const handleTavernClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    setCharacter(props.characters.find(c => c.name === name) as any)
    setShowTavern(true)
  }, [props.characters])

  const handleTavernSleep = useCallback(() => {
    const updatedCharacters = props.characters.map(c => {
      if (c.name === character?.name) {
        c.health += 10 + character.level
        if(c.health > c.maxHealth){
          c.health = c.maxHealth
        }
      }
      return c
    })
    props.setCharacters(updatedCharacters)
  }, [props, character])

  const handleTavernBuff = useCallback(() => {
    if(!character) return
    const updatedCharacters = props.characters.map(c => {
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
    props.setCharacters(updatedCharacters)
  }, [props, character])

  const handleBagsClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    setBags(props.characters.find(c => c.name === name)?.bags as Bag[])
    setShowBags(true)
  }, [props.characters])

  const getButtonDisabled = (c: Character, levelRequirement: number) => {
    return c.level < levelRequirement
  }

  const handleAddCharacter = useCallback((c: Character) => {
    const newCharacters = [...props.characters, c]
    setShowNewCharacter(false)
    props.setCharacters(newCharacters)
    toast(`${c.name} has joined the realm!`, {type: 'success'})
  }, [props]) 

  const handleNewCharacterClick = useCallback(() => {
    setShowNewCharacter(true)
  }, [])

  const handleLoadCharacters = useCallback((c: Character[], p: Player) => {
    props.setCharacters(c)
    props.setPlayer(p)
  }, [props])

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
        <NewCharacter characterNames={props.characters.map(c => c.name.toLowerCase())} addCharacter={handleAddCharacter} setShowNewCharacter={setShowNewCharacter} showNewCharacter={showNewCharacter}></NewCharacter>
        <Tavern character={character as any} handleTavernSleep={handleTavernSleep} handleTavernBuff={handleTavernBuff as any} showTavern={showTavern} setShowTavern={setShowTavern as any}></Tavern>
        <Dialog size='xxl' open={encounterShown} handler={() => {}} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Encounter player={props.player} character={character as any} mob={mob as any} handleEncounterEvent={handleEncounterEvent} setShowEncounter={setEncounterShown}></Encounter>
        </Dialog>
        <Bags bags={bags as any} setShowBags={setShowBags} showBags={showBags}></Bags>
        
        <Button color='amber' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined} onClick={handleNewCharacterClick}>New Character</Button>
        <CharacterSaver characters={props.characters} player={props.player}></CharacterSaver>
        <Loader onLoad={handleLoadCharacters}></Loader>
        <div className='flex flex-wrap'>
        {props.characters.map((c: Character) => (
        <>
        <div>

        <CharacterComponent character={c}></CharacterComponent>
        <div>
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
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
         </ul>
       
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
  }, [bags, character, encounterShown, handleAddCharacter, handleBagsClick, handleDungeonClick, handleEncounterEvent, handleGrindClick, handleLoadCharacters, handleNewCharacterClick, handleQuestClick, handleRaidClick, handleTavernBuff, handleTavernClick, handleTavernSleep, mob, props.characters, props.player, showBags, showNewCharacter, showTavern])

  return view
}
