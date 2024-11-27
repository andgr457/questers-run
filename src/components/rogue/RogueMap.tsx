import { useState, useMemo, useEffect, useCallback } from 'react';
import { getRogueMap, isCellVisible, RogueMap, RogueRoomRequest } from './rogue.map';

//TODO: Fix player clicking to cell and rememberance of surrounding cells.
interface RogueMapProps {
  roomsRequested?: RogueRoomRequest[]
  sizeX: number
  sizeY: number
}
export default function RogueMapComponent(props: RogueMapProps) {
  const [map, setMap]: [undefined | RogueMap, any] = useState(undefined)
  const [playerLocation, setPlayerLocation] = useState(undefined); // Starting point at the center
  const [x, setX] = useState(undefined)
  const [y, setY] = useState(undefined)
  const [visitedXy, setVisitedXy]: [undefined | string[], any] = useState(undefined)

  /** Map Setup */
  useEffect(() => {
    if(typeof props?.roomsRequested === 'undefined'){
      props = {
        sizeX: 5,
        sizeY: 5,
        roomsRequested: [
          { max: 1, chance: 10, type: 'stair', name: 'Stairwell' },
          { max: 2, chance: 20, type: 'shop', name: 'Shop' },
          { max: 3, chance: 30, type: 'loot', name: 'Treasure' },
          { max: 5, chance: 40, type: 'mob', name: 'Mob' },
          { max: 1, chance: 5, type: 'boss', name: 'Boss' },
        ]
      }
    }
    setX(props.sizeX)
    setY(props.sizeY)
    const generatedMap = getRogueMap(props.sizeX, props.sizeY, props.roomsRequested)
    setPlayerLocation(generatedMap.startLocation)
    setMap(generatedMap)
  }, [props])

  const handlePlayerMove = useCallback((xy: string) => {
    if(!visitedXy){
      setVisitedXy([xy])
    } else {
      if(!visitedXy.includes(xy)){
        const newVisited = [...visitedXy, xy]
        setVisitedXy(newVisited)
      }
    }
    setPlayerLocation(xy)
  }, [visitedXy])

  const renderGrid = useMemo(() => {
    if(!map || !x || !y) return
    console.log(`Rendering map.`)
    const visitedCoords = visitedXy ? visitedXy : []
    
    const cells = [];
    for (let xi = 0; xi < x; xi++) {
      for (let yi = 0; yi < y; yi++) {
        const xyKey = `${xi},${yi}`;
        console.log(`Rendering ${xyKey}`)
        const room = map.rooms.get(xyKey);
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
        const visible = isCellVisible(xyKey, playerLocation) || xyKey === playerLocation;
        const roomName = visible ? room?.name : room?.type === 'stair' ? room?.name : visitedCoords.includes(xyKey) ? room?.name : '???'

        cells.push(
          <div
            key={xyKey}
            className={`flex items-center justify-center border border-gray-400 rounded-md text-sm font-bold ${
              visible ? roomStyle[roomType] : 'bg-gray-800 text-gray-400'
            } h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24`}
            onClick={() => visible && handlePlayerMove(xyKey)} // Allow movement to adjacent cells
          >
            {roomName}
          </div>
        );
      }
    }
    return cells;
  }, [map, playerLocation, x, y, visitedXy]);

  return (
    <div className="flex justify-center items-center h-full bg-gray-900 p-4 rounded-md">
      <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-3">{renderGrid}</div>
    </div>
  );
}
