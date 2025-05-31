package ch.wiss.m223.Ticketsystem.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import ch.wiss.m223.Ticketsystem.Model.Project;
import ch.wiss.m223.Ticketsystem.Repository.ProjectRepository;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    // Gibt alle Projekte zurück
    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Erstellt ein neues Projekt
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        // Projekt speichern
        Project savedProject = projectRepository.save(project);
        return ResponseEntity.ok(savedProject);
    }

    // Löscht ein Projekt anhand der ID
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        // Existenz prüfen (optional)
        if (!projectRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Projekt löschen
        projectRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
