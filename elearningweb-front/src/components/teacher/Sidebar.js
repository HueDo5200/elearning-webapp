import { Link } from "react-router-dom";
import "./Sidebar.css";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import ManageAccounts from "@mui/icons-material/ManageAccounts";
import { logout } from "../../actions/auth";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

import PeopleIcon from '@mui/icons-material/People';
import ReactRoundedImage from "react-rounded-image";
import { useState } from "react";

export default function Sidebar() {
    const username = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    const image = localStorage.getItem("userImage");
    const history = useHistory();
    const dispatch = useDispatch();
    const [accountSelected, setAccountSelected] = useState(false);
    const [teacherSelected, setTeacherSelected] = useState(false);
    const [studentSelected, setStudentSelected] = useState(false);
    const [manageCourseSelected, setManageCourseSelected] = useState(false);
    const [evaluateCourseSelected, setEvaluateCourseSelected] = useState(false);
    const userLogout = () => {
        dispatch(logout());
        history.push("/");
        window.location.reload();
    }
   const handleSelectAccount = () => {
        setAccountSelected(true);
        if(teacherSelected) {
            setTeacherSelected(false);
        }
        if(studentSelected) {
            setStudentSelected(false);
        }
        if(manageCourseSelected) {
            setManageCourseSelected(false);
        }
        if(evaluateCourseSelected) {
            setEvaluateCourseSelected(false);
        }
        history.replace("/teacher/home");
   }
   const handleSelectStudent = () => {
        setStudentSelected(true);
        if(accountSelected) {
            setAccountSelected(false);
        }
        if(teacherSelected) {
            setTeacherSelected(false);
        }
        if(manageCourseSelected) {
            setManageCourseSelected(false);
        }
        if(evaluateCourseSelected) {
            setEvaluateCourseSelected(false);
        }
        history.replace("/admin/manage/student");

   }
   const handleSelectTeacher = () => {
        setTeacherSelected(true);
        if(accountSelected) {
            setAccountSelected(false);
        }
        if(studentSelected) {
            setStudentSelected(false);
        }
        if(manageCourseSelected) {
            setManageCourseSelected(false);
        }
        if(evaluateCourseSelected) {
            setEvaluateCourseSelected(false);
        }
        history.replace("/teacher/courses");
   }

   const handleSelectManageCourse = () => {
        setManageCourseSelected(true);
        if(accountSelected) {
            setAccountSelected(false);
        }
        if(studentSelected) {
            setStudentSelected(false);
        }
        if(teacherSelected) {
            setTeacherSelected(false);
        }
        if(evaluateCourseSelected) {
            setEvaluateCourseSelected(false);
        }

        history.replace("/teacher/courses");
   }

   const handleSelectEvaluateCourse = () => {
        setEvaluateCourseSelected(true);
        if(accountSelected) {
            setAccountSelected(false);
        }
        if(studentSelected) {
            setStudentSelected(false);
        }
        if(teacherSelected) {
            setTeacherSelected(false);
        }
        if(manageCourseSelected) {
            setManageCourseSelected(false);
        }
        history.replace("/course/evaluation");
   }
  
  
    
    return (
        <div className = "sidebar">
            <div className = 'user-info'>
            <ReactRoundedImage
          image={'/users/user3.jpg'}
          roundedColor="#321124"
          imageWidth="50"
          imageHeight="50"
          roundedSize="13"
          borderRadius="70"
        />
               <div className = 'user-info-detailed'>
                   <div className = 'user-name'>
            {username}
                   </div>
                   <div className = 'user-role'>
        {role}
                   </div>
               </div>
            </div>
           
            <div className = {accountSelected ? 'selected-title-wrapper' : 'title-wrapper'} onClick = {handleSelectAccount}>  
                <div className = 'sidebar-icon-wrapper'>
              <ManageAccounts/>
              </div>
              <div className = 'sidebar-text-wrapper'>
              Your Account
              </div>     
            </div>
           
         {/* <Link to = "/admin/manage/teacher"> */}
         <div className = {!teacherSelected ? 'title-wrapper' : 'selected-title-wrapper'} onClick = {handleSelectTeacher}>               
                    <div className = 'sidebar-icon-wrapper'>
                <PeopleIcon/>
                </div>
                <div className = 'sidebar-text-wrapper'>
                Manage Teachers
                </div>     
            </div>
             {/* </Link> */}
             {/* <Link to = '/admin/manage/student'> */}
             <div className = {studentSelected ? 'selected-title-wrapper' : 'title-wrapper'} onClick = {handleSelectStudent}>
                    <div className = 'sidebar-icon-wrapper'>
                <PeopleIcon/>
                </div>
                <div className = 'sidebar-text-wrapper'>
                Manage Students
                </div>     
            </div>
                 {/* </Link> */}
             {/* <Link to = "/teacher/courses"> */}
            <div className = {manageCourseSelected ? 'selected-title-wrapper' : 'title-wrapper'} onClick = {handleSelectManageCourse}>               
                    <div className = 'sidebar-icon-wrapper'>
                <MenuBookIcon />
                </div>
                <div className = 'sidebar-text-wrapper'>
               Manage Courses
                </div>     
            </div>
            {/* </Link> */}
            {/* <Link to = "/course/evaluation"> */}
            <div className = {evaluateCourseSelected ? 'selected-title-wrapper' : 'title-wrapper'} onClick = {handleSelectEvaluateCourse}>               
                    <div className = 'sidebar-icon-wrapper'>
                <MenuBookIcon />
                </div>
                <div className = 'sidebar-text-wrapper'>
              Evaluate Course
                </div>     
            </div>
            {/* </Link>  */}
            <div className = 'title-wrapper'  onClick = {userLogout}>
                <div className = 'sidebar-icon-wrapper'>
                <ExitToAppIcon />
                </div>
                <div className = 'sidebar-text-wrapper'>
                Exit
                </div>            
            </div>
            
        </div>
    )
}