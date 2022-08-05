import { useDispatch } from 'react-redux';
import { REMOVE_FROM_CART } from '../actions/types';
import './CartItem.css';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import StarRatings from 'react-star-ratings';
import { removeItemFromCart } from '../actions/cartAction';
export default function CartItem({id, image, name, teacherName, isBestseller, avgRating, commentNumber, level, price}) {
  const dispatch = useDispatch();
  const remove = () => {
     const userId = localStorage.getItem("userId");
     if(userId) {
        dispatch(removeItemFromCart(id, userId));
        
     } 
     dispatch({
      type: REMOVE_FROM_CART,
      id: id,
  })
     
      
  }
    return (
        <div className = 'cart-item'>
           <img className = 'cart-item-img' src = {image} alt = ''/>
           <div className = 'cart-item-info'>
            <div className = 'cart-item-name'>{name}</div>
            <div className = 'cart-item-teacher'>By Mr.{teacherName}</div>
            <div className = 'cart-item-rating'>
            <div className = 'cart-item-isbestseller'>{isBestseller ? 'Bestseller' : ''}</div>
           
            <StarRatings
          rating={avgRating}
          starRatedColor="orange"
          numberOfStars={5}
          name='rating'
          starDimension="16px"
        starSpacing="1px"
        />
           <div className = 'cart-item-rating-number'>({avgRating} ratings)  </div> 
            </div>
           </div>
           <div className = 'cart-item-btn'>
               <div className = 'cart-item-price'>$ {price}</div>
               <button className = 'remove-btn' onClick = {remove}>Remove</button>
           </div>
        </div>
    )
}