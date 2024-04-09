// src/pages/ResetPasswordPage.jsx

import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPasswordPage() {
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      // Adjust the endpoint as necessary
      const response = await fetch(
        `https://bloguetown-api.vercel.app/reset-password/${id}/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ newPassword }),
        }
      );

      if (response.ok) {
        setMessage(
          "Password reset successfully. You can now log in with your new password."
        );
      } else {
        throw new Error("Failed to reset password.");
      }
    } catch (error) {
      setMessage(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Reset Your Password</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            required
          />
        </p>
        <p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </p>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
