import { useState } from 'react';
import './UpdatePasswordUI.css';
import Visibility from '@mui/icons-material/Visibility';
import { useDispatch } from 'react-redux';
import Clear from '@mui/icons-material/Clear';
import { updatePassword } from '../actions/auth';
export default function UpdatePasswordUI(props){
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const togglePassVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    }
    const changeOldPassword = (e) => {
        setOldPassword(e.target.value);
    }
    const changeNewPassword = (e) => {
        setNewPassword(e.target.value);
    }


    const changeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }
    const updateNewPassword = (event) => {
        event.preventDefault();
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if(oldPassword === "" || newPassword === "" || confirmPassword === "") {
            setMessage("Please enter all fields!")
          
        } else
        if(newPassword !== confirmPassword) {
            setMessage("New passwords are not correct! Please enter again!");
        } else {
           
            dispatch(updatePassword(userId, {oldPassword: oldPassword, newPassword: newPassword}, role, token)).then((data) => {
               
               if(data.data.existed !== true) {
                   dispatch({
                       type: 'SET_MESSAGE',
                       payload: 'You password is not correct!'
                   })
                   
               }
            })
        }
       props.closeUI();
       dispatch({
           type: 'SET_SUCCESS_MESSAGE',
           payload: "Update Passworss Successfully!",
       });
    }
    const closeMessage = () => {
        dispatch({
            type: 'REMOVE_MESSAGE',
        })
    }
    return (
        <div className = 'update-pass-ui'>
            <form onSubmit = {updateNewPassword}>
                <div className = 'account-password-wrapper'>
                <input type =  {passwordShown ? 'text' : 'password'} value = {oldPassword} onChange = {changeOldPassword} placeholder = "Enter your password" /><Visibility className = 'account-visibility-icon' onClick = {togglePassVisibility}/>
                </div>
                <div className = 'account-password-wrapper'>
                <input type =  {passwordShown ? 'text' : 'password'} value = {newPassword} onChange = {changeNewPassword} placeholder = "Enter your new password"/><Visibility className = 'account-visibility-icon' onClick = {togglePassVisibility}/>
                </div>
                <div className = 'account-password-wrapper'>
                <input type =  {passwordShown ? 'text' : 'password'} value = {confirmPassword} onChange = {changeConfirmPassword} placeholder = "Confirm your new password"/><Visibility className = 'account-visibility-icon' onClick = {togglePassVisibility}/>
                </div>
                <div className = 'account-buttons'>
                <button className = 'save-btn' type = 'submit'>Save</button>
                {/* <button className = 'close-btn' onClick = {props.closeUI}>Close</button> */}
                </div>
              
            </form>
            {message ? (
                    <div className = 'message-wrapper'>
                    <div className = 'icon-wrapper'>
                        <Clear className = 'remove-icon' onClick = {closeMessage}/>
                    </div>
                    <div className = 'text-wrapper'>
                    <div className = 'error-text'>Error</div>
                    <div className = 'error-value'>
                    {message}   
                    </div>
                    </div>
               
                </div>
            ) : ""}

        </div>
    )
}