package pt.deti.ies.agendasaramago.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.deti.ies.agendasaramago.models.User;
import pt.deti.ies.agendasaramago.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(int id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElse(null);
    }

    public User getUserByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        return optionalUser.orElse(null);
    }

    public User updateUser(User user) {
        Optional<User> userToUpdateOptional = userRepository.findById((int) user.getId());
        System.out.println(userToUpdateOptional);
        if (userToUpdateOptional.isPresent()) {
            User user_to_update = userToUpdateOptional.get();
            user_to_update.setUsername(user.getUsername());
            user_to_update.setEmail(user.getEmail());
            user_to_update.setPassword(user.getPassword());
            user_to_update.setBirthday(user.getBirthday());
            user_to_update.setName(user.getName());
            user_to_update.setBio(user.getBio());
            user_to_update.setProfile_pic(user.getProfile_pic());
            return userRepository.save(user_to_update);
        } else {
            return null;
        }
    }

}