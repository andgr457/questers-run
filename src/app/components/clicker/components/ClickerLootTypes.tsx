


import { ILootType } from '../../../../api/interfaces/entities/ILoot'
import { ReactNode } from 'react'
import { Profession } from '../../../../api/interfaces/entities/IProfession'
import { ShieldHalf, TestTubeDiagonal, Soup, Sprout, Sword, CircleQuestionMark } from 'lucide-react'

interface ClickerLootTypesProps {
  type?: ILootType
  profession?: Profession
  children?: any
}

export default function ClickerLootTypes(props: ClickerLootTypesProps) {

  function getIconByType(rarity: ILootType): ReactNode {
    switch(rarity){
      case 'armor': return <div title='Armor'><ShieldHalf className="w-5 h-5 text-red-600" /></div>
      case 'consumable': 
        if(props.profession === 'alchemy'){
          return <div title='Alchemy Consumable'><TestTubeDiagonal className="w-5 h-5 text-purple-600" /></div>
        } else if(props.profession === 'cooking'){
          return <div title='Cooking Consumable'><Soup className="w-5 h-5 text-green-600" /></div>
        } else {
          return <>
            <div title='Alchemy Consumable'><TestTubeDiagonal className="w-5 h-5 text-purple-600" /></div>
            <div title='Cooking Consumable'><Soup className="w-5 h-5 text-green-600" /></div>
          </>
        }
        break
      case 'resource': return <div title='Resource'><Sprout className="w-5 h-5 text-green-600" /></div>
      case 'weapon': return <div title='Weapon'><Sword className="w-5 h-5 text-orange-600" /></div>
      default: return <div title='Unknown'><CircleQuestionMark /></div>
    }
  }

  if(props.type){
    return <>{getIconByType(props.type)}</>
  } else {
    return <div style={{cursor: 'pointer', flexWrap: 'wrap', display: 'flex', gap: '5px'}}>
      {props.children}
      {getIconByType('resource')}
      {getIconByType('consumable')}
      {getIconByType('weapon')}
      {getIconByType('armor')}
    </div>
  }

}