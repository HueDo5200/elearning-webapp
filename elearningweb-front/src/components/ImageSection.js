import { Link } from 'react-router-dom';
import './ImageSection.css';
export default function ImageSection() {
    const user = localStorage.getItem("user");
    return (
        <div className = 'image-container'>
          
            <h1 className = 'section-title'>LEARN FOR KNOWLEDGE</h1>
           {!user ? (
           <Link to = '/signup'> <p className = 'register-title'>Register to start right now!</p></Link>

           ) : ""}
        </div>
    )
}