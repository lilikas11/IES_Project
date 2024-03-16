package pt.deti.ies.agendasaramago.controllers;

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

import pt.deti.ies.agendasaramago.models.Company;
import pt.deti.ies.agendasaramago.services.CompanyService;

import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/{id}")
    ResponseEntity<Company> getCompanyByName(@PathVariable(value = "id") int id) {
        return ResponseEntity.ok().body(companyService.getCompanyById(id));
    }

    @GetMapping("/name/{name}")
    ResponseEntity<Company> getCompanyByName(@PathVariable(value = "name") String name) {
        return ResponseEntity.ok().body(companyService.getCompanyByName(name));
    }

    @PostMapping("")
    ResponseEntity<Company> createCompany(@RequestBody Company company) {
        return ResponseEntity.ok().body(companyService.saveCompany(company));
    }
}