import Close from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfileImg} from "../actions/auth";
export default function UpdateProfileImgUI(props) {
    const [img, setImg] = useState(null);
    const dispatch = useDispatch();
    const onFileSubmit = (event) => {
        event.preventDefault();
        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("token");
        let formData = new FormData();
        formData.append('file', img);   
           dispatch(updateProfileImg(formData, userId, role, token)).then((data) => {
               dispatch({
                   type: 'SET_IMAGE',
                   payload: data.image,
               })
               props.closeImageProfilePopup();
           })
}
const setUploadImage = (event) => {
    setImg(event.target.files[0]);
}
    return (
        <div className = 'update-profile-img-ui'>
            <div className = 'upload-popup'>
    <div className = 'close-wrapper'>         
               <Close onClick = {props.closeImageProfilePopup}/>
           </div>
<div className = 'upload-popup-box'>
   <form onSubmit = {onFileSubmit}>
       <div>
       <input type = "file" onChange = {setUploadImage}/>
       </div>
       <button  className = 'upload-btn' type = 'submit'>Upload Image</button>
       <button className = 'close-btn' onClick = {props.closeImageProfilePopup}>Close</button>
   </form>
</div>
</div>
        </div>
    )
}