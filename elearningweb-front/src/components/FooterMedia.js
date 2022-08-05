import "./FooterMedia.css";
import {Link} from 'react-router-dom';

export default function FooterMedia() {
    return (
        <div className = "medias-container">
                  
                   <div className = 'links'>
                       <div className = 'link-wrapper'>
                           <div className = 'link-items'>
                               <h2>About Us</h2>
                               <Link to = 'sign-up'>How it works</Link>
                               <Link to = '/'>Testimonials</Link>
                               <Link to = '/'>Careers</Link>
                               <Link to = '/'>Investors</Link>
                               <Link to = '/'>Terms of Service</Link>
                           </div>
                           <div className = 'link-items'>
                               <h2>Contact Us</h2>
                               <Link to = '/'>Contact</Link>
                               <Link to = '/'>Support</Link>
                               <Link to = '/'>Destinations</Link>
                               <Link to = '/'>Sponsorships</Link>
                           </div>
                       </div>
                       <div className = 'link-wrapper'>
                       <div className='link-items'>
            <h2>Community</h2>
            <Link to='/'>Learners</Link>
            <Link to='/'>Parnter</Link>
            <Link to='/'>Developers</Link>
            <Link to='/'>Translators</Link>
          </div>
          <div className='link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
                       </div>
                   </div>
                   <section className = 'social-media'>
                   <div className='social-media-wrap'>
         
         
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
        </div>
                   </section>
        </div>
    )
}