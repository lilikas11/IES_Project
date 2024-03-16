package pt.deti.ies.agendasaramago.controllers;

import pt.deti.ies.agendasaramago.models.UserPreferences;
import pt.deti.ies.agendasaramago.services.UserPreferencesService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
@RequestMapping("/api/user_preferences")

public class UserPreferencesController {

    @Autowired
    private UserPreferencesService userPreferencesService;

    @GetMapping("/{user_id}")
    ResponseEntity<UserPreferences> getAllPreferences(@PathVariable(value = "user_id") int user_id) {
        return ResponseEntity.ok().body(userPreferencesService.getAllPreferences(user_id));
    }

    @PutMapping("/{user_id}/update")
    ResponseEntity<UserPreferences> updatePreferences(@PathVariable("user_id") int user_id, @RequestBody Map<String, String> preferences) {

        String cities = preferences.get("cities");
        String tags = preferences.get("tags");
        String companies = preferences.get("companies");

        UserPreferences updatedPreferences = userPreferencesService.updatePreferences(user_id, cities, tags, companies);

        if (updatedPreferences != null) {
            return ResponseEntity.ok().body(updatedPreferences);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}