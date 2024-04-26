import { Progress } from '@material-tailwind/react'
import { Player } from './entity/entity.interface'

interface PlayerProps {
  player: Player
}

export default function PlayerComponent(props: PlayerProps) {

  if(!props.player) return

  return (
    <>
      <div>
        <Progress 
            value={+((props.player.exp / props.player.nextLevelExp) * 100)?.toFixed(2)}
            variant="gradient"
            color='deep-orange' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <p className="text-center mt-1 text-sm font-sm">
            Player Level: {props.player.level} Experience: {((props.player.exp / props.player.nextLevelExp) * 100)?.toFixed(2)}% [{props.player.exp?.toFixed(2)}/{props.player.nextLevelExp}]
          </p>
      </div>
    </>
  )
}
