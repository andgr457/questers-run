import { useState } from 'react'
import CRDonateGoldModal from './CRDonateGoldModal'
import { CRGuild } from './interfaces/CRGuild'
import type { CRMember } from './interfaces/CRMember'

interface CRMemberProps {
  show: boolean
  index: number
  member: CRMember
  children: React.ReactNode
}

export default function CRMemberDetail(props: CRMemberProps) {
  const {
    show,
    index,
    member,
    children,
  } = props


  return <div hidden={!show} className='member'>
    
    <div className='flex-wrap member-info' style={{gap: '1em'}}>
      <div>
        {index + 1}
      </div>
      <div className='member-title'>
        {member.name}
      </div>
      <div>
        {member.class}
      </div>
      <div>
        Lvl {member.level.value}
      </div>
      <div>
        {member.xp}/{member.level.nextLevelXP} XP
      </div>
      <div>
        {member.gold} Gold
      </div>
      <div>
        {member.hp} HP
      </div>
      <div>
        {member.stamina} STAMINA
      </div>
      <div>
        {member.sanity} SANITY
      </div>
    </div>
    <div className='flex-wrap' style={{gap: '1em'}}>
      {children}
    </div>
  </div>
}