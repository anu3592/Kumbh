import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './SupportScreens/Navbar';
import Home from './Screens/Home';
import Footer from './SupportScreens/Footer';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import SearchItemPage from './Screens/SearchItemPage';
import CheckOut from './Screens/CheckOut';
import ProductDesc from './Screens/ProductDesc';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/search' element={<SearchItemPage/>}/>
          <Route path='/check' element={<CheckOut/>}/>
          <Route path='desc' element={<ProductDesc/>}/>
        </Routes>
      </BrowserRouter>


      <Footer />
    </div>
  )
}

export default App
