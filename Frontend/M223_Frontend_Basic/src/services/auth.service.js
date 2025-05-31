import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

// Registrierung eines neuen Benutzers
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

// Benutzer-Login
const login = (username, password) => {
  return axios
    .post(API_URL + "login", { username, password })
    .then((response) => {
      // Wenn Login erfolgreich → Benutzerdaten im LocalStorage speichern
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

// Benutzer abmelden (Daten aus dem LocalStorage löschen)
const logout = () => {
  localStorage.removeItem("user");
};

// Aktuell eingeloggten Benutzer abrufen
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Liste aller Benutzer abrufen (z. B. für Zuweisung von Tickets)
const getAllUsers = () => {
  const user = getCurrentUser();
  return axios.get("http://localhost:8080/api/users", {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
};

// Export aller Funktionen
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getAllUsers,
};

export default AuthService;
