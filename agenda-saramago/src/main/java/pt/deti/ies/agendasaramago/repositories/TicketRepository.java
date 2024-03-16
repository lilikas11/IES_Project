package pt.deti.ies.agendasaramago.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import pt.deti.ies.agendasaramago.models.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
   @Query("SELECT t FROM Ticket t WHERE t.user_id = :userId")
   List<Ticket> findByUser_Id(@Param("userId") int userId);
}

