import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MainContent from './components/mainContent'
import TopSellers from './components/TopSellers'


function App() {


  return (
    <BrowserRouter>
    <div className='flex h-screen'>
    <Sidebar />
    <div className='rounded w-full flex justify-between flex-wrap'>
      <Routes>
        <Route path="/" element={<MainContent />} />
      </Routes>

    </div>
    <TopSellers/>

    </div>

    </BrowserRouter>
  )
}

export default App
