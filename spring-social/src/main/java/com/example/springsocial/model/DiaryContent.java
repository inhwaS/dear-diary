package com.example.springsocial.model;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Table(name = "diary_content")
public class DiaryContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String diaryId;

    @Column
    private String content;


    public void setId(Long id) {
        this.id = id;
    }

    public void setDiaryId(String diaryId) {
        this.diaryId = diaryId;
    }

    public Long getId() {
        return id;
    }

    public String getDiaryId() {
        return diaryId;
    }
}
