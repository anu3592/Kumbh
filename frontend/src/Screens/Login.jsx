import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    
    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex flex-col w-[500px] justify-center items-center border-1 rounded-3xl shadow-2xl m-5 p-5">
                <h1 className="text-4xl text-orange-500 font-bold p-4 m-4">Login To Site</h1>
                <input placeholder="enter the email address..." type="email" className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2" ></input>
                <input type="password" placeholder="enter the password..." className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2"></input>
                <button className="border-none bg-blue-400 rounded-md text-white m-8 w-[100px] p-2" style={{backgroundColor: 'skyblue'}}>Login</button>
                <li className="list-none text-lg text-purple-500 cursor-pointer"><a>(Create account)</a></li>
            </div>
        </div>

    )
}

export default Login;