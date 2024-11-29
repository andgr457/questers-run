import { useEffect, useMemo, useState } from 'react';
import { Character } from '../../entity/character';
import { determineCharacterNextLevelExp, getRandomClass, getRandomName } from '../../entity/entity.service';
import { CLASSES } from '../../entity/Constants';
import CharacterComponent from '../CharacterComponent'
import { getLogLine } from './rogue.log'
import RogueMapComponent from './RogueMap';

export default function Rogue(){
  const [character, setCharacter]: [Character, any] = useState(undefined)
  const [activeTab, setActiveTab] = useState("map"); // "map" or "log"3

  useEffect(() => {
    const name = getRandomName()
    const className = getRandomClass()
    const foundClass = CLASSES.find(c => c.name === className)

    const toon: Character = {
      name,
      gold: 0,
      class: className,
      attack: foundClass.startAttack,
      maxHealth: foundClass.startHealth,
      health: foundClass.startHealth,
      mana: foundClass.startMana,
      maxMana: foundClass.startMana,
      maxBuffs: 1,
      exp: 0,
      nextLevelExp: determineCharacterNextLevelExp(1),
      level: 1,
      buffAttack: foundClass.startAttack,
      buffDefense: foundClass.startDefense,
      buffCrit: foundClass.startCrit,
      buffCount: 0,
      inventory: {
         title: 'Inventory',
         maxTabs: 1,
         tabs: [{
          title: 'Backpack',
          items: [{name: 'Healing Potion', quantity: 5}],
          maxItems: 24
         }] 
      },
      defense: 1,
      equipment: [],
      hitChance: foundClass.startHitChance,
      critChance: foundClass.startCritChance
    }
    setCharacter(toon)
  }, [])

  const render = useMemo(() =>{
    if(!character){
      return <>Woops</>
    }
    return <>
<div className="flex flex-col md:flex-row h-screen">
      {/* Left Character Menu (Top on Mobile, Left on Larger Screens) */}
      <div className="w-full md:w-1/3 bg-gray-100 p-4">
        <CharacterComponent character={character} />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-2/3 flex flex-col">
        {/* Mobile Tabs */}
        <div className="md:hidden flex justify-around bg-gray-200 p-2">
          <button
            className={`flex-1 text-center p-2 ${
              activeTab === "map" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("map")}
          >
            Map
          </button>
          <button
            className={`flex-1 text-center p-2 ${
              activeTab === "log" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("log")}
          >
            Log
          </button>
        </div>

        {/* Map and Log Sections (Visible as Tabs on Mobile, Stacked on Larger Screens) */}
        <div className={`flex-grow md:flex-none h-3/5 bg-gray-100 p-4 ${activeTab !== "map" && "hidden md:block"}`}>
          {/* <h2 className="text-xl font-bold mb-2">Interactive Map</h2>
          <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">
          </div> */}
            <RogueMapComponent sizeX={undefined} sizeY={undefined} roomsRequested={undefined}></RogueMapComponent>

        </div>
        <div
          className={`flex-grow bg-gray-100 p-4 ${
            activeTab !== "log" && "hidden md:block"
          }`}
        >
          <h2 className="text-xl font-bold mb-2">Action Log</h2>
          <div className="bg-white rounded-md shadow-md p-4 h-full max-h-[50vh] md:max-h-full overflow-y-auto">
            <p>Action logs will appear here...</p>
            <p>{getLogLine(character, 'Awakened...')}</p>
            <p>{getLogLine(character, 'Awakened...')}</p>
            <p>{getLogLine(character, 'Awakened...')}</p>
            <p>{getLogLine(character, 'Awakened...')}</p>
            <p>{getLogLine(character, 'Awakened...')}</p>
            <p>{getLogLine(character, 'Awakened...')}</p>
            <p>{getLogLine(character, 'Awakened...')}</p>
            <p>{getLogLine(character, 'Awakened...')}</p>
            <p>{getLogLine(character, 'Awakened...')}</p>
          </div>
        </div>

      </div>
    </div>
    </>
  }, [character, activeTab])

  return render
}
