package ch.wiss.m223.Ticketsystem.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ch.wiss.m223.Ticketsystem.Model.Ticket;
import ch.wiss.m223.Ticketsystem.Model.User;
import ch.wiss.m223.Ticketsystem.Repository.TicketRepository;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<Ticket> getTicketsByCreator(User user) {
        return ticketRepository.findByCreator(user);
    }

    public List<Ticket> getTicketsByAssignedAdmin(User admin) {
        return ticketRepository.findByAssignedAdmin(admin);
    }

    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }

    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id).orElse(null);
    }

    public Ticket updateTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public void setTicketRepository(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
}
