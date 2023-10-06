package com.example.springsocial.model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Random;

@Entity
@Table(name = "diary")
public class Diary {
    @Id
    private String id;

    @Column
    private String begindt;

    @Email
    @Column(nullable = false)
    private String email;

    @Email
    private String pemail;
    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPemail() {
        return pemail;
    }

    public void setBegindt(String begindt) {
        this.begindt = begindt;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setPemail(String pemail) {
        this.pemail = pemail;
    }

    public String getBegindt() {
        return begindt;
    }
}
