package com.spring.elearningweb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
@Entity@Table(name = "cart")
public class Cart {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "date_created")
    private Date dateCreated;
//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)

    @Column(name="student_id")
    private long studentId;
    @Column(name="course_id")
    private long courseId;
    public Cart() {

    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public long getStudentId() {
        return studentId;
    }

    public void setStudentId(long studentId) {
        this.studentId = studentId;
    }

    public long getCourseId() {
        return courseId;
    }

    public void setCourseId(long courseId) {
        this.courseId = courseId;
    }

    //    public Student getStudent() {
//        return student;
//    }
//
//    public void setStudent(Student student) {
//        this.student = student;
//    }
}
