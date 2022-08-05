package com.spring.elearningweb.domain;

import javax.persistence.*;
import java.util.Date;
@Entity@Table(name="review")
public class Review {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="course_id", nullable = false)
    private long courseId;

    @Column(name="student_name", nullable = false)
    private String studentName;

    @Column(name="student_image")
    private String studentImage;

    @Column(name="review", nullable = false)
    private String review;

    @Column(name="user_rating", nullable = false)
    private double userRating;

    @Column(name="review_date", nullable = false)
    private Date reviewDate;
    public Review() {

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

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getStudentImage() {
        return studentImage;
    }

    public void setStudentImage(String studentImage) {
        this.studentImage = studentImage;
    }


    public double getUserRating() {
        return userRating;
    }

    public void setUserRating(double userRating) {
        this.userRating = userRating;
    }

    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }
}

