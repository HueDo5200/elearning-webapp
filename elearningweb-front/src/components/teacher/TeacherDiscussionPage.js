import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Discussion from '../Discussion';
import Sidebar from './Sidebar';
import './TeacherDiscussionPage.css';
export default function TeacherDiscussionPage() {
    const [discussions, setDiscussions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const {id} = useParams();
    let isRendered = useRef(false);
    useEffect(async() => {
        isRendered.current = true;
            try {
                const disResponse = await axios.get('http://localhost:8084/course/discussion/' + id);
                const answerRes = await axios.get('http://localhost:8084/course/answer/' + id);
                const disData = disResponse.data;
                const answerData = answerRes.data;
                if(isRendered.current) {
                    setDiscussions(disData);
                    setAnswers(answerData);
                }

            } catch(error) {
                console.log(error);
            }
            return () => {isRendered.current = false;}
    }, [])
    return (
        <div className = 'teacher-discussion-page'>
              {/* <Sidebar/> */}
              <div className = 'right-section-div'>
<h2>Discussions</h2>
{discussions && discussions.length > 0 && discussions.map((item, index) => (                                                                  
                                    <div key = {index}> <Discussion 
                                    id = {item.id}
                                    courseId = {item.courseId}
                                    username = {item.username}
                                    image = {item.image}
                                    role = {item.role}
                                    content = {item.content}
                                
                                    datePosted = {item.datePosted}
                                    answers = {answers}
                                   
                                    />  
                                    
                                    </div>                                                                      
                               ))} 
                    </div>           
        </div>
    )
}