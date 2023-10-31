package com.example.springsocial.model;

import javax.persistence.*;

@Entity
@Table(name = "image")
public class Image {

    @Id
    @Column(length = 20)
    private String id;

    private String diaryId;
    @Column(length = 512)
    private String name;

    @Column(length = 128)
    private String type;

    @Lob
    private byte[] picByte;
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public byte[] getPicByte() {
        return picByte;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }

    public void setDiaryId(String diaryId) {
        this.diaryId = diaryId;
    }
}
