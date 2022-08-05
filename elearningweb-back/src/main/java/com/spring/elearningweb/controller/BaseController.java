package com.spring.elearningweb.controller;

import com.spring.elearningweb.domain.Student;
import com.spring.elearningweb.util.PasswordUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@Controller
public class BaseController {
    protected String LOGIN_SESSION_KEY = "favorites_user";
    protected Logger logger = LoggerFactory.getLogger(this.getClass());
    protected static String PASSWORD_KEY = "@#$%^&*()OPG#$%^&*(HG";
    protected static String DES3_KEY = "9964DYByKL967c3308imytCB";
    protected static int COOKIE_TIMEOUT= 30*24*60*60;
    protected HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }
    protected HttpSession getSession() {
        return getRequest().getSession();
    }
    protected Student getStudent() {
        return (Student) getSession().getAttribute(LOGIN_SESSION_KEY);
    }
    protected String getStudentName() {
        String username = "";
        Student stu = getStudent();
        if(stu != null) {
            username = stu.getUsername();
        }
        return username;
    }

    protected String encryptPassword(String pwd) {
        try {
            String password = PasswordUtil.encryptPassword(pwd + PASSWORD_KEY);
            return password;
        } catch(Exception e) {
            e.printStackTrace();
        }
         return null;
    }
}
