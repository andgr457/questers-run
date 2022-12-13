import { useCallback, useMemo, useState } from 'react'
import { Save } from '../../interfaces/game.interfaces'
import DashboardComponent from '../dashboard/dashboard.component'
import './game.css'
import SavesComponent from '../saves/saves.component'
import NavComponent from '../nav/nav.component'
import { addThing, getThings, updateThing } from '../../services/crud.service'
import CharactersComponent from '../character/characters.component'
import { Character } from '../../interfaces/character.interfaces'
import { DateTime } from 'luxon'

const GameComponent = () => {
  const [title, setTitle] = useState('')
  const [view, setView] = useState('nav_saves')
  const [saves, setSaves]: [Save[], any] = useState([])
  const [characters, setCharacters]: [Character[], any] = useState([])
  const [selectedSave, setSelectedSave]: [string, any] = useState('')

  /** Saves */
  const addNewSave = useCallback((e: Save) => {
    const loadedSaves = addThing('saves', e)
    setSaves(loadedSaves)
  }, [])

  const updateCurrentSave = useCallback((e: Save) => {
    updateThing('saves', e)
  }, [])

  const changeSave = useCallback((e: string) => {
    setSelectedSave(e)
  }, [])

  /** Characters */

  /** Loading */
  useMemo(() => {
    const loadedSaves = getThings<Save>('saves') ?? []
    setSaves(loadedSaves)
    if(loadedSaves.length === 0){
      setView('nav_saves')
      return
    }
    if(loadedSaves.length === 1){
      changeSave(loadedSaves[0].saveName)
      setView('nav_dashboard')
      return
    }
    if(loadedSaves.length > 1){
      let newestSaveName = ''
      for(const save of loadedSaves){
        if(newestSaveName === ''){
          newestSaveName = save.saveName
          console.log(newestSaveName)
          continue
        } 
        const saveDate = DateTime.fromISO(save.lastSave)
        if(DateTime.fromISO(newestSaveName) > saveDate){
          newestSaveName = save.saveName
        }
      }
      changeSave(newestSaveName)
      setView('nav_dashboard')
    }
  }, [changeSave, setView, setSaves])

  const renderView = useMemo(() => {
    switch(view){
      case 'nav_saves': {
        setTitle('Game Saves')
        return (
          <SavesComponent saves={saves} setView={setView} setSelectedSave={changeSave} addNewSave={addNewSave}></SavesComponent>
        )
      }
      case 'nav_dashboard': {
        setTitle(`Dashboard [${selectedSave}]`)
        return (
          <DashboardComponent></DashboardComponent>
        )
      }
      case 'nav_characters': {
        setTitle(`Characters [${selectedSave}]`)
        return(
          <CharactersComponent addCharacter={undefined} characters={[]}></CharactersComponent>
        )
      }
    }
  }, [view, addNewSave, saves, changeSave])

  const fullView = useMemo(() => {
    return (
      <>
      <div className='navContainer'>
        <NavComponent changeView={setView} saveSelected={selectedSave !== ''}></NavComponent>
      </div>
      <div className='titleContainer'>
        {title}
      </div>
      <div className='mainContainer'>
        {renderView}
      </div>
      </>
    )
  }, [setView, renderView, selectedSave, title])

  return fullView
}

export default GameComponent
