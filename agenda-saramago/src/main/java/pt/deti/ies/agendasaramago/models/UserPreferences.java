package pt.deti.ies.agendasaramago.models;

import javax.persistence.OneToOne;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;

import java.util.*;

@Entity
@Table(name="user_preferences")
public class UserPreferences{
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name="preferred_cities")
    private String cities;

    @Column(name="followed_tags")
    private String tags;

    @Column(name="followed_companies")
    private String companies;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCities() {
        return cities;
    }

    public void setCities(String cities) {
        this.cities = cities;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getCompanies() {
        return companies;
    }

    public void setCompanies(String companies) {
        this.companies = companies;
    }

    @Override
    public String toString() {
        return "UserPreferences{" +
                "id=" + id +
                ", user=" + user +
                ", cities='" + cities + '\'' +
                ", tags='" + tags + '\'' +
                ", companies='" + companies + '\'' +
                '}';
    }
}

