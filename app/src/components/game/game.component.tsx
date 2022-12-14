import { useCallback, useMemo, useState } from 'react'
import { Save } from '../../interfaces/game.interfaces'
import DashboardComponent from '../dashboard/dashboard.component'
import './game.css'
import SavesComponent from '../saves/saves.component'
import NavComponent from '../nav/nav.component'
import { addThing, getThings, updateThing } from '../../services/crud.service'
import CharactersComponent from '../character/characters.component'
import { Character } from '../../interfaces/character.interfaces'

const GameComponent = () => {
  const [title, setTitle] = useState('')
  const [view, setView] = useState('nav_saves')
  const [saves, setSaves]: [Save[], any] = useState([])
  const [characters, setCharacters]: [Character[], any] = useState([])
  const [selectedSave, setSelectedSave]: [string, any] = useState('')

  /** Saves */
  const addSave = useCallback((e: Save) => {
    const loadedSaves = addThing<Save>('saves', e)
    setSaves(loadedSaves)
  }, [])

  const updateCurrentSave = useCallback((e: Save) => {
    updateThing('saves', e)
  }, [])

  const changeSave = useCallback((e: string) => {
    setSelectedSave(e)
  }, [])

  /** Characters */
  const addCharacter = useCallback((e: Character) => {
    const loadedCharacters = addThing<Character>(`${selectedSave}_characters`, e)
    setCharacters(loadedCharacters)
  }, [selectedSave])

  /** Loading */
  useMemo(() => {
    const loadedSaves = getThings<Save>('saves') ?? []
    setSaves(loadedSaves)
    setView('nav_saves')
  }, [changeSave, setView, setSaves])

  useMemo(() => {
    /** Load Characters */
    setCharacters(getThings<Character>(`${selectedSave}_characters`))
    /** Load Quests */
    /** Load Zones */
  }, [selectedSave])

  const renderView = useMemo(() => {
    switch(view){
      case 'nav_saves': {
        setTitle('Game Saves')
        return (
          <SavesComponent saves={saves} setView={setView} setSelectedSave={changeSave} addNewSave={addSave}></SavesComponent>
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
          <CharactersComponent addCharacter={addCharacter} characters={characters}></CharactersComponent>
        )
      }
    }
  }, [
    view, 
    addSave, 
    saves, 
    changeSave,
    addCharacter,
    characters
  ])

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
