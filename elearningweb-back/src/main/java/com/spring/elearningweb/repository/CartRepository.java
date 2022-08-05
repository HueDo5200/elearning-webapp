package com.spring.elearningweb.repository;

import com.spring.elearningweb.domain.Cart;
import com.spring.elearningweb.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Integer> {
@Query("FROM Cart where courseId=:courseId and studentId=:studentId")
    Optional<Cart> findByCourseIdAndStudentId(@Param("courseId") long courseId, @Param("studentId") long studentId);
@Transactional@Modifying@Query("DELETE FROM Cart where courseId=:courseId and studentId=:studentId")
    void deleteFromCart(@Param("courseId") long courseId, @Param("studentId") long studentId);
}
