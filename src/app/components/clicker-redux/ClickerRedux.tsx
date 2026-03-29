import { useEffect, useState } from 'react'
import './ClickerRedux.css'
import CRNewGuildModal from './CRNewGuildModal';

export default function ClickerRedux() {
  const [tick, setTick] = useState<number>(0);
  const [gameData, setGameData] = useState<string>('Initialized');

  const [guildName, setGuildName] = useState(undefined)
  const [newCharacterName, setNewCharacterName] = useState(undefined)

  const [characters, setCharacters] = useState(undefined)

  const [showNewGuildModal, setShowNewGuildModal] = useState(false)
  const [showNewCharacterModal, setShowNewCharacterModal] = useState(false)

  useEffect(() => {
    // 1. Setup the ticker (e.g., 1000ms = 1 second)
    const intervalId = setInterval(() => {
      setTick((prevTick) => prevTick >= 5 ? 1 : prevTick + 1);

    }, 1000);

    // 2. Cleanup function to stop timer on unmount
    return () => clearInterval(intervalId);
  }, []);

  // 3. Logic that runs on every tick
  useEffect(() => {
    if (tick > 0) {
      setGameData(`Tick ${tick}: Updating game state...`);
      // Add game logic here (e.g., move NPCs, update scores)
      if(!guildName && !showNewGuildModal){
        setShowNewGuildModal(true)
      }
      if(guildName && (!characters || characters.length === 0) && showNewCharacterModal === false){
        setShowNewCharacterModal(true)
      }
    }
  }, [tick]);

  return <div className='clicker-main'>
    <CRNewGuildModal 
      backdropHides={false}
      isOpen={showNewGuildModal}
      onClose={() => {
        setGuildName('')
        setShowNewGuildModal(false)
      }}
      handleSetGuildName={setGuildName}
      guildName={guildName}
      handleAcceptClicked={() => {
        setShowNewGuildModal(false)
      }}
    >
      <></>
    </CRNewGuildModal>
    Clicker Redux {gameData}
    <div>
      {showNewGuildModal === false && guildName}
    </div>
  </div>
}