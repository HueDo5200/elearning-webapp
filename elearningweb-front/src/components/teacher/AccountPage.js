import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourseOfTeacher } from '../../actions/courseAction';
import { findTeacherByUsername, updateTeacherProfile } from '../../actions/TeacherAction';
import {updateAdminProfile} from '../../actions/adminAction';
import './AccountPage.css';
import ReactRoundedImage from "react-rounded-image";
import Sidebar from './Sidebar';
import DatePicker from 'react-date-picker';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

import Clear from '@mui/icons-material/Clear';
import UpdatePasswordUI from '../UpdatePasswordUI';
import UpdateProfileImgUI from '../UpdateProfileImgUI';
export default function AccountPage() {
    const [user, setUser] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isOpened, setIsOpened] = useState(false);
    const dispatch = useDispatch();
    const userName = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    const isRendered = useRef(false);
    const [openAdminPopup, setOpenAdminPopup] = useState(false);
    const [showUpdatePass, setShowUpdatePass] = useState(false);
    // const [message, setMessage] = useState("");
    const [updateProfileImg, setUpdateProfileImg] = useState(false);
   const auth = useSelector((state) => state.auth);
   const userImg = auth.image;
   const message = auth.message;
   const success = auth.success;
    useEffect(async() => {
        isRendered.current = true;
        try {
            if(isRendered.current) {
                if(role === "teacher") {
                    dispatch(getAllCourseOfTeacher(userName)).then((data) => {
                        setCourses(data);   
                      })
                      dispatch(findTeacherByUsername(userName)).then((data) => {
                          setUser(data);
                          dispatch({
                              type: 'SET_IMAGE',
                              payload: data.teacherImage,
                          })
                      })     
                } else {
                        const res = await axios.get('http://localhost:8084/admin/find?username=' + userName);
                        const resData = res.data;
                        setUser(resData);
                        dispatch({
                            type: 'SET_IMAGE',
                            payload: resData.image,
                        })
                        
                }
                         
            }

        } catch(error) {
            console.log(error);
        }
        return () => { isRendered.current = false }
    }, [])
    const toggleUpdatePassUI = () => {
        
        setShowUpdatePass(!showUpdatePass);
    }
   
    const closeImageProfilePopup = () => {
        setUpdateProfileImg(false);
    }
    const showImgProfilePopup = () => {
        setUpdateProfileImg(true);
    }

    const getTotalReviews = (items) => {
        let total = 0;
        for(let i = 0; i < items.length; i++) {
            total += items[i].commentNumber;
        }
        return total;
    }
    const getTotalStudents = (items) => {
        let total = 0;
        for(let i = 0; i < items.length; i++) {
            total += items[i].enrolledNumber;
        }
        return total;
      
    }
    const convertDate = (data) => {
        const date = new Date(data);
        const options = {
            day: "numeric", month: "long", year: "numeric"
        }
        return date.toLocaleDateString('en', options);
    }
    const closePopup = () => {  
        setIsOpened(false);
    }
    const closeAdminUpdatePopup = () => {
        setOpenAdminPopup(false);
    }

    const openUpdatePopup = () => {
        if(role === "teacher") {
          setIsOpened(true);
        } else {
            setOpenAdminPopup(true);
        }
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
   
    
    const Popup = props => {
        const [username, setUsername] = useState(props.username);
        const [email, setEmail] = useState(props.email);
        const [facebook, setFacebook] = useState(props.facebook);
        const [dob, setDob] = useState(props.dob);
        const [fullname, setFullName] = useState(props.fullName);
        const [degree, setDegree] = useState(props.degree);
        const [professional, setProfessional] = useState(props.professional);
        function submitForm(event) {
            event.preventDefault();
        const profile = {
           id: props.id,
           username: username,
           email:email,
           facebook: facebook,
           dob: dob,
           fullName: fullname,
           degree: degree,
           professional: professional,
           teacherImage: props.teacherImage,
        }
            const token = localStorage.getItem("token");
            dispatch(updateTeacherProfile(profile, token))
            .then((data) => {
           setUser(data);
            setIsOpened(false);        
            })
        }      
        return (
            <div className = 'popup'>
                <div className = 'popup-box'>
                <div className = 'close-wrapper'>         
                    <CloseIcon onClick = {props.closePopup}/>
                </div>
            <form onSubmit = {submitForm}>
            <div className = 'name-wrapper'>
                <label>UserName</label>
            <textarea className = 'name-input' rows = "2" cols = "80" value = {username} onChange = {e => setUsername(e.target.value)} />
            </div>
            <div className = 'input-wrapper'>
 <label>Full Name</label>
 <input className = 'professional-input'  value = {fullname} onChange = {e => setFullName(e.target.value)}/>
 </div> 
            <div className = 'description-wrapper'>
            <label>Email</label>
            <textarea className = 'description-input' rows = "4" cols = "80" value = {email} onChange = {e => setEmail(e.target.value)}/>
            </div>
            <div className = 'content-wrapper'>
                <label>Facebook</label>
            <textarea className = 'content-input' rows = "6" cols = "80" value = {facebook} onChange = {e => setFacebook(e.target.value)} />
            </div>
            <div className = 'price-wrapper'>
            <label>Date Of Birth</label>
            <DatePicker className = 'date-picker'
        onChange={setDob}
        value={dob} />
            </div>
            <div className = 'degree-wrapper'>
 <label>Degree</label>
 <select className = 'degree-input' value = {degree} onChange = {e => setDegree(e.target.value)}>
     <option value = "Bachelor">Bachelor</option>
     <option value = "Master">Master</option>
     <option value = "Doctoral">Doctoral</option>
 </select>
 </div>
 <div className = 'input-wrapper'>
 <label>Professional</label>
 <input className = 'professional-input'  value = {professional} onChange = {e => setProfessional(e.target.value)}/>
 </div> 
                <button type = "submit" className = 'save-btn'>SAVE</button>
                </form>   
            </div>
            </div>        
        )
    }

const AdminPopup = props => {
        const [username, setUsername] = useState(props.username);
        const [dob, setDob] = useState(props.dob);
        const [fullname, setFullName] = useState(props.fullName);
    
        function submitForm(event) {
            event.preventDefault();
        const profile = {
           username: username,
           dob: dob,
           fullName: fullname,
           image: props.teacherImage,
        }
        console.log("open admin " + openAdminPopup);
            const token = localStorage.getItem("token");
            dispatch(updateAdminProfile(profile, token))
            .then((data) => {
           setUser(data);
           console.log('admin.data ' + JSON.stringify(data));
            setOpenAdminPopup(false);        
            })
        }  
    return (
            <div className = 'popup'>
                <div className = 'popup-box'>
                <div className = 'close-wrapper'>         
                    <CloseIcon onClick = {props.closePopup}/>
                </div>
            <form onSubmit = {submitForm}>
            <div className = 'name-wrapper'>
                <label>UserName</label>
            <input className = 'admin-username' value = {username} onChange = {e => setUsername(e.target.value)} />
            </div>
            <div className = 'input-wrapper'>
 <label>Full Name</label>
 <input className = 'admin-fullname'  value = {fullname} onChange = {e => setFullName(e.target.value)}/>
 </div> 
            <div className = 'price-wrapper'>
            <label>Date Of Birth</label>
            <DatePicker className = 'admin-date-picker'
        onChange={setDob}
        value={dob} />
            </div>
                <button type = "submit" className = 'save-btn'>SAVE</button>
                </form>   
            </div>
            </div>
    )
}
    return (
        <div className = 'account-page'>
             {/* <Sidebar/> */}
             <div className = 'right-section-area'>
            <div className = 'teacher-info'> 
           
            <ReactRoundedImage
          image={userImg ? userImg : '/users/user3.jpg'}
          roundedColor="#321124"
          imageWidth="200"
          imageHeight="200"
          roundedSize="13"
          borderRadius="100"
         
        />
       
                   <div className = 'teacher-info-detail'> 
                    <div className = 'teacher-name-area'>
                        <div className = 'name-text'>
                        Username:
                        </div>
                        <div className = 'name-value'>
                        {user.username}
                        </div>
                    </div>
                    <div className = 'teacher-fullname'>
                        <div className = 'fullname-text'>
                            Full Name:
                        </div>
                        <div className = 'fullname-value'>
                        {user.fullName}
                        </div>
                       </div>
                    <div className = 'teacher-dob'>
                        <div className = 'dob-text'>Date Of Birth: </div>
                        <div className = 'dob-value'>
                        {convertDate(user.dob)}
                        </div>
                        </div>
                        {role === "teacher" ? (
             <>               
  <div className = 'teacher-email'>
                        <div className = 'email-text'>
                            Email: 
                        </div>
                        <div className = 'email-value'>
                        {user.email}
                        </div>                    
                        </div>
                    <div className = 'teacher-facebook'>
                        <div className = 'facebook-text'>
                            Facebook: 
                        </div>
                        <div className ="facebook-value">
                        {user.facebook ? user.facebook : '-'}
                        </div>           
                    </div>
                    <div className = 'teacher-degree'>
                        <div className = 'degree-text'>
                            Degree: 
                        </div>
                        <div className = 'degree-value'>
                        {user.degree}
                        </div>
                   </div>
                    <div className = 'teacher-professional'>
            <div className = 'professional-text'>
                Professional: 
                </div>     
                <div className = 'professional-value'>
                {user.professional}
                </div>       
                       
                    </div>
                </>
                         
                        ) : ""}
                 
              
                </div>
                <div className = 'account-right-btns'>
                <div className = 'buttons'>
                    <div className = 'update-profile-wrapper'>
                        <button className = 'profile-btn' onClick = {openUpdatePopup}>{isOpened || openAdminPopup ? 'Close' : 'Update Profile'}</button>
                    </div>
                    <div className = 'password-btn-wrapper'>
                        <button className = 'pass-btn' onClick = {toggleUpdatePassUI}>{showUpdatePass ? 'Close' : 'Change Password'}</button>
                    </div>
                    <div className = 'update-profile-image-wrapper'>
                        <button className = 'upload-profile-image-btn' onClick = {showImgProfilePopup}>{updateProfileImg ? 'Close' : 'Update Profile Image'}</button>
                    </div>
                   
        </div>
        <div>
            {showUpdatePass ? (
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
            {role === "teacher" ? (
 <div className = 'teacher-course-info'>
 <div className = 'total-course'>
     <div className = 'total-course-text'>
         Courses
     </div>
     <div className = 'total-course-value'>
     {courses.length} 
     </div>

 </div>
 <div className = 'total-reviews'>
     <div className = 'total-reviews-text'>
         Reviews
     </div>
     <div className = 'total-reviews-value'>
     {getTotalReviews(courses)}
     </div>
 </div>
 <div className = 'total-students'>
     <div className = 'total-students-text'>
         Students
     </div>
     <div className = 'total-students-value'>
     {getTotalStudents(courses)} 
     </div>
     </div>
    
 </div>
            ) : ""}
          
            
        </div>
      
        {isOpened && user ? (
<Popup 
id={user.id}
username = {user.username}
email = {user.email}
facebook = {user.facebook}
dob = {user.dob}
fullName = {user.fullName}
degree = {user.degree}
professional = {user.professional}
teacherImage = {user.teacherImage ? user.teacherImage : '/users/user3.jpg'}
closePopup = {closePopup}
/>
) : isOpened ?
(<Popup closePopup = {closePopup}/>)
: ""
}
<div>
    <div>
   
    </div>
{openAdminPopup && user ? (
    <AdminPopup
    id={user.id}
    username = {user.username}
    fullName = {user.fullName}
    dob = {user.dob}
    teacherImage = {user.image ? user.image : '/users/user3.jpg'}
    closePopup = {closeAdminUpdatePopup}/>
) : openAdminPopup ? (
    <AdminPopup closePopup = {closeAdminUpdatePopup}/>
) : ""
}
</div>

        </div>
    )
}