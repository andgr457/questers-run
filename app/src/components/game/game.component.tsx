import { useMemo, useState } from 'react'
import './game.css'
import SavesComponent from './saves.component'
const GameComponent = () => {
  const [view, setView] = useState('saves')
  const [saves, setSaves] = useState([])
  const [selectedSave, setSelectedSave] = useState(undefined)

  const renderView = useMemo(() => {
    switch(view){
      case 'saves': return (
        <SavesComponent saves={saves} setSelectedSave={setSelectedSave}></SavesComponent>
      )
    }
  }, [view, selectedSave])

  return (
    <>
    {renderView}
    </>
  )
}

export default GameComponent
