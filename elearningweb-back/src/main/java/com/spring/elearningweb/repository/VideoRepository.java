package com.spring.elearningweb.repository;

import com.spring.elearningweb.domain.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Integer> {
    @Query("FROM Video where name=:name")
    Video findByName(@Param("name") String name);
    @Query("FROM Video where courseId=:courseId")
    List<Video> findAllLessonOfCourse(@Param("courseId") long courseId);
    @Transactional
    @Modifying
    @Query(value = "update video set path = ?1 where id = ?2", nativeQuery = true)
    int uploadVideo(String path, long id);



}
