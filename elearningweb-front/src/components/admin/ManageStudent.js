import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../teacher/TeacherCoursePage.css';
import { useState, useRef } from 'react';
import Sidebar from '../teacher/Sidebar'
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
export default function ManageStudent() {
    const [students, setStudents] = useState([]);

    const [message, setMessage] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const [searchParam, setSearchParam] = useState(["username", "email"]);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    let isRendered = useRef(false);
    useEffect(async() => {
        isRendered.current = true;
        try {
            const studentRes = await axios.get('http://localhost:8084/student/all');
            const studentData = studentRes.data;
            if(isRendered.current) {
            setStudents(studentData);     
            }

        } catch(error) {
            console.log(error);
        }
        return () => { isRendered.current = false }
    }, [])
    const searchStudent = (items) => {
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
  
    return (
      
        <div className = 'teacher-course-page'>
             {/* <Sidebar/> */}
             <div className = 'right-section-area'>
                <div className = 'search-section'>
                <input className = 'search-course-input' type = 'text' value = {searchWord} onChange = {e => setSearchWord(e.target.value)} placeholder = "Search..." />
                <SearchIcon className = 'teacher-search-button'/>
                 </div>
<div className = 'right-section-table'>
<div className = 'add-wrapper'>
          <div>  
           <ReactHtmlTableToExcel  
            className="export-btn"  
            table="student-table"  
            filename={"Student Table-" + convertDate(new Date())}
            sheet="Sheet"  
         buttonText="Export excel" />  
         </div>  
           </div>   
           <div className = 'message-wrapper'>
               {message}
               {message ? (
 <CloseIcon onClick = {removeMesage}/>
               ) : ""}
              
           </div>
        <div className = 'table-wrapper'>
<table id = "student-table">
    <thead>
        <tr>    
        <th>Username</th>
            <th>Email</th>
            <th>Facebook</th>
            <th>Image</th>
            <th>Country</th>   
        </tr>
    </thead>
    <tbody>
{searchStudent(students).map((item, index) => ( 
        <tr key = {index} className = 'table-row'>      
            <td>{item.username}</td>
            <td className = 'item-price'>{item.email ? item.email : "-"}</td>
            <td className = 'facebook-cell'>{item.facebook ? item.facebook : "-"}</td>
            <td><div className = 'image-cell'>{item.studentImage ? (
            <img src = {item.studentImage} alt = ""  className = 'teacher-image' />)
            : (
               "-"
            )}
            </div>
            </td>  
            <td className = 'country-cell'>{item.country ? item.country : "-"}</td>
        </tr>
))}
</tbody>
</table>
</div>
</div>
</div>
        </div>
    )
}