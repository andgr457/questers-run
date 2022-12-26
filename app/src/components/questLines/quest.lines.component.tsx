import { useCallback, useMemo, useState } from "react"
import { QuestLine } from "../../interfaces/quest.interfaces"

interface QuestLinesProperties {
  questLines: QuestLine[]
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
    const newQl: QuestLine = {
      id: 'TODO',
      description: '',
      title: ''
    }
    if(e.target.id === QUEST_LINE_IDS.newQuestLineName){
      newQl.title = e.target.value
    }
    if(e.target.id === QUEST_LINE_IDS.newQuestLineDescription){
      newQl.description = e.target.value
    }
    setNewQuestLine(newQl)
  }, [])

  const newQuestLineCard = useMemo(() => {
    const questLineTitle = (<div>
      Quest Line Name<br/>
      <input id={QUEST_LINE_IDS.newQuestLineName} type='text' placeholder="Enter name..." onChange={updateNewQuestLine}></input>
    </div>)
    const questLineDescription = (<div>
      Quest Line Description<br/>
      <input id={QUEST_LINE_IDS.newQuestLineDescription} type='text' placeholder="Enter description..." onChange={updateNewQuestLine}></input>
    </div>)
    return (
      <div className="card">
        {questLineTitle}
        {questLineDescription}
      </div>
    )
  }, [updateNewQuestLine])

  const questLineCards = useMemo(() => {
    const cards: any = []
    for(const questLine of props.questLines){
      
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
