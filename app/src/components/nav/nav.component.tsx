import { useCallback, useMemo } from 'react'
import './nav.css'

interface NavProperties {
  changeView: any
  saveSelected: boolean
}

export const NavButtonNames: {[property: string]: {id: string, name: string}} = {
  Saves: {id: 'nav_saves', name: 'Saves'},
  Dashboard: {id: 'nav_dashboard', name: 'Dashboard'},
  Characters: {id: 'nav_characters', name: 'Characters'},
  Quests: {id: 'nav_quests', name: 'Quests'},
  Zones: {id: 'nav_zones', name: 'Zones'},

}

const NavComponent = (props: NavProperties) => {
  const navClicked = useCallback((e: any) => {
    const id = e.target.id
    props.changeView(id)
  }, [props])

  const nav = useMemo(() => {
    let viewButtons = [(
      <button id={NavButtonNames.Saves.id} onClick={navClicked}>{NavButtonNames.Saves.name}</button>
    )]
    
    if(props.saveSelected) {
      for(const property of Object.getOwnPropertyNames(NavButtonNames)){
        if(property !== 'Saves'){
          viewButtons.push((
            <button id={NavButtonNames[property].id} onClick={navClicked}>{NavButtonNames[property].name}</button>
          ))
        }
      }
    }
    return viewButtons
  }, [props.saveSelected, navClicked])

  return (
    <>
    {nav}
    </>
  )
}

export default NavComponent
