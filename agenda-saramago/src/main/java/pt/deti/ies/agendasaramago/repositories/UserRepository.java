package pt.deti.ies.agendasaramago.repositories;

import pt.deti.ies.agendasaramago.models.User;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {
    public Optional<User> findByUsername(String username);
    public Optional<User> findByEmail(String email);
    @Query("SELECT u.password FROM User u WHERE u.email = :email")
    public Optional<String> findPasswordByEmail(@Param("email") String email);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}