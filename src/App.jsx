import React from 'react'
import Home from './pages/Home'
import Sensors from './pages/Sensors'
import Profile from './pages/Profile'
import { Route, Routes} from 'react-router-dom'

function App()
{
  return (
    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='/sensors/:id?' element={<Sensors />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='*' />
    </Routes >
  )
}

export default App
