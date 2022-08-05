package com.spring.elearningweb.repository;

import com.spring.elearningweb.domain.Course;
import com.spring.elearningweb.domain.Notification;
import com.spring.elearningweb.domain.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    @Query("FROM Teacher where name=:name")
    Teacher findByName(@Param("name") String name);
    @Query("FROM Teacher where username=:username")
    Teacher findByUsername(@Param("username") String username);
    @Query("FROM Teacher where username LIKE %:searchText%")
    List<Teacher> findAllTeachers(@Param("searchText") String searchText);

    @Query("UPDATE Teacher set description = ?1, degree = ?2, professional = ?3 where id = ?4")
    Teacher updateTeacher(String description, String degree, String professional, long id);

    @Query("FROM Course where teacherName=:teacherName")
    List<Course> findCoursesOfTeacher(@Param("teacherName") String teacherName);
    @Query("FROM Notification where teacherName=:teacherName and courseId=:courseId")
    List<Notification> findNotificationOfTeacher(@Param("teacherName") String teacherName, @Param("courseId") long courseId);

    @Transactional
    @Modifying
    @Query(value = "update teacher set password = ?1 where id = ?2", nativeQuery = true)
    void updatePassword(String password, long id);

    @Transactional
    @Modifying
    @Query(value = "update teacher set teacher_image = ?1 where id = ?2", nativeQuery = true)
    void updateProfileImage(String path, long id);


//
//    @Query(value = "UPDATE teacher set username = ?1, email = ?2, facebook = ?3, dob = ?4, fullname = ?5, degree = ?6, professional = ?7 where id = ?8", nativeQuery = true)
//    Teacher updateProfile(String username, String email, String facebook, Date dob, String fullname, String degree, String professional,  long id);
}
