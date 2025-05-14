import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SolarForm from './pages/SolarForm'
import WindForm from './pages/WindForm'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/solar' element={<SolarForm />} />
        <Route path='/wind' element={<WindForm />} />
      </Routes>
    </Router>
  )
}

export default App