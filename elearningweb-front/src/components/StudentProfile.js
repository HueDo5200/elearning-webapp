
import Clear from '@mui/icons-material/Clear';
import axios from 'axios';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudent } from '../actions/studentAction';
import MyCourse from './MyCourse';
import './StudentProfile.css';
import UpdatePasswordUI from './UpdatePasswordUI';
import UpdateProfileImgUI from './UpdateProfileImgUI';
export default function StudentProfile() {
const username = localStorage.getItem("user");
let isRendered = useRef(false);
const [student, setStudent] = useState([]);
const [courses, setCourses] = useState([]);
const [showForm, setShowForm] = useState(false);
const [updatePass, setUpdatePass] = useState(false);
const [updateProfileImg, setUpdateProfileImg] = useState(false);
const dispatch = useDispatch();
const auth = useSelector((state) => state.auth);
const userImg = auth.image;
const message = auth.message;
const success = auth.success;
useEffect(async() => {
    isRendered.current = true;
    try {
        const res = await axios.get('http://localhost:8084/student/find?username=' + username);
        const response = await axios.get('http://localhost:8084/course/all/student?username=' +username);
        const coursesData = response.data;  
        const resData = res.data;  
        if(isRendered.current) {
            setStudent(resData);
            setCourses(coursesData);
        }

    } catch(error) {
        console.log(error);
    }
    return () => { isRendered.current = false }
}, [])
const showUpdateForm = () => {
    setShowForm(!showForm);
}
const toggleUpdatePassUI = () => {
    setUpdatePass(!updatePass);
}
const closeImageProfilePopup = () => {
    setUpdateProfileImg(false);
}
const showImgProfilePopup = () => {
    setUpdateProfileImg(true);
}
const closeMessage = () => {
    if(message) {
        dispatch({
            type: 'REMOVE_MESSAGE',
        })
    } else if(success) {
        dispatch({
            type: 'REMOVE_SUCCESS_MESSAGE'
        })
    }
  
}


const UpdateForm = props => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");
    const studentId = localStorage.getItem("userId");
    const [username, setUsername] = useState(props.username ? props.username : "");
    const [email, setEmail] = useState(props.email ? props.email : "");
    const [facebook, setFacebook] = useState(props.facebook ? props.facebook : "");
    const updateProfile = (event) => {
        event.preventDefault();
        const student = {
            username: username,
            email: email,
            facebook: facebook,
        }
        dispatch(updateStudent(studentId, student, localStorage.getItem("token"))).then((data) => {
            setShowForm(false);
            setStudent(data);
        }).catch(() => {
            setMessage("Update Unsuccessfully!");
        })

    }
return (
<div className = 'update-profile-area' >
    <form onSubmit = {updateProfile}>
        <div className = 'profile-username-wrapper'>
            <input className = 'profile-username-input' value = {username} onChange = {e => setUsername(e.target.value)}/>
        </div>
        <div className = 'profile-email-wrapper'>
            <input className = 'profile-email-input' value = {email} onChange = {e => setEmail(e.target.value)}/>
        </div>
        <div className = 'profile-facebook-wrapper'>
            <input className = 'profile-facebook-input' value = {facebook} onChange = {e => setFacebook(e.target.value)}/>
        </div>
      <button type = 'submit' className = 'update-profile-btn'>Update</button>
    </form>
</div>
)
    
}
    return (
        <div className = 'student-profile'>
            <h2 className = 'profile-title'>Your Profile</h2>
            <div className = 'profile-user'>
        <img className = 'profile-image' src = {student.studentImage ? student.studentImage : "/users/user3.jpg"} alt = ""/>
        <div className = 'profile-user-info'>
            <div className = 'profile-username'>
            {student.username}
            </div>
              <div className = 'profile-email'>
                  <div className = 'email-text'>
                  Email:
                  </div>
                  <div className = 'profile-email-value'>
                  {student.email}
                  </div>
                  
              </div>
               <div className = 'profile-facebook'>
                   <div className = 'facebook-text'>
                   Facebook: 
                   </div>
                   <div className = 'profile-facebook-value'>
                   {student.facebook}
                  </div>
              
               </div>
            
                <div className = 'profile-btns'>
                    <button className = 'edit-btn' onClick = {showUpdateForm}>{showForm ? 'Close' : 'Update Profile'}</button>
                    <button className = 'password-btn' onClick = {toggleUpdatePassUI}>{updatePass ? 'Close' : 'Update Password'}</button>
                    <div className = 'update-profile-image-wrapper'>
                        <button className = 'profile-image-btn' onClick = {showImgProfilePopup}>{updateProfileImg ? 'Close' : 'Update Profile Image'}</button>
                    </div>
                </div>
               <div>
               {message || success ? (
                    <div className = 'message-wrapper'>
                    <div className = 'icon-wrapper'>
                        <Clear className = 'remove-icon' onClick = {closeMessage}/>
                    </div>
                    <div className = 'text-wrapper'>
                    <div className = 'error-text'>{message ? 'Error' : success ? 'Success' : ''}</div>
                    <div className = 'error-value'>
                    {message ? message : success ? success : ""}
                    </div>
                    </div>
               
                </div>
                ) : ""}
               </div>
        </div>
        <div>
            {updatePass ? (
                <UpdatePasswordUI 
                closeUI = {toggleUpdatePassUI}
                />
            ) : ""}

{
                updateProfileImg ? (
                    <UpdateProfileImgUI 
                     closeImageProfilePopup = {closeImageProfilePopup}
                    />
                ) : ""
            }
        </div>
       {showForm ? (
           <UpdateForm username = {student.username}
           email = {student.email}
           facebook = {student.facebook}
           />
       ) : ""}
            </div>
            <h2 className = 'my-course-title'>Your Courses</h2>
            <div className = 'profile-course'>
          
        {courses && courses.length > 0 && courses.map((item, i) => (
            <div key = {i} className = 'mycourse'>
                <MyCourse 
                id = {item.id} 
                name = {item.name}
                image = {item.image}
                teacher_name = {item.teacherName}
                rating = {item.avgRating}/>
            
            </div>
        ))}
            </div>
        </div>
    )
}