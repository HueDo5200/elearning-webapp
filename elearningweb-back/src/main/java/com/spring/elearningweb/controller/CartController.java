package com.spring.elearningweb.controller;

import com.spring.elearningweb.domain.Cart;
import com.spring.elearningweb.domain.Course;
import com.spring.elearningweb.repository.CartRepository;
import com.spring.elearningweb.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartRepository cartRepository;
@Autowired
private CourseRepository courseRepository;
    @GetMapping("/all")
    public ResponseEntity<List<Cart>> getAllCart() {
        try {
            List<Cart> carts = cartRepository.findAll();
            if(carts.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(carts, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/all/{id}")
    public ResponseEntity<List<Course>> findAllCartByStudentId(@PathVariable long id) {
        try {
            List<Course> carts = courseRepository.findCartItemByStudentId(id);
            if(carts.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(carts, HttpStatus.OK);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Cart> saveCart(@RequestBody Cart cart) {

        try {
            Optional<Cart> exCart = cartRepository.findByCourseIdAndStudentId(cart.getCourseId(), cart.getStudentId());
            if(exCart.isPresent()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(cartRepository.save(cart), HttpStatus.CREATED);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Cart> updateCart(@RequestBody Cart Cart) {
        try {
            return new ResponseEntity<>(cartRepository.save(Cart), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/delete/{courseId}/{studentId}")@CrossOrigin("http://localhost:3000")
    public ResponseEntity<HttpStatus> deleteCart(@PathVariable long courseId, @PathVariable long studentId) {
        try {
            Optional<Cart> cartData = cartRepository.findByCourseIdAndStudentId(courseId, studentId);
            cartData.ifPresent(cart -> cartRepository.deleteById(cart.getId()));
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
