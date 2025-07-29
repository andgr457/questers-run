import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useMemo, useState } from 'react'
import Clicker from "./app/components/clicker/Clicker"
import { Footer } from "./app/components/Footer"
import Header from './app/components/Header'

function App() {
  return <>
    <Header />
    <Clicker />
    <Footer />
  </>
}

export default App
