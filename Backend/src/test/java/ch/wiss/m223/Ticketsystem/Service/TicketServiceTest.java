package ch.wiss.m223.Ticketsystem.Service;

import ch.wiss.m223.Ticketsystem.Model.Ticket;
import ch.wiss.m223.Ticketsystem.Repository.TicketRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class TicketServiceTest {

    private TicketRepository ticketRepository;
    private TicketService ticketService;

    @BeforeEach
    public void setup() {
        ticketRepository = mock(TicketRepository.class);
        ticketService = new TicketService();
        ticketService.setTicketRepository(ticketRepository);
    }

    @Test
    public void testGetAllTickets_returnsTickets() {
        Ticket ticket1 = new Ticket();
        ticket1.setTitle("Bug #1");

        Ticket ticket2 = new Ticket();
        ticket2.setTitle("Feature Request");

        when(ticketRepository.findAll()).thenReturn(Arrays.asList(ticket1, ticket2));

        List<Ticket> tickets = ticketService.getAllTickets();
        assertEquals(2, tickets.size());
        assertEquals("Bug #1", tickets.get(0).getTitle());
    }

    @Test
    public void testCreateTicket_savesTicket() {
        Ticket ticket = new Ticket();
        ticket.setTitle("New Ticket");

        when(ticketRepository.save(ticket)).thenReturn(ticket);

        Ticket saved = ticketService.createTicket(ticket);
        assertEquals("New Ticket", saved.getTitle());
        verify(ticketRepository, times(1)).save(ticket);
    }
}
