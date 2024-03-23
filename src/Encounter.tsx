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

interface EncounterProps {
  character: Character;
  mob: Mob;
  handleEncounterEvent: any;
  setShowEncounter: any;
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
    if (randomize(50)) {
      const newEvent1 = `${mob.name} was hit for ${character.attack}...`;
      setEncounterEvents((prevEvents) => [...prevEvents, newEvent1]);
      mob.health -= character.attack + character.level;
      character.exp += 5
      if(character.exp >= character.nextLevelExp){
        character.exp = 0
        character.nextLevelExp += 10
        character.level += 1
      }
    } else {
      const newEvent2 = `${mob.name} missed!`;
      setEncounterEvents((prevEvents) => [...prevEvents, newEvent2]);
    }

    if (mob.health <= 0) {
      props.setShowEncounter(false);
    }

    if (randomize(50)) {
      setShowQuickTimeEvent(true)
      const newEvent3 = `${character.name} was hit for ${mob.attack}...`;
      setEncounterEvents((prevEvents) => [...prevEvents, newEvent3]);
      character.health -= mob.attack;
      console.log(character.health)
      console.log(character.maxHealth)
      if(character.health <= 0){
        character.health = 0
        props.setShowEncounter(false)
      }
    } else {
      const newEvent4 = `${character.name} missed!`;
      setEncounterEvents((prevEvents) => [...prevEvents, newEvent4]);
    }

    props.handleEncounterEvent(character, mob);
  }, [props, mob, character]);

  const view = useMemo(() => {
    return (
      <>
      <QuickEncounter setShowQuickTimeEvent={setShowQuickTimeEvent} handleFailure={() => setShowQuickTimeEvent(false)} handleSuccess={() => setShowQuickTimeEvent(false)}></QuickEncounter>
        <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>A wild {mob.name} attacks!</DialogHeader>
        <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <div className="ml-3">
            <img className="h-12 w-15 rounded-full" src={`img/classes/${character.class}.png`} alt="" />
            <p className="text-lg font-lg text-gray-900">{character.name} - {character.level}</p>
            <p className="text-sm font-sm">{character.class.toLocaleUpperCase()}</p>
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
          </div>

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
          <Button
            variant="text"
            color="red"
            onClick={handleRunClicked}
            className="mr-1" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
            <span>Run</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleAttackClicked} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <span>Attack</span>
          </Button>
        </DialogFooter>
      </>
    );
  }, [props, mob, character, encounterEvents]);

  return view;
}
