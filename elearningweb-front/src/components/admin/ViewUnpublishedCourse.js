import Close from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router"
import Sidebar from "../teacher/Sidebar";
import './ViewUnpublishedCourse.css'
export default function ViewUnpublishedCourse() {
    const {id} = useParams();
    const [lessons, setLessons] = useState([]);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    let isRendered = useRef(false);
    const [videoPopup, setVideoPopup] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
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

    const closeVideoPopup = () => {
        setVideoPopup(false);
    }

    const openVideoPopup = (path) => {
        setVideoUrl(path);
        setVideoPopup(true);
    }
    const convertDate = (data) => {
        const date = new Date(data);
        const options = {
            day: "numeric", month: "long", year: "numeric"
        }
        return date.toLocaleDateString('en', options);
    }
    const WatchVideoPopup = (props) => {
        return (
            <div className = 'video-popup'>
                <div className = 'video-popup-box'>
                <div className = 'close-wrapper'>         
                    <Close onClick = {props.closeVideoPopup}/>
                </div>
                {/* <ReactPlayer url= "https://www.youtube.com/watch?v=5lP_anjF6rA" /> */}
                <video src = {props.src} controls controlsList = "nodownload" />
                </div>
            </div>
        )
    }

    return (
        <div className = 'unpublished-course'>
            {/* <Sidebar/> */}
             <div className = {lessons && lessons.length > 0 ? 'right-section' : ""}>
             <table id = "teacher-table" class = "table">
            
    <thead>
        {
            lessons && lessons.length > 0 ? (
                <tr>    
                <th>Lesson</th>
                   <th>Description</th>
                    <th>Date Created</th>
                    <th>Video</th>
                </tr>
            ) : lessons.length === 0 ? (
                <div className = 'no-lessons'>No Lessons are found!</div>
            ) : ""
        }
       
    </thead>
    <tbody>
{lessons && lessons.length > 0 && lessons.map((item, index) => ( 
        <tr key = {index} className = 'table-row'>      
            <td>{item.name}</td>
            <td className = 'description-cell'>{item.description}</td>
            <td className = 'item-price'>{convertDate(item.dateCreated)}</td>
            <td> <Visibility onClick = {e => {openVideoPopup(item.path)}}/></td>
            <td>
                <div className = "action-icons">
        
                </div>
            </td>

        </tr>
))}
</tbody>
</table>
<div>
</div>
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