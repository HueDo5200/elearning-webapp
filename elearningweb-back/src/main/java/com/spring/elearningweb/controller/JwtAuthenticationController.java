package com.spring.elearningweb.controller;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.spring.elearningweb.config.JwtTokenUtil;
import com.spring.elearningweb.domain.Administrator;
import com.spring.elearningweb.domain.Student;
import com.spring.elearningweb.domain.Teacher;
import com.spring.elearningweb.model.JwtRequest;
import com.spring.elearningweb.repository.AdministratorRepository;
import com.spring.elearningweb.repository.StudentRepository;
import com.spring.elearningweb.repository.TeacherRepository;
import com.spring.elearningweb.service.JwtStudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;


@RestController
@CrossOrigin
public class JwtAuthenticationController {
    Logger logger = LoggerFactory.getLogger(JwtAuthenticationController.class);
    @Autowired
    private AuthenticationManager manager;
    @Autowired
    private JwtTokenUtil jwtUtil;
    @Autowired
    private JwtStudentService jwtService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private AdministratorRepository administratorRepository;


    @PostMapping(value = "/auth")
    public ResponseEntity<?> generateAuthToken(@RequestBody JwtRequest request) throws Exception {
        JSONObject jsonObject = null;
        String username = request.getUsername();
        String password = request.getPassword();

        Objects.requireNonNull(username);
        Objects.requireNonNull(password);
        try {
            manager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch(DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch(BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        } catch(Exception e) {
            e.printStackTrace();
        }


        final UserDetails details = jwtService.loadUserByUsername(username);

        String role = details.getAuthorities().toString();
        final String token = jwtUtil.generateToken(details);
        if(role.equalsIgnoreCase("[teacher]")) {
           Teacher teacher = teacherRepository.findByUsername(username);
            jsonObject = new JSONObject();
           jsonObject.put("userId", teacher.getId());
           jsonObject.put("userImage", teacher.getTeacherImage() != null ? teacher.getTeacherImage() : "/images/user/unknown.jpg");
            jsonObject.put("user", details.getUsername());
            jsonObject.put("role", "teacher");
        } else if(role.equalsIgnoreCase("[student]")){
            Student student = studentRepository.findByUsername(username);
            jsonObject = new JSONObject();
             jsonObject.put("userId", student.getId());
            String studentImage = student.getStudentImage();
            jsonObject.put("userImage", studentImage != null ? studentImage : "/images/user/unknown.jpg");
            jsonObject.put("user", details.getUsername());
            jsonObject.put("role", "student");
        } else {
            Administrator admin = administratorRepository.findStaffByUsername(username);
            jsonObject = new JSONObject();
            jsonObject.put("userId", admin.getId());
            String adminImage = admin.getImage();
            jsonObject.put("userImage", adminImage != null ? adminImage : "/images/user/unknown.jpg");
            jsonObject.put("user", details.getUsername());
            jsonObject.put("role", "admin");
        }
        jsonObject.put("token", token);

        return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
    }

//    @PostMapping("/teacher/auth")
//    public ResponseEntity<?> teacherAuthenticate(@RequestBody JwtRequest request) throws Exception {
//        JSONObject object = new JSONObject();
//        String username = request.getUsername();
//        String password = request.getPassword();
//        Objects.requireNonNull(username);
//        Objects.requireNonNull(password);
//        try {
//            manager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
//        } catch(DisabledException e) {
//            throw new Exception("USER_DISABLED", e);
//        } catch(BadCredentialsException e) {
//            throw new Exception("INVALID_CREDENTIALS", e);
//        } catch(Exception e) {
//            e.printStackTrace();
//        }
//        final UserDetails teacherDetails = jwtTeacherService.loadUserByUsername(username);
//        Teacher teacher = teacherRepository.findByUsername(username);
//        final String token = jwtUtil.generateToken(teacherDetails);
//        object.put("id", teacher.getId());
//        object.put("teacherName", teacher.getUsername());
//        object.put("role", "teacher");
//        object.put("token", token);
//        return new ResponseEntity<>(object.toString(), HttpStatus.OK);
//
//
//    }
}
