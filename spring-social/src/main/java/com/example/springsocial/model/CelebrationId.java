package com.example.springsocial.model;

import java.io.Serializable;
import java.util.Objects;


public class CelebrationId implements Serializable {

    private String diaryId;
    private Integer days;

    public CelebrationId(String id, int daysBetween) {
        this.diaryId = id;
        this.days = daysBetween;
    }

    public CelebrationId(){
        this.days = 0;
        this.diaryId = "";
    }

    public String getDiaryId() {
        return diaryId;
    }

    public int getDays() {
        return days;
    }

    public void setDiaryId(String diaryId) {
        this.diaryId = diaryId;
    }

    public void setDays(int days) {
        this.days = days;
    }

    // Implement equals and hashCode based on both fields
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CelebrationId that = (CelebrationId) o;
        return days == that.days && Objects.equals(diaryId, that.diaryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(diaryId, days);
    }

}
