import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification, getAllNotificationOfTeacher, insertCourse, updateCourse, updateNotification } from '../../actions/courseAction';
import './TeacherCoursePage.css';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useState, useRef } from 'react';
import Sidebar from './Sidebar';
import DatePicker from 'react-date-picker';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import { useParams } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function TeacherNotificationPage() {
    const [teacherNotifications, setTeacherNotifications] = useState([]);
    const [isOpened, setIsOpened] = useState(false);
    const teacherName = localStorage.getItem("user");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const {id} = useParams();
    const token = localStorage.getItem("token");
    const [deleteId, setDeleteId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const [notificationItem, setNotificationItem] = useState(null);
    let isRendered = useRef(false);
    useEffect(async() => {
        isRendered.current = true;
        try {
            if(isRendered.current) {
                dispatch(getAllNotificationOfTeacher(teacherName, id, token)).then((data) => {
                  setTeacherNotifications(data);
                })
                
            }

        } catch(error) {
            console.log(error);
        }
        return () => { isRendered.current = false }
    }, [])
    
    const closeDeletePopup = () => {
        setDeleteId(null);
        setShowPopup(false);
    }
    const openDeletePopup = (id) => {
        setDeleteId(id);
        setShowPopup(true);
    }

    const showAddMessagePopup = () => {
        setShowMessagePopup(true);
    }
    const closeAddMessagePopup = () => {
        setShowMessagePopup(false);
    }

    const SendMessagePopup = (props) => {
        const teacherName = localStorage.getItem("user");
        const [title, setTitle] = useState("");
        const [content, setContent] = useState("");
        const [link, setLink] = useState("");
        const [names, setNames] = useState([]);
        const [receiver, setReceiver] = useState("");
        
        let isRendered = useRef(false);
        useEffect(async() => {
            isRendered.current = true;
            try {
                const list = await axios.get(`http://localhost:8084/student/all/name/${props.courseId}`);
                const data = list.data;
                if(isRendered.current) {
                   setNames(data);
                   setReceiver(names[0])
                }

            } catch(error) {
                console.log(error);
            }
            return () => {isRendered.current = false;}
        })
        function submitForm(event) {
            event.preventDefault();
        const notification = {
            courseId: id,
           title: title,
            content: content,
            link: link,
            datePosted: new Date(),
            teacherName: teacherName,
            studentName: receiver,
        }
      
            dispatch(createNotification(notification)).then((data) => {
                teacherNotifications.push(data);
                setShowMessagePopup(false);
                // setMessage("Save Notification Successfully!"); 

            })


        }
        return (
            <div className = 'popup'>
                <div className = 'popup-box'>    
            <form onSubmit = {submitForm}>
            <div className = 'name-wrapper'>
                <label>Name</label>
            <textarea className = 'name-input' rows = "2" cols = "100" value = {title} onChange = {e => setTitle(e.target.value)} />
            </div>
            <div className = 'content-wrapper'>
                <label>Content</label>
            <textarea className = 'content-input'  rows = "6" cols = "100" value = {content} onChange = {e => setContent(e.target.value)} />
            </div>
            <div className = 'link-wrapper'>
            <label>Link</label>
           <input className = 'link-input' value = {link} onChange = {e => setLink(e.target.value)} />
            </div>  
            <div className = 'to-wrapper'>
            <label>Send To</label>
            <select className = 'level-input' value = {receiver} onChange = {e => setReceiver(e.target.value)}>
                {names && names.length > 0 && names.map((item, i) => (
                    <option  key = {i} value = {item}>{item}</option>
                ))}
            </select>
            </div>  
            {/* <div className = 'discount-end-wrapper'>
            <DatePicker
        onChange={setDatePosted}
        value={datePosted}
      />
                </div>   */}
                <button type = "submit" className = 'save-btn'>SAVE</button>
                <button className = 'close-btn' onClick = {closeAddMessagePopup}>CLOSE</button>
                </form>   
            </div>
            </div>
        )
    }
    const DeletePopup = props => {

        async function submitDelete(event) {
            event.preventDefault();
            const id = props.deleteId;
            await axios.delete(`http://localhost:8084/notification/delete/${id}`,  {headers: {Authorization: 'Bearer ' + token}});
       const index = teacherNotifications.findIndex((item) => item.id === id);
       teacherNotifications.splice(index, 1);
    setDeleteId(null);
      setShowPopup(!showPopup);
    }  
        return (
            <div className = 'popup'>
                <form onSubmit = {submitDelete}>
<div className = 'delete-popup'>
            <div className = 'delete-text'>Are you sure about your decision ?</div>
            <div className = 'btns-group'>
                <button className = 'confirm-button' type = 'submit'>Yes</button>
                <button className = 'no-button' onClick = {props.closeDeletePopup}>No</button>
            </div>
        </div>
        </form>
</div>
        )
    }

    const Popup = props => {
        const teacherId = localStorage.getItem("userId");
        const teacherName = localStorage.getItem("user");
        const [title, setTitle] = useState(props.id ? props.title : "");
        const [content, setContent] = useState(props.id ? props.content : "");
        const [link, setLink] = useState(props.id ? props.link : "");
        const token = localStorage.getItem("token");
        function submitForm(event) {
            event.preventDefault();
        const notification = {
            courseId: id,
           title: title,
            content: content,
            link: link,
            datePosted: new Date(),
            teacherName: teacherName,
        }
        if(props.id) {   
            dispatch(updateNotification(props.id, notification, token))
            .then((data) => {
            const index = teacherNotifications.findIndex((item) => item.id === data.id);
            if(index >= 0) {
                teacherNotifications.splice(index, 1, data);
            } else {
                console.warn("Can not update teacher course!");
            }
            setIsOpened(false);           
            })               
        } else {
            dispatch(createNotification(notification)).then((data) => {
                teacherNotifications.push(data);
                setIsOpened(false);
                // setMessage("Save Notification Successfully!"); 

            })
        }


        }
       
       
       
        return (
            <div className = 'popup'>
                <div className = 'popup-box'>
                <div className = 'close-wrapper'>         
                    <CloseIcon onClick = {props.closePopup}/>
                </div>
            <form onSubmit = {submitForm}>
            <div className = 'name-wrapper'>
                <label>Name</label>
            <textarea className = 'name-input' rows = "2" cols = "100" value = {title} onChange = {e => setTitle(e.target.value)} />
            </div>
            <div className = 'content-wrapper'>
                <label>Content</label>
            <textarea className = 'content-input'  rows = "6" cols = "100" value = {content} onChange = {e => setContent(e.target.value)} />
            </div>
            <div className = 'link-wrapper'>
            <label>Link</label>
           <input className = 'link-input' value = {link} onChange = {e => setLink(e.target.value)} />
            </div>    
            {/* <div className = 'discount-end-wrapper'>
            <DatePicker
        onChange={setDatePosted}
        value={datePosted}
      />
                </div>   */}
                <button type = "submit" className = 'save-btn'>SAVE</button>
                </form>   
            </div>
            </div>
          
        )
    }
    const showAddPopup = () => {
           setIsOpened(true);
    }
    const showEditPopup = (notificationItem) => {
        setIsOpened(!isOpened);
        setNotificationItem(notificationItem);
    }
    const closePopup = () => {
        setIsOpened(false);
        if(notificationItem) {
            setNotificationItem(null);
        }
    }
    const convertDate = (data) => {
        const  date = new Date(data);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString('en', options); 
    }
    return (
      
        <div className = 'teacher-course-page'>
             {/* <Sidebar/> */}
<div className = 'right-section'>
       <div className = 'add-wrapper'>
       <button onClick = {showAddPopup} className = 'add-button'> Add new notification <AddIcon className = 'add-icon'/></button>   
       <button onClick = {showAddMessagePopup} className = 'message-button'>Send Notification To</button>
           </div>   
           <div className = 'message-wrapper'>
               {message}
           </div>
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Links</th>
            <th>Posted</th>
            <th>Comments</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
{teacherNotifications && teacherNotifications.length > 0 && teacherNotifications.map((item, index) => ( 
        <tr key = {index}>
            <td>{item.title}</td>
            <td>{item.content}</td>
            <td className = {item.link ? 'notification-link' : "non-link"}>{item.link ? (
               <a href = {item.link} target = "_blank">{item.link}</a>
            ) : "-"}</td>
            <td className = 'date-posted'>{convertDate(item.datePosted)}</td>
            <td><Link to = {'/teacher/notification/comments/' + item.id}><Visibility/></Link></td>
            <td><div className = "action-icons"><DeleteIcon onClick = {() => {openDeletePopup(item.id)}}/><EditIcon className = 'edit-icon' onClick = {() => showEditPopup(item)}/></div></td>

        </tr>
))}
</tbody>
</table>
<div>
    {
        showMessagePopup ? (
<SendMessagePopup
courseId = {id}
/>
        ) : ""
    }
</div>
<div>
{showPopup && deleteId ? (
<DeletePopup 
deleteId = {deleteId}
closeDeletePopup = {closeDeletePopup}
/>
) : ""}
</div>
</div>
{isOpened && notificationItem ? (
<Popup 
id={notificationItem.id}
title={notificationItem.title}
content = {notificationItem.content}
link = {notificationItem.link}
datePosted = {notificationItem.datePosted}
closePopup = {closePopup}
/>
) : isOpened ?
(<Popup closePopup = {closePopup}/>)
: ""
}
        </div>
    )
}