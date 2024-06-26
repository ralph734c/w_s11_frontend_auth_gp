import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AuthForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3003/api/auth/login",
        {
          username,
          password,
        }
      );
      setError("");
      localStorage.setItem("token", response.data.token);
      navigate("cereals");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div aria-live="polite"></div>
      <div aria-live="assertive" style={{ color: "red" }}></div>
      <h3>Login Form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
