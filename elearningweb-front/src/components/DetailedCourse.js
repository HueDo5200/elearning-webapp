import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import Clock from './Clock/Clock';
import './DetailedCourse.css';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART } from '../actions/types';
import SpeechRecognition, {useSpeechRecognition } from 'react-speech-recognition';
import PastClock from './Clock/PastClock';
import StarRatings from 'react-star-ratings';
import { useHistory } from 'react-router-dom';
export default function DetailedCourse() {
    const {id} = useParams();
  
    const [course, setCourse] = useState([]);
    const [visible, setVisible] = useState(5);
    const [reviews, setReviews] = useState([]);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [videos, setVideos] = useState([]);
    const history = useHistory();
   
    
    const loadMore = () => {
        setVisible(visible + 5);
    }
    const loadLess = () => {
        setVisible(visible - 5);
    }

    let isRendered = useRef(false);
    useEffect(async function fetch() {
        isRendered.current = true;
            try {
                const response = await axios.get('http://localhost:8084/course/' + id);
                const reviewRes = await axios.get('http://localhost:8084/course/reviews/' + id);
                const videosRes = await axios.get('http://localhost:8084/course/video/' + id);
                const data = await response.data;
                if(isRendered.current) {
                    setCourse(data);         
            }
                if(videosRes && isRendered.current) {
                    const videoData = await videosRes.data;
                    setVideos(videoData);
                }
                if(reviewRes && isRendered.current) {  
                    const reviewData = await reviewRes.data;
                    setReviews(reviewData);         
                }
            } catch(error) {
                console.log(error);
            }
            return () => {isRendered.current = false;}
    }, [])
    const addToCart = () => {
        dispatch({
            type: ADD_TO_CART,
            item: {
                id: course.id,
                name: course.name,
                image: course.image,
                avgRating: course.avgRating,
                price: course.price,
                discount: course.discount,
                discountEnd: course.discountEnd,
                teacherName: course.teacherName,
                ratingNumber: course.ratingNumber
            }
        })
      }
      const buyNow = () => {
          addToCart();
            history.push("/cart");
      }

    return (
        <div className = 'detailed-course'>
               <video width = "100%" height = "400px" src = {course.previewVideoPath} controls controlsList = "nodownload" type="video/mp4" />
               <div className = "course-section">
                <div className = 'detailed-course-info'>
                    <h2 className = 'detailed-course-name'>{course.name}</h2>
                    <span className = 'detailed-course-description'>{course.description}</span>
                    <span className = 'detailed-course-teacher'>Taught by teacher {course.teacherName}</span>
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
                <div className = 'course-cart-section'>
                    <div className = "price-section">
                            <p className = 'detailed-course-price'>{course.discount != 0 ? (course.price - ((parseInt(course.discount) / 100) * course.price)) + '$US' : ''}</p>
                            <p> </p>
                            <p className = 'detailed-course-original-price'>{course.discount !== 0 ? '$' + course.price : ''}</p>
                            <p className = 'time-left'>{(parseInt(course.discountEnd) - Date.parse(new Date())) > 0 ? <Clock deadline = {course.discountEnd}/> : 'END'}</p>
                            </div>
                            <button className = 'add-to-cart-btn' onClick = {addToCart}>Add to cart</button>
                            <button className = 'buy-btn' onClick = {buyNow}>Buy now</button>

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
                <div className = 'course-content'>
                  
                <ul className = 'content-list'>
                <h2 className = 'question-text'>What will you learn ?</h2>
                    <p className = 'detailed-content'>{course.content}</p> 
                         {/* {getContent().map((item, i) => (
                                <li className = 'list-item'>
                                    <div className = 'detailed-content'>
                                        <p className = 'content-title'>{item[i]}</p>
                                         <p className = 'content-description'> {item[i]}</p> 
                                     </div>
                                    </li> 
                         ))}     */}
                </ul>
              
                    <div className = 'course-content-details'>
                         <h2 className = 'lesson-text'>Lessons ({videos.length})</h2>
                            {videos && videos.length > 0 && videos.map((item, i) => (
                                <div className = 'video-list'>
                                    <div className = 'video-item-name-unpaid' key = {i}>
                                        {item.name}
                                        </div>
                                 </div>
                            ))}
                    </div>
               
                
                </div>
                <div className = 'course-review-section'>
                    <h2>Student Reviews ({reviews.length})</h2>
                    {/* {reviews.map((item, index) => ( */}
                    {reviews && reviews.length > 0 && reviews.slice(0, visible).map((item, index) => (
                <div className = 'course-review' key = {index}>
                    <img className = 'user-review-img' src = {item.studentImage} alt = ''/>
                    <div className = 'review-user'>  
                        <div className = 'user-info'>
                        <span className = 'user-name'>{item.studentName}</span>
                        </div>
                  
                    <div className = 'review-rating'>
                      
                            {/* {Array(parseInt(item.userRating)).fill().map((_, i) => (
                              <span className = 'star-icon' key = {i}> <StarIcon /></span> 
                            ))}
                              {Array(5 - parseInt(item.userRating)).fill().map((_, i) => (
                              <span className = 'star-outline' key = {i}> <StarOutline /></span> 
                            ))} */}
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
        </div>
    )
}