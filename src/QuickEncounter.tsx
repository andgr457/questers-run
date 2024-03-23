import React, { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { toast, ToastContainer } from 'react-toastify';

interface QuickEncounterProps {
  setShowQuickTimeEvent: React.Dispatch<React.SetStateAction<boolean>>;
  handleSuccess: () => void;
  handleFailure: () => void;
}

const attackTerms = [
  'Fireball',
  'Slash',
  'Thunder Strike',
  'Ice Blast',
  'Poison Sting',
  'Earthquake',
  'Bite',
  'Dark Pulse',
];

interface Attack {
    name: string
    
}

const QuickEncounter: React.FC<QuickEncounterProps> = ({
  setShowQuickTimeEvent,
  handleSuccess,
  handleFailure,
}) => {
  const [expectedKey, setExpectedKey] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [attackTerm1, setAttackTerm1] = useState<string>('');
  const [attackTerm2, setAttackTerm2] = useState<string>('');
  const [currentTermIndex, setCurrentTermIndex] = useState<number>(0);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [buffKey, setBuffKey] = useState<string>('w')

  useEffect(() => {

    generateRandomAttackTerms();
  }, []);


  const generateRandomAttackTerms = () => {
    const randomIndex1 = Math.floor(Math.random() * attackTerms.length);
    let randomIndex2 = Math.floor(Math.random() * attackTerms.length);
    
    // Ensure different attack terms
    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * attackTerms.length);
    }

    setPassword(`${attackTerms[randomIndex1]} ${attackTerms[randomIndex2]}`)
  };

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const pressedKey = event.key;
      if (currentTermIndex === 0 && pressedKey.toLowerCase() === attackTerm1.toLowerCase()) {
        setUserInput((prevInput) => prevInput + pressedKey);
        setCurrentTermIndex(1);
      } else if (currentTermIndex === 1 && pressedKey.toLowerCase() === attackTerm2.toLowerCase()) {
        setUserInput((prevInput) => prevInput + pressedKey);
        handleSuccess();
        setShowQuickTimeEvent(false);
        toast.success('Success!', { autoClose: 2000 });
      } else {
        setUserInput(pressedKey);
        handleFailure();
        setShowQuickTimeEvent(false);
        toast.error('Failure!', { autoClose: 2000 });
      }
    },
    [attackTerm1, attackTerm2, currentTermIndex, handleSuccess, handleFailure, setShowQuickTimeEvent]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <Dialog open={true} handler={function (value: any): void {
          } } placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <p>Press the key: {expectedKey}</p>
          <p>Your input: {userInput}</p>
          <p>Attack Term 1: {attackTerm1}</p>
          <p>Attack Term 2: {attackTerm2}</p>
        </DialogBody>
        <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Button color="blue" onClick={() => setShowQuickTimeEvent(false)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Skip
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default QuickEncounter;
