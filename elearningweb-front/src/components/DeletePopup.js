import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteCourse } from "../actions/courseAction";
import './DeletePopup.css';
export default function DeletePopup(props) {
    const dispatch = useDispatch();
    const submitDelete = (event) => {
        event.preventDefault();
        dispatch(deleteCourse(props.id, props.token));
       props.closeDeletePopup();
       
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