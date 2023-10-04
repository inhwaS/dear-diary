package com.example.springsocial.repository;

import com.example.springsocial.model.Diary;
import com.example.springsocial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {
    Boolean existsByEmail(String email);

}
