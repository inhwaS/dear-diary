package com.example.springsocial.model;

import javax.persistence.*;
@Entity
@Table(name = "celebration")
@IdClass(CelebrationId.class)
public class Celebration {
    @Id
    private String diaryId;

    @Id
    private int days;

    @Column
    private int sent;

    public int getSent() {
        return sent;
    }

    public void setSent(int sent) {
        this.sent = sent;
    }

    public void setDiaryId(String diaryId) {
        this.diaryId = diaryId;
    }

    public void setDays(int days) {
        this.days = days;
    }
}
