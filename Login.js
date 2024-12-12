import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Include the CSS file for styling

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("Both fields are required.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      if (response.data.success) {
        setMessage("Login Successful!");
        localStorage.setItem("username", username); // Store the username for reference
      } else {
        setMessage("Invalid credentials.");
      }
    } catch (error) {
      setMessage("Error logging in. Please try again.");
    }
  };

  const handleLogout = async () => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      setMessage("No user is logged in.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/logout", {
        username: storedUsername,
      });
      if (response.data.success) {
        setMessage("Logout Successful!");
        localStorage.removeItem("username");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      setMessage("Error logging out. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Log in</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          Log in
        </button>
      </form>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
