
import PastClock from './Clock/PastClock';
import './Discussion.css';
export default function Answer({id, courseId, username, image, role, content, datePosted, questionId}) {
    const user = localStorage.getItem("user");
    return (
       <div className = 'answer'>
        {content ? (
            <div className = 'answer-div'>
            <img src = {image ? image : '/images/user/unknown.jpg'} alt = "" className = 'user-img'/>
                       <div className = 'user-left'>
                   <div className = 'user-data'>
                       <div className = 'user-name'>
                       {username === user ? 'Your response' : username}
                       </div>
                       <div className = 'date-text'><PastClock time = {datePosted} /></div>
                   </div>
                       <div className = 'user-text'>
                           {content}
                       </div>
                     
                      
                       </div>  
                       </div>
        ): ""}
      </div>
    )
}