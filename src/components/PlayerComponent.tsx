import { Progress } from '@material-tailwind/react'
import { Player } from '../entity/player'

interface PlayerProps {
  player: Player
}

export default function PlayerComponent(props: PlayerProps) {

  if(!props.player) return

  return (
    <>
      <div className='h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 text-blue-gray-900'>
        <Progress 
            value={+((props.player.exp / props.player.nextLevelExp) * 100)?.toFixed(2)}
            variant="gradient"
            color='deep-orange' placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
          <p className="text-center mt-1 text-sm font-sm">
            Player Level: {props.player.level} Experience: {((props.player.exp / props.player.nextLevelExp) * 100)?.toFixed(2)}% [{props.player.exp?.toFixed(2)}/{props.player.nextLevelExp}]
          </p>
          <div style={{ textAlign: 'center' }}>
            <span>{props.player.gold}</span>
            <img 
              src={`img/custom/qr-gold-1.png`} 
              alt="gold" 
              style={{ display: 'inline-block', verticalAlign: 'middle'}}
            />
          </div>
      </div>
    </>
  )
}
