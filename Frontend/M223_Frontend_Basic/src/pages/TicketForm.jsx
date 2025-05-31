import React, { useState, useEffect } from "react";
import TicketService from "../services/ticket.service";
import ProjectService from "../services/project.service";
import { useNavigate } from "react-router-dom";

// Formular zum Erstellen eines neuen Tickets
function TicketForm() {
  const [title, setTitle] = useState(""); // Titel des Tickets
  const [description, setDescription] = useState(""); // Beschreibung
  const [projectId, setProjectId] = useState(""); // Ausgewähltes Projekt
  const [projects, setProjects] = useState([]); // Alle verfügbaren Projekte
  const [error, setError] = useState(""); // Fehlernachricht
  const navigate = useNavigate(); // Zum Weiterleiten nach dem Erstellen

  // Lade alle Projekte beim Start
  useEffect(() => {
    ProjectService.getAllProjects()
      .then((res) => {
        setProjects(res.data);
      })
      .catch(() => setError("Projekte konnten nicht geladen werden"));
  }, []);

  // Wird aufgerufen, wenn das Formular abgesendet wird
  const handleSubmit = async (e) => {
    e.preventDefault(); // Seite soll nicht neu laden
    if (!title || !description || !projectId) {
      setError("Bitte alle Felder ausfüllen");
      return;
    }

    try {
      await TicketService.createTicket({ title, description, projectId });
      navigate("/tickets"); // Weiterleitung zur Ticketliste
    } catch (err) {
      setError("Fehler beim Erstellen des Tickets");
    }
  };

  return (
    <div className="form-container">
      <h2>Ticket erstellen</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Eingabefeld: Titel */}
        <div>
          <label>Titel:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        {/* Eingabefeld: Beschreibung */}
        <div>
          <label>Beschreibung:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        {/* Auswahlfeld: Projekt */}
        <div>
          <label>Projekt:</label>
          <select value={projectId} onChange={(e) => setProjectId(e.target.value)} required>
            <option value="">Bitte wählen</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Button zum Absenden */}
        <button type="submit">Ticket erstellen</button>
      </form>
    </div>
  );
}

export default TicketForm;
