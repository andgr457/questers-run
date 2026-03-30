import { useEffect, useState } from 'react'
import './ClickerRedux.css'
import './ClickerSlides.css'

import CRIntroductionModal from './CRIntroductionModal';
import { useFloatingNotifications } from '../../hooks/useFloatingNotifications';
import NotificationList from '../common/NotificationList';

export default function ClickerRedux() {
  const [tick, setTick] = useState<number>(0);
  const [gameData, setGameData] = useState<string>('Initialized');

  const [guildName, setGuildName] = useState('')
  const [guildmasterName, setGuildmasterName] = useState('')

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
      const guildSetupComplete = guildName 
        && guildName.trim().length > 0 
        && guildmasterName 
        && guildmasterName.trim().length > 0
        && showNewGuildModal === false
      if(!guildSetupComplete && !showNewGuildModal){
        setShowNewGuildModal(true)
      }
      if(guildSetupComplete && (!characters || characters.length === 0) && showNewCharacterModal === false){
        setShowNewCharacterModal(true)
      }
    }
  }, [tick]);

  return <div className='clicker-main'>
    <CRIntroductionModal 
      backdropHides={false}
      isOpen={showNewGuildModal}
      onClose={() => {
        setGuildName('')
        setShowNewGuildModal(false)
      }}
      handleSetGuildName={(_guildName: string) => setGuildName(_guildName)}
      guildName={guildName}
      handleAcceptClicked={() => {
        setShowNewGuildModal(false)
      }}
      guildmasterName={guildmasterName}
      handleSetGuildmasterName={(_guildmasterName: string) => setGuildmasterName(_guildmasterName)}
      closeButton={false}
    >
      <></>
    </CRIntroductionModal>
    Clicker Redux {gameData}
    <div>
      {showNewGuildModal === false && guildName}
    </div>
  </div>
}