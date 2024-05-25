import { Progress } from '@material-tailwind/react'
import { Player } from '../entity/player'

interface PlayerProps {
  player: Player
}

export default function PlayerComponent(props: PlayerProps) {

  if(!props.player) return

  return (
    <>
      <div className='sticky'>
        <Progress 
            value={+((props.player.exp / props.player.nextLevelExp) * 100)?.toFixed(2)}
            variant="gradient"
            color='deep-orange' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <p className="text-center mt-1 text-sm font-sm">
            Player Level: {props.player.level} Experience: {((props.player.exp / props.player.nextLevelExp) * 100)?.toFixed(2)}% [{props.player.exp?.toFixed(2)}/{props.player.nextLevelExp}]
          </p>
          <p className="text-center mt-1 text-sm font-sm">
            {props.player.currency.copper} Copper | {props.player.currency.silver} Silver | {props.player.currency.gold} Gold | {props.player.currency.platinum} Platinum
          </p>
      </div>
    </>
  )
}
