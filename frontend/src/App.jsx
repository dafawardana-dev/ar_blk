import { useState } from 'react'
import Sidebar from './layouts/sidebar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
         
        </Routes>
        </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
