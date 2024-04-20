import React, { useMemo } from 'react';
import { Dialog, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { ITEM_RARITIES } from './entity/Constants';
import { Bag } from './entity/entity.interface';

interface BagsProps {
  bags: Bag[];
  setShowBags: React.Dispatch<React.SetStateAction<boolean>>;
  showBags: boolean
}

const Bags: React.FC<BagsProps> = ({ bags, setShowBags, showBags }) => {

  const getItemRarityValueModifier = (rarity: string) => {
    return ITEM_RARITIES ? ITEM_RARITIES.find(ir => ir.name === rarity)?.valueModifier ?? 1 : 1
  }

  const view = useMemo(() => {
    return (
      <Dialog open={showBags} handler={function (): void {
            setShowBags(false)
        } } placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {bags.map((bag) => (
            <>
              <p className="text-lg font-semibold">{bag.name}</p>
              {bag.items.map((item) => (
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
