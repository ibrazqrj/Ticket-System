package ch.wiss.m223.Ticketsystem.Controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import ch.wiss.m223.Ticketsystem.Model.Project;
import ch.wiss.m223.Ticketsystem.Model.User;
import ch.wiss.m223.Ticketsystem.Repository.ProjectRepository;
import ch.wiss.m223.Ticketsystem.Repository.UserRepository;
import ch.wiss.m223.Ticketsystem.Service.UserService;
import ch.wiss.m223.Ticketsystem.dto.CreateProjectRequest;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired private ProjectRepository projectRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Project> createProject(@RequestBody CreateProjectRequest request) {
        Project project = new Project();
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        Set<User> users = new HashSet<>();
        for (Long userId : request.getUserIds()) {
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
            users.add(user);
        }
        project.setUsers(users); 

        for (User user : users) {
            user.getProjects().add(project);
        }

        return ResponseEntity.ok(projectRepository.save(project));
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Project>> getProjects() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByUsername(username);

        boolean isAdmin = user.getRoles().stream()
            .anyMatch(role -> role.getName().name().equals("ROLE_ADMIN"));

        List<Project> projects = isAdmin
            ? projectRepository.findAll()
            : projectRepository.findByUsersContaining(user);

        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getProjectById(@PathVariable Long id) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Projekt nicht gefunden"));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByUsername(username);

        // boolean isAdmin = user.getRoles().stream()
        //     .anyMatch(role -> role.getName().name().equals("ROLE_ADMIN"));

        // if (!isAdmin && !project.getUsers().contains(user)) {
        //     return ResponseEntity.status(403).body("Kein Zugriff auf dieses Projekt");
        // }

        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        projectRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
