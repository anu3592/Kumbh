import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

    fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json",
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
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col w-[500px] justify-center items-center border-1 rounded-3xl shadow-2xl mt-10 mb-5 p-5 mt-[150px]">
        <h1 className="text-4xl text-orange-500 font-bold p-4 m-4">
          Login To Site
        </h1>
        <input
          placeholder="enter the email address..."
          type="email"
          className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="enter the password..."
          className="border-2 border-gray-900 rounded-md m-8 lg:w-[300px] sm:w-[200px] lg:h-10 sm:h-8 p-2"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          className="border-none bg-blue-400 rounded-md text-white m-8 w-[100px] p-2"
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
