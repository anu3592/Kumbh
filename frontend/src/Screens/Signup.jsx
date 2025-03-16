import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [cpass, setCpass] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/');
        }
    })

    const register = async (e) => {
        e.preventDefault();
        if (password != cpass) {
            alert("Password does not match");
        }
        else {
            let signupResponse = await fetch("http://localhost:5000/register", {
                method: "POST",
                body: JSON.stringify({ name, email, address, password }),
                headers: {
                    'content-type': 'application/json'
                },
            });
            signupResponse = await signupResponse.json();
            if (signupResponse) {
                console.log(signupResponse);
                localStorage.setItem("user",JSON.stringify(signupResponse.result));
                localStorage.setItem("token",JSON.stringify(signupResponse.auth));
                navigate('/');
            }

        }
    }

    return (
        <div>
            <div className="flex w-full justify-center items-center">
                <div className="flex flex-col w-[500px] justify-center items-center border-1 rounded-3xl shadow-2xl mt-10 mb-5 p-5">
                    <h1 className="text-4xl text-orange-500 font-bold p-4 m-4">Sign Up</h1>
                    <input placeholder="enter your name..." className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2" onChange={(e) => setName(e.target.value)}></input>
                    <input placeholder="enter the email address..." type="email" className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2" onChange={(e) => setEmail(e.target.value)}></input>
                    <textarea placeholder="Enter your address..." className="border-2 rounded-md p-2" rows='4' cols='50' onChange={(e) => setAddress(e.target.value)}></textarea>
                    <input placeholder="enter the password..." className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                    <input placeholder="confirm password..." className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2" type="password" onChange={(e) => setCpass(e.target.value)}></input>
                    <button className="border-none bg-blue-400 rounded-md text-white m-8 w-[100px] " style={{ backgroundColor: 'skyblue' }} onClick={(e) => register(e)}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default Signup;