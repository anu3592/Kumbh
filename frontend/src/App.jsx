
//<<<<<<< HEAD



import { useEffect, useState } from 'react'
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
import Cart from './SupportScreens/Cart';
import AddProduct from './Admin/AddProduct';
import Dash from './Admin/Dash';
import UpdateProduct from './Admin/UpdateProduct';
import PopupExample from './Admin/PopupExample';
import Tracking from './Screens/Tracking';
import PopupAddress from './Admin/PopupAddress';

/*
=======
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./SupportScreens/Navbar";
import Home from "./Screens/Home";
import Footer from "./SupportScreens/Footer";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import SearchItemPage from "./Screens/SearchItemPage";
import CheckOut from "./Screens/CheckOut";
import ProductDesc from "./Screens/ProductDesc";
import Cart from "./SupportScreens/Cart";
import AddProduct from "./Admin/AddProduct";
import Dash from "./Admin/Dash";
import UpdateProduct from "./Admin/UpdateProduct";
import PopupExample from "./Admin/PopupExample";
>>>>>>> c0f8380e2d80d69968373a6fe1f88bd2623fa3b3
*/

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>

{/*<<<<<<< HEAD*/}

          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/search' element={<SearchItemPage />} />
          <Route path='/check' element={<CheckOut />} />
          <Route path='desc' element={<ProductDesc />} />
          <Route path='/add' element={<AddProduct/>}/>
          <Route path='/dash' element={<Dash/>}/>
          <Route path='/update/:id' element={<UpdateProduct/>}/>
          <Route path='/popup/:id' element={<PopupExample/>}/>
          <Route path='/popupAddress' element={<PopupAddress/>}/>
          <Route path='/track' element={<Tracking/>}/>

          {/*
=======
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<SearchItemPage />} />
          <Route path="/check" element={<CheckOut />} />
          <Route path="desc" element={<ProductDesc />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/dash" element={<Dash />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/popup/:id" element={<PopupExample />} />
>>>>>>> c0f8380e2d80d69968373a6fe1f88bd2623fa3b3
*/}

        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
