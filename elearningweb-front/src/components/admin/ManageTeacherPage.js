    
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../teacher/TeacherCoursePage.css';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useState, useRef } from 'react';
import Sidebar from '../teacher/Sidebar'
import DatePicker from 'react-date-picker';
import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import '../teacher/Popup.css';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { createTeacher, deleteTeacher, updateTeacher } from '../../actions/TeacherAction';
export default function ManageTeacherPage() {
    const role = localStorage.getItem("role");
const ManageTeacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [isOpened, setIsOpened] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [message, setMessage] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const [searchParam, setSearchParam] = useState(["username", "email", "fullName"]);
    const dispatch = useDispatch();
    const [teacherItem, setTeacherItem] = useState(null);
    const token = localStorage.getItem("token");
    let isRendered = useRef(false);
    useEffect(async() => {
        isRendered.current = true;
        try {
            const teacherRes = await axios.get('http://localhost:8084/teacher/all');
            const teacherData = teacherRes.data;
            if(isRendered.current) {
              setTeachers(teacherData);     
            }

        } catch(error) {
            console.log(error);
        }
        return () => { isRendered.current = false }
    }, [])
    const DeletePopup = props => {
        async function submitDelete(event) {
            event.preventDefault();
            const id = props.deleteId;
            await axios.delete(`http://localhost:8084/teacher/delete/${id}`,  {headers: {Authorization: 'Bearer ' + token}});
       const index = teachers.findIndex((item) => item.id === id);
       teachers.splice(index, 1);
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

    const Popup = props => {
        const adminId = localStorage.getItem("userId");
        const adminName = localStorage.getItem("user");
        const [fullName, setFullName] = useState(props.id ? props.fullName : "");
        const [description, setDescription] = useState(props.id ? props.description : "");
        const [username, setUsername] = useState(props.id ? props.username : "");
        const [email, setEmail] = useState(props.id ? props.email : "");
        const [facebook, setFacebook] = useState(props.id ? props.facebook : "");
        const [image, setImage] = useState(props.id ? props.image : "");
        const [degree, setDegree] = useState(props.id ? props.degree : "");
        const [professional, setProfessional] = useState(props.id ? props.professional : "");
        const [dob, setDob] = useState(new Date());
       
        function submitForm(event) {
            event.preventDefault();
           
        if(props.id) {
            dispatch(updateTeacher(props.id, {id: props.id, degree: degree, description: description, professional: professional}, token))
            .then((data) => {
            const index = teachers.findIndex((item) => item.id === data.id);
            if(index >= 0) {
                teachers.splice(index, 1, data);
            } else {
                console.warn("Can not update teacher course!");
            }
            setIsOpened(false);        
            })           
        } else {
            const newTeacher = {
                username: username,
                password: "12345678",
                fullName: fullName,
                email: email,
                facebook: facebook,
                teacherImage: image,
                dob: dob,
                degree: degree,
                professional: professional,
                description: description
            }
            dispatch(createTeacher(newTeacher)).then((data) => {
                teachers.push(data);
                setIsOpened(false);
                setMessage("Save Courses Successfully!"); 

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
                {props.id ? "" : (
                    <>
                       <div className = 'input-wrapper'>
                <label>User Name</label>
            <input className = 'username-input' value = {username} onChange = {e => setUsername(e.target.value)} />
            </div>
            <div className = 'input-wrapper'>
                <label>Full Name</label>
            <input className = 'fullname-input' value = {fullName} onChange = {e => setFullName(e.target.value)} />
            </div>
            <div className = 'discount-end-wrapper'>
                <label>Date Of Birth</label>
                <DatePicker className = 'teacher-date-picker'
        onChange={setDob}
        value={dob}/>
                </div>  
            <div className = 'input-wrapper'>
            <label>Email</label>
           <input className = 'email-input' name = 'price' value = {email} onChange = {e => setEmail(e.target.value)} /> 
            </div>
            <div className = 'input-wrapper'>
            <label>Facebook</label>
           <input className = 'facebook-input' name = 'price' value = {facebook} onChange = {e => setFacebook(e.target.value)} />
            </div>
                    </>
                )}      
 <div className = 'teacher-description-wrapper'>
 <label>Description</label>
 <textarea className = 'teacher-description-input' rows = "6" cols = "80" value = {description} onChange = {e => setDescription(e.target.value)}/>
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
    const showAddPopup = () => {
           setIsOpened(true);
    }
    const showEditPopup = (teacherItem) => {
        setIsOpened(!isOpened);
        setTeacherItem(teacherItem);
    }
    const showDeletePopup = (id) => {
        setShowPopup(true);
        setDeleteId(id);
       
    }
    const closePopup = () => {
       
        setIsOpened(false);
        if(teacherItem) {
            setTeacherItem(null);
        }
    }
    const closeDeletePopup = () => {
        setShowPopup(false);
        setDeleteId(0);
    }
   
    const searchTeacher = (items) => {
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
          <button onClick = {showAddPopup} className = 'add-button'> Add new teacher <AddIcon className = 'add-icon'/></button>
          <div>  
           <ReactHTMLTableToExcel  
            className="export-btn"  
            table="teacher-table"  
            filename={"TeacherTable-" + convertDate(new Date())}
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
       
<table id = "teacher-table" class = "table">
    <thead>
        <tr>    
        <th>Username</th>
           <th>Full Name</th>
            <th>Email</th>
            <th>Facebook</th>
            <th>Image</th>
            <th>Date Of Birth</th>
            <th>Degree</th>
            <th>Professional</th> 
              
        </tr>
    </thead>
    <tbody>
{searchTeacher(teachers).map((item, index) => ( 
        <tr key = {index} className = 'table-row'>      
            <td>{item.username}</td>
            <td className = 'student-num'>{item.fullName}</td>
            <td className = 'item-price'>{item.email}</td>
            <td className = 'item-discount'>{item.facebook ? item.facebook : "NaN"}</td>
            <td><div className = 'image-cell'>{item.teacherImage ? (
            <img src = {item.teacherImage} alt = ""  className = 'teacher-image' />)
            : (
               "-"
            )}
            </div>
            <div className = 'popover-course'>
               
                <div classname = 'description-wrapper'>
                    <div className = 'description-value'>

                        {item.description}
                    </div>
                </div>          
                </div>
            </td>
            <td>{convertDate(item.dob)}</td>   
            <td>{item.degree}</td>
            <td>{item.professional}</td>  
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
</div>

</div>
{showPopup && deleteId != 0 ? (
   <DeletePopup deleteId = {deleteId} 
   closeDeletePopup = {closeDeletePopup}
   />

) : ""}
</div>
{isOpened && teacherItem ? (
<Popup 
id={teacherItem.id}
description = {teacherItem.description}
degree = {teacherItem.degree}
professional = {teacherItem.professional}
closePopup = {closePopup}
/>
) : isOpened ?
(<Popup closePopup = {closePopup}/>)
: ""
}
        </div>
    )
}
    return (
        <>
        {role === "admin" ? (
                <ManageTeacher/>
        ) : (
            <div className = 'permission-page'>
                <Sidebar/>
                <div className = 'permission-text'>
                You have no permission to access this page!
                </div>
            </div>
        )}
        </>
    )
}