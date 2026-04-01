import { useState } from 'react'
import CRMemberDetail from './CRMemberDetail'
import { CRGuild } from './interfaces/CRGuild'
import { CRMember } from './interfaces/CRMember'
import CRDonateGoldModal from './CRDonateGoldModal'

interface CRMembersProps {
  show: boolean
  guild: CRGuild
  members: CRMember[]
  handleAddGuildGold: (value: number, memberId: string) => void
}

export default function CRMembers(props: CRMembersProps) {
  const {
    show,
    guild,
    members,
    handleAddGuildGold,
  } = props

    
  const [donationAmount, setDonationAmount] = useState(0)
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [donationMember, setDonationMember] = useState(undefined)
  return <div hidden={!show} className='guild-manage-app'>
    <CRDonateGoldModal 
      backdropHides={true}
      guild={guild}
      member={donationMember}
      isOpen={showDonationModal}
      closeButton={true}
      onClose={() => {
        setDonationAmount(0)
        setShowDonationModal(false)
      }}
      title={`${guild.name} Gold Donation`}
      goldAmount={donationAmount}
      handleSetDonationAmount={setDonationAmount}
      onAccept={() => {
        handleAddGuildGold(donationAmount, donationMember.id)
        setShowDonationModal(false)
      }}
    >
      <></>
    </CRDonateGoldModal>

    <div className='guild-manage-app-title'>
      Guild Members ({members.length})
    </div>
    
    <div className='members-list'>
      {members.map((m, i) => {
        return <CRMemberDetail show={true} member={m} index={i}>
          <button disabled={m.gold <= 0} onClick={() => {
              setDonationMember(m)
              setDonationAmount(0)
              setShowDonationModal(true)
            }}>
            Donate Gold
          </button>
        </CRMemberDetail>
      })}
    </div>
  </div>
}