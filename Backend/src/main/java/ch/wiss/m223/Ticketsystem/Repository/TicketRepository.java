package ch.wiss.m223.Ticketsystem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.wiss.m223.Ticketsystem.Model.Ticket;
import ch.wiss.m223.Ticketsystem.Model.User;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByCreator(User creator);
    List<Ticket> findByAssignedAdmin(User admin);
}
