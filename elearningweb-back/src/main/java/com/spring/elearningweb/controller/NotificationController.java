package com.spring.elearningweb.controller;

import com.spring.elearningweb.domain.Course;
import com.spring.elearningweb.domain.Notification;
import com.spring.elearningweb.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import javax.swing.text.html.Option;
import java.util.Optional;

@RestController@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;
//    @PutMapping("/update/{id}")@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.PUT})
//    public ResponseEntity<Notification> updateNotificationComment(@PathVariable long id, @RequestBody Notification notification) {
//        Optional<Notification> notData = notificationRepository.findById(id);
//        if(notData.isPresent()) {
//            Notification one = notData.get();
//            one.setStudentComment(notification.getStudentComment());
//            return new ResponseEntity<>(notificationRepository.save(one), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
    @PutMapping(value = "/teacher/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.PUT})
    public ResponseEntity<Notification> updateTeacher(@PathVariable long id, @RequestBody Notification notification) {
        try {
            Optional<Notification> notData = notificationRepository.findById(id);
            Notification not = notData.get();
            if(notData.isPresent()) {
                not.setTitle(notification.getTitle());
                not.setContent(notification.getContent());
                not.setDatePosted(notification.getDatePosted());
                not.setLink(notification.getLink());
                return new ResponseEntity<>(notificationRepository.save(not), HttpStatus.OK);
            }
            return new ResponseEntity<>(notificationRepository.save(notification), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/teacher/create", consumes = MediaType.APPLICATION_JSON_VALUE)@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.POST})
    public ResponseEntity<Notification> saveNotification(@RequestBody Notification not) {

        return new ResponseEntity<>(notificationRepository.save(not), HttpStatus.OK);

    }

    @DeleteMapping(value = "/delete/{id}")@CrossOrigin("http://localhost:3000")
    public ResponseEntity<HttpStatus> deleteTeacher(@PathVariable Long id) {
        try {
            notificationRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
