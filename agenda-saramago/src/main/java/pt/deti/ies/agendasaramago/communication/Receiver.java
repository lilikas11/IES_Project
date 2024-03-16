package pt.deti.ies.agendasaramago.communication;

import pt.deti.ies.agendasaramago.exceptions.ResourceNotFoundException;
import org.json.JSONObject;
import org.json.JSONArray;

import java.util.*;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import pt.deti.ies.agendasaramago.models.Company;
import pt.deti.ies.agendasaramago.services.CompanyService;
import pt.deti.ies.agendasaramago.models.Event;
import pt.deti.ies.agendasaramago.services.EventService;
import org.json.JSONException;


import pt.deti.ies.agendasaramago.communication.Configs;

@Service
public class Receiver {
    @Autowired private EventService eventService;
    @Autowired private CompanyService companyService;

    @RabbitListener(queues = Configs.RECV_QUEUE)
    public void receiveMessage(String message) throws ResourceNotFoundException {
        try {
            System.out.println("Received message: " + message);
            JSONObject jsonMessage = new JSONObject(message);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            if (jsonMessage.has("type") && jsonMessage.get("type") instanceof String) {
                String type = jsonMessage.getString("type");
                switch (type) {
                    case "event_created":
                        JSONObject eventJson = jsonMessage.getJSONObject("event");
                        Event event = new Event();

                        event.setName(eventJson.getString("name"));

                        event.setCompany(eventJson.getString("company"));


                        if (eventJson.has("tags") && eventJson.get("tags") instanceof JSONArray) {
                            JSONArray tagsArray = eventJson.getJSONArray("tags");
                            List<String> tags = new ArrayList<>();
                            for (int i = 0; i < tagsArray.length(); i++) {
                                tags.add(tagsArray.getString(i));
                            }
                            String tagsString = String.join(", ", tags);
                            event.setTags(tagsString);
                        }

                        event.setDescription(eventJson.getString("description"));

                        try {
                            Date data_inicio = sdf.parse(eventJson.getString("data_inicio"));
                            event.setDatestart(data_inicio);
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }
                        try {
                            String data_inicio_str = eventJson.getString("data_inicio");
                            Date data_inicio = "NULL".equals(data_inicio_str) ? null : sdf.parse(data_inicio_str);
                            event.setDatestart(data_inicio);
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }

                        event.setSchedule(eventJson.getString("schedule"));

                        event.setPoster(eventJson.getString("poster"));

                        JSONObject pricesJson = eventJson.getJSONObject("prices");
                        List<String> pricesList = new ArrayList<>();
                        for (String key : pricesJson.keySet()) {
                            String priceEntry = key + ": " + pricesJson.getInt(key);
                            pricesList.add(priceEntry);
                        }
                        String pricesString = String.join(", ", pricesList);
                        event.setPrices(pricesString);

                        event.setLocation(eventJson.getString("location"));

                        event.setCity(eventJson.getString("city"));

                        event.setDuration(eventJson.getInt("duration"));

                        event.setSeats(eventJson.getInt("seats"));

                        eventService.saveEvent(event);
                        System.out.println("EVENT ADDED!");
                        break;

                    case "company_created":
                        JSONObject companyJson = jsonMessage.getJSONObject("company");
                        Company new_company = new Company();
                        String company_name = companyJson.getString("name");
                        if (companyService.getCompanyByName(company_name) == null) {
                            new_company.setName(companyJson.getString("name"));
                            new_company.setCategory(companyJson.getString("categories"));
                            companyService.saveCompany(new_company);
                            System.out.println("COMPANY ADDED!");
                        }
                        break;
                    default:
                        System.err.println("Couldn't read message type.");
                        break;
                }

            } else {
                System.err.println("A chave 'type' não está presente ou não é uma string.");
            }
        } catch (JSONException e) { // Corrigindo a declaração catch
            System.err.println("Error parsing JSON: " + e.getMessage());
            e.printStackTrace();
        }
    }
}