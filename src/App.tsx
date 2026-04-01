import 'react-toastify/dist/ReactToastify.css'
import Clicker from "./app/components/clicker/Clicker"
import { Footer } from "./app/components/Footer"
import Header from './app/components/Header'
import ClickerRedux from './app/components/clicker-redux/ClickerRedux'
import { ConfirmProvider } from './app/providers/ConfirmProvider'

function App() {
  return <>
    <ConfirmProvider>
      <ClickerRedux />
    </ConfirmProvider>
  </>
}

export default App
