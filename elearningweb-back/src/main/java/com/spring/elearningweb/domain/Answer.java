package com.spring.elearningweb.domain;

import javax.persistence.*;
import java.util.Date;

@Entity@Table(name="answer")
public class Answer {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="course_id")
    private long courseId;
    @Column(name="question_id")
    private long questionId;
    @Column(name="username")
    private String username;
    @Column(name="image", nullable = true)
    private String image;
    @Column(name="content")
    private String content;
    @Column(name="role")
    private String role;
    @Column(name="date_posted")
    private Date datePosted;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getCourseId() {
        return courseId;
    }

    public void setCourseId(long courseId) {
        this.courseId = courseId;
    }

    public long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(long questionId) {
        this.questionId = questionId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Date getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(Date datePosted) {
        this.datePosted = datePosted;
    }
}
