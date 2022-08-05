import { useEffect, useRef, useState } from 'react';
import './Courses.css';
import axios from 'axios';
import CourseItem from './CourseItem';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import MyCourse from './MyCourse';
import { getAllCourses, getAvailableCourses } from '../actions/courseAction';
export default function Courses() {
    // const [courses, setCourses] = useState([])
    const [mycourses, setMyCourses] = useState([]);
    const dispatch = useDispatch();
    // const [api, setApi] = useState();
    const auth = useSelector((state) => state.auth);
    // let api = 'http://localhost:8084/course/all';
   
    // if(auth.user) {
    //     api = 'http://localhost:8084/course/all/available?username=' + auth.user;
    // } 
    // const course = useSelector((state) => state.course);
    // const searchedCourses = course.searchedCourses;
    const [courses, setCourses] = useState([]);
   
    let isRendered = useRef(false);
    useEffect(async function fetch() {
        isRendered.current = true;

       

        try {
        //    const response = await axios.get(api);
        //    const data =  response.data;
        //    if(isRendered.current) {
        //        setCourses(data);
        //    }
            
           if(auth.user && isRendered.current) {
               dispatch(getAvailableCourses(auth.user)).then((data) => {
                    setCourses(data);                  
               })  
               const mycourseRes = await axios.get('http://localhost:8084/course/all/paid?username=' + auth.user);
               const myCourseData =  mycourseRes.data;
                setMyCourses(myCourseData);
               
           } else {
               dispatch(getAllCourses()).then((data) => { 
                    setCourses(data);          
               });
           }
          
                
          
        } catch(error) {
            console.log("error " + error);
        }
        return () => {isRendered.current = false}
    }, [])

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
   
    return (
        <div className = "courses">
            {auth.user && mycourses.length > 0 ?(
 <h1 className = 'home-my-course-title'>YOUR COURSES</h1>
            ): ""}
           
            {auth.user && mycourses.length > 0 ? (
               <div className = "carousel-slider">
 
       
       
        {/* <Carousel
  swipeable={true}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlay={true}
  autoPlaySpeed={3000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  deviceType="laptop"
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
> */}
                {mycourses && mycourses.length > 0 && mycourses.map((item, index) =>(
                    <div key = {index}> <MyCourse 
                    id = {item.id} 
                    name = {item.name}
                    image = {item.image}
                    teacher_name = {item.teacherName}
                    rating = {item.avgRating}/>
                    </div>
                ))}
                {/* </Carousel> */}
                </div>
            ): ""}
           
            <h1 className = 'home-courses-title'>BOARD OF COURSES</h1>
            <ul className = 'course-row'>
                
                {
                   courses && courses.length > 0 && courses.map((item, i) =>(
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