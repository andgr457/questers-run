import { ToastContainer } from "react-toastify"
import { NavMenu } from "./NavMenu"
import 'react-toastify/dist/ReactToastify.css'
import Characters from './Characters'
import { Footer } from './Footer'
import { useEffect, useMemo, useState } from 'react'
import Home from './Home'
import Credits from './Credits'
import Classes from './Classes'
import Mobs from './Mobs'
import { Character, Player } from './entity/entity.interface'
import { determinePlayerNextLevelExp } from './entity/entity.service'
import PlayerComponent from './PlayerComponent'

function App() {
  const [screen, setScreen] = useState('characters')
  const [viewComonent, setViewComponent] = useState(<Home></Home>)
  const [player, setPlayer]: [Player, (player: Player) => void] = useState({exp: 0, level: 1, nextLevelExp: determinePlayerNextLevelExp(1)})
  const [characters, setCharacters]: [Character[], (characters: Character[]) => void] = useState([])

  useEffect(() => {
    let comp
    console.log('screen', screen)

    if(screen === 'characters'){
      comp = <Characters setCharacters={setCharacters} setPlayer={setPlayer} player={player} characters={characters}></Characters>
    } else if(screen === 'credits'){
      comp = <Credits></Credits>
    } else if(screen === 'classes'){
      comp = <Classes></Classes>
    } else if(screen === 'mobs'){
      comp = <Mobs></Mobs>
    } else {
      comp = <Home></Home>
    }
    setViewComponent(comp)
  }, [screen, player, characters])

  const view = useMemo(() => {
    return     <>
    <ToastContainer
      position="bottom-center"
      autoClose={1000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
    <NavMenu setScreen={setScreen}></NavMenu>
    <PlayerComponent player={player}></PlayerComponent>
    {viewComonent}

    <Footer></Footer>
  </>
  }, [viewComonent, player])

  return view
}

export default App
