import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className='scroll-smooth' >
      <Outlet />
    </div>
  )
}

export default App
