package com.example.springsocial.payload;

import org.springframework.web.multipart.MultipartFile;

public class WriteDiaryInput {
    private NewDiaryRequest newDiaryRequest;
    private MultipartFile imageFile;

    public NewDiaryRequest getNewDiaryRequest() {
        return newDiaryRequest;
    }

    public MultipartFile getImageFile() {
        return imageFile;
    }
}
