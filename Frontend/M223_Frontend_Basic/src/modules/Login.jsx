import React, { useState } from "react";
import AuthService from "../services/auth.service.js";

function Login() {
  const [entries, setEntries] = useState({
    username: "",
    password: "",
  });

  // Speichert die Eingaben in den State
  const handleInputChange = (e) => {
    setEntries({
      ...entries,
      [e.target.name]: e.target.value,
    });
  };

  // Behandelt das Formular-Submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = entries;

    // Aufruf des Login-Services
    const response = AuthService.login(username, password);

    console.log("Login response:", response);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={entries.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={entries.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
