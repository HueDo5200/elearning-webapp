import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourseOfTeacher, insertCourse, deleteCourseVideo, updateCourse, uploadCourseImage, uploadPreviewVideo } from '../../actions/courseAction';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './TeacherCoursePage.css';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useState, useRef } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import DatePicker from 'react-date-picker';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import { Link } from 'react-router-dom';
import './Popup.css';
import ReviewsIcon from '@mui/icons-material/Reviews';
import StarRatings from 'react-star-ratings';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import WatchVideoPopup from '../WatchVideoPopup';
import DeleteIcon from '@mui/icons-material/Delete';
import DeletePopup from '../DeletePopup';
import { useHistory } from 'react-router';
import DeleteVideoPopup from '../DeleteVideoPopup';
import Delete from '@mui/icons-material/Delete';
export default function TeacherManageCourse() {
    const course = useSelector((state) => state.course);

    // const [teacherCourses, setTeacherCourses] = useState([]);
    const teacherCourses = course.teacherCourses;
    const [isOpened, setIsOpened] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const teacherName = localStorage.getItem("user");
    const [searchWord, setSearchWord] = useState("");
    const [searchParam, setSearchParam] = useState(["name", "teacherName"]);
    const dispatch = useDispatch();
    const [courseItem, setCourseItem] = useState(null);
    const [uploadFile, setUploadFile] = useState();
    const [uploadVideo, setUploadVideo] = useState();
 
    const [progress, setProgress] = useState(0);
    const [openUploadPopup, setOpenUploadPopup] = useState(false);
    const [openVideoPopup, setOpenVideoPopup] = useState(false);
    const [openWatchVideoPopup, setOpenWatchVideoPopup] = useState(false);
    const [videoUrl, setVideoUrl] = useState(false);
    const [uploadImageId, setUploadImageId] = useState(0);
    const [uploadVideoId, setUploadVideoId]  = useState(0);
    const [replaceId, setReplaceId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [openDeleteVideoPopup, setOpenDeleteVideoPopup] = useState(false);
    const [message, setMessage] = useState(false);
    const history = useHistory();
    const token = localStorage.getItem("token");
    let isRendered = useRef(false);
   
    useEffect(async() => {
        isRendered.current = true;
        try {
            dispatch(getAllCourseOfTeacher(teacherName)).then((data) => {
                   
                   
            })
           

        } catch(error) {
            console.log(error);
        }
        return () => { isRendered.current = false }
    }, [])
    const closeMessage = () => {
        setMessage(null);
    }
    
    

   
    const openUploadPopupClick = (id) => { 
        setUploadImageId(id); 
        setOpenUploadPopup(!openUploadPopup);
       
    }
    const openVideoPopupClick = (id) => {
        setUploadVideoId(id);
        setOpenVideoPopup(!openVideoPopup);
      
       
    }
   
    const showWatchVideoPopup = (path) => {
        setVideoUrl(path);
        setOpenWatchVideoPopup(true);
    }

    const closeWatchVideoPopup = () => {
        setOpenWatchVideoPopup(false);
        setVideoUrl("");
    }
    const showDeleteVideoPopup = (id) => {
        setDeleteId(id);
        setOpenDeleteVideoPopup(true);

    }
   
    const showAddPopup = () => {
        setOpenAdd(true);
  }
  const closeAddPopup = () => {
      setOpenAdd(false);
  }
  const showEditPopup = (courseItem) => {
      setIsOpened(!isOpened);
      setCourseItem(courseItem);
  }
 const closeImagePopup = () => {
     setOpenUploadPopup(false);
    
 }
 const closeVideoPopup = () => {
     setOpenVideoPopup(false);
    
 }
  const closePopup = () => {
      setIsOpened(false);
      if(courseItem) {
          setCourseItem(null);
      }
  }

  const closeDeleteVideoPopup = () => {
    setOpenDeleteVideoPopup(false);
   
}
const showDeletePopup = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
}
const closeDeletePopup = () => {
    setDeleteId(null);
    setOpenDelete(false);
}
  

    
const UploadPopup = props => {
    const onFileSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', uploadFile);   
           dispatch(uploadCourseImage(props.courseId, formData)).then((data) => {
              
           setOpenUploadPopup(false);
           })
}
const setUploadImage = (event) => {
    setUploadFile(event.target.files[0]);
}
    return (
<div className = 'upload-popup'>
    <div className = 'close-wrapper'>         
               <CloseIcon onClick = {props.closeUploadPopup}/>
           </div>
<div className = 'upload-popup-box'>
   <form onSubmit = {onFileSubmit}>
       <div>
       <input type = "file" onChange = {setUploadImage}/>
       </div>
       <button  className = 'upload-btn' type = 'submit'>Upload Image</button>
       <button className = 'close-btn' onClick = {props.closeImagePopup}>Close</button>
   </form>
</div>
</div>
    )
    
}


const UploadVideoPopup = props => {
   
    const onVideoSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', uploadVideo);
        dispatch(uploadPreviewVideo(props.courseId, formData))
        // setUploadVideoId(null);
        setOpenVideoPopup(false); 
        
        

        // const res = await axios.post(`http://localhost:8084/course/${id}/upload/preview-video`, data, {headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'}});
        // const resData = res.data;
        // const index = lessons.findIndex((item) => item.id == resData.id);

        // if(index >= 0) {
        //     lessons.splice(index, 1, resData);
        // } else {
        //     console.warn("Can not update teacher course!");
        // }
        // setOpenUploadPopup(false);
       
      
                 
}
const changeUploadVideo = (event) => {
    setUploadVideo(event.target.files[0])
}
    return (
        <div className = 'upload-popup'>
            <form onSubmit = {onVideoSubmit}>
<div className = 'upload-popup-box'>
       <div>
       <input type = "file" onChange = {changeUploadVideo}/>
       </div>
       <button className = 'upload-btn' type = 'submit'>Upload</button>
       <button className = 'close-btn' onClick = {props.closeVideoPopup}>Close</button>
     
</div>
</form>
</div>
    )
}
    const Popup = props => {
        const teacherId = localStorage.getItem("userId");
        const teacherName = localStorage.getItem("user");
        const [name, setName] = useState(props.id ? props.name : "");
        const [description, setDescription] = useState(props.id ? props.description : "");
        const [content, setContent] = useState(props.id ? props.content : "");
        const [price, setPrice] = useState(props.id ? props.price : 0);
        const [level, setLevel] = useState(props.id ? props.level : 0);
        const [discount, setDiscount] = useState(props.id ? props.discount : 0);
        const [discountEnd, onChange] = useState(new Date());
        function submitForm(event) {
            event.preventDefault();
        const course = {
            teacherId: teacherId,
            name: name,
            description: description,
            content: content,
            price: price,
            dateCreated: new Date(),
            discount: discount,
            discountEnd: discountEnd,
            level: level,
            image: props.image ? props.image : "",
            isBestseller: props.isBestseller,
            enrolledNumber: props.enrolledNumber,
            commentNumber: props.commentNumber,
            teacherName: teacherName,
            avgRating: props.avgRating,
            previewVideoPath: props.previewVideoPath ? props.previewVideoPath : ""
        }
        if(props.id) {
            
            const token = localStorage.getItem("token");    
            dispatch(updateCourse(props.id, course, token))
            .then((data) => {
                setCourseItem(null);
                setIsOpened(false);        
            })            
        } else {
           
            dispatch(insertCourse(course)).then((data) => {
               setMessage("Your request for publishing new course will be evaluated in 7 days!")
               setOpenAdd(false);
            })
        }
        } 
        return (
            <div className = 'popup'>
                <div className = 'popup-box'>
               
            <form onSubmit = {submitForm}>
            <div className = 'name-wrapper'>
                <label>Name</label>
            <textarea className = 'name-input' rows = "2" cols = "80" value = {name} onChange = {e => setName(e.target.value)} />
            </div>
            <div className = 'description-wrapper'>
            <label>Description</label>
            <textarea className = 'description-input' rows = "4" cols = "80" value = {description} onChange = {e => setDescription(e.target.value)}/>
            </div>
            <div className = 'content-wrapper'>
                <label>Content</label>
            <textarea className = 'content-input' rows = "6" cols = "80" value = {content} onChange = {e => setContent(e.target.value)} />
            </div>
            <div className = 'price-wrapper'>
            <label>Price</label>
           <input className = 'price-input' name = 'price' value = {price} onChange = {e => setPrice(e.target.value)} /> $USD
            </div>
            <div className = 'level-wrapper'>
            <label>Level</label>
            <select className = 'level-input' value = {level} onChange = {e => setLevel(e.target.value)}>
                <option value = "0">BEGINNER</option>
                <option value = "1">INTERMEDIATE</option>
                <option value = "2">ADVANCED</option>
            </select>
            </div>
            <div className = 'discount-wrapper'>
            <label>Discount</label>
            <input className = 'discount-input' name = 'discount' className = 'discount-input' value = {discount} onChange = {e => setDiscount(e.target.value)}/>
            </div>     

            <div className = 'discount-end-wrapper'>
                <label>Discount End</label>
            <DatePicker className = 'date-picker'
        onChange={onChange}
        value={discountEnd}
      />
                </div>  
                <button type = "submit" className = 'save-btn'>SAVE</button>
                <button className = 'close-btn'  onClick = {props.closePopup}>CLOSE</button>
                </form>   
            </div>
            </div>
          
        )
    }
  
    const searchCourse = (items) => {
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
    
  
    return (
      
        <div className = 'teacher-course-page'>
             {/* <Sidebar/> */}
             <div className = 'right-section-area'>
                <div className = 'search-section'>
                <input className = 'search-course-input' type = 'text' value = {searchWord} onChange = {e => setSearchWord(e.target.value)} placeholder = "Search..." />
                <SearchIcon className = 'teacher-search-button'/>
                 </div>
        {message ? (
            <div className = 'message-banner'>
{message}
 <div className = 'x-btn'>
     <CloseIcon onClick = {closeMessage}/>
 </div>
</div>
        ) : ""}
 
          
                
<div className = 'right-section-table'>
       <div className = 'add-wrapper'>
          <button onClick = {showAddPopup} className = 'add-button'> Add new course <AddIcon className = 'add-icon'/></button>
              
           </div>   
        <div className = 'table-wrapper'>
<table>
    <thead>
        <tr>
           
            <th>Name</th>
           <th>Level</th>
            <th>Price ($)</th>
            <th>Discount</th>
            <th>Image</th>
            <th>Preview Video</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
{searchCourse(teacherCourses).map((item, index) => ( 
        <tr key = {index} className = 'table-row'>
            
            <td className = 'course-name-cell'>{item.name}</td>
         
            <td className = 'student-num'>
                <div className = {item.level == 0 ? 'course-level-0' : item.level == 1 ? 'course-level-1' : 'course-level-2'}>
                {item.level == 0 ? 'Beginner' : item.level == 1 ? 'Intermediate' : item.level == 2 ? 'Advanced' : 'NAN'}
                </div>
                <div className = 'popover-course'>
                <div className = 'student-wrapper'>
                <Link to = {'/student/course/' + item.id}>
                    <div className = 'student-value'>
                        {item.enrolledNumber} <PeopleIcon/>
                    </div>
                    </Link>
                </div>
                <Link to = {'/teacher/course/reviews/' + item.id}>
                <div className = 'comment-wrapper'>
                    <div className = 'comment-value'>
                        {item.commentNumber} <ReviewsIcon/>
                    </div>
                </div>
                </Link>
                <div className = 'rating-wrapper'>
                
                 <StarRatings
          rating={item.avgRating}
          starRatedColor="orange"
          numberOfStars={5}
          name='rating'
          starDimension="16px"
        starSpacing="1px"
        />
               
                 </div>
               
            <div className = 'btn-group'>     
            <Link to = {'/notification/course/' + item.id}><button  className = 'notification-group'>View Notifications</button></Link>
            <div>
            <Link to = {'/discussion/course/' + item.id}><button className = 'discussion-group'>View Discussions</button></Link>
            </div>
            <div>
            <Link to = {'/lesson/course/' + item.id}><button className = 'lesson-group'>View Lessons</button></Link>
                </div>
         
            </div>       
                </div>
                </td>
            <td className = 'item-price'>{item.price}</td>
            <td className = 'item-discount'>{item.discount}</td>
          
            <td><div className = 'image-cell'>{item.image ? (
            <img src = {item.image} alt = ""  className = 'teacher-course-image' />)
            : (
                <UploadIcon onClick = {() => openUploadPopupClick(item.id)}/>
            )}
            </div>
            </td>
            
            <td><div className ='preview-video-path'>{item.previewVideoPath && item.previewVideoPath !== "" ? (
            // <video width = "200px" height = "150px" src = {item.previewVideoPath} controls type = "video/mp4" />
            <div className = 'upload-section'>
                     <div className = 'upload-text'>Uploaded</div>
                     <div className = 'upload-section-btns'>
                        <Delete  className = "update-video-btn" onClick = {() => showDeleteVideoPopup(item.id)}/>
                        <VisibilityIcon className = 'eye-video-btn' onClick = {() => showWatchVideoPopup(item.previewVideoPath)}/>
                     </div>
            </div>
   
            ) :
            (
                <UploadIcon  onClick = {() => openVideoPopupClick(item.id)}/>
            )}
            </div>
            </td>
            
            <td>
                <div className = "action-icons">
                    <div className = 'action-wrapper'>
                    <EditIcon className = 'edit-icon' onClick = {() => showEditPopup(item)}/>
                    <DeleteIcon className = 'delete-icon' onClick = {() => showDeletePopup(item.id)}/>
                    </div>
                </div>
            </td>

        </tr>
))}
</tbody>
</table>
</div>
{openUploadPopup ? (
   <UploadPopup 
   courseId = {uploadImageId}
    closeImagePopup = {closeImagePopup}
   />
) : ""}
{openVideoPopup ? (
<UploadVideoPopup 
courseId = {uploadVideoId}
closeVideoPopup = {closeVideoPopup}
/>
) : ""}
<div>
    {
        openWatchVideoPopup ? (
            <WatchVideoPopup 
            src = {videoUrl}
            closeVideoPopup = {closeWatchVideoPopup}
            />
        ) : ""
    }
</div>
<div>
    {
        openDeleteVideoPopup ? (
            <DeleteVideoPopup 
                courseId = {deleteId}
                token = {token}
                closeDeleteVideoPopup = {closeDeleteVideoPopup}
            />
        ) : ""
    }
</div>
</div>
</div>
{isOpened && courseItem ? (
<Popup 
id={courseItem.id}
name={courseItem.name}
description = {courseItem.description}
content = {courseItem.content}
price = {courseItem.price}
level = {courseItem.level}
discount = {courseItem.discount}
image = {courseItem.image}
previewVideoPath = {courseItem.previewVideoPath}
enrolledNumber = {courseItem.enrolledNumber}
commentNumber = {courseItem.commentNumber}
avgRating = {courseItem.avgRating}
isBestseller = {courseItem.isBestseller}
closePopup = {closePopup}
/>
) : openAdd ?
(<Popup closePopup = {closeAddPopup}/>)
: ""
}
<div>
    {openDelete && deleteId ? (
       <DeletePopup 
       id = {deleteId}
       token = {token}
       link = {'/teacher/courses'}
       closeDeletePopup = {closeDeletePopup}
        history = {history}
       />
    ) : ""}
</div>
        </div>
    )
}