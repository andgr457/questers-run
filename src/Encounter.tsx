import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Progress,
} from "@material-tailwind/react";
import { Character, Mob, randomize } from "./Characters";
import QuickEncounter from "./QuickEncounter";
import CharacterComponent from './CharacterComponent';

interface EncounterProps {
  character: Character;
  mob: Mob;
  handleEncounterEvent: any;
  setShowEncounter: any;
  doCharacterExperience: any;
}

export function Encounter(props: EncounterProps) {
  const [character, setCharacter] = useState<Character>({ ...props.character });
  const [mob, setMob] = useState<Mob>({ ...props.mob });
  const [encounterEvents, setEncounterEvents] = useState<string[]>([]);
  const [showQuickTimeEvent, setShowQuickTimeEvent] = useState(false)
  const [quickTimeEventResponses, setQuickTimeEventResponses] = useState([])

  const handleRunClicked = useCallback((e: any) => {
    if (randomize(50)) {
      props.setShowEncounter(false);
    } else {
      const newEvent = `${character.name} failed to run away!`;
      setEncounterEvents((prevEvents) => [...prevEvents, newEvent]);
      character.health -= mob.attack;
      props.handleEncounterEvent(character, mob);
    }
  }, [props, mob, character]);

  const handleAttackClicked = useCallback((e: any) => {
    if(randomize(15)){
      setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} is up for a critical hit on ${mob.attack}...`]);
      setShowQuickTimeEvent(true)
      return
    }

    if (randomize(50)) {
      const characterAttack = character.attack + character.buffAttack 
      setEncounterEvents((prevEvents) => [...prevEvents, `${mob.name} was hit for ${characterAttack}...`]);
      mob.health -= characterAttack;
      character.exp += 2 * character.level
      if(character.exp >= character.nextLevelExp){
        character.exp = 0
        character.nextLevelExp += 10
        character.level += 1
      }
    } else {
      setEncounterEvents((prevEvents) => [...prevEvents, `${mob.name} missed!`]);
    }

    if (mob.health <= 0) {
      props.doCharacterExperience(character, (10 + character.level) * mob.level)
      props.setShowEncounter(false);
    }

    if(character.health <= 0){
      props.setShowEncounter(false);
    }

    if (randomize(50)) {
      setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} was hit for ${mob.attack}...`]);
      character.health -= mob.attack;
      console.log(character.health)
      console.log(character.maxHealth)
      if(character.health <= 0){
        character.health = 0
        props.setShowEncounter(false)
      }
    } else {
      setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} missed!`]);
    }

    props.handleEncounterEvent(character, mob);
  }, [props, mob, character]);

  const handleQuickEncounterResult = useCallback((e: {result: string}) => {
    if(e.result === 'Success'){
      const crit = (character.attack * 2) + character.level
      mob.health -= crit;
      character.exp += 5
      if(character.exp >= character.nextLevelExp){
        character.exp = 0
        character.nextLevelExp += 10
        character.level += 1
      }

      setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} hit for ${crit} critical damage...`]);
      if (mob.health <= 0) {
        props.handleEncounterEvent(character, mob);
        props.setShowEncounter(false);
      }

    }else {
      setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} skipped the critical hit event...`]);

    }

  }, [])

  const view = useMemo(() => {
    return (
      <>
      <QuickEncounter characterClass={character.class} setResult={handleQuickEncounterResult} quickEncounterShown={showQuickTimeEvent} setShowQuickTimeEvent={setShowQuickTimeEvent}></QuickEncounter>
        <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>A wild {mob.name} attacks!</DialogHeader>
        <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <CharacterComponent character={character}></CharacterComponent>
          <div className="ml-3">
            <p className="text-lg font-lg text-gray-900">{mob.name} - {mob.level}</p>
            <p className="text-sm font-sm">{mob.type.toLocaleUpperCase()}</p>
            <Progress 
                value={+((mob.health / mob.maxHealth) * 100).toFixed(2)} 
      
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined} 
                variant="gradient"
                color={((mob.health / mob.maxHealth) * 100) <= 50 ? 'red' : 'teal'}
              />
              <p className="text-sm font-sm">Health: {((mob.health / mob.maxHealth) * 100).toFixed(2)}% [{mob.health}/{mob.maxHealth}]</p>
          </div>

          <div className="w-full h-64 overflow-y-auto p-4">
            {encounterEvents.slice().reverse().map((e, index) => (
              <p key={index} className="text-sm font-sm">{e}</p>
            ))}
          </div>
        </DialogBody>
        <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Button variant="gradient" color="green" onClick={handleAttackClicked} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <span>Attack</span>
          </Button>
          <Button
            variant="text"
            color="red"
            onClick={handleRunClicked}
            className="mr-1" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            <span>Run</span>
          </Button>

        </DialogFooter>
      </>
    );
  }, [props, mob, character, encounterEvents, quickTimeEventResponses, showQuickTimeEvent, setQuickTimeEventResponses]);

  return view;
}
