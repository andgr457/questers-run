import Modal, { ModalProps } from '../common/Modal'
import { RainbowJumpyText } from '../common/RainbowJumpyText'
import { CRGuild } from './interfaces/CRGuild'
import { CRMember } from './interfaces/CRMember'

interface CRDonateGoldModalProps extends ModalProps {
  guild: CRGuild
  member: CRMember
  goldAmount: number
  handleSetDonationAmount: (value: number) => void
  onAccept: () => void
}

export default function CRDonateGoldModal(props: CRDonateGoldModalProps){
  const {
    guild,
    member,
    goldAmount,
    handleSetDonationAmount,
    onAccept
  } = props

  return <Modal
    backdropHides={props.backdropHides}
    isOpen={props.isOpen}
    onClose={props.onClose}
    title={<div>Guild Gold Donation</div>}
    closeButton={props.closeButton}
  >
    <div>
      <div>
        How much <RainbowJumpyText>gold</RainbowJumpyText> would <RainbowJumpyText>{member?.name}</RainbowJumpyText> like to donate to the <RainbowJumpyText>{guild?.name}</RainbowJumpyText> guild?
      </div>
      <div>
        <input 
          type='text'
          placeholder='Enter amount...'
          value={goldAmount}
          onChange={(e) => {
            const value = +e.currentTarget.value
            if(Number.isNaN(value)){
              return
            }
            if(value > member?.gold){
              handleSetDonationAmount(member?.gold)
            } else {
              handleSetDonationAmount(value)
            }
          }}
        />
        <div className=''>
          &nbsp;Max {member?.gold?.toLocaleString()}
        </div>
      </div>
      <div>
        <button onClick={() => {
          if(goldAmount <= 0) return
          onAccept()
        }}>
          Confirm
        </button>
      </div>
    </div>
  </Modal>
}