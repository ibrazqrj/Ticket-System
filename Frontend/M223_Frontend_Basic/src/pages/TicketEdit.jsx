import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TicketService from "../services/ticket.service";
import ProjectService from "../services/project.service";

function TicketEdit() {
  const { id } = useParams(); // Ticket-ID aus der URL
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Lade Ticket-Daten
    TicketService.getTicket(id)
      .then((res) => setTicket(res.data))
      .catch(() => setError("Ticket konnte nicht geladen werden"));

    // Lade Projektliste
    ProjectService.getAllProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setError("Projekte konnten nicht geladen werden"));
  }, [id]);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await TicketService.updateTicket(id, ticket);
      navigate("/tickets");
    } catch (err) {
      setError("Fehler beim Speichern des Tickets");
    }
  };

  if (!ticket) return <p>Loading...</p>;
  if (ticket.status === "CLOSED") return <p>Dieses Ticket ist geschlossen und kann nicht bearbeitet werden.</p>;

  return (
    <div className="form-container">
      <h2>Ticket bearbeiten</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titel:</label>
          <input name="title" value={ticket.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Beschreibung:</label>
          <textarea name="description" value={ticket.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Projekt:</label>
          <select name="projectId" value={ticket.project.id} onChange={handleChange} required>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={ticket.status} onChange={handleChange}>
            <option value="OPEN">OPEN</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
        <button type="submit">Speichern</button>
      </form>
    </div>
  );
}

export default TicketEdit;
