import { useState } from 'react';
import Modal, { ModalProps } from '../common/Modal';

interface NewGuildModalProps extends ModalProps {
  handleAcceptClicked: () => void
  handleSetGuildName: (guildName: string) => void
  guildName: string
}

export default function CRNewGuildModal(props: NewGuildModalProps) {
  const [slideIndex, setSlideIndex] = useState(0)
  const slides = [
    {
      title: <h1>Welcome</h1>,
      description: <div>You find yourself retired from adventure and decide to start a guild.</div>,
      actionButtons: [
        {
          text: 'Continue',
          onClick: () => {setSlideIndex(1)}
        }
      ]
    },
    {
      title: <h1>Guild Name</h1>,
      description: <div>
        <input
          type='text'
          value={props.guildName}
          onChange={(e) => {props.handleSetGuildName(e.currentTarget.value)}}
          placeholder='Enter guild name...'
          style={{width: '100%'}}
        >
        </input>
      </div>,
      actionButtons: [
        {
          text: 'Continue',
          onClick: props.handleAcceptClicked,
          disabled: !props.guildName || props.guildName?.trim()?.length === 0
        }
      ]
    },
  ]

  return <Modal
    backdropHides={false}
    isOpen={props.isOpen}
    onClose={props.onClose}
    title={slides[slideIndex].title}
  >
    <div className='clicker-modal-slide'>
      <div>
        {slides[slideIndex].description}
      </div>
      <div>
        {slides[slideIndex].actionButtons.map(b => {
          return <button onClick={b.onClick} hidden={b.disabled}>
            {b.text}
          </button>
        })}
      </div>
      <div>

      </div>
    </div>
  </Modal>
}