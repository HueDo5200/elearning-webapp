import './Header.css';
import {Link} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LanguageIcon from '@mui/icons-material/Language';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import React, {useState } from 'react';
import ReactRoundedImage from "react-rounded-image";
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../actions/auth';
import { getCourseByName } from '../actions/courseAction';
import { useHistory } from 'react-router';

export default function Header(props) {
    // const [{cart, user}, dispatch] = useStateValue();
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchText, setSearchText] = useState('');
    const userImage = localStorage.getItem("userImage");
    const cart = useSelector((state) => state.cart);
    
    const userLogout = () => {
        dispatch(logout());
        history.push("/");
        window.location.reload();
    }
    const searchCourse = () => {
       
            dispatch(getCourseByName(searchText)).then(() => {
            history.push('/course/search');
            })
    }
   
    return (
        <div className = 'header'>
            <Link to = '/' className = 'nav-link'>
                <div className = 'header_left'>
                <h2>E-LEARNING</h2>
                </div>
            </Link>
                <div className = 'header_search'>        
                    <input className = 'search_input' type = 'text' placeholder = 'Enter your search keyword' value = {searchText} onChange = {e => setSearchText(e.target.value)}/>
                 <SearchIcon className = 'header_searchIcon'  onClick = {searchCourse}/>
               
                </div>
                <div className = 'header_right'>
               
                {/* <span className = 'header_welcome'>
                    {auth.user ? 'Welcome, ' + auth.user  : 'Welcome, Guest'}
                    
                    </span> */}
                    {auth.user ? (
  <Link to = '/student/profile'>
  <div className = 'header-user'>
     <ReactRoundedImage
image={userImage}
imageWidth="40"
imageHeight="40"
roundedSize="13"
borderRadius="100"
/>
<div className = 'header-user-name'>{auth.user}</div>
</div> 
</Link>
                    ) : (
<div className = 'header-user'>
                        Hi, guest
                        </div>
                        )
                        }
                  
                {!auth.user ? (    
                   <Link to = {!auth.user && '/signin'} className = 'nav-link'>
                       <div className = 'header_option'>
                                <button className = 'header_signin'>{auth.user ? 'Sign Out' : 'Sign In'}</button>         
                       </div>
                   </Link>
                     ) : (
                        <div className = 'header_option'>
                        <button className = 'header_signin' onClick = {userLogout}>{auth.user ? 'Sign Out' : 'Sign In'}</button>         
               </div>
                     )}
                     {
                         auth.user? '' : (
                            <Link to = '/signup' className = 'nav-link'>
                            <div className = 'header_option'>
                            <button className = 'header_signup'>Sign Up </button>
                            </div>
        
                            </Link>
                         )
                     }
                 
                   <Link to = '/cart' className = 'nav-link'>
                       <div className = 'header_option'>
                       <ShoppingCartIcon className = 'cart-icon'/>
                           <span className = 'header_cart'>            
                                {cart.numberAdd}
                                
                           </span>
                       </div>
                   </Link>
                   <Link to = '/mycourses' className = 'nav-link'>
                <div className = 'header_option'>
                {auth.user ?  <MenuBookIcon className = 'course-icon'/> : ''} 
                    </div>
                    </Link>
                   <div className = 'header_option'>
                  <LanguageIcon className = 'language-icon'/>
                   </div>
                </div>
        </div>
    )
}