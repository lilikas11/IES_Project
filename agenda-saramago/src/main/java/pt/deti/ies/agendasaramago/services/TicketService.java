package pt.deti.ies.agendasaramago.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.deti.ies.agendasaramago.exceptions.TicketsNotAvailableException;
import pt.deti.ies.agendasaramago.models.Ticket;
import pt.deti.ies.agendasaramago.repositories.EventRepository;
import pt.deti.ies.agendasaramago.repositories.TicketRepository;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private EventRepository eventRepository;

    public List<Ticket> getTicketsByUserId(int userId) {
        Optional<List<Ticket>> optionalTickets = Optional.ofNullable(ticketRepository.findByUser_Id(userId));
        return optionalTickets.orElse(null);
    }

    public Ticket buyTickets(Ticket ticket) {
        int eventId = ticket.getEvent_id();
        int availableSeats = eventRepository.getAvailableSeatsForEvent(eventId);
        int nonAvailableSeats = eventRepository.getNotAvailableSeatsForEvent(eventId);
        if (availableSeats-1 < 0) {
            throw new TicketsNotAvailableException("Tickets not available. Choose another event");
        }
        eventRepository.decrementAvailableSeats(eventId);
        eventRepository.incrementNonAvailableSeats(eventId);
        return ticketRepository.save(ticket);
    }


}