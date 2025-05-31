import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service.js";

function Login() {
  const [entries, setEntries] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  // Initialisiert den State für die Eingaben

  // Speichert die Eingaben in den State
  const handleInputChange = (e) => {
    setEntries({
      ...entries,
      [e.target.name]: e.target.value,
    });
  };

  // Behandelt das Formular-Submit
  const handleSubmit = async (event) => {
  event.preventDefault();

  const { username, password } = entries;

  try {
    const response = await AuthService.login(username, password);
    console.log("Login response:", response);

    // Optional: Weiterleitung nach Login
    window.location.href = "/dashboard";
  } catch (error) {
    console.error("Login fehlgeschlagen:", error);
  }
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
        <button type="button" onClick={() => navigate("/register")}>
          Noch kein Konto? Jetzt registrieren
        </button>
      </form>
    </div>
  );
}

export default Login;
