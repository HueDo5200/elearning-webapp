import { useDispatch } from "react-redux";
import { deleteCourseVideo } from "../actions/courseAction";
import './DeletePopup.css';
export default function DeleteVideoPopup(props) {
    const dispatch = useDispatch();
    const submitDelete = (event) => {
        event.preventDefault();
        dispatch(deleteCourseVideo(props.courseId, props.token));
       props.closeDeleteVideoPopup();
       
    }
    return (
        <div className = 'popup'>
              <form onSubmit = {submitDelete}>
        <div className = 'delete-popup'>
            <div className = 'delete-text'>Are you sure about your decision ?</div>
            <div className = 'btns-group'>
                <button className = 'confirm-button' type = 'submit'>Yes</button>
                <button className = 'no-button' onClick = {props.closeDeleteVideoPopup}>No</button>
            </div>
        </div>
        </form>
        </div>
    )
}