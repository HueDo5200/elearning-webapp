import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './TeacherCourseReviewPage.css';
import StarRatings from 'react-star-ratings';
import { useEffect } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import PastClock from '../Clock/PastClock';
export default function TeacherCourseReviewPage() {
    const {id} = useParams();
    const [reviews, setReviews] = useState([]);
    const [visible, setVisible] = useState(10);
    let isRendered = useRef(false);
    const loadMore = () => {
        setVisible(visible + 10);
    }
    const loadLess = () => {
        setVisible(visible - 10);
    }
    useEffect(async function fetch() {
        isRendered.current = true;
            try {
                const reviewRes = await axios.get('http://localhost:8084/course/reviews/' + id);
                if(reviewRes && isRendered.current) {  
                    const reviewData = reviewRes.data;
                    setReviews(reviewData);         
                }
            } catch(error) {
                console.log(error);
            }
            return () => {isRendered.current = false;}
    }, [])

    return (
        <div className = 'teacher-course-review-section'>
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
            <button onClick = {loadMore} className = 'teacher-load-more-btn'>View More</button>
          )
      }
       {
          visible >= reviews.length && reviews.length !== 0 && (
            <button onClick = {loadLess} className = 'teacher-load-more-btn'>View Less</button>
          )
      }
       {
         reviews.length === 0 && (
           <div className = "no-review">No Review</div>
          )
      }
     
    </div>
    )
}