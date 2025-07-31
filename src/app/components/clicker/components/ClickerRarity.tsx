import { Circle, Star, Swords, Stars, Diamond, CircleQuestionMark } from 'lucide-react'
import { ILootRarity } from '../../../../api/interfaces/entities/ILoot'
import { ReactNode } from 'react'

interface ClickerRarityProps {
  rarity?: ILootRarity
  children?: any
}

export default function ClickerRarity(props: ClickerRarityProps) {

  function getIconByType(rarity: ILootRarity): ReactNode {
    switch(rarity){
      case 'common': return <div title='Common'><Circle className="w-5 h-5 text-red-600" /></div>
      case 'epic': return <div title='Epic'><Star className="w-5 h-5 text-purple-600" /></div>
      case 'legendary': return <div title='Legendary'><Swords className="w-5 h-5 text-green-600" /></div>
      case 'rare': return <div title='Rare'><Stars className="w-5 h-5 text-orange-600" /></div>
      case 'uncommon': return <div title='Uncommon'><Diamond className="w-5 h-5 text-blue-600" /></div>
      default: return <div title='Unknown'><CircleQuestionMark /></div>
    }
  }

  if(props.rarity){
    return <>{getIconByType(props.rarity)}</>
  } else {
    return <div style={{cursor: 'pointer', flexWrap: 'wrap', display: 'flex', gap: '5px'}}>
      {props.children}
      {getIconByType('common')}
      {getIconByType('uncommon')}
      {getIconByType('rare')}
      {getIconByType('epic')}
      {getIconByType('legendary')}
    </div>
  }

}