import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { getAllStudentInCourse } from '../../actions/courseAction';
import './StudentPage.css';
import { useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from './Sidebar';
export default function StudentPage() {
    let isRendered = useRef(false);
    const {id} = useParams();
    const [students, setStudents] = useState([]);
    const dispatch = useDispatch();
    const [searchWord, setSearchWord] = useState("");
    const [searchParam, setSearchParam] = useState(["username", "email"]);

    useEffect(async() => {
        isRendered.current = true;
        try {
            if(isRendered.current) {
                dispatch(getAllStudentInCourse(id)).then((data) => {
                   console.log("students " + JSON.stringify(data));
                  setStudents(data);
                })
                
            }

        } catch(error) {
            console.log(error);
        }
        return () => { isRendered.current = false }
    }, [])
    // const searchStudent = (items) => {
    //     return items.filter((item) => {
    //         return searchParam.some((newItem) => {
    //             return (
    //                 item[newItem].toString().toLowerCase().indexOf(searchWord.toLowerCase()) > -1
    //             )
    //         })
    //     })
    // }
    
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
    
    return (
        <div className = 'student-page'>
               {/* <Sidebar/> */}
               <div className = 'student-right-section'>
               <div className = 'search-section'>
                <input className = 'search-student-input' type = 'text' value = {searchWord} onChange = {e => setSearchWord(e.target.value)} placeholder = "Search..." />
                <SearchIcon className = 'student-search-button'/>
                 </div>
                <div className = 'student-table-wrapper'>
<table>
    <thead>
        <tr>
           
            <th>Username</th>
            <th>Email</th>
            <th>Facebook</th>
            <th>Country</th>
            <th>Image</th>
        </tr>
    </thead>
    <tbody>
{searchStudent(students).map((item, index) => ( 
        <tr key = {index}>                  
            <td className = 'username-cell'>{item.username}</td>
            <td className = 'email-cell'>{item.email}</td>
            <td className = 'facebook-cell'>{item.facebook ? item.facebook : '-'}
            </td>
            <td className = 'country-cell'>{item.country ? item.country : '-'}</td>
            <td><div>{item.studentImage ? (
            <img className ='student-image' src = {item.studentImage} alt = ""/>
            ) :
            (
               "-"
            )}
            </div>
            </td>
            <td>
                <div className = "action-icons">
                    <div className = 'action-wrapper'>
                   
                    </div>
                  
                </div>
            </td>

        </tr>
))}
</tbody>
</table>
</div>
        </div>
        </div>
    )
}