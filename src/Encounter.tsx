import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Progress,
} from "@material-tailwind/react";
import QuickEncounter from "./QuickEncounter";
import CharacterComponent from './CharacterComponent';
import { randomize } from './Characters';
import { Character, Mob } from './entity/entity.interface';
import { doEntityAttack } from './entity/entity.service';
import MobComponent from './MobComponent';

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
      setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} is up for a critical hit on ${mob.name}...`]);
      setShowQuickTimeEvent(true)
      return
    }

    if (randomize(50)) {
      const characterAttack = character.attack + character.buffAttack 
      setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} hit ${mob.name} for ${characterAttack}...`]);
      mob.health -= characterAttack;
      props.doCharacterExperience(character, (2 + character.level))
    } else {
      setEncounterEvents((prevEvents) => [...prevEvents, `${character.name} missed ${mob.name}!`]);
    }

    if (mob.health <= 0) {
      props.doCharacterExperience(character, (10 + character.level) * mob.level)
      props.setShowEncounter(false);
    }

    if(character.health <= 0){
      props.setShowEncounter(false);
    }

    if (randomize(50)) {
      setEncounterEvents((prevEvents) => [...prevEvents, `${mob.name} hit ${character.name} for ${mob.attack}...`]);
      character.health -= mob.attack;
      console.log(character.health)
      console.log(character.maxHealth)
      if(character.health <= 0){
        character.health = 0
        props.setShowEncounter(false)
      }
    } else {
      setEncounterEvents((prevEvents) => [...prevEvents, `${mob.name} missed ${character.name}!`]);
    }

    props.handleEncounterEvent(character, mob);
  }, [props, mob, character]);

  const handleQuickEncounterResult = useCallback((e: {result: string}) => {
    if(e.result === 'Success'){
      const crit = doEntityAttack(character, character.buffAttack) * character.buffCrit
      mob.health -= crit;
      props.doCharacterExperience(character, (15 + character.level))

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
        <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} className='w-full'>
        <table>
          <tr>
            <td>
            <CharacterComponent character={character}></CharacterComponent>

            </td>
            <td>
              VS
            </td>
            <td>
            <MobComponent mob={mob}></MobComponent>

            </td>
          </tr>
          <tr>
            <td colSpan={3}>
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
            </td>
          </tr>
        </table>


        </DialogBody>
        <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        
        <div className="w-full h-half overflow-y-auto p-4 scrollable">
            {encounterEvents.slice().reverse().map((e, index) => (
              <p key={index} className="text-sm font-sm">{e}</p>
            ))}
          </div>
        </DialogFooter>
      </>
    );
  }, [props, mob, character, encounterEvents, quickTimeEventResponses, showQuickTimeEvent, setQuickTimeEventResponses]);

  return view;
}
