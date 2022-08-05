package com.spring.elearningweb.controller;

import com.nimbusds.jose.shaded.json.JSONArray;
import com.nimbusds.jose.shaded.json.JSONObject;
import com.spring.elearningweb.domain.*;
import com.spring.elearningweb.model.UpdatePasswordInfo;
import com.spring.elearningweb.repository.CartRepository;
import com.spring.elearningweb.repository.CourseDetailRepository;
import com.spring.elearningweb.repository.StudentRepository;
import com.spring.elearningweb.util.PasswordUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;
    Logger logger = LoggerFactory.getLogger(StudentController.class);

    @Autowired
    private CourseDetailRepository courseDetailRepository;

    @Autowired
    private CartRepository cartRepository;









    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAllStudent() {
        try {
            List<Student> students = studentRepository.findAll();
            System.out.println(students.size());
            if(students.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/find")
    public ResponseEntity<Student> findStudent(@RequestParam("username") String username) {
        try {
           Student student = studentRepository.findByUsername(username);
            return new ResponseEntity<>(student, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

@PostMapping(value = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveStudent(@RequestBody Student student) {
    try {

        Student stuData = studentRepository.findByUsername(student.getUsername());
        JSONObject jsonObject = new JSONObject();
       if(stuData != null) {
           logger.info("STUDENT " + stuData.toString());

           jsonObject.put("message", "Save course failed!");
           return new ResponseEntity<>(jsonObject.toString(), HttpStatus.BAD_REQUEST);
       }
       studentRepository.save(student);
       jsonObject.put("message", "Save course successfully!");
       return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);

    } catch(Exception e) {
        e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
}

@PostMapping(value = "/login/other", consumes = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<Student> loginWithGoogleOrFacebook(@RequestBody Student student) {
    try {

        Student stuData = studentRepository.findByEmail(student.getEmail());
        if(stuData != null) {
            return new ResponseEntity<>(stuData, HttpStatus.OK);
        }
            return new ResponseEntity<>(studentRepository.save(student), HttpStatus.OK);
    } catch(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@PutMapping(value = "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<Student> updateStudent(@PathVariable("id") Long id, @RequestBody Student student) {
    Optional<Student> studentData = studentRepository.findById(id);
    if(studentData.isPresent()) {
        Student exStudent = studentData.get();
        exStudent.setUsername(student.getUsername());
        exStudent.setEmail(student.getEmail() != null ? student.getEmail() : "");
        exStudent.setFacebook(student.getFacebook() != null ? student.getFacebook() : "");
        return new ResponseEntity<>(studentRepository.save(exStudent), HttpStatus.OK);
    } else {
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

}

@DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<HttpStatus> deleteStudent(@PathVariable Long id) {
      try {
          studentRepository.deleteById(id);
          return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      } catch(Exception e) {
          e.printStackTrace();
          return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }
}


    @GetMapping("/all/course/{id}")
    public ResponseEntity<List<Student>> findAllStudentsOfCourse(@PathVariable("id") Long id) {
        try {
            List<Student> students = studentRepository.findByCourseId(id);

            if(students.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all/name/{courseId}")
    public ResponseEntity<List<String>> findAllStudentName(@PathVariable long courseId) {
        try {
            List<Student> students = studentRepository.findByCourseId(courseId);
            if(students.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            List<String> nameList = new ArrayList<>();
            students.forEach((student -> nameList.add(student.getUsername())));
            return new ResponseEntity<>(nameList, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/pay/{studentId}/{courseId}")
    public ResponseEntity<String> makePayment(@PathVariable long studentId, @PathVariable long courseId, @RequestBody CourseDetail detail) {
        try {
            cartRepository.deleteFromCart(courseId, studentId);
            courseDetailRepository.save(detail);
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("message", "Save successfully!");
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/update/password/{studentId}", consumes = MediaType.APPLICATION_JSON_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordInfo info, @PathVariable long studentId) {
        try {
            JSONObject jsonObject = new JSONObject();
            Optional<Student> teacherData = studentRepository.findById(studentId);
            if(!teacherData.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            String password = teacherData.get().getPassword();

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if(encoder.matches(info.getOldPassword(), password)) {
                jsonObject.put("existed", true);
                studentRepository.updatePassword(PasswordUtil.encryptPassword(info.getNewPassword()), studentId);
                return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
            } else {
                jsonObject.put("existed", false);
                return new ResponseEntity<>(jsonObject.toString(), HttpStatus.NO_CONTENT);
            }
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping(value = "/upload/profile-image/{studentId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<String> uploadProfileImage(@RequestParam("file") MultipartFile file, @PathVariable long studentId) {
        try {
                JSONObject object = new JSONObject();
            InputStream stream = file.getInputStream();
            BufferedImage img = ImageIO.read(stream);
            ImageIO.write(img, "jpg", new File("C://Users//aerit//Documents//ReactProjects//learningweb//public//images/" + "user/user" + studentId + ".jpg"));
//            Optional<Course> course = courseRepository.findById(courseId);
//            return new ResponseEntity<>(course.get(), HttpStatus.OK);
            String path = "/images/user/user" + studentId + ".jpg";
           studentRepository.updateProfileImage(path, studentId);
           object.put("image", path);
//            Optional<Student> studentData = studentRepository.findById(studentId);
//            return studentData.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() ->
//                    new ResponseEntity<>(null, HttpStatus.NO_CONTENT));
            return new ResponseEntity<>(object.toString(), HttpStatus.OK);
        } catch(IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }


    }

}
