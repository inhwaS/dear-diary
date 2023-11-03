package com.example.springsocial.repository;

import com.example.springsocial.model.Celebration;
import com.example.springsocial.model.CelebrationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CelebrationRepository extends JpaRepository<Celebration, CelebrationId> {


}
