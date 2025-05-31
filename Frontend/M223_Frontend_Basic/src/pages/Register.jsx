import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles/Form.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const { username, password } = formData;
    const specialCharPattern = /[^A-Za-z0-9]/;

    if (username.length < 3 || username.length > 50) {
      return "Benutzername muss zwischen 3 und 50 Zeichen lang sein.";
    }

    if (password.length < 8) {
      return "Passwort muss mindestens 8 Zeichen lang sein.";
    }

    if (!specialCharPattern.test(password)) {
      return "Passwort muss mindestens ein Sonderzeichen enthalten.";
    }

    return "";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await AuthService.register(
        formData.username,
        formData.email,
        formData.password
      );
      navigate("/login"); // oder automatisch einloggen
    } catch (err) {
      setError("Registrierung fehlgeschlagen. Benutzername oder Email bereits vergeben?");
    }
  };

  return (
    <div className="form-container">
      <h2>Registrieren</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Benutzername:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Passwort:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Registrieren</button>
      </form>
    </div>
  );
}

export default Register;
