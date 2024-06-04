import { useCallback, useMemo, useState } from 'react'
import { Badge, Button, Dialog } from "@material-tailwind/react"
import { Encounter } from '../Encounter'
import { toast } from 'react-toastify'
import Tavern from '../Tavern'
import NewCharacter from '../NewCharacter'
import CharacterComponent from '../CharacterComponent'
import CharacterSaver from '../Save'
import Loader from '../Load'
import InventoryComponent from '../Inventory'
import { getRandomMob, doCharacterExperience } from '../../entity/entity.service'
import './Clicker.css'
import { Character } from '../../entity/character'
import { Mob } from '../../entity/mob'
import { PlayerClass } from '../../entity/player'
import { Inventory } from '../../entity/inventory'
export function randomize(chance: number): boolean {
  const randomNumber = Math.random() * 100
  return randomNumber < chance
}

interface ClickerProps {
  setPlayer: (player: PlayerClass) => void
  player: PlayerClass
  setCharacters: (characters: Character[]) => void
  characters: Character[]
}

export default function Clicker(props: ClickerProps) {
  const [inventory, setInventory]: [Inventory, any] = useState(undefined as any)
  const [mob, setMob]: [Mob, any] = useState(undefined as any)
  const [character, setCharacter]: [Character, any] = useState(undefined as any)
  
  const [encounterShown, setEncounterShown] = useState(false)
  const [showTavern, setShowTavern] = useState(false)
  const [showInventory, setShowInventory]: [boolean, any] = useState(false)
  const [showNewCharacter, setShowNewCharacter]: [boolean, any] = useState(false)

  const handleEncounterEvent = useCallback((updatedCharacter: Character, updatedMob: Mob, updatedPlayer: PlayerClass) => {
    if(!mob) return
    if(updatedMob.health <= 0){
      updatedMob.health = 0
      toast(`${updatedCharacter.name} took out a ${mob.name}!`, {type: 'success'})
    } else if(updatedCharacter.health <= 0){
      toast(`${updatedCharacter.name} passed out...`, {type: 'error'})
    }

    props.setCharacters(props.characters.map(character => {
        if (character.name === updatedCharacter.name) {
          return { ...updatedCharacter }
        }
        return character;
      })
    )
    props.setPlayer(updatedPlayer)
  }, [mob, props])

const grind = useCallback((name: string, subject: string, characters: Character[], player: PlayerClass) => {
    const dupe = [...characters]
    const c = dupe.find(c => c.name === name)
    if(typeof c === 'undefined') return
    const mob = getRandomMob(subject, c.level)
    let subjectExperience = 0
    let subjectDamage = 0
    let subjectMobChance = 0
    let subjectGold = 0
    switch(subject){
      case 'Grind': 
        subjectExperience = c.nextLevelExp * .01
        subjectDamage = c.maxHealth * .02
        subjectMobChance = 1
        subjectGold = 1
        break
      case 'Quest': 
        subjectExperience = c.nextLevelExp * .018
        subjectDamage = c.maxHealth * .04
        subjectMobChance = 2
        subjectGold = 2
        break
      case 'Dungeon': 
        subjectExperience = c.nextLevelExp * .025
        subjectDamage = c.maxHealth * .1
        subjectMobChance = 10
        subjectGold = 5
        break
      case 'Raid': 
        subjectExperience = c.nextLevelExp * .035
        subjectDamage = c.maxHealth * .5
        subjectMobChance = 20
        subjectGold = 8
        break
    }
    if(randomize(mob.chanceToShow + subjectMobChance)){
      setMob(mob)
      setCharacter({...c as any})
      setEncounterShown(true)
    } else {
      player.gold += subjectGold
      c.gold += subjectGold
      c.health -= subjectDamage
      if(c.health <= 0){
        c.health = 0
        toast(`${c.name} passed out...`, {type: 'error'})
      } else {
        if(doCharacterExperience(player, c, subjectExperience) === true){
          toast(`${c.name} is now level ${c.level}!`, {type: 'success'})
        }
      }
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

  const handleTavernSleep = useCallback((toon: Character) => {
    if(!toon) return
    const updatedCharacters = props.characters.map(c => {
      if (c.name === toon?.name) {
        c = toon
        return c
      }
      return c
    })
    props.setCharacters(updatedCharacters)
  }, [props])

  const handleTavernBuff = useCallback((toon: Character) => {
    if(!toon) return
    const updatedCharacters = props.characters.map(c => {
      if (c.name === toon?.name) {
        c = toon
        return c
      }
      return c
    })
    props.setCharacters(updatedCharacters)
  }, [props])

  const handleBagsClick = useCallback((e: any) => {
    const name = e.target.id.split('___')[0]
    setInventory(props.characters.find(c => c.name === name)?.inventory as Inventory)
    setShowInventory(true)
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

  const handleLoadCharacters = useCallback((c: Character[], p: PlayerClass) => {
    props.setCharacters(c)
    props.setPlayer(p)
  }, [props])

  const getInventoryItemCount = (c: Character) => {
    if(!c) return
    let count = 0
    for(const tab of c?.inventory?.tabs){
      for(const item of tab.items){
        count += item.quantity ?? 1
      }
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
        <InventoryComponent inventory={inventory as any} setShowInventory={setShowInventory} showInventory={showInventory}></InventoryComponent>

      <div>
      <Button color='amber' onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined} onClick={handleNewCharacterClick}>New Character</Button>
        <CharacterSaver characters={props.characters} player={props.player}></CharacterSaver>
        <Loader onLoad={handleLoadCharacters}></Loader>
      </div>
      <div style={{paddingTop: '15px'}}>
        {props.characters.map((c: Character) => (
        <>
        <div>

        <CharacterComponent character={c}></CharacterComponent>

        <div>

        </div>
        <Badge content={getInventoryItemCount(c)}>
            <Button id={`${c.name}___bags`} onClick={handleBagsClick} variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Inventory
            </Button>
          </Badge>
          <Badge content={getEquipmentCount(c)}>
            <Button variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Equip
            </Button>
          </Badge>
          <br/>
          <Button id={`${c.name}___tavern`} onClick={handleTavernClick} color='teal' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Tavern [+ HP]
          </Button>
          <Button id={`${c.name}___tavern`} onClick={handleTavernClick} color='amber' variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Shoppe
          </Button>

          <br/>
          <Button disabled={c.health <= 0 || getButtonDisabled(c, 0)} id={`${c.name}___grind`} variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleGrindClick}>
              Grind
          </Button>
          <Button disabled={c.health <= 0 || getButtonDisabled(c, 0)} id={`${c.name}___quest`} variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleQuestClick}>
              Quest
          </Button>
          <Button disabled={c.health <= 0 || getButtonDisabled(c, 5)} id={`${c.name}___dungeon`} variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleDungeonClick}>
              Dungeon
          </Button>
          <Button disabled={c.health <= 0 || getButtonDisabled(c, 10)} id={`${c.name}___raid`} variant="gradient" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} onClick={handleRaidClick}>
              Raid
          </Button>
        </div>
        </>
))}
</div>
      <div className="container">

        <div className="right-column">
            
            <div>
        
          

       
        </div>
        </div>
    </div>


        
        
        
      </>
    )
  }, [inventory, character, encounterShown, handleAddCharacter, handleBagsClick, handleDungeonClick, handleEncounterEvent, handleGrindClick, handleLoadCharacters, handleNewCharacterClick, handleQuestClick, handleRaidClick, handleTavernBuff, handleTavernClick, handleTavernSleep, mob, props.characters, props.player, showInventory, showNewCharacter, showTavern])

  return view
}
