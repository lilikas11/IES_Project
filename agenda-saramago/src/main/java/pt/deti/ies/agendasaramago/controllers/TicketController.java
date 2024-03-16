package pt.deti.ies.agendasaramago.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pt.deti.ies.agendasaramago.exceptions.TicketsNotAvailableException;
import pt.deti.ies.agendasaramago.models.Ticket;
import pt.deti.ies.agendasaramago.services.TicketService;

@CrossOrigin
@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;


    @GetMapping("/{user}")
    public ResponseEntity<List<Ticket>> getTicketsByLoggedInUser(@PathVariable(value = "user") Integer user) {
        List<Ticket> userTickets = ticketService.getTicketsByUserId(user);

        return ResponseEntity.ok().body(userTickets);
    }


    @PostMapping("/buy")
    public ResponseEntity<Ticket> buyTickets(
            @RequestBody Ticket tickets) {
        try {
            Ticket purchasedTickets = ticketService.buyTickets(tickets);
            return ResponseEntity.ok().body(purchasedTickets);
        } catch (TicketsNotAvailableException e) {
            return null;
        }
    }
        
    
}