package com.spring.elearningweb.repository;

import com.spring.elearningweb.domain.Notification;
import com.spring.elearningweb.domain.NotificationComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationCommentRepository extends JpaRepository<NotificationComment, Long> {
    @Query("FROM NotificationComment where notificationId=:notificationId and studentName=:studentName")
    List<NotificationComment> findAllByIdAndStudentName(@Param("notificationId") long notificationId, String studentName);

    @Query("FROM NotificationComment where notificationId=:notificationId")
    List<NotificationComment> findAllByNotificationId(@Param("notificationId") long notificationId);
}
