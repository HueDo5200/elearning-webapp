import './SignIn.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import {Redirect} from 'react-router-dom';
import { login } from '../actions/auth';
import {useSelector, useDispatch } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleLogin from 'react-google-login';
import { createStudent } from '../actions/studentAction';
import FacebookLogin from 'react-facebook-login';
import ClearIcon from '@mui/icons-material/Clear';
import Clear from '@mui/icons-material/Clear';
//Do Hoang Quan; Pass: $2a$12$1aR./4HHCStFgmbISwXDiO90e866dyvqnHTa86CyNsmJqd9RowaIO
// async function login(credentials) {
//     return fetch('http://localhost:8084/auth', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     }).then(data => data.json())
// }
export default function SignIn(props) {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    }
   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    
     
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const isSignIned = auth.isSignIned;
    const message = auth.message;
    const role = auth.role;
    const [error, setError] = useState(message);
   
   const closeMessage = () => {
       setError("");
       dispatch({
           type: 'REMOVE_MESSAGE'
       })
   }
     function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
      
        dispatch(login(username, password)).then((data) => {
        const role = localStorage.getItem("role");
           
        if(role === "teacher") {
           props.history.push("/teacher/home");
           
        } else if(role === "admin") {
           
            props.history.push("/teacher/home");
        } else {
            props.history.push("/");
        }
         
        
        })
        .catch(error, () => {
            setLoading(false);
           
        })
        // const token = await login({username, password});
        // setToken(token);
       
        if(isSignIned && role == "teacher") {
            return <Redirect to = "/home/teacher"/>
            
           
        } else {
            return <Redirect to = "/"/>
        }
    }

    // const validateUser = () => {
    //     dispatch(login(user.username, user.password))
    //       .then((response) => {
    //         console.log(response.data);
    //         return props.history.push("/");
    //       })
    //       .catch((error) => {
    //         console.log(error.message);
    //         resetLoginForm();
    //         setError("Invalid email and password");
    //       });
    //   };
    
    //   const resetLoginForm = () => {
    //     setUser(initialState);
    //   };
const onSuccess = (res) => {
    
  const profile =  res.profileObj;

  const user = {
    username: profile.name,
    studentImage: profile.imageUrl,
    email: profile.email
  }
  dispatch(createStudent(user)).then((data) => {
      localStorage.setItem("userImage",  data.studentImage);
      localStorage.setItem("user", data.username);
      localStorage.setItem("userId", data.id);
    props.history.push("/");
  })

}

const onFailure = () => {

}

const responseFacebook = (response) => {
    console.log("facebook response " + JSON.stringify(response));
    if(response) {

    }
    const user = {
        username: response.name,
        studentImage: response.picture.data.url,
        email: response.email,
        facebook: response.name,
    }
    dispatch(createStudent(user)).then((data) => {
        localStorage.setItem("userImage", data.studentImage);
        localStorage.setItem("user", data.username);
        localStorage.setItem("userId", data.id);
        props.history.push("/");
    })
}
    return (
        <div className = 'signin'>
            <h2>SIGN IN</h2>   
            <form onSubmit = {handleSubmit}>     
            <div className = 'username-wrapper'>
              <input type = 'text' placeholder = 'Username' name = "username" value = {username} onChange = {e => setUsername(e.target.value)}/>
              </div>
              <div className = 'password-wrapper'>
                <input type = {passwordShown ? 'text' : 'password'}  name = "password" placeholder = 'Password' value = {password} onChange = {e => setPassword(e.target.value)}/><VisibilityIcon className = 'visibility-icon' onClick = {togglePassVisibility}/>
                </div>
                <div className = 'btn-group'>
                <button type = "submit" className = 'signin-btn'>SIGN IN</button>
                <button className = 'signup-btn'><Link to = '/signup'>SIGN UP</Link></button>
                {/* <button className = 'gmail-btn'><GoogleIcon/>CONTINUE WITH GOOGLE</button> */}
                <GoogleLogin
    clientId="452337883638-fs3f6co4u7nukuctr4vtb2qnraoho6d6.apps.googleusercontent.com"
    buttonText="Sign in with google"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    className = 'gmail-btn'
  />
                {/* <button className = 'facebook-btn'><FacebookIcon/>CONTINUE WITH FACEBOOK</button> */}
                {/* <FacebookLogin
              appId="1335622613535910"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,user_friends,email"
              callback={responseFacebook}
              icon="fa-facebook" /> */}
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