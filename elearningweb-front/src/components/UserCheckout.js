import { getImageListUtilityClass } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import Cookies from 'universal-cookie';
import { removeItemFromCart, saveItemToCart } from '../actions/cartAction';
import { REMOVE_FROM_CART } from '../actions/types';
import CartItem from './CartItem';
import './Checkout.css';
import Payment from './Payment';
export default function UserCheckout() {
    const cart = useSelector((state) => state.cart);
    const [payment, setPayment] = useState(false);
    const [total, setTotal] = useState(0);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const userId = localStorage.getItem("userId");
    const cartList = cart.cart;
    const [cookies, removeCookie, setCookie] = useCookies(["courseList"]);
    const idList = cookies.courseList;
  
   
    useEffect(async () => { 
        if(userId) {
            if(idList && idList.length > 0 && idList[0] !== "/" && idList !== "undefined") {
       
               for(let i = 0; i < idList.length; i++) {
                //    const response = await axios.get(`http://localhost:8084/course/${idList[i]}`);
                //    const responseData = response.data;
                //     guestCourses.push(responseData);
                const item = {
                    dateCreated: new Date(),
                    studentId: userId,
                    courseId: idList[i],
                }
                // dispatch(saveItemToCart(item));
                const saveResponse = await axios.post(`http://localhost:8084/cart/save`, item);
                const saveData = saveResponse.data;
                // if(saveData) {
                //     dispatch({
                //         type: 'INCREMENT_ITEM',
                //         payload: saveData,
                //     })
                // }
               }
               removeCookie("courseList")
               setCookie(null);
               console.log("id list " + cookies["courseList"]);
            }       
            const res = await axios.get(`http://localhost:8084/cart/all/${userId}`);
            console.log("course list after " + JSON.stringify(res.data));
            const resData = res.data;         
                dispatch({
                    type: 'SET_CART',
                    payload: resData,
                })
           
        }
        const result = cart.cart.reduce((amount, item) => item.price + amount, 0);
        setTotal(result);
       
    }, [])
 const showPayment = async() => {
        setPayment(true);
    }
 

   
    return (
        <div className = 'checkout'>
             <h1 className = 'checkout-title'>Shopping Cart ({cartList.length})</h1>
             <div className = 'checkout-section'>
            <div className = 'cart-list'>
                    <>
                     {cartList && cartList.length > 0 && cartList.map((item, i) =>(
                        <div key = {i}> <CartItem id = {item.id}
                         image = {item.image}
                         name = {item.name}
                         teacherName = {item.teacherName}
                         isBestseller = {item.isBestseller}
                         avgRating = {item.avgRating}
                         // rating_number = {item.ratingNumber}
                         commentNumber = {item.commentNumber}
                         level = {item.level}
                         price = {item.price}
     
                         />
                         </div>
                     ))}
                     </>          
            </div>
            <div className = 'total-section'>
            {!payment && !userId ?(
                <>
                 <div className = 'payment-price-container'>
                    <CurrencyFormat 
                    renderText = {(value) => (
                        <h3 className = 'total-text'>Total: {value}</h3>
                    )} 
                    decimalScale = {2}
                    value = {total}
                    displayType = {"text"}
                    thousandSeparator={true}
                    prefix={"S"}
                    />

                </div>
                   
                    </>
) : ""}
{payment || cartList.length == 0 ? "" : (
 <button className = 'checkout-btn' onClick = {showPayment}>Make Payment</button>
)}

                
                 {message ? (
                <div className = 'message-container'>
                    <div className = 'message'>
                    {message}
                    </div>
                    <Link to = '/signin' className = 'signin-link'>
                    <div className = 'signin-text'>Sign in</div>
                    </Link>
                    </div>
                 ) : ""}
                
               {payment ? (
 <Payment 
         cartList = {cartList}
         userId = {userId}
 />    
               ) : ""}
                    
            </div>
            </div>
          
        </div>
    )
}