package com.spring.elearningweb.repository;


import com.spring.elearningweb.domain.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DiscussionRepository extends JpaRepository<Answer, Long> {
    @Query("FROM Answer where courseId=:courseId order by datePosted")
    List<Answer> findAllAnswerByCourseId(@Param("courseId") long courseId);


}