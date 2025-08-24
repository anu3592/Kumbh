import React, { useEffect, useState } from "react";
import kumbhLogo from "../assets/images/kumbh.jpg";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { passCart, showStatus } from "../actions";
import { Link, Navigate, useNavigate } from "react-router";
import Spinner from "./Spinner";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.changeStatus);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  //const [loading, setLoading] = useState(true);
  const [tmp, setTmp] = useState(true);
  let isLoggedIn = localStorage.getItem("user");

  useEffect(() => {
    checkIsAdmin();
    //setLoading(false);
  }, []);

  const checkIsAdmin = () => {
    if (localStorage.getItem("admin")) {
      console.log("true");
      setIsAdmin(true);
    } else {
      console.log("false");
    }
  };

  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("search");
    //navigate('/');
    setTimeout(() => {
      navigate("/");
      //window.location.reload();
    }, 150);
  };

  /* const searchItem = (e) => {
    //e.preventDefault();
    console.log("clicked");

    if (search.length != 0) {
      localStorage.setItem("search", search);
      navigate("/search");
    }
  };

  const cartFunctioning = async () => {
    dispatch(showStatus());

    isLoggedIn = JSON.parse(isLoggedIn);

    let loggedInEmail = isLoggedIn.email;
    let result = await fetch(`http://localhost:5000/cart/${isLoggedIn.email}`, {
      method: "GET",
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    dispatch(passCart(result));
  };

  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between items-center  py-8 bg-[#CD853F]  shadow-lg lg:h-[12%] md:h-[8%] sm:h-[8%] overflow-hidden">
      <div className="flex items-center gap-3 cursor-pointer">
        <img
          src={kumbhLogo}
          alt="Kumbh Logo"
          className="websitLogo rounded-lg lg:w-12 lg:h-12 md:w-10 md:h-10 w-8 h-8"
        />
        <h2
          id="siteName"
          className="text-white text-xl font-semibold text-[#FFF] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Kumbh
        </h2>
      </div>

      <div className="flex flex-row mr-10 ml-20">
        <form className="flex items-center gap-2">
          <input
            type="text"
            className="bg-white p-2 h-[40px] w-[350px] rounded-lg text-sm text-[black]"
            placeholder="search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            id="searchBtn"
            className="text-[#CD853F] m-1 px-4 py-1 rounded-md bg-white hover:bg-gray-900 hover:text-black transition duration-200"
            style={{ backgroundColor: "white" }}
            onClick={(e) => searchItem(e)}
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex flex-row">
        <FaShoppingCart
          size={25}
          className="mr-2 cursor-pointer"
          onClick={() => cartFunctioning()}
        />
        <PiDotsThreeOutlineVerticalFill
          size={25}
          className="ml-2 mr-3 cursor-pointer"
          onClick={() => {
            setClicked(!clicked);
          }}
        />
      </div>
      {clicked ? (
        <div
          className="bg-black/60 fixed w-full h-screen smallSize z-20 top-0 left-0"
          onClick={() => setClicked(!clicked)}
        ></div>
      ) : (
        <></>
      )}
      <div
        className={
          clicked
            ? "fixed top-0 right-0 w-[300px] h-screen smallSize bg-white z-20 duration-200"
            : "fixed top-0 right-[-100%] w-[300px] h-screen bg-white z-10 duration-200"
        }
      >
        <nav>
          <h1
            id="siteName"
            className="text-xl font-bold text-[#FFD700] cursive shadow-lg"
          >
            Kumbh
          </h1>
          <ul className="flex flex-col text-xl justify-center items-center">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <li
                    id="logout"
                    className="font-bold m-3 p-2 text-black cursor-pointer font-sans rounded-lg styleButton"
                    onClick={() => navigate("/dash")}
                  >
                    Go To Dashboard
                  </li>
                )}
                <li
                  id="logout"
                  className="font-bold m-3 p-2 text-black cursor-pointer font-sans rounded-lg styleButton"
                  onClick={() => logout()}
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <Link to="/login">
                  <li
                    id="login"
                    className="font-bold m-3 p-2 text-black cursor-pointer font-sans rounded-lg styleButton"
                    onClick={() => setClicked(!clicked)}
                  >
                    Login
                  </li>
                </Link>
                <Link to="/signup">
                  <li
                    id="signup"
                    className="font-bold m-3 p-2 text-black cursor-pointer font-sans rounded-lg styleButton"
                    onClick={() => setClicked(!clicked)}
                  >
                    Sign Up
                  </li>
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>

      {cartState ? <Cart /> : <></>}
    </nav>
  );
};

*/

    const searchItem = (e) => {
        //e.preventDefault();
        console.log("clicked");

    if (search.length != 0) {
      localStorage.setItem("search", search);
      navigate("/search");
    }
  };

  const cartFunctioning = async () => {
    dispatch(showStatus());

    isLoggedIn = JSON.parse(isLoggedIn);

    let loggedInEmail = isLoggedIn.email;
    let result = await fetch(`http://localhost:5000/cart/${isLoggedIn.email}`, {
      method: "GET",
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    dispatch(passCart(result));
  };

  return (
    <nav className="top-0 left-0 w-full flex justify-between items-center px-4 py-4 bg-[#CD853F] shadow-lg z-50">
      <div className="flex items-center gap-0 cursor-pointer">
        <img
          src={kumbhLogo}
          alt="Kumbh Logo"
          className="websitLogo rounded-lg lg:w-12 lg:h-12 md:w-10 md:h-10 w-8 h-8 mr-2"
        />
        <h2
          id="siteName"
          className="text-white text-xl font-semibold text-[#FFF] cursor-pointer mr-6"
          onClick={() => navigate("/")}
        >
          Kumbh
        </h2>
      </div>

      <div className="flex flex-row sm:ml-20 sm:mr-10 ml-3 mr-1">
        <form className="flex items-center gap-2" onSubmit={searchItem}>
          <input
            type="text"
            className="bg-white p-2 h-[40px] w-full sm:w-[350px] rounded-lg text-sm text-black"
            placeholder="search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            id="searchBtn"
            className="text-[#CD853F] m-1 p-2 rounded-md bg-white hover:text-[#fff] transition duration-200"
          >
            Search
          </button>
        </form>
      </div>
      <div className="flex flex-row">
        <FaShoppingCart
          size={25}
          className="mr-2 cursor-pointer"
          onClick={() => cartFunctioning()}
        />
        <PiDotsThreeOutlineVerticalFill
          size={25}
          className="ml-2 mr-3 cursor-pointer"
          onClick={() => {
            setClicked(!clicked);
          }}
        />
      </div>
      {clicked ? (
        <div
          className="bg-black/60 fixed w-full h-screen smallSize z-20 top-0 left-0"
          onClick={() => setClicked(!clicked)}
        ></div>
      ) : (
        <></>
      )}
      <div
        className={
          clicked
            ? "fixed top-0 right-0 w-[300px] h-screen smallSize bg-white z-20 duration-200"
            : "fixed top-0 right-[-100%] w-[300px] h-screen bg-white z-10 duration-200"
        }
      >
        <nav>
          <h1
            id="siteName"
            className="text-xl font-bold text-[#FFD700] cursive shadow-lg"
          >
            Kumbh
          </h1>
          <ul className="flex flex-col text-xl justify-center items-center">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <li
                    id="logout"
                    className="font-bold m-3 p-2 text-black cursor-pointer font-sans rounded-lg styleButton"
                    onClick={() => navigate("/dash")}
                  >
                    Go To Dashboard
                  </li>
                )}
                <li
                  id="logout"
                  className="font-bold m-3 p-2 text-black cursor-pointer font-sans rounded-lg styleButton"
                  onClick={() => logout()}
                >
                  Logout
                </li>
                {!isAdmin && (
                  <li
                    id="orders"
                    className="font-bold m-3 p-2 text-amber-700 cursor-pointer font-sans rounded-lg headStyle"
                    onClick={() => navigate("/track")}
                  >
                    My Orders
                  </li>
                )}
              </>
            ) : (
              <>
                <Link to="/login">
                  <li
                    id="login"
                    className="font-bold m-3 p-2 text-black cursor-pointer font-sans rounded-lg styleButton"
                    onClick={() => setClicked(!clicked)}
                  >
                    Login
                  </li>
                </Link>
                <Link to="/signup">
                  <li
                    id="signup"
                    className="font-bold m-3 p-2 text-black cursor-pointer font-sans rounded-lg styleButton"
                    onClick={() => setClicked(!clicked)}
                  >
                    Sign Up
                  </li>
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>

      {cartState ? <Cart /> : <></>}
    </nav>
  );
};
export default Navbar;
