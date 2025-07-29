import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import { IQuest } from '../../../../api/interfaces/entities/IQuest'

export interface ClickerQuestSelectionProps {
  show: boolean
  level: number
  characterId: string
  onQuestSelect: (questId: string, characterId: string) => void
  onClose: () => void
  quests: IQuest[]
}

export default function ClickerQuestSelection(props: ClickerQuestSelectionProps) {
  return <Dialog size='sm' open={props.show} handler={props.onClose} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
  <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      Quests
  </DialogHeader>
  <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <div>
      {props?.quests?.map(q => {
        return (
          <div>
            <Button disabled={q.level > props.level} onClick={() => {props.onQuestSelect(q.id, props.characterId)}} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <span style={{fontSize: '1.4em', fontWeight: 'lighter'}}>{q.title}</span><br/>
              <span style={{fontSize: '.9em', fontWeight: 'lighter'}}>{q.description}</span>
              <div>
                Requires Level {q.level} and {q.stamina} Stamina
              </div>
            </Button>
          </div>
        )
      })}
    </div> 
  </DialogBody>
  <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <Button onClick={props.onClose} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >CLOSE</Button>
  </DialogFooter>
</Dialog>
}