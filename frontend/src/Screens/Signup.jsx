import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

const Signup = ()=>{
    
    return (
        <div>
            <div className="flex w-full justify-center items-center">
        <div className="flex flex-col w-[500px] justify-center items-center border-1 rounded-3xl shadow-2xl m-5 p-5">
            <h1 className="text-4xl text-orange-500 font-bold p-4 m-4">Sign Up</h1>
            <input placeholder="enter your name..." className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2" ></input>
            <input placeholder="enter the email address..." type = "email" className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2" ></input>
            <textarea placeholder="Enter your address..." className="border-2 rounded-md p-2" rows='4' cols='50'></textarea>
            <input placeholder="enter the password..." className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2" type="password"></input>
            <input placeholder="confirm password..." className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2" type="password"></input>
            <button className="border-none bg-blue-400 rounded-md text-white m-8 w-[100px] " style={{backgroundColor: 'skyblue'}}>Sign Up</button>
        </div>
        </div>
        </div>
    );
}

export default Signup;