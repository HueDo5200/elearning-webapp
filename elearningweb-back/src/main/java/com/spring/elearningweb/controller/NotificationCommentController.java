package com.spring.elearningweb.controller;

import com.spring.elearningweb.domain.Notification;
import com.spring.elearningweb.domain.NotificationComment;
import com.spring.elearningweb.repository.NotificationCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController@RequestMapping("/notification/comment")
public class NotificationCommentController {
    @Autowired
    private NotificationCommentRepository notificationCommentRepository;
        @PostMapping("/save")@CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<NotificationComment> saveNotificationComment(@RequestBody NotificationComment comment) {
            try {
            return new ResponseEntity<>(notificationCommentRepository.save(comment), HttpStatus.OK);
        } catch(Exception e) {
                e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{notificationId}")
    public ResponseEntity<List<NotificationComment>> findAllNotificationComments(@PathVariable long notificationId, @RequestParam("studentName") String studentName) {
            try {
                List<NotificationComment> comments = notificationCommentRepository.findAllByIdAndStudentName(notificationId, studentName);
                if(comments.isEmpty()) {
                    return new ResponseEntity<>(comments, HttpStatus.NO_CONTENT);
                }
                return new ResponseEntity<>(comments, HttpStatus.OK);
            } catch(Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }


    @GetMapping("/of/{notificationId}")
    public ResponseEntity<List<NotificationComment>> findAllNotificationComments(@PathVariable long notificationId) {
        try {
            List<NotificationComment> comments = notificationCommentRepository.findAllByNotificationId(notificationId);
            if(comments.isEmpty()) {
                return new ResponseEntity<>(comments, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
