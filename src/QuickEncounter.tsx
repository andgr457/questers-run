import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dialog, DialogBody, DialogFooter, Button, Input } from '@material-tailwind/react';
import { ATTACKS, CLASSES } from './entity/Constants';

interface QuickEncounterProps {
  setShowQuickTimeEvent: React.Dispatch<React.SetStateAction<boolean>>;
  quickEncounterShown: boolean
  setResult: (e: {result: string}) => void
  characterClass: string
}

export interface Attack {
    name: string
    class: string
}

const generateRandomAttack = (classs: string): string => {
  const classAttacks: Attack[] = ATTACKS.filter(a => a.class === classs);
  const randomAttack = classAttacks[Math.floor(Math.random() * classAttacks.length)];

  return randomAttack ? randomAttack.name : '';
};


const QuickEncounter: React.FC<QuickEncounterProps> = ({
  setShowQuickTimeEvent,
  quickEncounterShown,
  setResult,
  characterClass
}) => {
  const [passPhrase, setPassPhrase] = useState<string | undefined>(undefined);

  useEffect(() => {
    setPassPhrase(generateRandomAttack(characterClass))
  }, [quickEncounterShown, characterClass])

  const handlePassPhraseChange = useCallback((e: any) => {
    if(e.target.value === passPhrase){
        setResult({result: 'Success'})
        setShowQuickTimeEvent(false)
    }
  }, [passPhrase])

  const handleSkipClick = useCallback((e: any) => {
    setResult({result: 'Skipped'})
    setShowQuickTimeEvent(false)
  }, [])

  const view = useMemo(() => {
    if(!passPhrase) return
    return (
        <Dialog open={quickEncounterShown} handler={function (value: any): void {
              } } placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div>
                   
                    <Input onChange={handlePassPhraseChange} label={`Crit "${passPhrase}"`} placeholder={passPhrase} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                </div>            </DialogBody>
            <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <Button color="blue" onClick={handleSkipClick} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Skip
              </Button>
            </DialogFooter>
          </Dialog>
    )
  }, [setShowQuickTimeEvent, quickEncounterShown, passPhrase])

  return view
};

export default QuickEncounter;
