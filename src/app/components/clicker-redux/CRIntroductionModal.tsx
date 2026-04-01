import { useState } from 'react';
import Modal, { ModalProps } from '../common/Modal';
import { AnimatedText } from '../common/AnimatedText';
import { RainbowJumpyText } from '../common/RainbowJumpyText';

interface IntroductionModalProps extends ModalProps {
  handleAcceptClicked: () => void
  handleSetGuildName: (guildName: string) => void
  handleSetGuildmasterName: (_guildmasterName: string) => void
  guildName: string
  guildmasterName: string
}

interface Slide {
  id: string
  title: React.ReactNode
  location: React.ReactNode
  description: React.ReactNode
  grouping: number
  actionButtons: SlideButton[]
  notification?: {
    text: string, 
    lifetime?: number
    icon?: string
    shown: boolean
  }
}

interface SlideButton {
  text: string
  onClick: any
  disabled?: boolean
}


export default function CRIntroductionModal(props: IntroductionModalProps) {
  const [slideIndex, setSlideIndex] = useState<number>(0)
  const [groupingIndex, setGroupingIndex] = useState<number>(0)

  const skipSectionButton = (sIndex: number, gIndex: number) => {
    return {
      text: 'Skip Section',
      onClick: () => {
        setSlideIndex(sIndex)
        setGroupingIndex(gIndex)
      }
    }
  }

  const skipIntroButton = () => {
    return {
      text: 'Skip Intro',
      onClick: () => {
        setSlideIndex(7)
        setGroupingIndex(2)
      }
    }
  }

  const INCREMENT_GROUPING_TRUE = true
  const NOT_DISABLED = false
  const continueButton = (groupingIncrement?: boolean, disabled?: boolean, text?: string) => {
    return {
      text: text ?? 'Continue',
      onClick: () => {
        setSlideIndex(slideIndex + 1)
        if(groupingIncrement === true){
          setGroupingIndex(groupingIndex + 1)
        }
      },
      disabled: disabled ?? false
    }
  }

  const slides: Slide[] = [
    // 0, 0
    {
      id: 'slide-1',
      title: <div>Quester's Run Introduction</div>,
      location: <div>Travelling to the Capitol City</div>,
      description: <AnimatedText>
        <div>
          <RainbowJumpyText>You</RainbowJumpyText> were once a name spoken with awe across the lands— 
          a seasoned adventurer who braved forgotten ruins, felled monstrous beasts, 
          and chased <RainbowJumpyText>glory</RainbowJumpyText> wherever it called.
        </div>
      </AnimatedText>,
      actionButtons: [
        continueButton(),
        skipSectionButton(3, 1),
        skipIntroButton()
      ],
      grouping: 0,
      notification: {
        text: 'You start your lifelong goal to create a great guild.',
        shown: false
      }
    },
    // 1, 0
    {
      id: 'slide-2',
      title: <div>Quester's Run Introduction</div>,
      location: <div>Travelling to the Capitol City</div>,
      description: <AnimatedText>
        <div>
          But time, as it always does, has <RainbowJumpyText>dulled</RainbowJumpyText> the edge of the blade.
          The road feels <RainbowJumpyText>longer</RainbowJumpyText>. The nights, <RainbowJumpyText>colder</RainbowJumpyText>. The rewards... less fulfilling.
        </div>
      </AnimatedText>,
      actionButtons: [
        continueButton(),
        skipSectionButton(3, 1),
        skipIntroButton()
      ],
      grouping: 0
    },
    // 2, 0
    {
      id: 'slide-3',
      title: <div>Quester's Run Introduction</div>,
      location: <div>Travelling to the Capitol City</div>,
      description: <AnimatedText>
        <div>
          Yet one truth remains: the world still needs <RainbowJumpyText>adventurers</RainbowJumpyText>.
        </div>
      </AnimatedText>,
      actionButtons: [
        continueButton(INCREMENT_GROUPING_TRUE),
        skipSectionButton(3, 1),
        skipIntroButton()
      ],
      grouping: 0
    },
    // 3, 1
    {
      id: 'slide-4',
      title: <div>Quester's Run Introduction</div>,
      location: <div>Travelling to the Capitol City</div>,
      description: <AnimatedText>
        <div>
          Not lone heroes chasing fleeting fame—
          but a <RainbowJumpyText>fellowship</RainbowJumpyText>. A guild. A place where strength is shared, knowledge is passed down, 
          no one rises alone, and <RainbowJumpyText>quests</RainbowJumpyText> are ran 
          for the benefit of all.
        </div>
      </AnimatedText>,
      actionButtons: [
        continueButton(),
        skipSectionButton(6, 2),
        skipIntroButton()
      ],
      grouping: 1
    },
    // 4, 1
    {
      id: 'slide-5',
      title: <div>Quester's Run Introduction</div>,
      location: <div>Travelling to the Capitol City</div>,
      description: <AnimatedText>
        <div>
          You've spent years gathering your <RainbowJumpyText>wealth</RainbowJumpyText>, not for comfort... but <RainbowJumpyText>for this moment</RainbowJumpyText>.
        </div>
      </AnimatedText>,
      actionButtons: [
        continueButton(),
        skipSectionButton(6, 2),
        skipIntroButton()
      ],
      grouping: 1
    },
    // 5, 1
    {
      id: 'slide-6',
      title: <div>Quester's Run Introduction</div>,
      location: <div>Travelling to the Capitol City</div>,
      description: <AnimatedText>
        <div>Today, you stop wandering. Today... you <RainbowJumpyText>build something</RainbowJumpyText> that lasts.</div>
      </AnimatedText>,
      actionButtons: [
        continueButton(INCREMENT_GROUPING_TRUE),
        skipSectionButton(6, 2),
        skipIntroButton()
      ],
      grouping: 1
    },
    // 6, 2
    {
      id: 'slide-7',
      title: <div>Quester's Run Introduction</div>,
      location: <div>Blackridge Streets</div>,
      description: <AnimatedText>
        <div>
          The day is young as you enter the bustling city of <RainbowJumpyText>Blackridge</RainbowJumpyText> and head to the <RainbowJumpyText>Guild Registry</RainbowJumpyText>. 
          <br/><br/>Once there, you look up at the sign and recall all of your <RainbowJumpyText>deeds</RainbowJumpyText> with party members throughout your history.
          <br/><br/><em>Now I can pay it forward.</em> You think as you enter the building.
        </div>
      </AnimatedText>,
      actionButtons: [
        continueButton(),
        skipSectionButton(7, 2),
        skipIntroButton()
      ],
      grouping: 2,
      notification: {
        lifetime: 10000,
        text: 'You discovered the City of Blackridge.',
        shown: false
      }
    },
    // 7, 2
    {
      id: 'slide-8',
      title: <div>Quester's Run Introduction</div>,
      location: <div>Blackridge Guild Registrar Office</div>,
      description: <AnimatedText>
        <div>
          <em>Registrar</em>: "Ah—another soul seeking to leave their mark.
          Welcome to the <RainbowJumpyText>Blackridge Guild Registry</RainbowJumpyText>. I am Seren Valthorne, the guild registrar.
          We don't often see veterans step forward to found something new... most prefer to fade quietly into legend."
          <br/><br/>
          <em>The Registrar adds:</em> "But you— you've chosen to <RainbowJumpyText>build</RainbowJumpyText>! 
          The cost to establish the guild is <RainbowJumpyText>15,000</RainbowJumpyText> gold. 
          I see you are ready to pay this."
        </div>
      </AnimatedText>,
      actionButtons: [
        continueButton(INCREMENT_GROUPING_TRUE, NOT_DISABLED, 'Pay 15,000 Gold'),
      ],
      grouping: 2
    },
    // 8, 3
    {
      id: 'slide-9',
      title: <div>Quester's Run Introduction - Guildmaster Name</div>,
      location: <div>Blackridge Guild Registrar Office</div>,
      description: <div>
        <AnimatedText>
            <em>Registrar</em>: "We are required to record your <RainbowJumpyText>name</RainbowJumpyText> as the guild master. 
            Please <RainbowJumpyText>sign</RainbowJumpyText> here..."
        </AnimatedText>
        <div>
          <input
            type='text'
            value={props.guildmasterName}
            onChange={(e) => {
              props.handleSetGuildmasterName(e.currentTarget.value)}
            }
            placeholder='Sign your name...'
            style={{width: '100%'}}
          >
          </input>
        </div>
          {props.guildmasterName && <div>
            Rank 1 Guild-Master {props.guildmasterName}  
          </div>}

      </div>,
      actionButtons: [
        continueButton(!INCREMENT_GROUPING_TRUE, !props.guildmasterName || props.guildmasterName?.trim()?.length === 0, 'Sign')
      ],
      grouping: 3
    },
    // 9, 3
    {
      id: 'slide-10',
      title: <div>Quester's Run Introduction - Guild Name</div>,
      location: <div>Blackridge Guild Registrar Office</div>,
      description: <div>
        <AnimatedText>
          <em>Registrar</em>: "Now, what will you name your <RainbowJumpyText>guild</RainbowJumpyText>?" 
        </AnimatedText>
        
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
        continueButton(INCREMENT_GROUPING_TRUE, !props.guildName || props.guildName?.trim()?.length === 0, 'Confirm')
      ],
      grouping: 3
    },
    // 10, 4
    {
      id: 'slide-11',
      title: <div>Quester's Run Introduction - Guild "{props.guildName}" Confirmation</div>,
      location: <div>Blackridge Guild Registrar Office</div>,
      description: <div>
        <AnimatedText>
          <em>Registrar</em>: "Now before I stamp these papers, make sure this information is correct." 
          <br/>
          <br/>
          Rank 1 Guildmaster <RainbowJumpyText>{props.guildmasterName}</RainbowJumpyText> of the <RainbowJumpyText>{props.guildName}</RainbowJumpyText> guild.
        </AnimatedText>
      </div>,
      actionButtons: [
        {
          text: 'Confirm',
          onClick: props.handleAcceptClicked,
        },
        {
          text: 'Back',
          onClick: () => {
            setSlideIndex(9)
            setGroupingIndex(3)
          },
        }
      ],
      grouping: 4
    },
  ]

  return <Modal
    backdropHides={false}
    isOpen={props.isOpen}
    onClose={props.onClose}
    title={<div>{slides[slideIndex].title}</div>}
    closeButton={props.closeButton}
  >
    <div className='clicker-modal-slides'>
      <div className='flex-wrap' style={{gap: '10px', fontSize: 'smaller'}}>
        <div className='click-modal-slides-location'>
          <em>{slides[slideIndex].location}</em> 
        </div>
        <div className='click-modal-slides-queststep'>
          Quest Step {slideIndex+1}/{slides.length}
        </div>
      </div>
      {slides.map((slide, index) => {
        
        if(index <= slideIndex && groupingIndex === slide.grouping){
          return <div key={`${slide.id}`} className='clicker-modal-slide-item'>
            <div key={`${slide.id}_description`}>{slide.description}</div>
            {index === slideIndex && <div className='flex-wrap' style={{gap: '1em', marginTop: '10px'}}>
              {slides[slideIndex].actionButtons.map(b => {
                return <div>
                  <button 
                    className='confirm'
                    onClick={b.onClick} 
                    hidden={b?.disabled} 
                    disabled={b?.disabled}
                  >
                    {b.text}
                  </button>
                </div>
              })}
            </div>}
          </div>
        }
          return null
      })}
    </div>
  </Modal>
}