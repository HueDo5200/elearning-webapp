import CartItem from './CartItem';
import './Checkout.css';
import Payment from './Payment';
import { useEffect, useRef, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveItemToCart } from '../actions/cartAction';
import addNotification from 'react-push-notification';
import { useCookies } from 'react-cookie';
import { getImageListUtilityClass } from '@mui/material';
export default function GuestCheckout() {
    const cart = useSelector((state) => state.cart);
    const [payment, setPayment] = useState(false);
    const [total, setTotal] = useState(0);
    const [message, setMessage] = useState("");
    const [cookies, setCookie] = useCookies(["courseList"]);
    const cartList = cart.cart;
    const dispatch = useDispatch();
    
    useEffect(async () => {   
        const result = cart.cart.reduce((amount, item) => item.price + amount, 0);
        setTotal(result);
    })

 const handlePayment = () => {
     const user = localStorage.getItem("user");
     if(user) {
        setPayment(true);

     } else {
        setMessage("You have not sign in yet!");
       
     }
     

 }
 const saveCart = () => {
    const idList = [];
    cartList.forEach((item) => idList.push(item.id));
    addNotification({
        title: 'Success',
        message:"Save Cart Successfully!",
        theme: 'green',
        close: 'Close',
        native: true
    })
    setCookie("courseList", idList, "/cart");
   
    // for(let i = 0; i < cartList.length; i++) {
    //         const item = {
    //             dateCreated = new Date(),
    //             studentId: userId,
    //             courseId: cartList[i].id
    //         }
    //         dispatch(saveItemToCart(item));        
    // }
    // dispatch({
    //     type: 'EMPTY_CART'
    // })
        
 }
    return (
        <div className = 'checkout'>
             <h1 className = 'checkout-title'>Shopping Cart</h1>
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
            {!payment ?(
                <>
                <div className = 'checkout-total'>
                   
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
                    <button className = 'checkout-btn' onClick = {handlePayment}>Make Payment</button>
                    <button className = 'save-cart-btn' onClick = {saveCart}>Save Cart</button>
                    </>
) : ""}
                
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
 <Payment total = {total}/>    
               ) : ""}
                    
            </div>
            </div>
          
        </div>
    )
}