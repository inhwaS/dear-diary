package com.example.springsocial.model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "diary")
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String begindt;

    @Email
    @Column(nullable = false)
    private String email;

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setBegindt(String begindt) {
        this.begindt = begindt;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
