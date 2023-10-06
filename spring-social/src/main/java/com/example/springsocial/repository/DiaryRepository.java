package com.example.springsocial.repository;

import com.example.springsocial.model.Diary;
import com.example.springsocial.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, String> {
    Boolean existsByEmail(String email);

    @Query("SELECT d FROM Diary d WHERE d.email = :email OR d.pemail = :email")
    Optional<Diary> findByEmail(@Param("email") String email);
}
