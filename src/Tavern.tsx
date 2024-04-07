import React, { useCallback, useMemo } from 'react';
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

const actions = [
  'Sleep',
  'Buff'
];

const Tavern: React.FC<TavernProps> = ({
  showTavern,
  setShowTavern,
  character,
  handleTavernBuff,
  handleTavernSleep
}) => {

  const handleAction = useCallback(
    (action: string) => {
      if (action === 'Sleep') {
        handleTavernSleep()
      } else if (action === 'Buff') {
        handleTavernBuff()
      }
    },
    [handleTavernBuff, handleTavernSleep]
  );

  const view = useMemo(() => {
    return (
    <Dialog  open={showTavern} handler={() => {setShowTavern(false)}} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <div
      className="flex items-center p-4 font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
      Tavern
    </div>
      <p>Welcome to the tavern! What would you like to do?</p>
      <img className="h-120 w-150 rounded-full" src={`img/tavern/tavern.jpg`} alt="" />
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
  }, [showTavern, setShowTavern, handleAction, character])

  return view
};

export default Tavern;
