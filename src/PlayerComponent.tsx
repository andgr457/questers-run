import { Progress } from '@material-tailwind/react'
import { Player } from './entity/entity.interface'

interface PlayerProps {
  player: Player
}

export default function PlayerComponent(props: PlayerProps) {

  return (
    <>
      <div>
        {props.player.level}<br/>
        <Progress 
            value={+((props.player.exp / props.player.nextLevelExp) * 100).toFixed(2)}
            variant="gradient"
            color='purple' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <p className="text-center mt-1 text-sm font-sm">
            Experience: {((props.player.exp / props.player.nextLevelExp) * 100).toFixed(2)}% [{props.player.exp.toFixed(2)}/{props.player.nextLevelExp}]
          </p>
      </div>
    </>
  )
}
