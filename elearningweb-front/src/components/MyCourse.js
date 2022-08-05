import "./CourseItem.css";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function MyCourse({id, name, image, teacher_name, rating}) {
    const ratingChanged = (newRating) => {
        console.log(newRating);
    }
    return (
        <Link to = {'/paid-course/' + id } >
        <div className = 'my-course-item'>
        <img  src = {image} alt = ""/>
        <div className = 'my-course-info'>
            <div className = 'course-name'>{name}</div>
            <div className = 'course-teacher'>by {teacher_name}</div>
          
            </div>
            {
                rating === 0 ? (
                    <div className = 'course-rating'>
                    <ReactStars count = {5}
                    onChange = {ratingChanged}
                    size = {16}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor = "#ffd700"/>
                    <span className = 'rating-click'>Leave a rating</span>
                    </div>
                ) : ''
            }
           
       
        </div>
        </Link>
    )
}