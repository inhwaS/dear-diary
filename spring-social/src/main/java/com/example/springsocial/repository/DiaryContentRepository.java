package com.example.springsocial.repository;

import com.example.springsocial.model.Diary;
import com.example.springsocial.model.DiaryContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryContentRepository extends JpaRepository<DiaryContent, Long> {

    @Query("SELECT d FROM DiaryContent d WHERE d.diaryId = :diaryId")
    DiaryContent findByDiaryId(@Param("diaryId") String diaryId);

}
