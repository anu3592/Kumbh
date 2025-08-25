import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

const Signup = () => {
  //<<<<<<< HEAD

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(0);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");
  const navigate = useNavigate();
  const regex = /^\d{10}$/;
  const regex2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const register = async (e) => {
    e.preventDefault();
    if (password != cpass) {
      alert("Password does not match");
    } else {

      if (name == "" || email == "" || !contact || address == "" || password == "") {
        alert("Please Enter all Credentials");
      }
      else {

        if (regex.test(contact)) {
          if (regex2.test(email)) {
            let signupResponse = await fetch("http://localhost:5000/register", {
              method: "POST",
              body: JSON.stringify({ name, email, contact, address, password }),
              headers: {
                "content-type": "application/json",
              },
            });
            signupResponse = await signupResponse.json();
            if (signupResponse) {
              console.log(signupResponse);
              localStorage.setItem("user", JSON.stringify(signupResponse.result));
              localStorage.setItem("token", JSON.stringify(signupResponse.auth));
              navigate("/");
            }
          }
          else {
            alert("Please enter valid email");
          }
        }

        else {
          alert("Please enter valid 10-digit mobile number");
        }
      }
    }
  };

  {
    /*=======
=======
=======
>>>>>>> 17a29b5cc3991647f9252d26ebc2e48a0bd51ee1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
>>>>>>> c0f8380e2d80d69968373a6fe1f88bd2623fa3b3
    }
  });

*/
    {
      /*<<<<<<< HEAD*/
    }

    return (
      <div>
        <div className="flex items-center justify-center w-screen">
          <div className="flex flex-col justify-center items-center w-full max-w-md rounded-3xl shadow-2xl p-5 bg-white">
            <h1 className="text-4xl text-orange-500 font-bold p-4 m-4">
              Sign Up
            </h1>
            <input
              placeholder="enter your name..."
              className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              placeholder="enter the email address..."
              type="email"
              className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              placeholder="enter the phone number..."
              type="number"
              className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2"
              onChange={(e) => setContact(e.target.value)}
            ></input>
            <textarea
              placeholder="Enter your address..."
              className="border-2 rounded-md p-2"
              rows="4"
              cols="50"
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <input
              placeholder="enter the password..."
              className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              placeholder="confirm password..."
              className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2"
              type="password"
              onChange={(e) => setCpass(e.target.value)}
            ></input>
            <button
              className="border-none bg-blue-400 rounded-md text-white m-8 w-[100px] "
              style={{ backgroundColor: "skyblue" }}
              onClick={(e) => register(e)}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/*=======
=======
=======
>>>>>>> 17a29b5cc3991647f9252d26ebc2e48a0bd51ee1
  const register = async (e) => {
    e.preventDefault();
    if (password != cpass) {
      alert("Password does not match");
    } else {
      let signupResponse = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({ name, email, address, password }),
        headers: {
          "content-type": "application/json",
        },
      });
      signupResponse = await signupResponse.json();
      if (signupResponse) {
        console.log(signupResponse);
        localStorage.setItem("user", JSON.stringify(signupResponse.result));
        localStorage.setItem("token", JSON.stringify(signupResponse.auth));
        navigate("/");
      }
    }
  };

  return (
    <div>
      <div className="flex w-full justify-center items-center">
        <div className="flex flex-col w-[500px] justify-center items-center border-1 rounded-3xl shadow-2xl mt-10 mb-5 p-5 mt-[150px]">
          <h1 className="text-4xl text-orange-500 font-bold p-4 m-4">
            Sign Up
          </h1>
          <input
            placeholder="enter your name..."
            className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            placeholder="enter the email address..."
            type="email"
            className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <textarea
            placeholder="Enter your address..."
            className="border-2 rounded-md p-2"
            rows="4"
            cols="50"
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          <input
            placeholder="enter the password..."
            className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            placeholder="confirm password..."
            className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2"
            type="password"
            onChange={(e) => setCpass(e.target.value)}
          ></input>
          <button
            className="border-none bg-blue-400 rounded-md text-white m-8 w-[100px] "
            style={{ backgroundColor: "skyblue" }}
            onClick={(e) => register(e)}
          >
            Sign Up
          </button>
<<<<<<< HEAD
>>>>>>> c0f8380e2d80d69968373a6fe1f88bd2623fa3b3*/}
      </div>
      //</div>
      //</div>
    );
  }
};
export default Signup;
