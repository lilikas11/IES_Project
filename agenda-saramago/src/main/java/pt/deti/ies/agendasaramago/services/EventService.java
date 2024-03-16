package pt.deti.ies.agendasaramago.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import pt.deti.ies.agendasaramago.models.Company;
import pt.deti.ies.agendasaramago.models.Event;
import pt.deti.ies.agendasaramago.repositories.EventRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(int id) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        return optionalEvent.orElse(null);
    }

    public List<Event> getEventByTag(String tag) {
        System.out.println("Calling getEventByTag with tag: " + tag);
        List<Event> events = eventRepository.findByTagsContaining(tag);
        System.out.println("Found events: " + events);
        return events;
    }

    public List<Event> getEventByCity(String city) {
        return eventRepository.findByCity(city);
    }

    public List<Event> getEventByCompany(String company) {
        return eventRepository.findByCompany(company);
    }

    public List<Event> getEventByDateStart(Date date) {
        return eventRepository.findByDatestart(date);
    }

    public Event updateEvent(Event event) {
        Optional<Event> eventToUpdateOptional = eventRepository.findById((int) event.getId());
        if (eventToUpdateOptional.isPresent()) {
            Event event_to_update = eventToUpdateOptional.get();
            event_to_update.setName(event.getName());
            event_to_update.setCompany(event.getCompany());
            event_to_update.setDescription(event.getDescription());
            event_to_update.setTags(event.getTags());
            event_to_update.setDatestart(event.getDatestart());
            event_to_update.setDateend(event.getDateend());
            event_to_update.setSchedule(event.getSchedule());
            event_to_update.setPoster(event.getPoster());
            event_to_update.setPrices(event.getPrices());
            event_to_update.setLocation(event.getLocation());
            event_to_update.setCity(event.getCity());

            return eventRepository.save(event_to_update);
        } else {
            return null;
        }
    }

    @Modifying
    @Transactional
    public void updateSeats(Integer eventId) {
        eventRepository.decrementAvailableSeats(eventId);
    }

    @Modifying
    @Transactional
    public void plusSeats(Integer eventId) {
        eventRepository.incrementNonAvailableSeats(eventId);
    }
}
