package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.Diary;
import com.example.springsocial.model.User;
import com.example.springsocial.model.UserDiaryDAO;
import com.example.springsocial.repository.DiaryRepository;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.CurrentUser;
import com.example.springsocial.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private DiaryRepository diaryRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserDiaryDAO getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

        UserDiaryDAO userDiaryDAO = new UserDiaryDAO();
        userDiaryDAO.setEmail(user.getEmail());
        userDiaryDAO.setId(user.getId());
        userDiaryDAO.setEmailVerified(user.getEmailVerified());
        userDiaryDAO.setImageUrl(user.getImageUrl());
        userDiaryDAO.setName(user.getName());
        userDiaryDAO.setProvider(user.getProvider());
        userDiaryDAO.setProviderId(user.getProviderId());

        Optional<Diary> diary = diaryRepository.findByEmail(userPrincipal.getEmail());
        if (diary.isPresent()){
            userDiaryDAO.setDiaryId(diary.get().getId());
        }

        return userDiaryDAO;
    }
}
