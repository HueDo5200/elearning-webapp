package com.spring.elearningweb.controller;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.spring.elearningweb.domain.*;
import com.spring.elearningweb.model.UpdatePasswordInfo;
import com.spring.elearningweb.repository.TeacherRepository;

import com.spring.elearningweb.util.PasswordUtil;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.parsing.PassThroughSourceExtractor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController@RequestMapping("/teacher")
public class TeacherController {
    @Autowired
    private TeacherRepository teacherRepository;
    private Logger logger = LoggerFactory.getLogger(TeacherController.class);
    @GetMapping("/all")
    public ResponseEntity<List<Teacher>> getAllTeacher() {
        try {
            List<Teacher> teachers = new ArrayList<>();
            teacherRepository.findAll().forEach(teachers::add);
            if(teachers.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(teachers, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all/{searchText}")
    public ResponseEntity<List<Teacher>> searchCourses(@PathVariable String searchText) {
        try {
            List<Teacher> teachers = new ArrayList<>();
            teacherRepository.findAllTeachers(searchText).forEach(teachers::add);
            if(teachers.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(teachers, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all/course")
    public ResponseEntity<List<Course>> getAllCoursesOfTeacher(@RequestParam("teacherName") String teacherName)  {
        try {
            List<Course> courses = teacherRepository.findCoursesOfTeacher(teacherName);
            if(courses.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all/notifications/{courseId}")
    public ResponseEntity<List<Notification>> getAllNotificationsOfTeacher(@RequestParam("teacherName") String teacherName,@PathVariable long courseId)  {
        try {
            List<Notification> notifications = teacherRepository.findNotificationOfTeacher(teacherName, courseId);
            if(notifications.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(notifications, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Teacher> saveTeacher(@RequestBody Teacher teacher) {
        try {
            Teacher exTeacher = teacherRepository.findByUsername(teacher.getUsername());
            if(exTeacher != null) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(teacherRepository.save(teacher), HttpStatus.CREATED);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/admin/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<Teacher> adminUpdateTeacher(@PathVariable long id, @RequestBody Teacher teacher) {
        try {
        Optional<Teacher> teacherData = teacherRepository.findById(teacher.getId());
            if(teacherData.isPresent()) {
                Teacher exTeacher = teacherData.get();
                exTeacher.setDescription(teacher.getDescription());
                exTeacher.setDegree(teacher.getDegree());
                exTeacher.setProfessional(teacher.getProfessional());
                return new ResponseEntity<>(teacherRepository.save(exTeacher), HttpStatus.OK);
            }
          return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @DeleteMapping(value = "/delete/{id}")@CrossOrigin("http://localhost:3000")
    public ResponseEntity<HttpStatus> deleteTeacher(@PathVariable Long id) {
        try {
            teacherRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/find")
    public ResponseEntity<Teacher> getTeacherByUsername(@RequestParam("teacherName") String teacherName) {
        try {
            return new ResponseEntity<>(teacherRepository.findByUsername(teacherName), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping(value = "/update/profile", consumes = MediaType.APPLICATION_JSON_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<Teacher> updateTeacherProfile(@RequestBody Teacher teacher) {
        try {
            logger.info(" full name " + teacher.getFullName());
            Optional<Teacher> teacherData = teacherRepository.findById(teacher.getId());
            if(teacherData.isPresent()) {
                Teacher exTeacher = teacherData.get();
                exTeacher.setUsername(teacher.getUsername());
                exTeacher.setEmail(teacher.getEmail());
                exTeacher.setFacebook(teacher.getFacebook() != null ? teacher.getFacebook() : "");
                exTeacher.setDob(teacher.getDob());
                exTeacher.setFullName(teacher.getFullName());
                exTeacher.setDegree(teacher.getDegree());
                exTeacher.setProfessional(teacher.getProfessional());
                return new ResponseEntity<>(teacherRepository.save(exTeacher), HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/update/password/{teacherId}", consumes = MediaType.APPLICATION_JSON_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordInfo info, @PathVariable long teacherId) {
        try {
//$2a$12$JoRjJBth0IxMbIoHYzMEJO2TS.zCa..JEE03VHBe3nanUwFsJYzjO
            JSONObject jsonObject = null;
            Optional<Teacher> teacherData = teacherRepository.findById(teacherId);
            if(!teacherData.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            String password = teacherData.get().getPassword();

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if(encoder.matches(info.getOldPassword(), password)) {
                jsonObject = new JSONObject();
                jsonObject.put("existed", true);
                teacherRepository.updatePassword(PasswordUtil.encryptPassword(info.getNewPassword()), teacherId);
                return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
            } else {
                jsonObject = new JSONObject();
                jsonObject.put("existed", false);
                return new ResponseEntity<>(jsonObject.toString(), HttpStatus.NO_CONTENT);
            }
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/upload/profile-image/{teacherId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<String> uploadProfileImage(@RequestParam("file") MultipartFile file, @PathVariable long teacherId) {
        try {
            JSONObject object = new JSONObject();
            InputStream stream = file.getInputStream();
            BufferedImage img = ImageIO.read(stream);
            ImageIO.write(img, "jpg", new File("C://Users//aerit//Documents//ReactProjects//learningweb//public//images//teacher//teacher" + teacherId + ".jpg"));
//            Optional<Course> course = courseRepository.findById(courseId);
//            return new ResponseEntity<>(course.get(), HttpStatus.OK);
            String profileImg = "/images/teacher/teacher" + teacherId + ".jpg";
            teacherRepository.updateProfileImage(profileImg, teacherId);
            object.put("image", profileImg);
            return new ResponseEntity<>(object.toString(), HttpStatus.OK);
//            Optional<Teacher>  teacherData =  teacherRepository.findById( teacherId);
//            return  teacherData.map( teacher -> new ResponseEntity<>( teacher, HttpStatus.OK)).orElseGet(() ->
//                    new ResponseEntity<>(null, HttpStatus.NO_CONTENT));
        } catch(IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }


    }





}
