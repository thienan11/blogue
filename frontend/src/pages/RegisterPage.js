import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {

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


    // Clean up event listeners on unmount
    return () => {
      togglePassword.removeEventListener("click", togglePasswordVisibility);
      form.removeEventListener("submit", (e) => {
        e.preventDefault();
      });
    };
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')

  async function register(ev) {
    ev.preventDefault();
    await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
    })
  }

  return (
    <div className="container">
      <h1>Sign up</h1>
      <form onSubmit={register}>
        <p>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" autoComplete="off" value={username} onChange={ev => setUsername(ev.target.value)}/>
        </p>
        <p>
          <label htmlFor="password">Password:</label>
          <input type={passwordType} name="password" id="password" ref={passwordRef} autoComplete="off" value={password} onChange={ev => setPassword(ev.target.value)}/>
          <i className={`bi ${passwordType === "password" ? "bi-eye-slash" : "bi-eye"}`} id="togglePassword"></i>
        </p>
        <button className="submit">
          Sign up
        </button>
        <p className="tag">
          Already have an account? <Link to="/login">Log in</Link>{" "}
        </p>
      </form>
    </div>
  );
}