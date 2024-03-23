import React from 'react';
import { Dialog, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { ToastContainer, toast } from 'react-toastify';

interface TavernProps {
  showTavern: boolean
  setShowTavern: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  handleSleep: () => void;
  handleTrade: () => void;
}

const actions = [
  'Sleep',
  'Buff'
];

const Tavern: React.FC<TavernProps> = ({
  showTavern,
  setShowTavern,
  handleClose
}) => {

  const handleAction = (action: string) => {
    setShowTavern(false);
    handleClose();
    if (action === 'Sleep') {
      toast('Rest Here Weary Traveler, For Great Adventures Lie Ahead!', {type: 'success'});
    } else if (action === 'Buff') {
      toast('You feel stronger and ready for the next challenge!', {type: 'info'});
    }
  };

  return (
    <>
      <Dialog open={showTavern} handler={() => {}} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <p>Welcome to the tavern! What would you like to do?</p>
          {actions.map((action, index) => (
            <Button
              key={index}
              color="blue"
              onClick={() => handleAction(action)}
              className="mr-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              {action}
            </Button>
          ))}
        </DialogBody>
        <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Button color="red" onClick={() => setShowTavern(false)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Tavern;
