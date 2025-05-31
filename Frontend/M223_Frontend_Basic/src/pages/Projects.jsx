import React, { useEffect, useState } from "react";
import ProjectService from "../services/project.service";
import { Link } from "react-router-dom";

// Zeigt alle Projekte und erlaubt das Erstellen & Löschen
export default function Projects() {
  const [projects, setProjects] = useState([]); // Liste aller Projekte
  const [error, setError] = useState(""); // Fehlertext
  const [newProject, setNewProject] = useState({ name: "", description: "" }); // Neues Projekt

  // Lade alle Projekte beim Laden der Seite
  useEffect(() => {
    loadProjects();
  }, []);

  // Hilfsfunktion: Projekte vom Server holen
  const loadProjects = () => {
    ProjectService.getAllProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setError("Projekte konnten nicht geladen werden."));
  };

  // Neues Projekt absenden
  const handleCreate = (e) => {
    e.preventDefault();
    ProjectService.createProject(newProject)
      .then(() => {
        setNewProject({ name: "", description: "" }); // Formular zurücksetzen
        loadProjects(); // Projekte neu laden
      })
      .catch(() => setError("Projekt konnte nicht erstellt werden."));
  };

  // Projekt löschen (mit Sicherheitsabfrage)
  const handleDelete = (id) => {
    if (window.confirm("Projekt wirklich löschen?")) {
      ProjectService.deleteProject(id)
        .then(() => setProjects(projects.filter((p) => p.id !== id)))
        .catch(() => setError("Löschen fehlgeschlagen."));
    }
  };

  return (
    <div className="page-container">
      <h2>Projekte</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Formular zur Erstellung eines Projekts */}
      <form onSubmit={handleCreate}>
        <input
          placeholder="Projektname"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          required
        />
        <input
          placeholder="Beschreibung"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
        />
        <button type="submit">Projekt erstellen</button>
      </form>

      {/* Tabelle mit bestehenden Projekten */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Beschreibung</th>
            <th>Aktion</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>
                <button onClick={() => handleDelete(project.id)}>Löschen</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
