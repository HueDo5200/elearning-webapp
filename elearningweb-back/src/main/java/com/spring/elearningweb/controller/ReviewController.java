package com.spring.elearningweb.controller;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.spring.elearningweb.domain.Course;
import com.spring.elearningweb.domain.Review;
import com.spring.elearningweb.repository.ReviewRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController@RequestMapping("/review")
public class ReviewController {
    Logger logger = LoggerFactory.getLogger(ReviewController.class);
    @Autowired
    ReviewRepository reviewRepository;
    @PostMapping("/save")
    public ResponseEntity<Review> saveReview(@RequestBody Review review) {
            Optional<Review> exReview = reviewRepository.findByUsernameAndCourseId(review.getStudentName(), review.getCourseId());
            if(exReview.isPresent()) {
                logger.info("REVIEW existed!");
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(reviewRepository.save(review), HttpStatus.OK);

        }
    }

