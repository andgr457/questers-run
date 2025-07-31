import { Button } from '@material-tailwind/react';

export default function Header(){
  return <div>
    <div>
      Quester's Run
    </div>
    <div>
      <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        SAVE
      </Button>
      <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        LOAD
      </Button>
    </div>
  </div>
}