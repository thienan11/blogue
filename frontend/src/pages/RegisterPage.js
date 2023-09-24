import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  // State to manage password input type
  const [passwordType, setPasswordType] = useState("password");
  const passwordRef = useRef(null);

  // State for email input validation
  const [isEmailValid, setEmailValid] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to track overall form validity
  const [isFormValid, setFormValid] = useState(false);

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

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^([\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+)$/;

    return emailRegex.test(email);
  };

  // // Function to handle email input change
  // const handleEmailChange = (ev) => {
  //   const newEmail = ev.target.value;
  //   setEmail(newEmail);
  //   setEmailValid(validateEmail(newEmail));
  //   updateFormValidity();
  // };
  // Function to handle input field changes
const handleInputChange = (ev) => {
  const { name, value } = ev.target;
  // Update the corresponding state variable
  if (name === "username") {
    setUsername(value);
  } else if (name === "email") {
    setEmail(value);
    setEmailValid(validateEmail(value));
  } else if (name === "password") {
    setPassword(value);
  }
  // Update the form's overall validity
  updateFormValidity();
};

  // Function to update the form's overall validity
  const updateFormValidity = () => {
    // Check if all required fields are filled out
    const isValid = username.trim() !== "" && email.trim() !== "" && password.trim() !== "";
    // Update the form's validity state
    setFormValid(isValid && isEmailValid);
  };

  // Function to handle form submission
  async function register(ev) {
    ev.preventDefault();

    if (!isFormValid) {
      // Prevent form submission if the form is not valid
      return;
    }

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert('Registration Successful!');
    } else {
      alert('Failed to register. Try again');
    }
  }

  return (
    <div className="container">
      <h1>Sign up</h1>
      <form onSubmit={register}>
        <p>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            value={username}
            // onChange={(ev) => setUsername(ev.target.value)}
            placeholder="Username"
            onChange={handleInputChange}
          />
        </p>
        <p>
          <input
            type="text"
            name="email"
            id="email"
            autoComplete="off"
            value={email}
            onChange={handleInputChange}
            className={!isEmailValid ? "invalid" : ""}
            placeholder="Email"
          />
          {!isEmailValid && (
            <span className="error">Invalid email address</span>
          )}
        </p>
        <p>
          <input
            type={passwordType}
            name="password"
            id="password"
            ref={passwordRef}
            autoComplete="off"
            value={password}
            // onChange={(ev) => setPassword(ev.target.value)}
            onChange={handleInputChange}
            placeholder="Password"
          />
          <i
            className={`bi ${
              passwordType === "password" ? "bi-eye-slash" : "bi-eye"
            }`}
            id="togglePassword"
          ></i>
        </p>
        <button className="submit" disabled={!isFormValid}>
          Sign up
        </button>
        <p className="tag">
          Already have an account? <Link to="/login">Log in</Link>{" "}
        </p>
      </form>
    </div>
  );
}
