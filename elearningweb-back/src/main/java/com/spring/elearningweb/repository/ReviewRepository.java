package com.spring.elearningweb.repository;

import com.spring.elearningweb.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("FROM Review where studentName=:studentName and courseId=:courseId")
    Optional<Review> findByUsernameAndCourseId(@RequestParam("studentName") String studentName, @RequestParam("courseId") long courseId);
}
