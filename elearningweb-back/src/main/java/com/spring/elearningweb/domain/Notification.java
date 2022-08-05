package com.spring.elearningweb.domain;

import javax.persistence.*;
import java.util.Date;

@Entity@Table(name="notification")
public class Notification {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="course_id", nullable = false)
    private long courseId;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="content", nullable = false)
    private String content;

    @Column(name="link")
    private String link;

    @Column(name="teacher_name", nullable = false)
    private String teacherName;

    @Column(name="teacher_image")
    private String teacherImage;

    @Column(name="date_posted")@Temporal(TemporalType.DATE)
    private Date datePosted;
    @Column(name="student_name")
    private String studentName;

    public Notification() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getTeacherImage() {
        return teacherImage;
    }

    public void setTeacherImage(String teacherImage) {
        this.teacherImage = teacherImage;
    }

    public Date getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(Date datePosted) {
        this.datePosted = datePosted;
    }

    public long getCourseId() {
        return courseId;
    }

    public void setCourseId(long courseId) {
        this.courseId = courseId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }


}
