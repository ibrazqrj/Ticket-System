package ch.wiss.m223.Ticketsystem.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import ch.wiss.m223.Ticketsystem.Model.Project;
import ch.wiss.m223.Ticketsystem.Model.Ticket;
import ch.wiss.m223.Ticketsystem.Model.TicketStatus;
import ch.wiss.m223.Ticketsystem.Model.User;
import ch.wiss.m223.Ticketsystem.Repository.ProjectRepository;
import ch.wiss.m223.Ticketsystem.Repository.TicketRepository;
import ch.wiss.m223.Ticketsystem.Repository.UserRepository;
import ch.wiss.m223.Ticketsystem.Service.UserService;
import ch.wiss.m223.Ticketsystem.dto.CreateTicketRequest;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    // 🔸 Neues Ticket erstellen
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createTicket(@RequestBody CreateTicketRequest request) {
        // Aktuell eingeloggten Benutzer ermitteln
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User creator = userService.getUserByUsername(username);

        // Projekt nach ID suchen
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Projekt nicht gefunden"));

        // Neues Ticket erstellen
        Ticket ticket = new Ticket();
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setCreator(creator); // Ersteller setzen
        ticket.setProject(project);
        ticket.setStatus(TicketStatus.OPEN); // Standardstatus

        // Ticket speichern und zurückgeben
        Ticket savedTicket = ticketRepository.save(ticket);
        return ResponseEntity.ok(savedTicket);
    }

    // 🔸 Alle Tickets holen (Admin: alle, User: nur eigene)
    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getAllTickets() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByUsername(username);

        // Prüfen, ob Benutzer ein Admin ist
        boolean isAdmin = user.getRoles().stream()
                .anyMatch(role -> role.getName().name().equals("ROLE_ADMIN"));

        List<Ticket> tickets = isAdmin
                ? ticketRepository.findAll()
                : ticketRepository.findByCreator(user);

        return ResponseEntity.ok(tickets);
    }

    // 🔸 Ticket per ID abrufen
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getTicketById(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByUsername(username);

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket nicht gefunden"));

        boolean isAdmin = user.getRoles().stream()
                .anyMatch(role -> role.getName().name().equals("ROLE_ADMIN"));

        // Wenn kein Admin und nicht der Ersteller → Zugriff verweigern
        if (!isAdmin && !ticket.getCreator().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Zugriff verweigert");
        }

        return ResponseEntity.ok(ticket);
    }

    // 🔸 Ticketstatus ändern (z. B. zu "CLOSED")
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateTicketStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket nicht gefunden"));

        try {
            TicketStatus newStatus = TicketStatus.valueOf(body.get("status"));
            ticket.setStatus(newStatus);
            ticketRepository.save(ticket);
            return ResponseEntity.ok(ticket);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Ungültiger Statuswert");
        }
    }

    // 🔸 Ticket bearbeiten (z. B. Titel, Beschreibung, Projekt, Admin)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateTicket(@PathVariable Long id, @RequestBody CreateTicketRequest request) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket nicht gefunden"));

        // Felder aktualisieren
        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setStatus(request.getStatus());

        // Admin zuweisen, wenn vorhanden
        if (request.getAssignedAdminId() != null) {
            User assignedAdmin = userRepository.findById(request.getAssignedAdminId())
                    .orElseThrow(() -> new RuntimeException("Admin nicht gefunden"));
            ticket.setAssignedAdmin(assignedAdmin);
        }

        // Projekt aktualisieren, wenn vorhanden
        if (request.getProjectId() != null) {
            Project project = projectRepository.findById(request.getProjectId())
                    .orElseThrow(() -> new RuntimeException("Projekt nicht gefunden"));
            ticket.setProject(project);
        }

        return ResponseEntity.ok(ticketRepository.save(ticket));
    }

    // 🔸 Ticket löschen (nur für Admins erlaubt)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTicket(@PathVariable Long id) {
        ticketRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // 🔸 Admin zu Ticket zuweisen (nur für Admins)
    @PutMapping("/{id}/assign")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> assignUserToTicket(@PathVariable Long id, @RequestBody Map<String, Long> body) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket nicht gefunden"));

        Long userId = body.get("userId");
        if (userId == null)
            return ResponseEntity.badRequest().body("userId ist erforderlich");

        User userToAssign = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Benutzer nicht gefunden"));

        ticket.setAssignedAdmin(userToAssign);
        return ResponseEntity.ok(ticketRepository.save(ticket));
    }
}
