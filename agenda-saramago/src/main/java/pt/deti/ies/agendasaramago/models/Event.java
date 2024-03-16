package pt.deti.ies.agendasaramago.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Table(name= "Event")
@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "company")
    private String company;
    @Column(name = "description", columnDefinition="TEXT")
    private String description;
    @Column(name = "tags")
    private String tags;
    @Column(name = "duration")
    private int duration;
    @Column(name = "datestart")
    @Temporal(TemporalType.TIMESTAMP)
    private Date datestart;
    @Column(name = "dateend")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateend;
    @Column(name = "schedule")
    private String schedule;
    @Column(name = "poster")
    private String poster; //exemplo : "uploads/1.png"
    @Column(name = "prices")
    private String prices;
    @Column(name = "location")
    private String location;
    @Column(name = "city")
    private String city;
    @Column(name = "seats")
    private int seats;
    @Column(name = "seats_not_available")
    private int seats_not_available;

    public Event() {}

    public Event(String name, String company, String description, String tags,int duration, Date date_start, Date date_end, String schedule, String poster, String prices, String location, String city, int seats, int seats_not_available){
        this.name = name;
        this.company = company;
        this.description = description;
        this.tags = tags;
        this.duration= duration;
        this.datestart = datestart;
        this.dateend = dateend;
        this.schedule = schedule;
        this.poster = poster;
        this.prices = prices;
        this.location = location;
        this.city = city;
        this.seats=seats;
        this.seats_not_available = seats_not_available;
    }

    
    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Date getDatestart() {
        return datestart;
    }

    public void setDatestart(Date datestart) {
        this.datestart = datestart;
    }

    public Date getDateend() {
        return dateend;
    }
    public void setDateend(Date dateend) {
        this.dateend = dateend;}

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getPrices() {
        return prices;
    }

    public void setPrices(String prices) {
        this.prices = prices;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCity() {
        return city;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getSeats() {
        return seats;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }

    public int getSeats_not_available() {
        return seats_not_available;
    }

    public void setSeats_not_available(int seats_not_available) {
        this.seats_not_available = seats_not_available;
    }

    private String escapeString(String input) {
        return input != null ? input.replace("'", "\\'") : "null";
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + this.id +
                ", name='" + this.name + '\'' +
                ", company='" + this.company + '\'' +
                ", description='" + this.description + '\'' +
                ", tags='" + this.tags + '\'' +
                ", duration=" + this.duration +
                ", datestart=" + this.datestart +
                ", dateend=" + this.dateend +
                ", schedule='" + this.schedule + '\'' +
                ", poster='" + this.poster + '\'' +
                ", prices='" + this.prices + '\'' +
                ", location='" + this.location + '\'' +
                ", city='" + this.city + '\'' +
                ", seats='" + this.seats + '\'' +
                '}';
    }



    

}