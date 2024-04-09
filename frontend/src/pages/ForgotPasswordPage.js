import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset message
    setMessage("");

    // Post request to your backend
    try {
      const response = await fetch("https://bloguetown-api.vercel.app/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      const data = await response.text(); // Assuming the backend sends a plain text response

      // Check if the response was OK (200-299)
      if (response.ok) {
        setMessage("Check your email for the password reset link.");
      } else {
        setMessage(data || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="container">
      <h1>Forgot your password?</h1>
      <p className="tag">
        Please enter the email address you'd like your password reset
        information sent to
      </p>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </p>
        {message && <span className="error">{message}</span>}
        <button type="submit" id="submit" className="submit">
          Request reset link
        </button>
      </form>
    </div>
  );
}
