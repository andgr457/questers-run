import { CRGuild } from './interfaces/CRGuild'
import { CRMember } from './interfaces/CRMember'
import './CRGuildManage.css'
import { useState } from 'react'
import CRRecruits from './CRRecruits'
import CRMembers from './CRMembers'

interface GuildManageProps {
  guild: CRGuild
  members: CRMember[]
  handleAddGuildGold: (value: number, memberId: string) => void
}

export default function CRGuildManage(props: GuildManageProps) {
  
  const {
    guild,
    members,
    handleAddGuildGold,
  } = props

  const [view, setView] = useState('members')

  const allGuildMembers = [guild.guildmaster, ...members]



  return <div className='guild-manage'>
    <div className='guild-manage-header flex-wrap'>
      <div className='guild-manage-title-info name'>
        {guild.name}
      </div>
      <div className='guild-manage-title-info'>
        Level {guild.level.value} Guild
      </div>
      <div className='guild-manage-title-info'>
        Level {guild.guildmaster.level.value} Guildmaster {guild.guildmaster.name}
      </div>
      <div className='guild-manage-title-info'>
        {allGuildMembers.length} Members
      </div>
      <div className='guild-manage-title-info'>
        {guild.gold} Guild Gold
      </div>
    </div>
    <div className='guild-manage-nav-section flex-wrap'>
      <button className={`${view === 'members' ? 'selected' : ''}`} onClick={() => {setView('members')}}>Members</button>
      <button className={`${view === 'recruit' ? 'selected' : ''}`} onClick={() => {setView('recruit')}}>Recruit</button>
      <button className={`${view === 'tavern' ? 'selected' : ''}`} onClick={() => {setView('tavern')}}>Tavern</button>
      <button className={`${view === 'blacksmith' ? 'selected' : ''}`} onClick={() => {setView('blacksmith')}}>Blacksmith</button>
      <button className={`${view === 'potions' ? 'selected' : ''}`} onClick={() => {setView('potions')}}>Potions</button>
      <button className={`${view === 'quests' ? 'selected' : ''}`} onClick={() => {setView('quests')}}>Quests</button>
      <button className={`${view === 'gathering' ? 'selected' : ''}`} onClick={() => {setView('gathering')}}>Gathering</button>
    </div>
    <CRMembers show={view === 'members'} guild={guild} members={allGuildMembers} handleAddGuildGold={handleAddGuildGold} />
    <CRRecruits show={view === 'recruit'} guildGold={guild.gold} memberCount={members.length} guildLevel={guild.level.value} />
  </div>
}