import './CourseItem.css';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Link } from 'react-router-dom';
import { ADD_TO_CART } from '../actions/types';
import { useDispatch, useSelector } from 'react-redux';
import addNotification from 'react-push-notification';
import OnlyDateClock from './Clock/OnlyDateClock';
import StarRatings from 'react-star-ratings';
import { saveItemToCart } from '../actions/cartAction';

export default function CourseItem({id, name, image, avgRating, price, discount, discountEnd, teacherName, ratingNumber}) {
   const dispatch = useDispatch();
   const cart = useSelector((state) => state.cart);

    const addToCart = () => {
        const userId = localStorage.getItem("userId");
        if(userId) {
            const cartItem = {
                dateCreated: new Date(),
                studentId: userId,
                courseId: id,
            }
            dispatch(saveItemToCart(cartItem));
        } else {
            dispatch({
                type: ADD_TO_CART,
                item: {
                    id: id,
                    name: name,
                    image: image,
                    avgRating: avgRating,
                    price: price,
                    discount: discount,
                    discountEnd: discountEnd,
                    teacherName: teacherName,
                    ratingNumber: ratingNumber
                }
            });
        }
    
//      addNotification({
//          title: 'Add To Cart',
//          message:message,
//          theme: 'green',
//          duration: 1000,
//          close: 'Close',
//          native: true
//      })
     
   }
    return (
      
        <div className = 'course-item'>
        <img className ='course-img' src = {image} alt = ""/>
       
    <button className = 'cart-btn' onClick = {addToCart}>Add to cart</button>
        <Link to = {'/course/' + id } >
        <div className = 'course-info'>
            <div className = 'course-name'>{name}</div>
            <div className = 'course-teacher'>By {teacherName}</div>
            <div className = 'course-rating'> 
            <div className = 'course-avg-rating'>{avgRating}</div>
                {/* {Array(parseInt(avgRating)).fill().map((_, i) => (
 <div key = {i} className = 'star'><StarIcon className = 'star-icon'/></div>
                ))}
                  {Array(5 - parseInt(avgRating)).fill().map((_, index) => (
 <div key = {index}><StarOutlineIcon className = 'star-outline'/></div>
                ))}       */}
           <StarRatings
          rating={avgRating}
          starRatedColor="orange"
          numberOfStars={5}
          name='rating'
          starDimension="16px"
        starSpacing="1px"
        />
      
            </div>
            <div className = 'discount'>
           
            <div className = 'course-discount'>{discount != 0 ? (price - ((parseInt(discount) / 100) * price)) + '$US' : ''} </div>
            <div className = {discount == 0 ? 'course-discount' : 'course-price'}>{price} $US</div>
            <div className = 'discount-end'>{discountEnd > 0 ? <OnlyDateClock deadline = {discountEnd} />: "" }</div>
            
            </div>
           
           
        </div>
        </Link>
        </div>
       
      
    )
}