import { useCallback, useEffect, useState } from 'react'
import './ClickerRedux.css'
import './ClickerSlides.css'

import CRIntroductionModal from './CRIntroductionModal';
import { useFloatingNotifications } from '../../hooks/useFloatingNotifications';
import NotificationList from '../common/NotificationList';
import { useConfirm } from '../../providers/ConfirmProvider';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CRGuild } from './interfaces/CRGuild';
import { CR_LOCAL_STORAGE_KEYS } from './interfaces/CRLocalStorageKeys';
import CRGuildManage from './CRGuildManage';
import { CRMember } from './interfaces/CRMember';
import { DateTime } from 'luxon';

export default function ClickerRedux() {
  const [tick, setTick] = useState<number>(0);
  const showConfirm = useConfirm()

  const [guilds, setGuilds] = useLocalStorage<CRGuild[]>(
    CR_LOCAL_STORAGE_KEYS.GUILD,
    []
  )

  const [members, setMembers] = useLocalStorage<CRMember[]>(
    CR_LOCAL_STORAGE_KEYS.MEMBERS,
    []
  )


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
    const doTick = async () => {
      if (tick > 0) {
        setGameData(`Tick ${tick}: Updating game state...`);
        // Add game logic here (e.g., move NPCs, update scores)
        // const guildSetupComplete = guildName 
        //   && guildName.trim().length > 0 
        //   && guildmasterName 
        //   && guildmasterName.trim().length > 0
        //   && showNewGuildModal === false
        // if(!guildSetupComplete && !showNewGuildModal){
        //   setShowNewGuildModal(true)
        // }
        // if(guildSetupComplete && (!characters || characters.length === 0) && showNewCharacterModal === false){
        //   setShowNewCharacterModal(true)
        // }
        if(guilds.length === 0){
          setShowNewGuildModal(true)
        }
      }
    }
    doTick()
  }, [tick]);

  const handleAcceptNewGuild = useCallback(() => {
    if(!guildName || !guildmasterName) return
    const newGuild: CRGuild = {
      name: guildName,
      xp: 0,
      level: {
        value: 1,
        nextLevelXP: 100
      },
      status: 'ok',
      guildmaster: {
        id: `gm_${guildmasterName}_${DateTime.now().toMillis()}`,
        name: guildmasterName,
        level: {
          value: 1,
          nextLevelXP: 100
        },
        xp: 0,
        class: 'Guildmaster',
        stamina: 100,
        hp: 100,
        gold: 20,
        sanity: 100,
        status: 'idle'
      },
      suspendedUntil: undefined,
      gold: 0
    }
    setGuilds([newGuild])
  }, [guildName, guildmasterName])

  const handleResetData = async () => {
    if(!await showConfirm('Are you sure you want to clear everything?')) return
    setGuilds([])
    setMembers([])
  }

  const handleAddGuildGold = useCallback((value: number, memberId: string) => {
    if(memberId === guilds[0].guildmaster.id){
      guilds[0].guildmaster.gold -= value
    }

    const newGuilds: CRGuild[] = [
      {
        ...guilds[0],
        gold: guilds[0].gold + value
      }
    ]

    const newMembers = []
    for(const member of members){
      if(member.id === memberId){
        member.gold -= value
      }
      newMembers.push(member)
    }

    setGuilds(newGuilds)
    setMembers(newMembers)
  }, [guilds, members])

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
        handleAcceptNewGuild()
        setShowNewGuildModal(false)
      }}
      guildmasterName={guildmasterName}
      handleSetGuildmasterName={(_guildmasterName: string) => {
        setGuildmasterName(_guildmasterName)
      }}
      closeButton={false}
    >
      <></>
    </CRIntroductionModal>
    Clicker Redux {gameData}
    {guilds[0] && <div>
      <div>
        <button onClick={handleResetData}>Start Over</button>
      </div>
      <div>
        <CRGuildManage 
          guild={guilds[0]} 
          members={members}
          handleAddGuildGold={handleAddGuildGold}
        />
      </div>
    </div>}
  </div>
}