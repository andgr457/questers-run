import { useCallback, useMemo, useState } from 'react'
import { Save } from '../../interfaces/game.interfaces'
import './game.css'
import SavesComponent from '../saves/saves.component'
import NavComponent from '../nav/nav.component'
import { addThing, getThings } from '../../services/crud.service'
import CharactersComponent from '../character/characters.component'
import { Character } from '../../interfaces/character.interfaces'
import FooterComponent from '../footer/footer.component'
import QuestsComponent from '../quests/quests.component'
import TavernComponent from '../tavern/tavern.component'
import { Quest, QuestLine, QuestTimer } from '../../interfaces/quest.interfaces'
import QuestLinesComponent from '../questLines/quest.lines.component'
import { TutorialSave } from '../../defaults/game.defaults'
import { TutorialQuestLines } from '../../defaults/quests.defaults'

const GameComponent = () => {
  const [title, setTitle] = useState('')
  const [view, setView] = useState('nav_saves')
  const [saves, setSaves]: [Save[], any] = useState([])
  const [characters, setCharacters]: [Character[], any] = useState([])
  const [selectedSave, setSelectedSave]: [string, any] = useState('')
  const [quests, setQuests]: [Quest[], any] = useState([])
  const [questTimers, setQuestTimers]: [QuestTimer[], any] = useState([])
  const [questLines, setQuestLines]: [QuestLine[], any] = useState([])
  const [audio]: any = useState(new Audio("music/alexander-nakarada-medieval-chateau.mp3")); //this will prevent rendering errors on NextJS since NodeJs doesn't recognise HTML tags neither its libs.
  const [isPlaying, setIsPlaying] = useState(false)
  const [musicUrl, setMusicUrl] = useState('img/music/icons8-audio-24-disabled.png')
  
  useMemo(() => {
    addThing<Save>('saves', TutorialSave)
    for(const tutorialQuestLine of TutorialQuestLines){
      addThing<QuestLine>(`${TutorialSave.saveName}_questLines`, tutorialQuestLine)
    }
  }, [])

  /** Saves */
  const addSave = useCallback((e: Save) => {
    const loadedSaves = addThing<Save>('saves', e)
    setSaves(loadedSaves)
  }, [])

  // const updateCurrentSave = useCallback((e: Save) => {
  //   updateThing('saves', e)
  // }, [])

  const changeSave = useCallback((e: string) => {
    if(isPlaying){
      audio.play()
    }
    setSelectedSave(e)
  }, [isPlaying, audio])

  useMemo(() => {
    if(isPlaying){
      audio.loop = true
      audio.play()
    }else {
      audio.pause()
    }
  }, [isPlaying, audio])
  
  /** Loading */
  useMemo(() => {
    const loadedSaves = getThings<Save>('saves') ?? []
    setSaves(loadedSaves)
    setView('nav_saves')
  }, [setView, setSaves])

  useMemo(() => {
    /** Load Characters */
    setCharacters(getThings<Character>(`${selectedSave}_characters`))
    /** Load Quests */
    setQuests(getThings<Quest>(`${selectedSave}_quests`))
    setQuestTimers(getThings<QuestTimer>(`${selectedSave}_questTimers`))
    setQuestLines(getThings<QuestLine>(`${selectedSave}_questLines`))

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
      case 'nav_characters': {
        setTitle(`Characters [${selectedSave}]`)
        return(
          <CharactersComponent selectedSave={selectedSave} setCharacters={setCharacters} characters={characters}></CharactersComponent>
        )
      }
      case 'nav_quests': {
        setTitle(`Quests [${selectedSave}]`)
        return(
          <QuestsComponent characters={characters} quests={quests} questTimers={questTimers} questLines={questLines}></QuestsComponent>
        )
      }
      case 'nav_tavern': {
        setTitle(`Tavern [${selectedSave}]`)
        return (
          <TavernComponent></TavernComponent>
        )
      }
      case 'nav_questlines': {
        setTitle(`Quest Lines [${selectedSave}]`)
        return (
          <QuestLinesComponent selectedSave={selectedSave} setQuestLines={setQuestLines}  questLines={questLines}></QuestLinesComponent>
        )
      }
      // case 'nav_export_save': {
      //   setTitle(`Export Save [${selectedSave}]`)

      //   const save = saves.find(s => s.saveName === selectedSave)
      //   const data = {
      //     save: save,
      //     characters: characters
      //   }
      //   const url = window.URL.createObjectURL(
      //     new Blob([JSON.stringify(data)]),
      //   )
      //   const link = document.createElement('a')
      //   link.href = url
      //   link.setAttribute(
      //     'download',
      //     `${selectedSave}.json`,
      //   )
      //   document.body.appendChild(link)
      //   link.click()
      //   link.parentNode?.removeChild(link);
      //   return (
      //     <>
      //     <div className='card'>
      //       Save successfully exported!
      //     </div>
      //     </>
      //   )
      // }
    }
  }, [
    view, 
    addSave, 
    saves, 
    changeSave,
    characters,
    selectedSave,
    quests,
    questTimers,
    questLines,
    
  ])

  const toggleMusic = useCallback((e: any) => {
    setIsPlaying(!isPlaying)
    if(!isPlaying){
      setMusicUrl('img/music/icons8-audio-24.png')
    }else {
      setMusicUrl('img/music/icons8-audio-24-disabled.png')
    }
  }, [isPlaying])

  const fullView = useMemo(() => {
    return (
      <>
      <img src={musicUrl} alt='Enable/Disable Music' onClick={toggleMusic}></img>
      <NavComponent title={title} changeView={setView} saveSelected={selectedSave !== ''}></NavComponent>
      <div className='mainContainer'>
        {renderView}
      </div>
      <FooterComponent></FooterComponent>
      </>
    )
  }, [setView, renderView, selectedSave, title, musicUrl, toggleMusic])

  return fullView
}

export default GameComponent
