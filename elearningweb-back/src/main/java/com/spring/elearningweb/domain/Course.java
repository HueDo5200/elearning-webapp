package com.spring.elearningweb.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity@Table(name = "course")
public class Course {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String description;
    @Column(name = "price", precision = 5, scale = 1)
    private double price;

    @Column(name = "content")
    private String content;

    @Column(name="level")
    private int level;

    @Column(name = "date_created")@Temporal(TemporalType.DATE)
    private Date dateCreated;

    @Column(name = "date_updated")@Temporal(TemporalType.DATE)
    private Date dateUpdated;

    @Column(name = "discount", nullable = false)
    private int discount;

    @Column(name="discount_end")
    private Date discountEnd;

    @Column(name = "image", nullable = false)
    private String image;

    @Column(name = "is_bestseller", nullable = false)
    private boolean isBestseller;

    @Column(name = "enrolled_number", nullable = false)
    private int enrolledNumber;

    @Column(name = "comment_number", nullable = false)
    private  int commentNumber;

    @Column(name = "teacher_name", nullable = false)
    private String teacherName;

    @Column(name = "avg_rating",precision = 2, scale = 1)
    private double avgRating;

    @Column(name = "preview_video_path", nullable = false)
    private String previewVideoPath;
    @Column(name="teacher_id", nullable = false)
    private Long teacherId;

    @Column(name="accepted")
    private int accepted;

//    @JsonIgnore
//    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "teacher_id")@JsonIgnore
//    private Teacher teacher;

//    @OneToMany(targetEntity = Video.class, mappedBy = "course", fetch = FetchType.LAZY, cascade = CascadeType.ALL)@JsonIgnore
//    private Set<Video> videos;

    @ManyToMany(mappedBy = "courses", fetch = FetchType.LAZY)@JsonIgnore
    private Set<Student> students;

    public Course() {

    }
    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
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

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isBestseller() {
        return isBestseller;
    }

    public void setBestseller(boolean bestseller) {
        isBestseller = bestseller;
    }

    public int getEnrolledNumber() {
        return enrolledNumber;
    }

    public void setEnrolledNumber(int enrolledNumber) {
        this.enrolledNumber = enrolledNumber;
    }

    public int getCommentNumber() {
        return commentNumber;
    }

    public void setCommentNumber(int commentNumber) {
        this.commentNumber = commentNumber;
    }

//    public Teacher getTeacher() {
//        return teacher;
//    }
//
//    public void setTeacher(Teacher teacher) {
//        this.teacher = teacher;
//    }

//    public Set<Video> getVideos() {
//        return videos;
//    }
//
//    public void setVideos(Set<Video> videos) {
//        this.videos = videos;
//    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public double getAvgRating() { return avgRating;}

    public void setAvgRating(double rating) { this.avgRating = rating;}

    public String getPreviewVideoPath() { return previewVideoPath;}

    public void setPreviewVideoPath(String previewVideoPath) {this.previewVideoPath = previewVideoPath;}

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public Date getDiscountEnd() {
        return discountEnd;
    }

    public void setDiscountEnd(Date discountEnd) {
        this.discountEnd = discountEnd;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public int getAccepted() {
        return accepted;
    }

    public void setAccepted(int accepted) {
        this.accepted = accepted;
    }

    @Override
    public String toString() {
        return "Course " + this.id + this.content + ", " + this.getName();
    }
}
