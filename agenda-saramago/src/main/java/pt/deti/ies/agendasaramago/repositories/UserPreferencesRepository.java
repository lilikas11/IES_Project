package pt.deti.ies.agendasaramago.repositories;

import pt.deti.ies.agendasaramago.models.UserPreferences;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPreferencesRepository extends JpaRepository<UserPreferences, Integer> {
    Optional<UserPreferences> findByUserId(int userId);
}