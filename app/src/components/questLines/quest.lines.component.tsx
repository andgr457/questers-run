import { DateTime } from "luxon"
import { useCallback, useMemo, useState } from "react"
import { QuestLine } from "../../interfaces/quest.interfaces"
import { addThing } from "../../services/crud.service"

interface QuestLinesProperties {
  selectedSave: string
  questLines: QuestLine[]
  setQuestLines: any
}

const QUEST_LINE_IDS = {
  newQuestLineId: 'id',
  newQuestLineDescription: 'description',
  newQuestLineName: 'title'
}

const QuestLinesComponent = (props: QuestLinesProperties) => {
  const [newQuestLine, setNewQuestLine]: [QuestLine, any] = useState({
    id: '',
    description: '',
    title: ''
  })

  const updateNewQuestLine = useCallback((e: any) => {
    const ql = {
      ...newQuestLine,
      id: `${newQuestLine.title}_${DateTime.utc().toMillis()}`
    }
    if(e.target.id === QUEST_LINE_IDS.newQuestLineName){
      ql.title = e.target.value
    }
    if(e.target.id === QUEST_LINE_IDS.newQuestLineDescription){
      ql.description = e.target.value
    }
    setNewQuestLine(ql)
  }, [newQuestLine])

  const saveQuestLineButtonClicked = useCallback((e: any) => {
    if(newQuestLine.title.trim() === '' || newQuestLine.description.trim() === '') return
    const loadedQuestLines = addThing<QuestLine>(`${props.selectedSave}_questLines`, newQuestLine)
    props.setQuestLines(loadedQuestLines)
  }, [newQuestLine, props])

  const newQuestLineCard = useMemo(() => {
    const questLineTitle = (<div>
      Quest Line Name<br/>
      <input id={QUEST_LINE_IDS.newQuestLineName} type='text' placeholder="Enter name..." onChange={updateNewQuestLine} value={newQuestLine.title}></input>
    </div>)
    const questLineDescription = (<div>
      Quest Line Description<br/>
      <input id={QUEST_LINE_IDS.newQuestLineDescription} type='text' placeholder="Enter description..." onChange={updateNewQuestLine} value={newQuestLine.description}></input>
    </div>)
    const saveQuestLineButton = (<div>
      <br/>
      <button id='saveQuestLine' onClick={saveQuestLineButtonClicked}>Save</button>
    </div>)
    return (
      <div className="card">
        {questLineTitle}
        {questLineDescription}
        {saveQuestLineButton}
      </div>
    )
  }, [updateNewQuestLine, saveQuestLineButtonClicked, newQuestLine])

  const questLineCards = useMemo(() => {
    if(props.questLines.length === 0){
      return (
        <>
        There are no quest lines, please create one...
        </>
      )
    }

    const cards: any[] = []
    for(const questLine of props.questLines){
      cards.push(<>
        <div className='card'>
          <strong>{questLine.title}</strong><br></br>
          <div>{questLine.description}</div>
        </div>
      </>)
    }

    return cards
  }, [props.questLines])


  return (
    <>
    <div className="card">
      <h2>New Quest Line</h2>
      {newQuestLineCard}
      <hr></hr>
      {questLineCards}
    </div>
    </>
  )
}

export default QuestLinesComponent
