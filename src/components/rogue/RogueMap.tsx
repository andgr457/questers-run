import { useState, useMemo } from 'react';
import { getRogueMap, RogueRoomRequest } from './rogue.map';

//TODO: Fix player clicking to cell and rememberance of surrounding cells.
export default function RogueMap() {
  const x = 5; // Width of the map
  const y = 5; // Height of the map

  const roomRequests: RogueRoomRequest[] = [
    { max: 1, chance: 10, type: 'stair' },
    { max: 2, chance: 20, type: 'shop' },
    { max: 3, chance: 30, type: 'loot' },
    { max: 5, chance: 40, type: 'mob' },
    { max: 1, chance: 5, type: 'boss' },
  ];

  const rogueMap = useMemo(() => getRogueMap(x, y, roomRequests), [x, y, roomRequests]);

  const [playerLocation, setPlayerLocation] = useState('2,2'); // Starting point at the center

  // Determine if a cell is adjacent to the player's location
  const isCellVisible = (cellKey: string): boolean => {
    const [px, py] = playerLocation.split(',').map(Number);
    const [cx, cy] = cellKey.split(',').map(Number);
    return Math.abs(px - cx) + Math.abs(py - cy) === 1;
  };

  const renderGrid = useMemo(() => {
    const cells = [];
    for (let xi = 0; xi < x; xi++) {
      for (let yi = 0; yi < y; yi++) {
        const xyKey = `${xi},${yi}`;
        const room = rogueMap.rooms.get(xyKey);
        const roomType = room?.type || 'nothing';

        // Determine the styling based on room type
        const roomStyle = {
          stair: 'bg-purple-500 text-white',
          nothing: 'bg-gray-300 text-gray-600',
          shop: 'bg-green-500 text-white',
          loot: 'bg-yellow-400 text-black',
          mob: 'bg-red-500 text-white',
          boss: 'bg-black text-red-500',
        };

        // Check visibility
        const visible = isCellVisible(xyKey) || xyKey === playerLocation;

        cells.push(
          <div
            key={xyKey}
            className={`flex items-center justify-center border border-gray-400 rounded-md text-sm font-bold ${
              visible ? roomStyle[roomType] : 'bg-gray-800 text-gray-400'
            } h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24`}
            onClick={() => visible && setPlayerLocation(xyKey)} // Allow movement to adjacent cells
          >
            {visible ? room?.name || 'Empty' : '???'}
          </div>
        );
      }
    }
    return cells;
  }, [rogueMap.rooms, playerLocation, x, y]);

  return (
    <div className="flex justify-center items-center h-full bg-gray-900 p-4 rounded-md">
      <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-3">{renderGrid}</div>
    </div>
  );
}
