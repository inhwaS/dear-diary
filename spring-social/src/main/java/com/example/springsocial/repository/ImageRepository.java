package com.example.springsocial.repository;

import com.example.springsocial.model.Diary;
import com.example.springsocial.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, String> {
    @Query("SELECT i FROM Image i WHERE i.diaryId = :diaryId")
    Optional<List<Image>> findByDiaryId(@Param("diaryId") String diaryId);
}
