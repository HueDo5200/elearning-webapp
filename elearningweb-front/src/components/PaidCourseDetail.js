import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import StarIcon from '@mui/icons-material/Star';
import StarOutline from '@mui/icons-material/StarOutline';
import Clock from './Clock/Clock';
import './DetailedCourse.css';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART } from '../actions/types';
import SpeechRecognition, {useSpeechRecognition } from 'react-speech-recognition';
import PastClock from './Clock/PastClock';
import CommentInput from './CommentInput';
import { getAllDiscussionOfCourse, getAllNotifications, updateCourse } from '../actions/courseAction';
import Courses from './Courses';
import ReactStars from 'react-rating-stars-component';
import Discussion from './Discussion';
import StarRatings from 'react-star-ratings';
export default function PaidCourseDetail() {
    const {id} = useParams();
  
    const [course, setCourse] = useState([]);
    const [visible, setVisible] = useState(5);
    const [reviews, setReviews] = useState([]);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [videos, setVideos] = useState([]);
    const [video, setVideo] = useState('');
    const [view, setView] = useState(false);
    const [viewDiscussion, setViewDiscussion] = useState(false);
    const [viewLesson, setViewLesson] = useState(false);
    const [viewNotification, setViewNotification] = useState(false);
    const [viewReviews, setViewReviews] = useState(false);
    const [detail, setDetail] = useState([]);
    const [textAreaValue, setTextAreaValue] = useState("");
    const [userRating, setUserRating] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [discussions, setDiscussions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const token = localStorage.getItem("token");
    const [error, setError] = useState("");
    const [yourReview, setYourReview] = useState(null);

    
    
    // const [text, setText] = useState("");
    // const {
    //     transcript,
    //     listening,
    //     resetTranscript,
    //     browserSupportsSpeechRecognition
    //   } = useSpeechRecognition();
    const loadMore = () => {
        setVisible(visible + 5);
    }
    const loadLess = () => {
        setVisible(visible - 5);
    }


   const handleTextAreaSubmit = async(event) => {
       event.preventDefault();
       const userReview = {
           courseId: id,
           studentName: auth.user,
           studentImage: localStorage.getItem("userImage"),
           review: textAreaValue,
           userRating: userRating,
           reviewDate: Date.now()
       }
       const ratingCourse = {
           price: course.price,
           name: course.name,
           discount: course.discount,
           description: course.description,
           image: course.image,
           level: course.level,
           avgRating: (parseInt(userRating) + parseInt(course.avgRating)) / 2,
           commentNumber: parseInt(course.commentNumber) + 1,
       }
       try {
           
            const posReviewRes = await axios.post('http://localhost:8084/review/save', userReview, {headers: {Authorization: 'Bearer ' + token}});
            setYourReview(posReviewRes.data);
            dispatch(updateCourse(id, ratingCourse, token));

       } catch(error) {
           console.log(error);
       }
   }
   const ratingChanged = (newRating) => {
    setUserRating(newRating);
}


    let isRendered = useRef(false);
    useEffect(async ()  => {
        isRendered.current = true;
            try {
                const response = await axios.get('http://localhost:8084/course/' + id);
                const reviewRes = await axios.get('http://localhost:8084/course/reviews/' + id);
                const videosRes = await axios.get('http://localhost:8084/course/video/' + id);
                const notRes = await axios.get('http://localhost:8084/course/notification/' + id + '?username=' + auth.user);
                const discussionRes = await axios.get('http://localhost:8084/course/discussion/' + id);
                const answerRes = await axios.get('http://localhost:8084/course/answer/' + id);
                const data =  response.data;
               
                if(isRendered.current) {
                    setCourse(data);         
            }
                if(videosRes && isRendered.current) {
                    const videoData =  videosRes.data;
                    setVideos(videoData);
                }
                if(reviewRes && isRendered.current) {  
                    const reviewData =  reviewRes.data;   
                    setReviews(reviewData);
                    setYourReview(reviewData.find((item) => item.studentName == auth.user));     
                     
                }    
               if(notRes && isRendered.current) {
                   const notData = notRes.data;
                   setNotifications(notData);
               }
               if(discussionRes && isRendered.current) {
                   const disData = discussionRes.data;
                   setDiscussions(disData);
               }
               if(answerRes && isRendered.current) {
                   const answerData = answerRes.data;
                   setAnswers(answerData);
               }
               

            } catch(error) {
                console.log(error);
            }
            return () => {isRendered.current = false;}
    }, [])

    const showDiscussions = () => {
        setViewDiscussion(true);
        if(viewLesson) {
            setViewLesson(false);
        }
        if(viewNotification) {
            setViewNotification(false);
        }
        if(viewReviews) {
            setViewReviews(false);
        }
        if(viewDiscussion) {
          setDiscussions(discussions);
        }

    }
    const showLesson = () => {
        setViewLesson(true);
        if(viewDiscussion) {
            setViewDiscussion(false);
        } 
         if(viewNotification) {
            setViewNotification(false);
        }
        if(viewReviews) {
            setViewReviews(false);
        }
        setDetail(videos);
               
        
    }

    const showNotification = () => {
        setViewNotification(true);
        if(viewDiscussion) {
            setViewDiscussion(false);         
        }
        if(viewLesson) {
            setViewLesson(false);
        }
        if(viewReviews) {
            setViewReviews(false);
        }
        setDetail(notifications);
    }

    const showReviews = () => {
        setViewReviews(true);
        if(viewNotification) {
            setViewNotification(false);
        }
        if(viewLesson) {
            setViewLesson(false);
        }
        if(viewDiscussion) {
            setViewDiscussion(false);
        }
        if(viewReviews) {
            setDetail(reviews);
        }
    }
    

    return (
        <div className = 'detailed-course'>
               <video width = "100%" height = "400px" src = {view ? video : course.previewVideoPath} controls controlsList = "nodownload" type="video/mp4" />
               <div className = "course-section">
                <div className = 'detailed-course-info'>
                    <h2 className = 'detailed-course-name'>{course.name}</h2>
                    <span className = 'detailed-course-description'>{course.description}</span>
                    <span className = 'detailed-course-teacher'>Taught by {course.teacherName}</span>
                    <div className = 'evaluation-section'>
                        <p className = 'course-isbestseller'>
                        {parseInt(course.isBestseller) > 0 ? 'Bestseller' : ''}
                        </p>
                        <p className = 'course-level'>
                        {course.level === 1 ? 'INTERMEDIATE' : course.level === 2 ? 'ADVANCED' : 'BEGINNER'}
                        </p>
                        <div className = 'detailed-course-rating'>

                        <StarRatings
          rating={course.avgRating}
          starRatedColor="orange"
          numberOfStars={5}
          name='rating'
          starDimension="16px"
        starSpacing="1px"
        />
                           
                        </div>
                        <p className = 'rating-number'>({course.commentNumber}) ratings</p>
                        <p className = 'student-number'>{course.enrolledNumber} students</p>
                    </div>
                   

                </div>
               
             
                
                </div>
                {/* <div className = 'course-script'>
               {!browserSupportsSpeechRecognition ? "Browser doesn't support speech recognition." : (
    <>
  <p>Microphone: {listening ? 'on' : 'off'}</p>
  <button onClick={SpeechRecognition.startListening}>Start</button>
  <button onClick={SpeechRecognition.stopListening}>Stop</button>
  <button onClick={resetTranscript}>Reset</button>
  <p>{transcript}</p>
       </>
               )}
             
                </div> */}

<div className = 'paid-course-section'>
                    <div className = 'headers'>
                        
                        <button className = 'lesson-btn' onClick = {showLesson}>Lessons</button>
                        <button className = 'discussions-btn' onClick = {showDiscussions}>Discussions</button>
                        <button className = 'notification-btn' onClick = {showNotification}>Notifications</button>
                        <button className = 'review-btn' onClick = {showReviews}>Reviews</button>
                    </div>
{/*                     
for each btn create a boolean variable, set to false,
 when each btn is clicked, 
the the variable is updated to true,
when it is true then call api for data and call setter to update data in useState */}
                    
                  <div className = 'btn-detail'>
                      {viewDiscussion ? (
                          <div className = 'detail-course-content'>
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
                      ) : viewLesson ? (
                        <div className = 'detail-course-content'>
                            <div className = 'course-content-details'>
                            <h2 className = 'lesson-text'>Lessons</h2>
                               {detail && detail.length > 0 && detail.map((item, i) => (
                                   <div className = 'video-list'>
                                       <div className = 'video-item-name' key = {i} onClick = {() => {setVideo(item.path); setView(true)}}>
                                           {item.name}
                                           </div>
                                    </div>
                               ))}
                       </div>
                       </div>
                      ) : viewNotification ? (
                        <div className = 'detail-course-content'>
                             <h2>Notifications</h2>
                         <div className = 'notifications-section'>
                      {notifications && notifications.length > 0 && notifications.map((item, i) => (
 <CommentInput id = {item.id} 
 teacherImage = {item.teacherImage ? item.teacherImage : "/images/teacher/teacher1.jpg"}
 teacherName = {item.teacherName}
 datePosted = {item.datePosted}
 title = {item.title}
 content = {item.content}
 link = {item.link}
 />
                      ))}
                               
                  </div>
                        </div>
                      ) : viewReviews ? (
                        <div className = 'detail-course-review-section'>
                        {!yourReview || yourReview.length == 0? (
                            <div className = 'write-review-div'>
                            <h2>Write your review</h2>
                            <form onSubmit = {handleTextAreaSubmit}>
                            <div className = 'course-rating'>
                    <ReactStars count = {5}
                    onChange = {ratingChanged}
                    size = {20}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor = "#ffd700"/>
                    <span className = 'rating-click'>Leave a rating</span>
                    </div>
                           <textarea rows = '6' cols = '60' value = {textAreaValue} onChange = {e => setTextAreaValue(e.target.value)} className = 'textarea-input' placeholder = 'Type your text here'/>
                           <div className = 'btn-div'>
                           <button type = 'submit' className = 'add-review-btn'>Add your review</button>
                           </div>
                           </form>
                           </div>
                        ): ""}
                        <h2>Your Reviews</h2>
                        {yourReview ? (
                            <div className = 'user-course-review'> 
                             <img className = 'user-review-img' src = {yourReview.studentImage} alt = ''/>
                             <div className = 'review-user'>  
                                 <div className = 'user-info'>
                                 <span className = 'user-name'>{yourReview.studentName}</span>
                                 </div>
                           
                             <div className = 'review-rating'>
                               {yourReview.userRating ? (
 <StarRatings
 rating={parseInt(yourReview.userRating)}
 starRatedColor="orange"
 numberOfStars={5}
 name='rating'
 starDimension="16px"
starSpacing="1px"
/>

                               ) : ""}
                            
                             </div> 
                             <div className = 'user-review'>{yourReview.review}</div>
                             <span className = 'review-date'><PastClock time = {yourReview.reviewDate}/></span>
                           
                             </div>
                        
                         </div>
                        ) : ""}
                        <h2>Student Reviews ({yourReview && reviews && reviews.length > 0 ? reviews.length - 1 : reviews.length})</h2>
                           
                            {reviews && reviews.length > 0 && reviews.filter((item) => item.studentName != auth.user).slice(0, visible).map((item, index) => (
                        <div className = 'course-review' key = {index}>
                             
                            <img className = 'user-review-img' src = {item.studentImage} alt = ''/>
                            <div className = 'review-user'>  
                                <div className = 'user-info'>
                                <span className = 'user-name'>{item.studentName}</span>
                                </div>
                          
                            <div className = 'review-rating'>
                              
                                
                                     <StarRatings
          rating={parseInt(item.userRating)}
          starRatedColor="orange"
          numberOfStars={5}
          name='rating'
          starDimension="16px"
        starSpacing="1px"
        />
                            </div>
                            <div className = 'user-review'>{item.review}</div>
                            <span className = 'review-date'><PastClock time = {item.reviewDate}/></span>
                          
                            </div>
                       
                        </div>
                          ))}
                          {
                              visible < reviews.length && (
                                <button onClick = {loadMore} className = 'load-more-btn'>View More</button>
                              )
                          }
                           {
          visible >= reviews.length && reviews.length !== 0 && (
            <button onClick = {loadLess} className = 'teacher-load-more-btn'>View Less</button>
          )
      }
                         
                        </div>
                      ): ""}
                      
                      </div>  
                </div>
                
                 
               
                 {/* {auth.user ? (
                   
                    <div className = 'course-content-details'>
                         <h2 className = 'lesson-text'>Lessons</h2>
                            {videos && videos.length > 0 && videos.map((item, i) => (
                                <div className = 'video-list'>
                                    <div className = 'video-item-name' key = {i} onClick = {() => {setVideo(item.path); setView(true)}}>
                                        {item.name}
                                        </div>
                                 </div>
                            ))}
                    </div>
                ) : ''}  */}
                
                
               
        </div>
    )
}