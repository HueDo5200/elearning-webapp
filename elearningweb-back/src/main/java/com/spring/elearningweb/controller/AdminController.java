package com.spring.elearningweb.controller;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.spring.elearningweb.domain.Administrator;
import com.spring.elearningweb.domain.Course;
import com.spring.elearningweb.domain.Student;
import com.spring.elearningweb.domain.Teacher;
import com.spring.elearningweb.model.UpdatePasswordInfo;
import com.spring.elearningweb.repository.AdministratorRepository;
import com.spring.elearningweb.repository.CourseRepository;
import com.spring.elearningweb.util.PasswordUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.List;
import java.util.Optional;

@RestController@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdministratorRepository administratorRepository;

    Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private CourseRepository courseRepository;
    @GetMapping("/find")
    public ResponseEntity<Administrator> getTeacherByUsername(@RequestParam("username") String username) {
        try {
            return new ResponseEntity<>(administratorRepository.findStaffByUsername(username), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/update/profile/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<Administrator> updateAdminProfile(@PathVariable int id, @RequestBody Administrator admin) {
        try {
            Optional<Administrator> adminData = administratorRepository.findById(id);
            if (adminData.isPresent()) {
                Administrator exAdmin = adminData.get();
                exAdmin.setUsername(admin.getUsername());
                exAdmin.setDob(admin.getDob());
                exAdmin.setFullName(admin.getFullName());
                exAdmin.setImage(admin.getImage());
                return new ResponseEntity<>(administratorRepository.save(exAdmin), HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping(value = "/course/unpublished/all")
    public ResponseEntity<List<Course>> findAllUnpublishedCourse() {
        try {

            List<Course> courses = courseRepository.findAllUnpublishedCourses();
            if(courses.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(courses, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/update/password/{adminId}", consumes = MediaType.APPLICATION_JSON_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordInfo info, @PathVariable int adminId) {
        try {
            JSONObject jsonObject = new JSONObject();
            Optional<Administrator> teacherData = administratorRepository.findById(adminId);
            if(!teacherData.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            String password = teacherData.get().getPassword();

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if(encoder.matches(info.getOldPassword(), password)) {
                jsonObject.put("existed", true);
                administratorRepository.updatePassword(PasswordUtil.encryptPassword(info.getNewPassword()), adminId);
                return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
            } else {
                jsonObject.put("existed", false);
                return new ResponseEntity<>(jsonObject.toString(),HttpStatus.NOT_FOUND);
            }

        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/upload/profile-image/{adminId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<String> uploadProfileImage(@RequestParam("file") MultipartFile file, @PathVariable int adminId) {
        try {
            JSONObject object = new JSONObject();
            InputStream stream = file.getInputStream();
            BufferedImage img = ImageIO.read(stream);
            ImageIO.write(img, "jpg", new File("C://Users//aerit//Documents//ReactProjects//learningweb//public//images//admin//admin" + adminId + ".jpg"));
//            Optional<Course> course = courseRepository.findById(courseId);
//            return new ResponseEntity<>(course.get(), HttpStatus.OK);
            String profileImg = "/images/admin/admin" + adminId + ".jpg";
            administratorRepository.updateProfileImage(profileImg, adminId);
            object.put("image", profileImg);
//            Optional<Administrator> studentData = administratorRepository.findById(adminId);
//            return studentData.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() ->
//                    new ResponseEntity<>(null, HttpStatus.NO_CONTENT));
            return new ResponseEntity<>(object.toString(), HttpStatus.OK);
        } catch(IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }


    }


}
