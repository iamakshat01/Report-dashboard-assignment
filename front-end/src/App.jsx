import React from 'react'
import './App.css'
import MainComponent from './components/MainComponent'
import { DashboardContextProvider } from './context/DashboardContext'

function App() {
  
  return (
    <DashboardContextProvider>
      <MainComponent />
    </DashboardContextProvider>
  )

}

export default App
