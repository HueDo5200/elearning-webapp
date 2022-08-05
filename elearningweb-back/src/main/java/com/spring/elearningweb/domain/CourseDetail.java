package com.spring.elearningweb.domain;

import javax.persistence.*;
import java.util.Date;

@Entity@Table(name = "course_detail")
public class CourseDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="student_id")
    private long studentId;
    @Column(name="course_id")
    private long courseId;
    @Column(name="date_joined")@Temporal(TemporalType.DATE)
    private Date dateJoined;
    @Column(name="date_finished")@Temporal(TemporalType.DATE)
    private Date dateFinished;
    @Column(name="payment_status")
    private int paymentStatus;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Date getDateJoined() {
        return dateJoined;
    }

    public void setDateJoined(Date dateJoined) {
        this.dateJoined = dateJoined;
    }

    public Date getDateFinished() {
        return dateFinished;
    }

    public void setDateFinished(Date dateFinished) {
        this.dateFinished = dateFinished;
    }

    public int getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(int paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
