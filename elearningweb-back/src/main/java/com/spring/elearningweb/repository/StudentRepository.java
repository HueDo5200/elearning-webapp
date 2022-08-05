package com.spring.elearningweb.repository;

import com.spring.elearningweb.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query("FROM Student where email =:email")
    Student findByEmail(@Param("email") String email);
    @Query("FROM Student where username =:username")
    Student findByUsername(@Param("username") String username);
    @Query(value = "Select distinct s.id, s.username, s.email, s.facebook, s.password, s.student_image from student s inner join course_detail d where s.id = d.student_id and d.course_id = ?1", nativeQuery = true)
    List<Student> findByCourseId(long courseId);
    @Transactional
    @Modifying
    @Query(value = "update student set password = ?1 where id = ?2", nativeQuery = true)
    void updatePassword(String password, long id);

    @Transactional
    @Modifying
    @Query(value = "update student set student_image = ?1 where id = ?2", nativeQuery = true)
    void updateProfileImage(String path, long id);







}
