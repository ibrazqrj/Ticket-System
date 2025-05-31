import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../styles/Navigation.css";

export default function Navigation() {
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <nav className="sidebar">
      <ul>
        {user && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/tickets">Tickets</Link></li>
            <li><Link to="/projects">Projekte</Link></li>
            {user.roles?.includes("ADMIN") && (
              <li><Link to="/admin">Admin-Bereich</Link></li>
            )}
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
            <li className="username">Hallo, {user.username}</li>
          </>
        )}

        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registrieren</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

