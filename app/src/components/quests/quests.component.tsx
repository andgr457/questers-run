import { useMemo, useState } from "react"
import { Quest, QuestLine, QuestTimer } from '../../interfaces/quest.interfaces'
import { Character } from '../../interfaces/character.interfaces'

interface QuestsProperties {
  quests: Quest[]
  characters: Character[]
  questTimers: QuestTimer[]
  questLines: QuestLine[]
}

const QUEST_IDS = {
  newQuestName: 'id',
  newQuestDescription: 'description',
  newQuestLevel: 'levelRequirement',
  newQuestMobProbability: 'mobProbability',
  newQuestQuestLine: 'questLineId'
}

const QUEST_LINE_IDS = {

}

const QuestsComponent = (props: QuestsProperties) => {
  const [newQuest, setNewQuest]: [Quest, any] = useState({
    id: '',
    questLineId: '',
    description: '',
    levelRequirement: 0,
    mobPropbability: 0,
    mobs: [],
    rewards: [],
    timeLengthDays: 0,
    timeLengthHours: 0,
    timeLengthMinutes: 1,
    title: '',
    prerequisiteQuestId: undefined
  })

  const [newQuestLine, setNewQuestLine]: [QuestLine, any] = useState({
    id: '',
    description: '',
    questIds: [],
    title: ''
  })

  const questCards = useMemo(() => {
    if(props.quests.length === 0 || props.characters.length === 0){
      return (
        <>
        There are no quests [{props.quests.length}] or characters [{props.characters.length}]...
        </>
      )
    }

    const cards: any = []

    return cards
  }, [props.quests, props.characters])

  const newQuestLineCard = useMemo(() => {
    return (
      <div>

      </div>
    )
  }, [])

  const newQuestCard = useMemo(() => {
    const questName = (<div>
      Quest Name<br></br>
      <input type='text' id={QUEST_IDS.newQuestName} placeholder="Enter quest name..."></input>
    </div>)
    const questDescription = (<div>
      Quest Description<br></br>
      <input type='text' id={QUEST_IDS.newQuestDescription} placeholder="Enter quest description..."></input>
    </div>)
    const requiredLevel = (<div>
      Required Level<br></br>
      <input type='number' id={QUEST_IDS.newQuestLevel} placeholder="Enter required level"></input>
    </div>)
    const mobPropbability = (<div>
      Mob Probability (0-100) <br></br>
      <input type='number' id={QUEST_IDS.newQuestMobProbability} placeholder="Enter probability 0-100"></input>
    </div>)
    const questLineOptions = []
    for(const questLine of props.questLines){
      questLineOptions.push(
        <option id={questLine.title} key={questLine.id}>{questLine.title}</option>
      )
    }
    const questLine = (<div>
      Select Quest Line<br/>
      <select id='newQuestQuestLine'>
        {questLineOptions}
      </select>
    </div>)
    return (
      <div>
        {questLine}
        {questName}
        {questDescription}
        {requiredLevel}
        {mobPropbability}
      </div>
    )
  }, [props.questLines])

  return(
    <>
    <div className="card">
      <h2>New Quest Line</h2>

      <h2>New Quest</h2>
      {newQuestCard}
      <hr></hr>
      {questCards}
    </div>
    </>
  )

}

export default QuestsComponent
