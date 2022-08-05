import './CommentInput.css';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from 'react';
import PastClock from './Clock/PastClock';
import axios from 'axios';
import ReplyIcon from '@mui/icons-material/Reply';
export default function CommentInput({id, teacherImage, teacherName, datePosted, title, content, link}) {
    const [commentList, setCommentList] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");
    const studentName = localStorage.getItem("user");
    const [comments, setComments] = useState([]);
    const [reply, setReply] = useState(false);
    const sendComment = async(event) => {
        event.preventDefault();
        const data = {
            notificationId: id,  
            studentName: studentName,
            studentComment: inputValue,
            datePosted: new Date(),
        } 
        try {          
            const res = await axios.post(`http://localhost:8084/notification/comment/save`, data,{headers:{Authorization: 'Bearer ' + localStorage.getItem("token")}});       
            const resData = res.data;
            comments.push(resData); 
            setReply(false);
        } catch(error) {
            console.log(error);
        }
       
    }
    let isRendered = useRef(false);
    useEffect(async() => {
        isRendered.current = true;
        if(isRendered.current) {
            const commentRes = await axios.get(`http://localhost:8084/notification/comment/${id}?studentName=` + studentName);
            const commentData = commentRes.data;
            setComments(commentData);
        }
        return () => {isRendered.current = false}
    }, [])
     const writeComment = () => {
         setReply(!reply);
     }
    return (
        <div className = 'comment-input'>
            <div className = 'comment-teacher-info'>
            <img className = 'teacher-image' src = {teacherImage} alt = ""/>
            <div className = 'img-right'>
            <div className = 'notification-title'>
                {title}
                <div className = 'date-posted'> <PastClock time = {datePosted}/></div>
            </div>
            
           
            <div className = 'notification-content'>
                {content}
            </div>
            {
                link ? (
                    <div className = 'embedded-link'>
                  <a href = {link} target = '_blank' className = 'notification-link'>CLICK TO VIEW</a>
                </div>
                ) : ""
            }
            
             <p className = 'instructor-text'>Your Instructor</p>
                <div className = 'teacher-name'>{teacherName} </div>
               
            </div>
            
            </div>    
           
            <div className = 'comment-input-div'>
                {
                comments && comments.length > 0 ? (
                     <div className = 'comment-text-div'>
                     <div className = "your-comment">Your Comment: </div> 
                 <div className = 'comment-text'>
                        {comments.map((item, i) => (
                        <div className = 'comments-section'>
                        <div className = 'student-comment-text' key = {i}>{item.studentComment}</div>
                        </div>
                        ))}

                 </div>
                     
                     </div>
                )
                
                : 
                commentList && commentList.length > 0 ? (
                    <div className = 'comment-text-div'>
                        <div className = "your-comment">Your Comment: </div> 
                    <div className = 'comment-text'>{commentList.map((item, i) => (
                        <>
                        {item}
                        </>
                    ))}</div>
                        
                        </div>
                   
                ) :  ""}
            <div className = 'replay-icon'><ReplyIcon onClick = {writeComment}/></div>
            {
                reply ? (
<form onSubmit = {sendComment}>
                    <div className = 'input-area'>
                    <input placeholder = "Enter your comment" type = 'text' className = 'student-input' value = {inputValue} onChange = {e => setInputValue(e.target.value)}/>
                    <button type = 'submit' className = 'send-btn'><SendIcon className = 'send-icon'/></button>
                </div>
                </form>
                ) : ""
            }
                    
             
                
            </div>
           
        </div>
    )
}