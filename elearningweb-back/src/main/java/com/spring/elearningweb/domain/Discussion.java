package com.spring.elearningweb.domain;

import javax.persistence.*;
import java.util.Date;
@Table(name="discussion")@Entity
public class Discussion {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="course_id")
    private long courseId;
    @Column(name="username")
    private String username;
    @Column(name="content")
    private String content;
    @Column(name="date_posted")@Temporal(TemporalType.TIMESTAMP)
    private Date datePosted;
    @Column(name="image")
    private String image;
    @Column(name="role")
    private String role;

public Discussion() {

}
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public Date getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(Date datePosted) {
        this.datePosted = datePosted;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
