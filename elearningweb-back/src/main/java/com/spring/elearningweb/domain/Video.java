package com.spring.elearningweb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
@Entity
@Table(name = "video")
public class Video {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name", nullable = false)
   private String name;
    @Column(name = "description", nullable = false)
   private String description;
    @Column(name = "path", nullable = false)
   private String path;
    @Column(name = "script",nullable = false)
   private String script;
    @Column(name = "date_created")@Temporal(TemporalType.DATE)
   private Date dateCreated;
    @Column(name = "date_updated")@Temporal(TemporalType.DATE)
   private Date dateUpdated;
    @Column(name="course_id")
    private long courseId;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "course_id")
//    @JsonIgnore
//    private Course course;

    public Video() {}

//    public Course getCourse() {
//        return course;
//    }
//    public void setCourse(Course course) {
//        this.course = course;
//    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(Date dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    public long getCourseId() {
        return courseId;
    }

    public void setCourseId(long courseId) {
        this.courseId = courseId;
    }
}
