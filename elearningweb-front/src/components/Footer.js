import "./Footer.css";

export default function Footer() {
    return (
        <div className = "footer">
                <div className = "pros-text">
                <p>WHY CHOOSE US</p>
                <p>NEXT STEP FOR YOUR CAREER!</p>
                <p>We provides useful courses with profound knowledge which will help you <br/>  build a professional career in the field of information technology</p>
                 <button className = 'btn-home'>DISCOVER HOME</button>
                </div>
                <div className = "description">
                    <div className = "employers">
                        <p className = "number">5000+<br/>COURSES</p>
                        
                        <p className = "descript">More than 5000 courses with varied topics.</p>
                    </div>
                    <div className = "projects">
                        <p className = "number">500+<br/>TEACHERS</p>
                        <p className = "descript">More than 500 professional educationer for providing the best teaching experiences</p>
                    </div>
                    <div className = "clients">
                        <p className = "number">10000+<br/>GRADUATES </p>
                        <p className = "descript" >Get certificates for your future careers</p>
                    </div>
                </div>
                           
        </div>
    )
}