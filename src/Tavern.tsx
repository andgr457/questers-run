import React, { useMemo } from 'react';
import { Dialog, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import CharacterComponent from './CharacterComponent';
import { Character } from './entity/entity.interface';

interface TavernProps {
  showTavern: boolean
  setShowTavern: React.Dispatch<React.SetStateAction<boolean>>
  character: Character
  handleTavernBuff: () => void
  handleTavernSleep: () => void
}

const barkeepMessages: string[] = [
  "Welcome, adventurer! Rest here and regain your strength.",
  "Ah, a new face in the tavern! Take a seat and rest your weary bones.",
  "Greetings, traveler! A warm bed and a hearty meal await you.",
  "Well met, adventurer! Would you like to rest or perhaps enhance your abilities?",
  "Welcome to our humble tavern! A good night's sleep can work wonders for the soul.",
  "Greetings, brave soul! Rest and recovery are the keys to a successful journey.",
  "Ahoy, adventurer! Resting here can heal both body and spirit.",
  "Welcome, hero! Care for some rest or a drink to boost your morale?",
  "Greetings, wanderer! A moment of respite can make all the difference.",
  "Well met, traveler! Here you can find solace, sustenance, and strength for your journey."
]

const Tavern: React.FC<TavernProps> = ({
  showTavern,
  setShowTavern,
  character,
  handleTavernBuff,
  handleTavernSleep
}) => {
  const view = useMemo(() => {
    return (
    <Dialog  open={showTavern} handler={() => {setShowTavern(false)}} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <div
      className="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
      Tavern
    </div>
      <p>{barkeepMessages[Math.floor(Math.random() * barkeepMessages.length)]}</p>
      <CharacterComponent character={character}></CharacterComponent>
      <Button
          color="green"
          onClick={() => handleTavernSleep()}
          className="mr-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
          Rest +{10 + character?.level ?? 0} HP 
        </Button>
        <Button
          disabled={character?.buffCount >= character?.maxBuffs}
          color="blue"
          onClick={() => handleTavernBuff()}
          className="mr-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
          Meditate +1 Attack +1 Defense +0.1 Crit
        </Button>

    </DialogBody>
    <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

      <Button  onClick={() => setShowTavern(false)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        Leave
      </Button>
    </DialogFooter>
  </Dialog>)
  }, [showTavern, character, setShowTavern, handleTavernSleep, handleTavernBuff])

  return view
};

export default Tavern;
