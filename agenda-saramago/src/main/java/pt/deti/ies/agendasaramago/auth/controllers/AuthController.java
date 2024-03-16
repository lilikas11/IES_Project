package pt.deti.ies.agendasaramago.auth.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pt.deti.ies.agendasaramago.repositories.UserRepository;
import pt.deti.ies.agendasaramago.repositories.UserPreferencesRepository;
import pt.deti.ies.agendasaramago.models.User;
import pt.deti.ies.agendasaramago.models.UserPreferences;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import pt.deti.ies.agendasaramago.auth.security.ASPasswordEncoder;
import java.util.Optional;
import org.json.JSONObject;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPreferencesRepository userPreferencesRepository;

    @Autowired
    private ASPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already registered.");
        }

        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already taken.");
        }

        user.setUsername(user.getUsername());
        user.setEmail(user.getEmail());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setBirthday(user.getBirthday());
        user.setName(user.getName());
        if (user.getProfile_pic() != null){
            user.setProfile_pic(user.getProfile_pic());
        }

        User savedUser = userRepository.save(user);

        UserPreferences userPreferences = new UserPreferences();
        userPreferences.setUser(savedUser);
        userPreferences.setCities("Aveiro");
        userPreferencesRepository.save(userPreferences);

        return ResponseEntity.ok("User registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        Optional<String> hashedPasswordFromDatabase = userRepository.findPasswordByEmail(user.getEmail());
        Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
        JSONObject jsonMessage = new JSONObject();
        if (hashedPasswordFromDatabase.isPresent() && passwordEncoder.matches(user.getPassword(), hashedPasswordFromDatabase.get())) {
            User userFromDatabase = userOptional.get();
            jsonMessage.put("status", "success");
            jsonMessage.put("user_id",userFromDatabase.getId());
        } else {
            jsonMessage.put("status", "failed");
        }
        return new ResponseEntity<>(jsonMessage.toString(), HttpStatus.OK);
    }
}
