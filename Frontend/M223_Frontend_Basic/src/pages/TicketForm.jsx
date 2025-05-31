import React, { useState, useEffect } from "react";
import TicketService from "../services/ticket.service";
import ProjectService from "../services/project.service";
import { useNavigate } from "react-router-dom";

function TicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Lade alle Projekte für Dropdown
    ProjectService.getAllProjects()
      .then((res) => {
        setProjects(res.data);
      })
      .catch(() => setError("Projekte konnten nicht geladen werden"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !projectId) {
      setError("Bitte alle Felder ausfüllen");
      return;
    }

    try {
      await TicketService.createTicket({ title, description, projectId });
      navigate("/tickets");
    } catch (err) {
      setError("Fehler beim Erstellen des Tickets");
    }
  };

  return (
    <div className="form-container">
      <h2>Ticket erstellen</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titel:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Beschreibung:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
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
        <button type="submit">Ticket erstellen</button>
      </form>
    </div>
  );
}

export default TicketForm;
