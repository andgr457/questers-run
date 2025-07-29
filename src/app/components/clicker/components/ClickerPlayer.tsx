import { IPlayer } from '../../../../api/interfaces/entities/IPlayer';

interface ClickerPlayerProps {
  player: IPlayer
}

export default function ClickerPlayer(props: ClickerPlayerProps){
  const {player} = props

  return <div>
    {player?.name ?? 'No Player'}
  </div>
}