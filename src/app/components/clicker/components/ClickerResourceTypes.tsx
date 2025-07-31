import { Carrot, CircleQuestionMark, Container, Fish, Grape, Ham, Layers2, Leaf, Pickaxe, Worm } from 'lucide-react'
import { ILootResourceType } from '../../../../api/interfaces/entities/ILoot'
import { ReactNode } from 'react'

interface ClickerResourceTypesProps {
  type?: ILootResourceType
  children?: any
}

export default function ClickerResourceTypes(props: ClickerResourceTypesProps) {

  function getIconByType(type: ILootResourceType): ReactNode {
    switch(type){
      case 'fish': return <div title='Fish'><Fish className="w-5 h-5 text-blue-600" /></div>
      case 'fruit': return <div title='Fruit'><Grape className="w-5 h-5 text-purple-600" /></div>
      case 'herb': return <div title='Herb'><Leaf className="w-5 h-5 text-green-600" /></div>
      case 'ingot': return <div title='Ingot'><Container className="w-5 h-5 text-gray-600" /></div>
      case 'leather': return <div title='Leather'><Layers2 className="w-5 h-5 text-brown-600" /></div>
      case 'meat': return <div title='Meat'><Ham className="w-5 h-5 text-red-600" /></div>
      case 'ore': return <div title='Ore'><Pickaxe className="w-5 h-5 text-brown-600" /></div>
      case 'vegetable': return <div title='Vegetable'><Carrot className="w-5 h-5 text-orange-600" /></div>
      case 'worm': return <div title='Worm'><Worm className="w-5 h-5 text-brown-600" /></div>
      default: return <div title='Unknown'><CircleQuestionMark /></div>
    }
  }

  if(props.type){
    return <>{getIconByType(props.type)}</>
  } else {
    return <div style={{cursor: 'pointer', flexWrap: 'wrap', display: 'flex', gap: '5px'}}>
      {props.children}
      {getIconByType('herb')}
      {getIconByType('ore')}
      {getIconByType('vegetable')}
      {getIconByType('meat')}
      {getIconByType('worm')}
      {getIconByType('leather')}
      {getIconByType('fruit')}
      {getIconByType('fish')}
    </div>
  }

}