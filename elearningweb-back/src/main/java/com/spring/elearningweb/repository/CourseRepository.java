package com.spring.elearningweb.repository;

import com.spring.elearningweb.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("FROM Course where accepted = 1")
    List<Course> findAllPublishedCourses();

    @Query("FROM Course where accepted = 0 or accepted = 2")
    List<Course> findAllUnpublishedCourses();

    @Query("FROM Course c where c.name LIKE %:name% OR c.teacherName LIKE %:name%")
    List<Course> findAllCourses(@Param("name") String name);

     @Query(value = "Select c.id, c.teacher_id, c.name, c.image, c.teacher_name, c.description, c.content, c.level, c.date_created, c.date_updated, c.discount, c.discount_end, c.is_bestseller, c.price, c.enrolled_number, c.comment_number, c.avg_rating, c.preview_video_path, c.accepted  FROM Course c inner join course_detail d on c.id = d.course_id inner join Student s on d.student_id = s.id and s.username=?1", nativeQuery = true)
    List<Course> findByUsername(String username);

     @Query(value = "select c.id, c.teacher_id, c.name, c.description, c.content, c.price, c.level, c.date_created, c.date_updated, c.discount, c.discount_end, c.image, c.is_bestseller, c.enrolled_number, c.comment_number, c.teacher_name, c.avg_rating, c.preview_video_path, c.accepted from course c where id not in (select course_id from course_detail inner join student where course_detail.student_id = student.id and student.username = ?1) and c.accepted = 1", nativeQuery = true)
     List<Course> findAvailableCourses(String username);

     @Query(value = "select c.id, c.teacher_id, c.name, c.description, c.content, c.price, c.level, c.date_created, c.date_updated, c.discount, c.discount_end, c.image, c.is_bestseller, c.enrolled_number, c.comment_number, c.teacher_name, c.avg_rating, c.preview_video_path, c.accepted from course c where id in (select course_id from course_detail inner join student where course_detail.student_id = student.id and student.username = ?1)", nativeQuery = true)
     List<Course> findPaidCourses(String username);

//    @Query("Select c.id, c.name, c.image, c.teacherName, c.level FROM Course c inner join CourseDetail d inner join Student s on d.studentId = s.id and d.courseId = c.id and s.username=?1")
//    List<Course> findByName(String name);

    @Query("FROM Course where name=:name")
    Course findByName(@Param("name") String name);

    @Query(value = "FROM Review where courseId=:courseId")
    List<Review> findAllReviews(@Param("courseId") long courseId);

    @Query(value = "FROM Video where courseId=:courseId")
    List<Video> findAllVideos(@Param("courseId") long courseId);

    @Query("FROM Notification where courseId=:courseId and studentName=:studentName")
    List<Notification> findAllNotification(long courseId, String studentName);

//    @Query("UPDATE Notification set studentComment=:studentComment where id=:id")
//    Optional<Notification> updateNotificationComment(@Param("studentComment") String studentComment, @Param("id") long id);

@Query("FROM Course where teacherId=:teacherId")
    List<Course> findAllCourseOfTeacher(@Param("teacherId") long teacherId);

@Query("FROM Discussion where courseId=:courseId")
    List<Discussion> findAllDiscussion(@Param("courseId") long courseId);

    @Query(value = "select c.id, c.teacher_id, c.name, c.description, c.content, c.price, c.level, c.date_created, c.date_updated, c.discount, c.discount_end, c.image, c.is_bestseller, c.enrolled_number, c.comment_number, c.teacher_name, c.avg_rating, c.preview_video_path, c.accepted from course c inner join cart on cart.course_id = c.id and cart.student_id = ?1", nativeQuery = true)
    List<Course> findCartItemByStudentId(long studentId);

    @Transactional
    @Modifying@Query(value = "update course set image = ?1 where id = ?2", nativeQuery = true)
    int updateImage(String name, long id);

    @Transactional
    @Modifying@Query(value = "update course set preview_video_path = ?1 where id = ?2", nativeQuery = true)
    int updatePreviewVideo(String previewVideo, long id);

    @Transactional
    @Modifying@Query(value = "update course set accepted = ?1 where id = ?2", nativeQuery = true)
    void updateCourseStatus(int status, long id);












}
