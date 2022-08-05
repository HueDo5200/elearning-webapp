package com.spring.elearningweb.service;

import com.spring.elearningweb.domain.Administrator;
import com.spring.elearningweb.domain.Student;
import com.spring.elearningweb.domain.Teacher;
import com.spring.elearningweb.repository.AdministratorRepository;
import com.spring.elearningweb.repository.StudentRepository;
import com.spring.elearningweb.repository.TeacherRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtStudentService implements UserDetailsService {
    @Autowired
    StudentRepository studentRepository;

    @Autowired
            private TeacherRepository teacherRepository;

    @Autowired
            private AdministratorRepository administratorRepository;
    Logger logger = LoggerFactory.getLogger(JwtStudentService.class);
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("username " + username);
        Student student = studentRepository.findByUsername(username);
        Teacher teacher = teacherRepository.findByUsername(username);
        Administrator admin = administratorRepository.findStaffByUsername(username);

        User user = null;
        List<GrantedAuthority> roles;
        if(student != null){
            roles = new ArrayList<>();
            roles.add(new SimpleGrantedAuthority("student"));
              user = new User(username, student.getPassword(), roles);
        } else
        if(teacher != null){
            roles = new ArrayList<>();
            roles.add(new SimpleGrantedAuthority("teacher"));
            logger.info("teacher " + teacher.getPassword());
            user =new User(username, teacher.getPassword(), roles);

        } else if(admin != null) {
            roles = new ArrayList<>();
            roles.add(new SimpleGrantedAuthority("admin"));
            user =new User(username, admin.getPassword(), roles);
        } else {
            throw new UsernameNotFoundException("User not existed!");
        }

        return user;
    }
}
