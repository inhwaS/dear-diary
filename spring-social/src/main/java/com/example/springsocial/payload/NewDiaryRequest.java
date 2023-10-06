package com.example.springsocial.payload;

import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

/**
 * Created by rajeevkumarsingh on 02/08/17.
 */
public class NewDiaryRequest {

    @NotBlank
    @Email
    private String email;

    @DateTimeFormat
    private String begindt;

    @NotBlank
    private String diaryId;

    public String getEmail() {
        return email;
    }

    public String getBegindt() {
        return begindt;
    }

    public void setBegindt(String begindt) {
        this.begindt = begindt;
    }

    public String getDiaryId() {
        return diaryId;
    }
}

