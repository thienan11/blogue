import React, { useRef, useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from '../components/UserContext';

export default function LoginPage() {
  // <form action="">
  //   <input type="text" placeholder="username"/>
  //   <input type="password" placeholder="password"/>
  //   <button>Login</button>
  //   <p>Don't have an account? <Link to="/register">Sign up</Link> </p>
  // </form>

  // State to manage password input type
  const [passwordType, setPasswordType] = useState("password");
  const passwordRef = useRef(null);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  // Attach event listeners
  useEffect(() => {
    const togglePassword = document.querySelector("#togglePassword");
    const form = document.querySelector("form");

    togglePassword.addEventListener("click", togglePasswordVisibility);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Add your login logic here
      // You can access the username and password values using
      // usernameRef.current.value and passwordRef.current.value
    });

    // Clean up event listeners on unmount
    return () => {
      togglePassword.removeEventListener("click", togglePasswordVisibility);
      form.removeEventListener("submit", (e) => {
        e.preventDefault();
      });
    };
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include', 
    });

    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      })

    } else {
      alert('wrong credentials.')
    }
  }

  if (redirect) {
    return <Navigate to={'/'}/>
  }

  return (
    <div className="container">
      <h1>Log in</h1>
      <form onSubmit={login}>
        <p>
          {/* <label htmlFor="username">Username:</label> */}
          <input 
            type="text" 
            name="username" 
            id="username" 
            autoComplete="off"
            placeholder="Username"
            value={username}
            onChange={ev => setUsername(ev.target.value)}
          />
        </p>
        <p>
          {/* <label htmlFor="password">Password:</label> */}
          <input 
            type={passwordType} 
            name="password" 
            id="password" 
            ref={passwordRef} 
            autoComplete="off"
            placeholder="Password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
          />
          <i className={`bi ${passwordType === "password" ? "bi-eye-slash" : "bi-eye"}`} id="togglePassword"></i>
        </p>
        <Link>Forgot password?</Link>
        <button type="submit" id="submit" className="submit">
          Log In
        </button>
        <p className="tag">
          Don't have an account? <Link to="/register">Sign up</Link>{" "}
        </p>
      </form>
    </div>
  );
}
