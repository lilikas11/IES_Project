package pt.deti.ies.agendasaramago.repositories;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import pt.deti.ies.agendasaramago.models.Company;
import pt.deti.ies.agendasaramago.models.Event;


public interface EventRepository extends JpaRepository<Event, Integer> { //add other methods later

    public List<Event> findByTagsContaining(String tag);
    public List<Event> findByCity(String city);
    public List<Event> findByCompany(String company);
    public List<Event> findByDatestart(Date datestart); //ideia é selecionar a data através de um calendário, that's why im using Date type
    @Query("SELECT e.seats FROM Event e WHERE e.id = :event_id")
    int getAvailableSeatsForEvent(@Param("event_id") Integer eventId);
    @Query("SELECT e.seats_not_available FROM Event e WHERE e.id = :eventId")
    int getNotAvailableSeatsForEvent(@Param("eventId") Integer eventId);
    @Transactional
    @Modifying
    @Query("UPDATE Event e SET e.seats = e.seats - 1 WHERE e.id = :eventId")
    int decrementAvailableSeats(@Param("eventId") Integer eventId); 
    @Transactional
    @Modifying
    @Query("UPDATE Event e SET e.seats_not_available  = e.seats_not_available + 1 WHERE e.id = :eventId")
    int incrementNonAvailableSeats(@Param("eventId") Integer eventId); 
}
