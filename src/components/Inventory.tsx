import React, { useMemo } from 'react';
import { Dialog, DialogBody, DialogFooter, Button } from '@material-tailwind/react';
import { Inventory } from '../entity/inventory'

interface InventoryProps {
  inventory: Inventory
  setShowInventory: React.Dispatch<React.SetStateAction<boolean>>;
  showInventory: boolean
}

const InventoryComponent: React.FC<InventoryProps> = ({ inventory, setShowInventory, showInventory }) => {

  const view = useMemo(() => {
    return (
      <Dialog open={showInventory} handler={function (): void {
            setShowInventory(false)
        } } placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <DialogBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {inventory?.tabs?.map((tab) => (
            <>
              <p className="text-lg font-semibold">{tab.title}</p>
              {tab.items.map((item) => (
                <div>
                <p className="text-lg">{item.name} x{item.quantity ?? 1}</p>
                </div>

              ))}
              <br/><br/>
            </>

          ))}
        </DialogBody>
        <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Button
                    color="blue"
                    onClick={() => setShowInventory(false)}
                    className="mr-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    )
  }, [setShowInventory, showInventory, inventory])

  return view
};

export default InventoryComponent;
