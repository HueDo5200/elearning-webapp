import axios from 'axios';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router';
import Sidebar from './Sidebar';
import './TeacherViewNotificationComment.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
export default function TeacherViewNotificationComment() {
    const [comments, setComments] = useState([]);
    const {id} = useParams();
    let isRendered = useRef(false);
    useEffect(async() => {
        isRendered.current = true;
        if(isRendered.current) {
                const res = await axios.get(`http://localhost:8084/notification/comment/of/${id}`);
                const resData = res.data;
                console.log("res " + JSON.stringify(resData));
                setComments(resData);
        }
        return () => {isRendered.current = false}
    }, [])
    const convertDate = (data) => {
        const date = new Date(data);
        const options = {
            day: "numeric", month: "long", year: "numeric"
        }
        return date.toLocaleDateString('en', options);
    }
    return (
        <div className = 'notification-comment-page'>
                {/* <Sidebar/> */}
                <div className = 'notification-comment-list'>
                    <h2>Comments ({comments.length})</h2>
                {
                    comments && comments.length > 0 && comments.map((item, i) => (
                        <div className = 'notification-comment'>
                            
                             <div className = 'comment-content'>
                             <div className = 'comment-username'>{item.studentName}</div>
                             <ChevronRightIcon/>
                             <div className = 'user-comment-text'>
                                {item.studentComment}
                            </div>
                            </div>
                            <div className = 'comment-datepost'>
                                    {convertDate(item.datePosted)}
                                    </div>

                             </div>
                    ))
                }
                </div>
               
           
        </div>
    )
}