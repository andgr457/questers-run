import { camelToReadable } from '../../entity/entity.service'

/**
 * Rogue Map
 * Generate a map of cells given x and y along with chances of the room types and max amount of each room type.
 * 
 * 1. The player clicks into any cell on the map, the first room the player is in is always the stairwell.
 *  All cells are generated based on the change of the types and the max and are spread out randomly through the map. 
 * 2. The player clicks any adjacent cells, not diagonal, then based on the room type, the user must complete the action there.
 *  Room Types: Stairwell(1), Nothing, Shop, Loot, Mob Encounter, Boss Encounter, Loot Goblin
 * 
 * At the shop, the player can purchase health pots and refresh mana.
 * A randomized mob encounter based player level.
 * A randomized boss encounter based player level.
*/
type RogueRoomType = 'stair' | 'nothing' | 'shop' | 'loot' | 'mob' | 'boss'

export interface RogueRoomRequest {
  max: number
  chance: number
  type: RogueRoomType
  name: string
}

export interface RogueRoom {
  name: string
  type: RogueRoomType
}

export interface RogueMap {
  requested: RogueRoomRequest[]
  maxedTypes: RogueRoomType[]
  rooms: Map<string, RogueRoom>
  startLocation: string
}

export function isCellVisible(cellKey: string, playerLocation: string): boolean {
  const [px, py] = playerLocation.split(',').map(Number);
  const [cx, cy] = cellKey.split(',').map(Number);
  return Math.abs(px - cx) + Math.abs(py - cy) === 1;
}

export function getRogueMap(x: number, y: number, roomRequests: RogueRoomRequest[]): RogueMap {
  const rogueMap: RogueMap = {
    maxedTypes: [],
    requested: roomRequests,
    rooms: new Map(),
    startLocation: undefined
  };

  const getRandomCoordinate = () => `${Math.floor(Math.random() * x)},${Math.floor(Math.random() * y)}`;

  const stairwellXy = getRandomCoordinate();
  rogueMap.startLocation = stairwellXy
  rogueMap.rooms.set(stairwellXy, { name: 'Stairwell', type: 'stair' });

  const roomTypeCounters: Record<RogueRoomType, number> = {
    stair: 1, // Stairwell is already placed
    nothing: 0,
    shop: 0,
    loot: 0,
    mob: 0,
    boss: 0,
  };

  // Helper to randomly select a room type based on chances
  const getRandomRoomType = (): RogueRoomType => {
    const totalChance = roomRequests.reduce((sum, req) => sum + req.chance, 0);
    let randomValue = Math.random() * totalChance;

    for (const request of roomRequests) {
      if(request.type === 'stair') continue
      if (rogueMap.maxedTypes.includes(request.type)) continue;
      randomValue -= request.chance;
      if (randomValue <= 0) {
        return request.type;
      }
    }
    return 'nothing'; // Fallback to 'nothing'
  };

  for (let xi = 0; xi < x; xi++) {
    for (let yi = 0; yi < y; yi++) {
      const xyKey = `${xi},${yi}`;

      if (xyKey === stairwellXy) {
        continue
      }

      const roomType = getRandomRoomType();

      roomTypeCounters[roomType]++;

      const roomRequest = roomRequests.find(req => req.type === roomType);
      if (roomRequest && roomTypeCounters[roomType] >= roomRequest.max) {
        rogueMap.maxedTypes.push(roomType);
      }

      if(!rogueMap.rooms.has(xyKey)){
        rogueMap.rooms.set(xyKey, { name: `${roomRequest?.name ?? camelToReadable(roomType)} [${xyKey}]`, type: roomType });
      }
    }
  }

  return rogueMap;
}



// export function getRogueMap(x: number, y: number, roomsRequests: RogueRoomRequest[]): RogueMap {
//   const rogueMap: RogueMap = {
//     maxedTypes: [],
//     requested: roomsRequests,
//     rooms: new Map()
//   }
//   /** Get a random location, then set the stairwell there. */
//   // const stairwellXy = '3,2' //func

//   for(let xi = 0; xi < x; xi++){
//     //xi
//     for(let yi = 0; yi < y; yi++){
//       //yi
//       const xyKey = `${xi},${yi}`
//       /** Generate each cell with random room type. If stair hasn't been used, then generate the x,y coors of it before the loop to create the grid and place it once the loop reaches it. */
//     }
//   }
//   return rogueMap
// }