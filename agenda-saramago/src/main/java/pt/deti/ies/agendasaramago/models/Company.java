package pt.deti.ies.agendasaramago.models;

import pt.deti.ies.agendasaramago.models.Event;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import java. util.*;

@Entity
@Table(name="Company")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comp_id")
    private int id;
    @Column(name = "comp_name")
    private String name;
    @Column(name = "comp_category")
    private String category;

    public Company() {
    }

    public Company(int id, String name, String category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Company{" +
                "id='" + this.id + '\'' +
                "name='" + this.name + '\'' +
                ", category='" + this.category + '\'' +
                '}';
    }
}