import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  useEffect(() => {
    const auth = localStorage.getItem("user");
    
    if (auth) {
      navigate("/");
    }
  });

  const goToSite = async (e) => {
    e.preventDefault();

    // let loginResponse = await fetch("http://localhost:5000/login", {
    //     method: 'POST',
    //     body: JSON.stringify({ email, password }),
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    // });
    // loginResponse = await loginResponse.json();
    // if (loginResponse.auth) {
    //     console.log(loginResponse);
    //     localStorage.setItem("user", JSON.stringify(loginResponse.user));
    //     localStorage.setItem("token", JSON.stringify(loginResponse.auth));
    //     if(loginResponse.user.email === "govind@gmail.com")
    //     {
    //         localStorage.setItem("admin", JSON.stringify(loginResponse.user.name));
    //         console.log("admin added");
    //     }
    //     navigate('/');
    //     window.location.reload();
    // }

    if (email != "" && password != "") {

      if (regex.test(email)) {
        fetch("http://localhost:5000/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((loginResponse) => loginResponse.json())
          .then((loginResponse) => {
            if (loginResponse.auth) {
              console.log(loginResponse);
              localStorage.setItem("user", JSON.stringify(loginResponse.user));
              localStorage.setItem("token", JSON.stringify(loginResponse.auth));
              // console.log("1 wala", loginResponse.user.email);
              // console.log("2 wala", loginResponse.email);

              if (loginResponse.user.email === "govind@gmail.com") {
                localStorage.setItem("admin", loginResponse.user.name);
                console.log("admin added");
              } else {
                localStorage.removeItem("admin");
              }

              // setTimeout(() => {
              //     navigate('/');
              //     //window.location.reload();
              // }, 150);
              console.log("logged in");
              navigate("/");
              //  window.location.reload();
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }
          })
          .catch((error) => console.error("Error in login", error));
      }
      else {
        alert("Please Enter Valid Email");
      }
    }
    else {
      alert("Please enter your credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col justify-center items-center w-full max-w-md rounded-3xl shadow-2xl p-5 bg-white">
        <h1 className="text-4xl text-orange-500 font-bold p-4 m-4">
          Login To Site
        </h1>
        <input
          placeholder="enter the email address..."
          type="email"
          className="border-2 border-gray-900 rounded-md m-8 w-72 lg:h-10 sm:h-8 p-2"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="enter the password..."
          className="border-2 border-gray-900 rounded-md m-8 w-72 lg:h-10 sm:h-8 p-2"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          className="border-none bg-blue-400 rounded-md text-white m-8 w-32 p-2"
          style={{ backgroundColor: "skyblue" }}
          onClick={(e) => goToSite(e)}
        >
          Login
        </button>
        <Link to="/signup">
          <li className="list-none text-lg text-purple-500 cursor-pointer">
            (Create account)
          </li>
        </Link>
      </div>
    </div>
  );
};

export default Login;
