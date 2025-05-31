// React-Komponenten-Importe und benötigte Funktionen
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TicketService from "../services/ticket.service";
import ProjectService from "../services/project.service";
import AuthService from "../services/auth.service"; // HAT GEFELHT - notwendig für Benutzerliste

// Formular zum Bearbeiten eines Tickets
function EditTicketForm() {
  const { id } = useParams(); // Ticket-ID aus der URL holen
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null); // Ticketdaten
  const [projects, setProjects] = useState([]); // Liste aller Projekte
  const [users, setUsers] = useState([]); // Liste aller Benutzer
  const [error, setError] = useState(""); // Fehlermeldung

  // Lädt Ticket, Projekte und Benutzer bei erstem Laden
  useEffect(() => {
    TicketService.getTicketById(id)
      .then((res) => setTicket(res.data))
      .catch(() => setError("Ticket nicht gefunden."));

    ProjectService.getAllProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setError("Projekte konnten nicht geladen werden."));

    AuthService.getAllUsers()
      .then((res) => setUsers(res.data))
      .catch(() => setError("Benutzer konnten nicht geladen werden."));
  }, [id]);

  // Wenn ein Formularfeld geändert wird → Ticketdaten aktualisieren
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  // Wenn das Formular abgesendet wird → Ticket speichern
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await TicketService.updateTicket(id, {
        title: ticket.title,
        description: ticket.description,
        projectId: ticket.project?.id,
        status: ticket.status,
        assignedAdminId: ticket.assignedAdmin?.id || null,
      });
      navigate("/tickets"); // Zurück zur Ticketliste
    } catch (err) {
      setError("Fehler beim Aktualisieren des Tickets.");
    }
  };

  if (!ticket) return <p>Lade Ticketdaten...</p>;

  return (
    <div className="form-container">
      <h2>Ticket bearbeiten</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Eingabefeld: Titel */}
        <div>
          <label>Titel:</label>
          <input name="title" value={ticket.title} onChange={handleChange} required />
        </div>

        {/* Eingabefeld: Beschreibung */}
        <div>
          <label>Beschreibung:</label>
          <textarea name="description" value={ticket.description} onChange={handleChange} required />
        </div>

        {/* Auswahlfeld: Status */}
        <div>
          <label>Status:</label>
          <select name="status" value={ticket.status} onChange={handleChange} required>
            <option value="OPEN">Offen</option>
            <option value="IN_PROGRESS">In Bearbeitung</option>
            <option value="CLOSED">Geschlossen</option>
          </select>
        </div>

        {/* Auswahlfeld: Projektzuordnung */}
        <div>
          <label>Projekt:</label>
          <select
            name="projectId"
            value={ticket.project?.id}
            onChange={(e) =>
              setTicket({
                ...ticket,
                project: { id: e.target.value, name: "" },
              })
            }
            required
          >
            <option value="">Bitte wählen</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Auswahlfeld: Admin-Zuweisung */}
        <div>
          <label>Zugewiesen an (Admin):</label>
          <select
            name="assignedAdminId"
            value={ticket.assignedAdmin?.id || ""}
            onChange={(e) =>
              setTicket({
                ...ticket,
                assignedAdmin: { id: e.target.value },
              })
            }
          >
            <option value="">-- Keiner --</option>
            {users.map((user) =>
              user.roles?.includes("ADMIN") ? (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ) : null
            )}
          </select>
        </div>

        {/* Speichern-Button */}
        <button type="submit">Speichern</button>
      </form>
    </div>
  );
}

export default EditTicketForm;
