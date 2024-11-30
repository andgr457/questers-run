import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useMemo, useState } from 'react'
import Clicker from "./components/clicker/Clicker"
import Classes from "./components/Classes"
import Credits from "./components/Credits"
import { Footer } from "./components/Footer"
import Home from "./components/Home"
import Mobs from "./components/Mobs"
import { NavMenu } from "./components/NavMenu"
import { Character } from './entity/character'
import Rogue from './components/rogue/Rogue'
import { Player } from './entity/player'
import { getPlayerNextLevelExp } from './entity/entity.service'

function App() {
  const [screen, setScreen] = useState('clicker')
  const [viewComonent, setViewComponent] = useState(<Home></Home>)

  const [player, setPlayer]: [Player, (player: Player) => void] = useState({
    exp: 0,
    gold: 0,
    inventory: {title: 'Player Inventory', items: [], maxItems: 10},
    level: 1,
    nextLevelExp: getPlayerNextLevelExp(undefined)
  })

  const [characters, setCharacters]: [Character[], (characters: Character[]) => void] = useState([])

  useEffect(() => {
    let comp

    if(screen === 'clicker'){
      comp = <Clicker setCharacters={setCharacters} setPlayer={setPlayer} player={player} characters={characters}></Clicker>
    } else if(screen === 'credits'){
      comp = <Credits></Credits>
    } else if(screen === 'classes'){
      comp = <Classes></Classes>
    } else if(screen === 'mobs'){
      comp = <Mobs></Mobs>
    } else if(screen === 'rogue') {
      comp = <Rogue></Rogue>
    } else {
      comp = <Home></Home>
    }
    setViewComponent(comp)
  }, [screen, player, characters, setPlayer, setCharacters])

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
    <NavMenu setScreen={setScreen} player={player}></NavMenu>
    {viewComonent}

    <Footer></Footer>
  </>
  }, [viewComonent, player])

  return view
}

export default App
