package com.example.springsocial.repository;

import com.example.springsocial.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, String> {

}
