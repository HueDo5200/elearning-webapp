package com.spring.elearningweb.repository;

import com.spring.elearningweb.domain.CourseDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseDetailRepository extends JpaRepository<CourseDetail, Long> {
    @Query("FROM CourseDetail")
    List<CourseDetail> findAllCourseDetails();

    @Query(value = "FROM CourseDetail where courseId=:courseId and studentId=:studentId")
    CourseDetail findByCourseDetailById(@Param("courseId") long courseId, @Param("studentId") long studentId);
}
