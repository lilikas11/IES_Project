package pt.deti.ies.agendasaramago.services;

import pt.deti.ies.agendasaramago.repositories.UserPreferencesRepository;
import pt.deti.ies.agendasaramago.models.UserPreferences;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserPreferencesService {
    @Autowired
    private UserPreferencesRepository userprefRepository;

    public UserPreferences savePreference(UserPreferences userpref) {
        return userprefRepository.save(userpref);
    }

    public UserPreferences getAllPreferences(int id) {
        return userprefRepository.findByUserId(id).orElseThrow(() -> new RuntimeException());
    }

    public UserPreferences updatePreferences(int userId, String cities, String tags, String companies) {
        UserPreferences userPreferences = userprefRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Preferências do usuário não encontradas para o ID: " + userId));

        userPreferences.setCities(cities);
        userPreferences.setTags(tags);
        userPreferences.setCompanies(companies);

        return userprefRepository.save(userPreferences);
    }
}
