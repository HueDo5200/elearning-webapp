import './SignUp.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getThemeProps } from '@mui/system';

import { register } from '../actions/auth';
export default function SignUp(props) {
    const [passwordShown, setPasswordShown] = useState(false);
    const dispatch = useDispatch();
    const [username, setUsername]  = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const setVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    }
   

function handleRegister(event) {
    event.preventDefault();
    dispatch(register(username, email, password)).then(() => {
       
            props.history.push("/signin");
        
       
    }).catch(error, () => {
        console.log(error);
    })

}
    return (
        <div className = 'signup'>
            <h2>SIGN UP</h2>
            <form onSubmit = {handleRegister}>
            <div className = 'username-wrapper'>
               
                <input type = 'text' placeholder = "Full Name" value = {username} onChange = {e => setUsername(e.target.value)}/>
                </div>
                
                <input type = 'text' placeholder = "Email" value = {email} onChange = {e => setEmail(e.target.value)}/>
                <div className = 'password-wrapper'>
                <input type = {passwordShown ? 'text' : 'password'} placeholder = 'Password' value = {password} onChange = {e => setPassword(e.target.value)}/>
                <VisibilityIcon className = 'visibility-icon' onClick = {setVisibility}/>
                </div>
                <button className = 'signup-button' type = "submit">Sign Up</button>
                </form>
        </div>
    )
}