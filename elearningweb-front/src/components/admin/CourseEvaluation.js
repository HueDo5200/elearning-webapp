import Edit from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUnpublishCourse, updateCourseStatus } from '../../actions/courseAction';
import Sidebar from '../teacher/Sidebar';
import './CourseEvaluation.css';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Clear from '@mui/icons-material/Clear';
export default function CourseEvaluation() {
    const course = useSelector((state) => state.course);
    const courses = course.unpublisedCourses;
    const token = localStorage.getItem("token");
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [accept, setAccept] = useState(false);
    const [decline, setDecline] = useState(false);
    const [courseId, setCourseId] = useState(null); 
    const dispatch = useDispatch();
    useEffect(async() => {
        dispatch(getAllUnpublishCourse());
    }, [])
    const convertDate = (data) => {
        const date = new Date(data);
        const options = {
            day: "numeric", month: "long", year: "numeric"
        }
        return date.toLocaleDateString('en', options);
    }
    const showAcceptConfirmPopup = (courseId) => {
        setShowConfirmPopup(true);
        setAccept(true);
        setCourseId(courseId);
        
    }
    const showDeclineConfirmPopup = (courseId) => {
        setShowConfirmPopup(true);
        setDecline(true);
        setCourseId(courseId);
        
    }
    const closeConfirmPopup = () => {
        setShowConfirmPopup(false);
        if(accept) {
            setAccept(false);
        }
        if(decline) {
            setDecline(false);
        }
    }

    const declineNewCourse = () => {
        dispatch(updateCourseStatus(courseId, {accepted: 2}, token))
        setShowConfirmPopup(false);
        setDecline(false);
    }
    const acceptNewCourse = () => {
        console.log("update");
        dispatch(updateCourseStatus(courseId, {accepted: 1}, token));
        setShowConfirmPopup(false);
        setAccept(false);
    }
    const ConfirmPopup = (props) => {
        return (
            <div className = 'popup'>
<div className = 'delete-popup'>
        <div className = 'delete-text'>Are you sure about your decision ?</div>
        <div className = 'btns-group'>
            <button className = 'confirm-button' type = 'submit' onClick = {props.confirmDecision}>Yes</button>
            <button className = 'no-button' onClick = {props.closeConfirmPopup}>No</button>
        </div>
    </div>
</div>
    )
        
    }
   
    return (
        <div className = 'unpublished-course-list'>
            {/* <Sidebar/> */}
            <div className = 'evaluatation-wrapper'>
<table id = "student-table">
    <thead>
        <tr>    
        <th>Course</th>
            <th>Teacher</th>
            <th>Created</th>
            <th>Description</th>
            <th>Level</th>   
            <th>Price ($)</th>
            <th>Discount (%)</th>
            <th>Status</th>
            <th>Evaluate</th>
        </tr>
    </thead>
    <tbody>
{courses && courses.length > 0 && courses.map((item, index) => ( 
        <tr key = {index} className = 'table-row'>      
            <td className = 'name-cell'>{item.name}</td>
            <td className = 'teacherName-cell'>{item.teacherName}</td>
            <td className = 'date-cell'>{convertDate(item.dateCreated)}</td>
            <td className = 'description-cell'>{item.description ? item.description : "-"}</td>
            <td className = {item.level === 0 ? "level0": item.level === 1 ? "level1": "level2"}>{item.level === 0 ? "Beginner" : item.level === 1 ? "Intermediate" : "Advanced"}</td>  
            <td className = "price-cell">{item.price}</td>
            <td className = "discount-cell">{item.discount}</td>
            <td className = {item.accepted === 0 ? "pending-status" : item.accepted === 1 ? "accept-status" : "declined-status"}>{item.accepted === 0 ? "Pending" : item.accepted === 1 ? "Accepted" : "Declined"}</td>
            <td className = 'evaluation-cell'><Link to = {'/evaluate/course/' + item.id}><Visibility className = 'visible-icon'/></Link><CheckIcon className = 'check-icon' onClick = {() => showAcceptConfirmPopup(item.id)}/> <Clear className = 'clear-icon' onClick = {() => showDeclineConfirmPopup(item.id)}/></td>
        </tr>
))}
</tbody>
</table>
        </div>
        <div>
            {
                showConfirmPopup && accept ? (
            <ConfirmPopup 
            
            confirmDecision = {acceptNewCourse}
            closeConfirmPopup = {closeConfirmPopup}
            />
                ) : showConfirmPopup && decline ? (

                    <ConfirmPopup
                    confirmDecision = {declineNewCourse}
                    closeConfirmPopup = {closeConfirmPopup}
                    />
                ) : ""

            }
            

        </div>
        </div>
    )
}