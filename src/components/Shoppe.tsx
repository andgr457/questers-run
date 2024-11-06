import { Button, Dialog, DialogBody, DialogFooter } from '@material-tailwind/react'
import { Character } from '../entity/character'
// import { Inventory } from '../entity/inventory'
// import { LESSER_HEALING_POTION, LESSER_MANA_POTION } from '../entity/Constants'
import { useEffect, useMemo } from 'react'

interface ShoppeProps {
  character: Character
  showShoppe: boolean
  setShowShoppe: any
}

// const SHOPPE_INVENTORY: Inventory = {
//   title: 'Shoppe Keep',
//   maxTabs: 1,
//   tabs: [
//     {
//       title: 'Potions',
//       maxItems: 1,
//       items: [
//         {
//           name: LESSER_HEALING_POTION.name,
//           quantity: 10
//         },
//         {
//           name: LESSER_MANA_POTION.name,
//           quantity: 10
//         }
//       ]
//     }
//   ]
// }

const Shoppe: React.FC<ShoppeProps> = ({
  character,
  showShoppe,
  setShowShoppe
}) => {
  // const [shoppeInventory, setShoppeInventory]: [Inventory, any] = useState(undefined)
  // const [cost, setCost]: [number, any] = useState(undefined)

  useEffect(() => {
    // setShoppeInventory(SHOPPE_INVENTORY)
  },[])

  const buyableView = useMemo(() => {
    if(!character) return
    return (
      <div>
        {character.gold}
      </div>
    )
  }, [character])

  const barterView = useMemo(() => {
    if(!character) return
    return (
      <div>
        {/* (-{cost ?? 0}) {character.gold} */}
        {character.gold}
      </div>
    )
  }, [character])

  return (
    <Dialog  open={showShoppe} handler={() => {setShowShoppe(false)}} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
    <div
      className="text-center font-sans text-2xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-900">
      Shoppe
    </div>
      <p className="text-center text-xs font-sans text-1xl antialiased font-semibold leading-snug shrink-0 text-blue-gray-400">{'Welcome to the Shoppe.'}</p>
      <div>
        <table>
          <thead>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            <td>
              {buyableView}
            </td>
            <td>
              {barterView}
            </td>
          </tbody>
        </table>
      </div>
    </DialogBody>
    <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <Button onClick={() => setShowShoppe(false)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        Leave
      </Button>
    </DialogFooter>
  </Dialog>
  )
}

export default Shoppe
