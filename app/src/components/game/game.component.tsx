import { useCallback, useMemo, useState } from 'react'
import { Save } from '../../interfaces/game.interfaces'
import { addSave, getSaves } from '../../services/game/game.service'
import DashboardComponent from '../dashboard/dashboard.component'
import './game.css'
import SavesComponent from '../saves/saves.component'
const GameComponent = () => {
  const [view, setView] = useState('saves')
  const [saves, setSaves]: [Save[], any] = useState([])
  const [selectedSave, setSelectedSave] = useState(undefined)

  useMemo(() => {
    const loadedSaves = getSaves()
    setSaves(loadedSaves)
  }, [])

  const addNewSave = useCallback((e: Save) => {
    const loadedSaves = addSave(e)
    setSaves(loadedSaves)
  }, [])

  const renderView = useMemo(() => {
    switch(view){
      case 'saves': return (
        <SavesComponent saves={saves} setView={setView} setSelectedSave={setSelectedSave} addNewSave={addNewSave}></SavesComponent>
      )
      case 'dashboard': return (
        <DashboardComponent></DashboardComponent>
      )
    }
  }, [view, addNewSave, saves])

  return (
    <>
    <div className='savesContainer'>
      {renderView}
    </div>
    </>
  )
}

export default GameComponent
