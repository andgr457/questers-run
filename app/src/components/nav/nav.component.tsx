import { useCallback, useMemo } from 'react'
import './nav.css'

interface NavProperties {
  changeView: any
  saveSelected: boolean
  title: string
}

export const NavButtonNames: {[property: string]: {id: string, name: string}} = {
  Saves: {id: 'nav_saves', name: 'SAVES'},
  // ExportSave: {id: 'nav_export_save', name: 'EXPORT SAVE'},
  Tavern: {id: 'nav_tavern', name: 'TAVERN'},
  Characters: {id: 'nav_characters', name: 'CHARACTERS'},
  QuestLines: {id: 'nav_questlines', name: 'QUEST LINES'},
  Quests: {id: 'nav_quests', name: 'QUESTS'},
  Zones: {id: 'nav_zones', name: 'ZONES'}
}

const NavComponent = (props: NavProperties) => {
  const navClicked = useCallback((e: any) => {
    const id = e.target.id
    props.changeView(id)
  }, [props])

  const nav = useMemo(() => {
    let viewButtons = [(
      <>
      <button key={`${NavButtonNames.Saves.id}_nav_btn`} className='button nav' id={`${NavButtonNames.Saves.id}`} onClick={navClicked}>{NavButtonNames.Saves.name}</button>
      </>
    )]
    
    if(props.saveSelected) {
      for(const property of Object.getOwnPropertyNames(NavButtonNames)){
        if(property !== 'Saves' && property !== 'Music'){
          viewButtons.push((
            <>
              &nbsp;&nbsp;&nbsp;<button key={`${NavButtonNames[property].id}_nav_btn`} className='button nav' id={`${NavButtonNames[property].id}`} onClick={navClicked}>{NavButtonNames[property].name}</button>
            </>
          ))
        }
      }
    }
    return viewButtons
  }, [props.saveSelected, navClicked])

  const finalView = useMemo(() => {
    return (
      <>
      <div className='logoImg'>
        <img src='questers-run-logo.png' alt='Questers Run'></img>
      </div>
      <div className='logo'>
        Quester's Run
      </div>
      <div>
        {props.title.toUpperCase()}
      </div>
      <br/>
      <div className='nav'>
        {nav}
      </div>
      </>
    )
  }, [props.title, nav])

  return finalView
}

export default NavComponent
