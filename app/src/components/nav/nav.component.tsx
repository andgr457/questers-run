import { useCallback, useMemo } from 'react'
import './nav.css'

interface NavProperties {
  changeView: any
  saveSelected: boolean
}

const NavComponent = (props: NavProperties) => {
  const navClicked = useCallback((e: any) => {
    const id = e.target.id
    props.changeView(id)
  }, [props])

  const nav = useMemo(() => {
    let viewButtons = [(
      <button id='nav_saves' onClick={navClicked}>Saves</button>
    )]
    if(props.saveSelected) {
      viewButtons.push((
        <button id='nav_dashboard' onClick={navClicked}>Dashboard</button>

      ))
      viewButtons.push((
        <button id='nav_characters' onClick={navClicked}>Characters</button>
      )) 
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
