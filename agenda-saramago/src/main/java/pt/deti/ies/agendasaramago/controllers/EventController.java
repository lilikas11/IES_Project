package pt.deti.ies.agendasaramago.controllers;

import pt.deti.ies.agendasaramago.models.Event;
import pt.deti.ies.agendasaramago.models.Company;
import pt.deti.ies.agendasaramago.services.EventService;
import pt.deti.ies.agendasaramago.services.CompanyService;
import pt.deti.ies.agendasaramago.services.UserPreferencesService;
import pt.deti.ies.agendasaramago.exceptions.ResourceNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.json.JSONObject;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private UserPreferencesService userPrefService;

    @Autowired
    private CompanyService companyService;


    @GetMapping("")
    ResponseEntity<List<Event>> getAllEvents(){
        return ResponseEntity.ok().body(eventService.getAllEvents());
    }

    @GetMapping("/{user_id}/all_event_pref")
    public ResponseEntity<HashMap<String, List<Event>>> getAllPrefEventsFromUser(@PathVariable(value = "user_id") int user_id) throws ResourceNotFoundException {
        JSONObject prefs_user = new JSONObject(userPrefService.getAllPreferences(user_id));

        String citiesStr = prefs_user.optString("cities", "");
        String tagsStr = prefs_user.optString("tags", "");
        String companiesStr = prefs_user.optString("companies", "");

        String[] cities = citiesStr.split(", ");
        String[] tags = tagsStr.split(", ");
        String[] companies = companiesStr.split(", ");

        HashMap<String, List<Event>> data = new HashMap<>();

        if (cities.length > 0 && !cities[0].isEmpty()) {
            for (String city : cities) {
                List<Event> city_event = eventService.getEventByCity(city);
                ArrayList<Event> arrlistofOptions_c = new ArrayList<Event>(city_event);
                data.put(city, arrlistofOptions_c);
            }
        }

        if (tags.length > 0 && !tags[0].isEmpty()) {
            for (String tag: tags){
                List<Event> tag_event = eventService.getEventByTag(tag);
                ArrayList<Event> arrlistofOptions_t = new ArrayList<Event>(tag_event);
                for (Event tag2: tag_event)
                    System.out.println(tag2);
                data.put(tag, arrlistofOptions_t);
            }
        }

        if (companies.length > 0 && !companies[0].isEmpty()) {
            for (String company: companies){
                List<Event> company_event = eventService.getEventByCompany(company);
                ArrayList<Event> arrlistofOptions_comp = new ArrayList<Event>(company_event);
                data.put(company, arrlistofOptions_comp);
            }
        }

        return ResponseEntity.ok().body(data);
    }

    @GetMapping("/{id}")
    ResponseEntity<Event> getEventByID(@PathVariable(value = "id") int id){
        return ResponseEntity.ok().body(eventService.getEventById(id));
    }

    @GetMapping("/city/{city}")
    ResponseEntity<List<Event>> getEventsByCity(@PathVariable(value = "city") String city){
        return ResponseEntity.ok().body(eventService.getEventByCity(city));
    }

    @GetMapping("/tag/{tag}")
    ResponseEntity <List<Event>> getEventsByTags(@PathVariable(value = "tag") String tag){
        return ResponseEntity.ok().body(eventService.getEventByTag(tag));
    }

    @PostMapping("")
    ResponseEntity<Event>createEvent(@RequestBody Event event){
        return ResponseEntity.ok().body(eventService.saveEvent(event));
    }

    //update and event
    @PutMapping("/{id}/update")
    ResponseEntity<Event> updateEventInfo(@PathVariable("id") int id, @RequestBody Event eventInfo) {
        return ResponseEntity.ok().body(eventService.updateEvent(eventInfo));
    }

}
