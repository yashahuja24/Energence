import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SolarFormPage from './pages/SolarForm'
import WindFormPage from './pages/WindForm'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/solar' element={<SolarFormPage />} />
        <Route path='/wind' element={<WindFormPage />} />
      </Routes>
    </Router>
  )
}

export default App