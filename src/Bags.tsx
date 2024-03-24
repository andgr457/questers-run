import React, { useCallback, useMemo } from 'react';
import { Dialog, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { Bag } from './Characters';
import { ITEM_RARITIES } from './Constants';

interface BagsProps {
  bags: Bag[];
  setShowBags: React.Dispatch<React.SetStateAction<boolean>>;
  showBags: boolean
}

const Bags: React.FC<BagsProps> = ({ bags, setShowBags, showBags }) => {

  const getItemRarityValueModifier = (rarity: string) => {
    return ITEM_RARITIES ? ITEM_RARITIES.find(ir => ir.name === rarity)?.valueModifier ?? 1 : 1
  }

  const handleCloseClick = useCallback((e:any) => {
    setShowBags(false)
  }, [setShowBags])

  const view = useMemo(() => {
    return (
      <Dialog open={showBags} handler={function (value: any): void {
            setShowBags(false)
        } } placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {bags.map((bag, bagIndex) => (
            <>
              <p className="text-lg font-semibold">{bag.name}</p>
              {bag.items.map((item, itemIndex) => (
                <div>
                  <p className="text-lg">{item.name} x{item.quantity ?? 1}</p>
                  <p className="text-lg">{item.description}</p>

                  <p className="text-sm">{item.rarity.toUpperCase()}</p>
                  <p className="text-sm">Valued at {item.baseValue * getItemRarityValueModifier(item.rarity)} gold</p>

                </div>
              ))}
              <br/><br/>
            </>

          ))}
        </DialogBody>
        <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Button
                    color="blue"
                    onClick={() => setShowBags(false)}
                    className="mr-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    )
  }, [setShowBags, showBags, bags])

  return view
};

export default Bags;
