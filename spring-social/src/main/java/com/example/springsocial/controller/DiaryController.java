package com.example.springsocial.controller;
import com.example.springsocial.model.DiaryData;
import com.example.springsocial.model.Image;
import com.example.springsocial.repository.ImageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
public class DiaryController {
    @Autowired
    ImageRepository imageRepository;

    @PostMapping("/writediary")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file, @RequestParam("diaryData") String data) throws IOException {
        Image image = new Image();
        image.setId(generateRandomString(20));
        image.setName(file.getOriginalFilename());
        image.setType(file.getContentType());
        image.setPicByte(compressBytes(file.getBytes()));

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // Parse the JSON string and convert it to a Java object
            DiaryData diaryData = objectMapper.readValue(data, DiaryData.class);
            image.setDiaryId(diaryData.getDiaryId());
            image.setBegindt(diaryData.getBegindt());
            image.setContent(diaryData.getContent());
            image.setWriter(diaryData.getWriter());
        } catch (Exception e) {
            e.printStackTrace();
        }

        imageRepository.save(image); // Save the image and receive the saved entity

        return ResponseEntity.ok(image);
    }

    @PostMapping("/opendiary")
    public ResponseEntity<?> opendiary(@RequestBody Map<String, String> request, HttpServletResponse response) throws IOException {
        String diaryId = request.get("diaryId");
        Optional<List<Image>> byDiaryId = imageRepository.findByDiaryId(diaryId);

        if (byDiaryId.isPresent()){
            List<Image> images = byDiaryId.get();
            for (Image image : images) {
                image.setPicByte(decompressBytes(image.getPicByte()));
                response.setContentType(image.getType());
            }
            images.sort((a, b) -> (b.getBegindt().compareTo(a.getBegindt())));
            return ResponseEntity.ok(images);

        }else{
            return ResponseEntity.ok(null);
        }
    }

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);

            try {
                outputStream.close();
            } catch (IOException e) {
            }
        }
        return outputStream.toByteArray();
    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException | DataFormatException ignored) {
        }

        return outputStream.toByteArray();
    }



    // Helper method to generate a random string of specified length
    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder randomString = new StringBuilder();

        Random random = new Random();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            randomString.append(characters.charAt(index));
        }

        return randomString.toString();
    }
}