package com.spring.elearningweb.controller;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.spring.elearningweb.domain.*;
import com.spring.elearningweb.repository.CourseDetailRepository;
import com.spring.elearningweb.repository.CourseRepository;
import com.spring.elearningweb.repository.DiscussionRepository;
import com.spring.elearningweb.repository.TeacherRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.print.attribute.standard.Media;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController@RequestMapping("/course")
public class CourseController {
    Logger logger = LoggerFactory.getLogger(CourseController.class);
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private DiscussionRepository discussionRepository;



    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private CourseDetailRepository courseDetailRepository;


    @Value("${directory}")
    private String directory;
    @GetMapping("/all")
    public ResponseEntity<List<Course>> getAllCourses() {
        try {
            List<Course> courses = courseRepository.findAllPublishedCourses();
            if(courses.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/all/course-detail")
//    public ResponseEntity<List<CourseDetail>> getAllCourseDetails() {
//        try {
//            List<CourseDetail> courses = new ArrayList<>();
//            courseDetailRepository.findAllCourseDetails().forEach(courses::add);
//            if(courses.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//            return new ResponseEntity<>(courses, HttpStatus.OK);
//        } catch(Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @GetMapping("/{courseId}/{studentId}")
    public ResponseEntity<CourseDetail> findCourseDetailByCourseId(@PathVariable long courseId, @PathVariable long studentId) {
        try {
            CourseDetail detail = courseDetailRepository.findByCourseDetailById(courseId, studentId);

           return new ResponseEntity<>(detail, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> findCourseById(@PathVariable long id) {
        try {
            Optional<Course> courseData = courseRepository.findById(id);
            return courseData.map(course -> new ResponseEntity<>(course, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all/find")
    public ResponseEntity<List<Course>> searchCourses(@RequestParam("name") String name) {
        try {
            List<Course> courses = new ArrayList<>();
            courseRepository.findAllCourses(name).forEach(courses::add);
            if(courses.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all/available")
    public ResponseEntity<List<Course>> findAvailableCourses(@RequestParam("username") String username) {
        try {
            List<Course> courses = new ArrayList<>();
            courseRepository.findAvailableCourses(username).forEach(courses::add);
            if(courses.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all/paid")
    public ResponseEntity<List<Course>> findPaidCourses(@RequestParam("username") String username) {
        try {
            List<Course> courses = new ArrayList<>();
            courseRepository.findPaidCourses(username).forEach(courses::add);
            if(courses.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/reviews/{courseId}")
    public ResponseEntity<List<Review>> findAllReviews(@PathVariable long courseId) {
        try {
            List<Review> reviews = new ArrayList<>();
            courseRepository.findAllReviews(courseId).forEach(reviews::add);
            if(reviews.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




//@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@GetMapping("/all/student")
public ResponseEntity<List<Course>> findCoursesByUsername(@RequestParam("username") String username) {
        List<Course> courses = courseRepository.findByUsername(username);
        courses.forEach(course -> logger.info("courses " + course.toString()));
        try {
            if(courses.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

}




//    @GetMapping("/all/my")
//    public ResponseEntity<List<Course>> findMyCourses(@RequestParam("username") String username) {
//        List<Course> courses = courseRepository.findByName(username);
//        try {
//            if(courses.isEmpty()) {
//                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            }
//            return new ResponseEntity<>(courses, HttpStatus.OK);
//        } catch(Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//
//    }

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Course> saveCourse(@RequestBody Course course) {

        Course courseData = courseRepository.findByName(course.getName());
        if(courseData != null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        courseRepository.save(course);
    return new ResponseEntity<>(course, HttpStatus.OK);

    }
    @PutMapping(value = "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<Course> updateCourse(@PathVariable("id") Long id, @RequestBody Course course) {
     Optional<Course> courseData = courseRepository.findById(id);
     if(courseData.isPresent()) {
         Course gotCourse = courseData.get();

         gotCourse.setPrice(course.getPrice());
         gotCourse.setName(course.getName());
         gotCourse.setDiscount(course.getDiscount());
         gotCourse.setDescription(course.getDescription());
         gotCourse.setImage(course.getImage());
         gotCourse.setLevel(course.getLevel());
         gotCourse.setAvgRating(course.getAvgRating());
         gotCourse.setCommentNumber(course.getCommentNumber());
         return new ResponseEntity<>(courseRepository.save(gotCourse), HttpStatus.OK);
     } else {

         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
     }
    }

    @DeleteMapping("/delete/{id}")@CrossOrigin("http://localhost:3000")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") Long id) {
        try {
            Optional<Course> courseData = courseRepository.findById(id);
            Course course = courseData.get();
            String dir = course.getPreviewVideoPath();
            String imgDir = course.getImage();
            File file1 = new File(directory + dir);
            if(file1.exists()) {
                file1.delete();
            }
            File file2 = new File(directory + imgDir);
            if(file2.exists()) {
                file2.delete();
            }
            courseRepository.deleteById(id);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/video/{courseId}")
    public ResponseEntity<List<Video>> findAllVideosOfCourse(@PathVariable long courseId) {
        try {
            List<Video> videos = new ArrayList<>();
            courseRepository.findAllVideos(courseId).forEach(videos::add);
            if(videos.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(videos, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/notification/{courseId}")
    public ResponseEntity<List<Notification>> findNotificationByCourseIdAndUsername(@PathVariable long courseId, @RequestParam("username") String username) {
        try {

            List<Notification> notifications = new ArrayList<>();
            courseRepository.findAllNotification(courseId, username).forEach(notifications::add);
            logger.info(String.valueOf(notifications));
            if(notifications.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(notifications, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/discussion/{courseId}")
    public ResponseEntity<List<Discussion>> findAllDiscussion(@PathVariable long courseId) {
        try {

            List<Discussion> discussions = courseRepository.findAllDiscussion(courseId);
            if(discussions.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            logger.info("discussions " + discussions.size());
            return new ResponseEntity<>(discussions, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/answer/{courseId}")
    public ResponseEntity<List<Answer>> findAllAnswers(@PathVariable long courseId) {
        try {

            List<Answer> answers = discussionRepository.findAllAnswerByCourseId(courseId);
            if(answers.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            logger.info("ans " + answers.size());
            return new ResponseEntity<>(answers, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }




    }
    @PostMapping(value = "/answer/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Answer> saveCourse(@RequestBody Answer answer) {
        return new ResponseEntity<>(discussionRepository.save(answer), HttpStatus.OK);

    }

    @PutMapping(value = "/{courseId}/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<Course> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable long courseId) {
        try {
            logger.info("file " + file.getOriginalFilename());
//            InputStream stream = file.getInputStream();
            byte[] b = file.getBytes();

//            BufferedImage img = ImageIO.read(stream);
            File storedFile =  new File("C://Users//aerit//Documents//ReactProjects//learningweb//public//images/course");
            if(!storedFile.exists()) {
                storedFile.mkdirs();
            }
            FileOutputStream outputStream = new FileOutputStream(storedFile + "//course" + courseId + ".jpg");
            outputStream.write(b);
            outputStream.flush();
            outputStream.close();

//            ImageIO.write(img, "jpg", new File());
//            Optional<Course> course = courseRepository.findById(courseId);
//            return new ResponseEntity<>(course.get(), HttpStatus.OK);
            courseRepository.updateImage("/images/course/course" + courseId + ".jpg", courseId);
            Optional<Course> courseData = courseRepository.findById(courseId);
            return courseData.map(course -> new ResponseEntity<>(course, HttpStatus.OK)).orElseGet(() ->
                    new ResponseEntity<>(null, HttpStatus.NO_CONTENT));
        } catch(IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }


    }


    @PutMapping(value = "/upload/video/{courseId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<Course> uploadPreviewVideo(@RequestParam("file") MultipartFile file, @PathVariable long courseId) {
        try {
            logger.info("file " + file.getOriginalFilename());
            byte[] b = file.getBytes();

//            File newFile = new File("C://Users//aerit//Documents//ReactProjects//learningweb//public//videos");
//            if(!newFile.exists()) {
//                newFile.mkdirs();
//            }
//            FileOutputStream outputStream = new FileOutputStream(newFile + "//video" + courseId + ".mp4");
//            outputStream.write(b);
//            outputStream.flush();
//            outputStream.close();
            File newFile = new File("C://Users//aerit//Documents//ReactProjects//learningweb//public//videos//preview-video");
            if(!newFile.exists()) {
                newFile.mkdirs();
            }
            FileOutputStream outputStream = new FileOutputStream(newFile + "//video" + courseId + ".mp4");
            outputStream.write(b);
            outputStream.flush();
            outputStream.close();
            courseRepository.updatePreviewVideo("/videos/preview-video/video" + courseId + ".mp4", courseId);
            Optional<Course> courseData = courseRepository.findById(courseId);
            return courseData.map(course -> new ResponseEntity<>(course, HttpStatus.OK)).orElseGet(() ->
                    new ResponseEntity<>(null, HttpStatus.NO_CONTENT));
        } catch(IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }


    }

    @DeleteMapping(value = "/{courseId}/delete/preview-video")@CrossOrigin("http://localhost:3000")
    public ResponseEntity<Course> replacePreviewVideo(@PathVariable long courseId) {
        try {
           Optional<Course> courseData = courseRepository.findById(courseId);
           if(courseData.isPresent()) {
               String dir = courseData.get().getPreviewVideoPath();

               courseData.get().setPreviewVideoPath("");
               File file = new File("C://Users//aerit//Documents//ReactProjects//learningweb//public//" + dir);
               logger.info("dir " + dir);
               if(file.exists()) {
                   file.delete();
               }
           }
//            FileOutputStream outputStream = new FileOutputStream(newFile);
//            outputStream.write(b);
//            outputStream.flush();
//            outputStream.close();
//            courseRepository.updatePreviewVideo("/videos/video" + courseId + ".mp4", courseId);
            courseRepository.updatePreviewVideo("", courseId);
           return new ResponseEntity<>(courseData.get(), HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }


    }

    @PutMapping(value = "/update/course-status/{courseId}")@CrossOrigin("http://localhost:3000")
    public ResponseEntity<Course> updateCourseStatus(@RequestBody Course course, @PathVariable long courseId) {
        try {
            Optional<Course> courseData = courseRepository.findById(courseId);
            Course exCourse = null;
            if(courseData.isPresent()) {
                exCourse = courseData.get();
                int status = course.getAccepted();
                exCourse.setAccepted(status);
                courseRepository.updateCourseStatus(status, courseId);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(exCourse, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
