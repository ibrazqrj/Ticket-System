import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>MiniJira</h2>
      <nav>
        <ul>
          <li><Link to="/dashboard">🏠 Dashboard</Link></li>
          <li><Link to="/projects">📁 Projects</Link></li>
          <li><Link to="/tickets">🎫 Tickets</Link></li>
          <li><Link to="/login">🔐 Login</Link></li>
        </ul>
      </nav>
    </div>
  );
}
