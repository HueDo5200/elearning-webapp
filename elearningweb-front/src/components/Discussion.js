
import { useState } from 'react';
import Answer from './Answer';
import PastClock from './Clock/PastClock';
import './Discussion.css';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { postAnswer } from '../actions/courseAction';
export default function Discussion({id, courseId, username, image, role, content, datePosted, answers}) {
    const userImage = localStorage.getItem("userImage");
    const [postComment, setPostComment] = useState(false);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const [response, setResponse] = useState([]);
    const dispatch = useDispatch();
    const poster = localStorage.getItem("user");
    const handleSubmit = async (event) => {
        event.preventDefault();
        setPostComment(false);
        if(comment) {
           
            const commentObj = {
                    courseId: courseId,
                    questionId: id,
                    username: poster,
                    content: comment,
                    role: role,
                    datePosted: new Date(),
    
            }
            try {
                // const res = await axios.post(`http://localhost:8084/course/answer/save`, commentObj, {headers:{Authorization: 'Bearer ' + localStorage.getItem("token")}});
                // const resData = res.data;
                // setResponse(resData);
                dispatch(postAnswer(commentObj)).then((data) => {
                    setResponse(data);
                })
               
                console.log("response " + JSON.stringify(response));
            } catch(error) {
                console.log(error);
            }
        } 
       

    }
    const rightAnswers = answers.filter((item) => item.questionId === id);
    return (
        <div className = 'discussion-left'>
             <img src = {image ? image : '/images/user/unknown.jpg'} alt = "" className = 'user-img'/>
            <div className = 'user-left'>
        <div className = 'user-data'>
            <div className = 'user-name'>
            {username}
            </div>
            <div className = 'date-text'><PastClock time = {datePosted} /></div>
        </div>
      
            <div className = 'user-text'>
                {content}
            </div>
            <div className = 'answers-wrapper'>
               {rightAnswers != undefined && rightAnswers && rightAnswers.length > 0 && rightAnswers.map((item, index) => (
                 <div key = {index}> <Answer 
                 id = {item.id}
                 courseId = {item.courseId}
                 username = {item.username}
                 image = {item.image}
                 role = {item.role}
                 content = {item.content}
                 datePosted = {item.datePosted}
                 questionId = {item.questionId}
                 /></div>
               ))}
            </div>
            <div className = 'response-wrapper'>
            {response  ? (
                 <Answer 
                 id = {response.id}
                 courseId = {response.id}
                 username = {response.username}
                 image = {response.image}
                 role = {response.role}
                 content = {response.content}
                 datePosted = {response.datePosted}
                 questionId = {response.questionId}
                 />
             ) : ""}
            </div>
            <div className = 'user-input-comment'>
           
                {postComment ? (
 <div className = 'textarea-wrapper'> 
 <form onSubmit = {handleSubmit}>
 <textarea rows = "4" cols = "60" placeholder = "Type your text here" className = 'textarea-input' value = {comment} onChange = {e => setComment(e.target.value)}/>
 <div className = 'btn-wrapper'>
 <button className = 'textarea-btn' type = 'submit'>Post comment</button>
</div>
</form>
</div>
                ): (
                    <div className = 'reply-wrapper'  onClick = {() => setPostComment(true)}>
                   <ReplyIcon/>
                    <div className = 'reply-text'>Reply
                    </div>
                    </div>
                )}
               
            </div>
           
            </div>  

        </div>
    )
}