package com.spring.elearningweb.domain;

import javax.persistence.*;
import java.util.Date;

@Entity@Table(name="notification_comments")
public class NotificationComment {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="notification_id")
    private long notificationId;
    @Column(name="student_name")
    private String studentName;
    @Column(name="student_comment")
    private String studentComment;
    @Column(name="date_posted")
    private Date datePosted;
    public NotificationComment() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(long notificationId) {
        this.notificationId = notificationId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }


    public String getStudentComment() {
        return studentComment;
    }

    public void setStudentComment(String studentComment) {
        this.studentComment = studentComment;
    }

    public Date getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(Date datePosted) {
        this.datePosted = datePosted;
    }
}
