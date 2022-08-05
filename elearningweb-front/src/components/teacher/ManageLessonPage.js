import { useParams } from "react-router"
import Sidebar from "./Sidebar";
import './ManageLessonPage.css';
import { addNewLesson, updateLesson } from "../../actions/TeacherAction";
import Upload from "@mui/icons-material/Upload";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import './TeacherCoursePage.css';
import './Popup.css';
export default function ManageLessonPage() {
    const {id} = useParams();
    const [lessons, setLessons] = useState([]);
    const [lesson, setLesson] = useState(null);
    const [isOpened, setIsOpened] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [message, setMessage] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const [searchParam, setSearchParam] = useState(["name"]);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [openUploadPopup, setOpenUploadPopup] = useState(false);
    const [uploadVideo, setUploadVideo] = useState();
    const [uploadId, setUploadId] = useState(0);
    let isRendered = useRef(false);
    const [videoPopup, setVideoPopup] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [openDeleteVideo, setOpenDeleteVideo] = useState(false);
    useEffect(async() => {
        isRendered.current = true;
        try {
            const lessonRes = await axios.get(`http://localhost:8084/course/lesson/all/${id}`);
            const lessonData = lessonRes.data;
            if(isRendered.current) {
             setLessons(lessonData);     
            }

        } catch(error) {
            console.log(error);
        }
        return () => { isRendered.current = false }
    }, [])
    const showAddPopup = () => {
        setIsOpened(true);
 }
 const showEditPopup = (lesson) => {
    setLesson(lesson);
     setIsOpened(true);
    
 }
 const showDeletePopup = (id) => {
     setShowPopup(true);
     setDeleteId(id);
    
 }
 const closePopup = () => {
     setIsOpened(false);
     if(lesson) {
         setLesson(null);
     }
 }
 const closeDeletePopup = () => {
     setShowPopup(false);
     setDeleteId(0);
 }

 const searchLesson = (items) => {
     return items.filter((item) => {
         return searchParam.some((newItem) => {
             return (
                 item[newItem]
                     .toString()
                     .toLowerCase()
                     .indexOf(searchWord.toLowerCase()) > -1
             );
         });
     });
 }
 const removeMesage = () => {
     setMessage("");
 }
 const convertDate = (data) => {
    const date = new Date(data);
    const options = {
        day: "numeric", month: "long", year: "numeric"
    }
    return date.toLocaleDateString('en', options);
}
const openVideoUploadPopup = id => {
    setUploadId(id);
    setOpenUploadPopup(true);
}
const closeUploadPopup = () => {
    setLesson(null);
    setOpenUploadPopup(false);

}
const openDeleteVideoPopup = (id) => {
    setDeleteId(id);
    setOpenDeleteVideo(true);
}

const closeDeleteVideoPopup = () => {
    setDeleteId(0);
    setOpenDeleteVideo(false);
}

const UploadVideoPopup = props => {
    const onVideoSubmit = async (courseId, lessonId) => {
        const number = lessons.length;
        let formData = new FormData();
        formData.append('file', uploadVideo);
           const res = await axios.post(`http://localhost:8084/course/lesson/${courseId}/${lessonId}/upload/video/${number}`, formData, {headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'}});
           const resData = res.data;
           const index = lessons.findIndex((item) => item.id == resData.id);

           if(index >= 0) {
               lessons.splice(index, 1, resData);
           } else {
               console.warn("Can not update teacher course!");
           }
           setOpenUploadPopup(false);
          
         
}
    return (
        <div className = 'upload-popup'>
<div className = 'upload-popup-box'>
   {/* <form onSubmit = {onFileSubmit(props.courseId, props.onProgressUpload)}> */}
       <div>
       <input type = "file" onChange = {e => setUploadVideo(e.target.files[0])}/>
       </div>
       {/* {uploadVideo ? (
              <div className = 'progress-bar'>
                   {progress}%
               </div> 
       ) : ""} */}
       <button  className = 'upload-btn' onClick = {e => onVideoSubmit(props.courseId, props.lessonId)}>Upload</button>
       <button className = 'close-btn' onClick = {props.closeUploadPopup}>Close</button>
   {/* </form> */}
</div>
</div>
    )
}
    const DeletePopup = props => {
        async function submitDelete(event) {
            event.preventDefault();
            const id = props.deleteId;
            await axios.delete(`http://localhost:8084/course/lesson/delete/${id}`,  {headers: {Authorization: 'Bearer ' + token}});
       const index = lessons.findIndex((item) => item.id === id);
       lessons.splice(index, 1);
      setShowPopup(!showPopup);
    }
    // onClick = {removeTeacher(props.deleteId)}
       
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

    const DeleteVideoPopup = props => {
        async function submitDelete(event) {
            event.preventDefault();
            const id = props.deleteId;
            await axios.delete(`http://localhost:8084/course/lesson/delete/video/${id}`,  {headers: {Authorization: 'Bearer ' + token}});
       const video = lessons.find((item) => item.id === id);
       video.path = null;
      setDeleteId(0);
      setOpenDeleteVideo(false);
    }
    // onClick = {removeTeacher(props.deleteId)}
       
        return (
            <div className = 'popup'>
                <form onSubmit = {submitDelete}>
<div className = 'delete-popup'>
            <div className = 'delete-text'>Are you sure to delete the video ?</div>
            <div className = 'btns-group'>
                <button className = 'confirm-button' type = 'submit'>Yes</button>
                <button className = 'no-button' onClick = {props.closeDeleteVideoPopup}>No</button>
            </div>
        </div>
        </form>
</div>
        )
    }

    const Popup = props => {
        const [name, setName] = useState(props.id ? props.name : "");
        const [description, setDescription] = useState(props.id ? props.description : "");
        const [dateUpdated, setDateUpdated] = useState(new Date());
       
        function submitForm(event) {
            event.preventDefault();
           
        if(props.id) {
            dispatch(updateLesson(props.id, {name: name, description: description, dateUpdated: dateUpdated}, token))
            .then((data) => {
            const index = lessons.findIndex((item) => item.id === data.id);
            if(index >= 0) {
                lessons.splice(index, 1, data);
            } else {
                console.warn("Can not update teacher course!");
            }
            setIsOpened(false);        
            })           
        } else {
            const newLesson = {
                name: name,
                description: description,
                path: "",
                script: "",
                dateCreated: new Date(),
                dateUpdated: null,
                courseId: id,
            }
            dispatch(addNewLesson(newLesson)).then((data) => {
                lessons.push(data);
                setIsOpened(false);
                setMessage("Save Lessons Successfully!"); 

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
                       <div className = 'input-wrapper'>
                <label>Name </label>
            <input className = 'lesson-username-input' value = {name} onChange = {e => setName(e.target.value)} />
            </div>
            <div className = 'input-wrapper'>
                <label>Description</label>
            <input className = 'lesson-fullname-input' value = {description} onChange = {e => setDescription(e.target.value)} />
            </div>  
                <button type = "submit" className = 'save-btn'>SAVE</button>
                </form>   
            </div>
            </div>
          
        )
    }
    const WatchVideoPopup = (props) => {
        return (
            <div className = 'video-popup'>
                <div className = 'video-popup-box'>
                <div className = 'close-wrapper'>         
                    <CloseIcon onClick = {props.closeVideoPopup}/>
                </div>
                {/* <ReactPlayer url= "https://www.youtube.com/watch?v=5lP_anjF6rA" /> */}
                <video src = {props.src} controls controlsList = "nodownload" />
                </div>
            </div>
        )
    }
    const openVideoPopup = (path) => {
        setVideoUrl(path);
        setVideoPopup(true);
    }
    const closeVideoPopup = () => {
        setVideoPopup(false);
    }

   
    return (
        <div className = 'manage-lesson-page'>
             {/* <Sidebar/> */}
             <div className = 'right-section'>
             <div className = 'add-wrapper'>
          <button onClick = {showAddPopup} className = 'add-button'> Add new lesson <AddIcon className = 'add-icon'/></button>
              
           </div>  
             <table id = "teacher-table" class = "table">
            
    <thead>
        <tr>    
        <th>Name</th>
           <th>Description</th>
            <th>Date Created</th>
            <th>Video</th>
           
        </tr>
    </thead>
    <tbody>
{searchLesson(lessons).map((item, index) => ( 
        <tr key = {index} className = 'table-row'>      
            <td>{item.name}</td>
            <td className = 'student-num'>{item.description}</td>
            <td className = 'item-price'>{convertDate(item.dateCreated)}</td>
            <td>{item.path ? (
            // <video src = {item.path} alt = ""  width = "100px" height = "100px" controls/>)
            <div className = 'video-wrapper'>
            <div className = 'visible-wrapper'>
            <VisibilityIcon onClick = {e => {openVideoPopup(item.path)}}/>
            </div>
            <div className = 'delete-wrapper'>
                    <DeleteIcon onClick = {() => {openDeleteVideoPopup(item.id)}}/>
                </div>
           </div>
            )
            : (
               <Upload onClick = {e => {openVideoUploadPopup(item.id)}}/>
            )}
            {/* <div className = 'popover-course'>
               
                <div classname = 'description-wrapper'>
                    <div className = 'description-value'>
<DeleteIcon/>
                    </div>
                </div>          
                </div> */}
            </td>
            <td>
                <div className = "action-icons">
                    <div className = 'action-wrapper'>
                    <EditIcon className = 'edit-icon' onClick = {() => showEditPopup(item)}/>
                    </div>
                    <div className = 'action-wrapper'>
                   <DeleteIcon  onClick = {() => showDeletePopup(item.id)}/>
                    </div>
                </div>
            </td>

        </tr>
))}
</tbody>
</table>
{showPopup && deleteId != 0 ? (
   <DeletePopup deleteId = {deleteId} 
   closeDeletePopup = {closeDeletePopup}
   />

) : ""}
<div>
    {openDeleteVideo && deleteId != 0 ? (
 <DeleteVideoPopup 
 deleteId = {deleteId}
 closeDeleteVideoPopup = {closeDeleteVideoPopup} />
    ) : ""} 
</div>
             </div>
             {isOpened && lesson ? (
<Popup 
id={lesson.id}
name = {lesson.name}
description = {lesson.description}
closePopup = {closePopup}
/>
) : isOpened ?
(<Popup closePopup = {closePopup}/>)
: ""
}
<div>
    {openUploadPopup ? (
        <UploadVideoPopup closeUploadPopup = {closeUploadPopup}
        courseId = {id}
lessonId = {uploadId}
/>
    ) : ""}
</div>
<div>
    {
        videoPopup ? (
            <WatchVideoPopup 
            src = {videoUrl}
            closeVideoPopup = {closeVideoPopup}
            />
        ) : ""
    }
</div>
        </div>
    )
}