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
import PlayerComponent from "./components/PlayerComponent"
import { Character } from './entity/character'
import { PlayerClass } from './entity/player'

function App() {
  const [screen, setScreen] = useState('clicker')
  const [viewComonent, setViewComponent] = useState(<Home></Home>)
  const [player, setPlayer]: [PlayerClass, (player: PlayerClass) => void] = useState(new PlayerClass())
  const [characters, setCharacters]: [Character[], (characters: Character[]) => void] = useState([])

  useEffect(() => {
    let comp
    console.log('screen', screen)

    if(screen === 'clicker'){
      comp = <Clicker setCharacters={setCharacters} setPlayer={setPlayer} player={player} characters={characters}></Clicker>
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
