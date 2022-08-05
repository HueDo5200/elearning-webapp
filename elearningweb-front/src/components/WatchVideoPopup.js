import CloseIcon from '@mui/icons-material/Close';
import './WatchVideoPopup.css';
export default function WatchVideoPopup(props) {
    return (
        <div className = 'video-popup'>
                <div className = 'video-popup-box'>
                <div className = 'close-wrapper'>         
                    <CloseIcon onClick = {props.closeVideoPopup}/>
                </div>
                {/* <ReactPlayer url= "https://www.youtube.com/watch?v=5lP_anjF6rA" /> */}
                <video src = {props.src} controls controlsList = "nodownload" />
                </div>
            </div>
    )
}