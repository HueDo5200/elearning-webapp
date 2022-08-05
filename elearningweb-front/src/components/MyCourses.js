import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import MyCourse from './MyCourse';
import './MyCourses.css';
//chrome --disable-web-security --user-data-dir
export default function MyCourses() {
    let isRendered= useRef(false);
    const auth = useSelector((state) => state.auth);
    const token = localStorage.getItem("token");
    const [courses, setCourses] = useState([]);
   
    // if (token) {
    //     authToken(token);
    //   }
    useEffect(async() => {
            isRendered.current = true;
            try {
                    const response = await axios.get('http://localhost:8084/course/all/student?username=' + auth.user, {headers: {Authorization: 'Bearer ' + token}});
                    const coursesData = await response.data;       
                    if(isRendered.current) {
                            setCourses(coursesData);             
                    }
            } catch(error) {
                console.log(error);
            }
            return () => {isRendered.current = false}
    }, [])
    
    return (
        <div className = 'my-courses'>   
        <h1 className = 'courses-title'>Your Courses ({courses.length})</h1>    
        <div className = 'mycourses-area'>        
        {courses && courses.length > 0 && courses.map((item, i) => (
            <div key = {i} className = 'mycourse'>
                <MyCourse 
                id = {item.id} 
                name = {item.name}
                image = {item.image}
                teacher_name = {item.teacherName}
                rating = {item.avgRating}/>
            </div>
        ))}
        </div> 
               </div>
    
    )
}