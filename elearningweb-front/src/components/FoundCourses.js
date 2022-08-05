import { useEffect, useRef, useState } from 'react';
import './Courses.css';
import axios from 'axios';
import CourseItem from './CourseItem';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import React from 'react';
export default function FoundCourses() {
    // const [mycourses, setMyCourses] = useState([]);
    // const dispatch = useDispatch();
    // const [api, setApi] = useState();
    const auth = useSelector((state) => state.auth);
    // let api = 'http://localhost:8084/course/all';
   
    // if(auth.user) {
    //     api = 'http://localhost:8084/course/all/available?username=' + auth.user;
    // } 
    const course = useSelector((state) => state.course);
    const searchedCourses = course.searchedCourses;
    
    return (
        <div className = "courses">
        <h2 className = 'courses-title'>FOUND COURSES</h2>
        <ul className = 'course-row'>
            
            {
               searchedCourses &&  searchedCourses.length > 0 &&  searchedCourses.map((item, i) =>(
                    <li key = {i}><CourseItem
                    id = {item.id}
                    name = {item.name}
                    image = {item.image}
                    avgRating = {item.avgRating}
                    price = {item.price}
                    discount = {item.discount}
                    discountEnd = {item.discountEnd}
                    teacherName = {item.teacherName}
                    ratingNumber = {item.ratingNumber}
                    />
                    </li>
                )) 
                
            }
        </ul>
    </div>
    )
           
}