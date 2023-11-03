package com.example.springsocial.controller;

public class DiaryContentOutput {

    private String diaryId;

    private String name;

    private String email;
    
    private String pname;
    
    private String begindt;

    private int days;

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public void setDiaryId(String diaryId) {
        this.diaryId = diaryId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public void setBegindt(String begindt) {
        this.begindt = begindt;
    }

    public String getDiaryId() {
        return diaryId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPname() {
        return pname;
    }

    public String getBegindt() {
        return begindt;
    }
}
