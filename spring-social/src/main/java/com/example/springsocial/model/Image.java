package com.example.springsocial.model;

import javax.persistence.*;

@Entity
@Table(name = "image")
public class Image {

    @Id
    @Column(length = 20)
    private String id;

    private String diaryId;

    private String begindt;

    private String content;

    private String name;

    private String type;

    private String writer;

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

    public void setBegindt(String begindt) {
        this.begindt = begindt;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDiaryId() {
        return diaryId;
    }

    public String getBegindt() {
        return begindt;
    }

    public String getContent() {
        return content;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }
}
