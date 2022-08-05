package com.spring.elearningweb.controller;

import com.spring.elearningweb.domain.Course;
import com.spring.elearningweb.domain.Student;
import com.spring.elearningweb.domain.Teacher;
import com.spring.elearningweb.domain.Video;
import com.spring.elearningweb.repository.VideoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;


@RestController@RequestMapping("/course/lesson")
public class VideoController {
@Autowired
private VideoRepository videoRepository;

@Value("${directory}")
private String directory;
private Logger logger = LoggerFactory.getLogger(VideoController.class);
    @GetMapping("/all/{courseId}")
    public ResponseEntity<List<Video>> getAllLessonOfCourse(@PathVariable long courseId) {
        try {
            List<Video> videos = videoRepository.findAllLessonOfCourse(courseId);
            return new ResponseEntity<>(videos, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Video> saveTeacher(@RequestBody Video video) {
        try {
            Video exVideo = videoRepository.findByName(video.getName());
            if(exVideo != null) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(videoRepository.save(video), HttpStatus.CREATED);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<Video> updateLessonVideo(@PathVariable int id, @RequestBody Video video) {
        try {
            Optional<Video> videoData = videoRepository.findById(id);
            if(videoData.isPresent()) {
                Video exVideo = videoData.get();
                exVideo.setName(video.getName());
                exVideo.setDescription(video.getDescription());
                exVideo.setDateUpdated(video.getDateUpdated());
                return new ResponseEntity<>(videoRepository.save(exVideo), HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/delete/{id}")@CrossOrigin("http://localhost:3000")
    public ResponseEntity<HttpStatus> deleteLesson(@PathVariable int id) {
        try {
            Optional<Video> videoData = videoRepository.findById(id);
            if(videoData.isPresent()) {
                String dir = videoData.get().getPath();
                File file = new File(directory + dir);
                if(file.exists()) {
                    file.delete();
                }
            }
            videoRepository.deleteById(id);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/delete/video/{id}")@CrossOrigin("http://localhost:3000")
    public ResponseEntity<HttpStatus> deleteVideoOfLesson(@PathVariable int id) {
        try {
            Optional<Video> videoData = videoRepository.findById(id);
            if(videoData.isPresent()) {
                String dir = videoData.get().getPath();
                File file = new File(directory + dir);
                if(file.exists()) {
                    file.delete();
                }
            }
        videoRepository.uploadVideo("", id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/{courseId}/{lessonId}/upload/video/{number}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)@CrossOrigin("http://localhost:3000")
    public ResponseEntity<Video> uploadVideo(@RequestParam("file") MultipartFile file,@PathVariable long courseId, @PathVariable int lessonId, @PathVariable long number) {
        try {
//

            byte[] b = file.getBytes();
            File newFile = new File("C://Users//aerit//Documents//ReactProjects//learningweb//public//videos//course-"  + courseId);
            if(!newFile.exists()) {
                newFile.mkdirs();
            }
            FileOutputStream outputStream = new FileOutputStream(newFile + "//lesson" + number + ".mp4");
            outputStream.write(b);
            outputStream.flush();
            outputStream.close();
            videoRepository.uploadVideo("/videos/course-" + courseId +  "/lesson" + number + ".mp4", lessonId);
            Optional<Video> videoData = videoRepository.findById(lessonId);

            return videoData.map(video -> new ResponseEntity<>(video, HttpStatus.OK)).orElseGet(() ->
                    new ResponseEntity<>(null, HttpStatus.NO_CONTENT));
        } catch(IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }


    }


}
