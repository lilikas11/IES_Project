package pt.deti.ies.agendasaramago.controllers;

import pt.deti.ies.agendasaramago.models.User;
import pt.deti.ies.agendasaramago.services.UserService;

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
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    ResponseEntity<User> getUserByID(@PathVariable(value = "id") int id){
        return ResponseEntity.ok().body(userService.getUserById(id));
    }

    @PutMapping("/{id}/update")
    ResponseEntity<User> updateUserInfo(@PathVariable("id") int id, @RequestBody User userInfo) {
        return ResponseEntity.ok().body(userService.updateUser(userInfo));
    }

}
