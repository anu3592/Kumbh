import React, { useState } from "react";
import kumbhLogo from '../assets/images/kumbh.jpg';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { showStatus } from "../actions";
import { Link, Navigate, useNavigate } from "react-router";

const Navbar = () => {
    const [clicked, setClicked] = useState(false);
    const [cartClicked, setCartClicked] = useState(false);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.changeStatus);
    const navigate = useNavigate();
    let isLoggedIn = localStorage.getItem('user');

    const logout = () =>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/');
    }

    const searchItem = (e)=>{
        //e.preventDefault();
        console.log("clicked");

        if(search.length!=0)
        {
            localStorage.setItem('search',search);
            navigate("/search");
        }

    }

    return (
        <nav className="absolute flex flex-row min-w-full justify-between items-center p-1  bg-[#CD853F] top-0 left-2 lg:h-[12%] md:h-[8%] sm:h-[8%] rounded-lg shadow-lg">
            <div className="flex flex-row w-[30%] m-2 cursor-pointer items-center">
                <img src={kumbhLogo} className="lg:w-12 lg:h-12 md:w-8 md:h-8 w-5 h-5 rounded-lg m-2 " />
                <h2 id="siteName" className=" m-2 items-center text-[#FFD700] cursor-pointer" onClick={() => navigate("/")}>Kumbh</h2>
            </div>

            <div className="flex flex-row mr-10">
                <form>
                <input type="text" className="bg-white mt-2 ml-2 mb-2  p-2 lg:h-[40px] h-[30px] rounded-lg" placeholder="search..." onChange={(e)=>setSearch(e.target.value)}/>
                <button type="submit" id="searchBtn" className="text-white m-1" style={{ backgroundColor: "lightgreen" }} onClick={(e)=>searchItem(e)}>Search</button>
                </form>
            </div>
            <div className="flex flex-row">
                <FaShoppingCart size={25} className="mr-2 cursor-pointer" onClick={() => dispatch(showStatus())} />
                <PiDotsThreeOutlineVerticalFill size={25} className="ml-2 mr-3 cursor-pointer" onClick={() => { setClicked(!clicked) }} />
            </div>
            {
                clicked ? <div className="bg-black/60 fixed w-full h-screen smallSize z-20 top-0 left-0" onClick={() => setClicked(!clicked)}></div> : <></>
            }
            <div className={clicked ? "fixed top-0 right-0 w-[300px] h-screen smallSize bg-white z-20 duration-200" :
                "fixed top-0 right-[-100%] w-[300px] h-screen bg-white z-10 duration-200"}>
                <nav>
                    <h1 id="siteName" className="text-xl font-bold text-[#FFD700] cursive shadow-lg">Kumbh</h1>
                    <ul className="flex flex-col text-xl justify-center items-center">
                        {
                            isLoggedIn ?
                                <>
                                    <li id="logout" className="font-bold m-3 p-2 text-black cursor-pointer font-sans rounded-lg styleButton" onClick={()=>logout()}>Logout</li>
                                </> :
                                <>
                                    <Link to="/login"><li id="login" className="font-bold m-3 p-2 text-black cursor-pointer font-sans rounded-lg styleButton" onClick={() => setClicked(!clicked)}>Login</li></Link>
                                    <Link to="/signup"><li id="signup" className="font-bold m-3 p-2 text-black cursor-pointer font-sans rounded-lg styleButton" onClick={() => setClicked(!clicked)}>Sign Up</li></Link>
                                </>
                        }

                    </ul>
                </nav>
            </div>

            {
                cartState ? <Cart /> : <></>
            }
        </nav>



    );
}

export default Navbar;