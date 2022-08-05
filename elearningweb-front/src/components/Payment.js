import {loadStripe} from '@stripe/stripe-js';
import './Payment.css';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import addNotification from 'react-push-notification';
export default function Payment({cartList, userId}) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);
    const [showPayment, setShowPayment] = useState(true); 
    
    useEffect(() => {
        let value = 0;
        for(let i = 0; i < cartList.length; i++) {
                value = value + cartList[i].price;
        }
        setTotal(value);
    })

   
    const makePayment = async() => {
        for(let i = 0; i < cartList.length; i++) {
            console.log("inserted")
            const cart = {
                studentId: userId,
                courseId: cartList[i].id,
                dateJoined: new Date(),
            }
            console.log(JSON.stringify(cartList));
            const courseId = cartList[i].id;
          const res = await axios.post(`http://localhost:8084/student/pay/${userId}/${courseId}`, cart);
         
          console.log("cart inserted " + JSON.stringify(res.data));
        }
        dispatch({
            type: 'SET_CART',
            payload: [],
        })
        dispatch({
            type: 'SET_NUMBER',           
        })
        setShowPayment(false);
        addNotification({
            title: 'Success',
            subtitle: '',
            message:'Pay successfully',
            theme: 'green',
            close: 'Close',
            native: true
        })
      
    }
    const handleChange = event => {
            setDisabled(event.empty);
            setError(event.error ? event.error.message : "");

    }
    return (
        <>
        {showPayment ? (
 <div className = 'payment'>
 {/* <form onSubmit = {handleSubmit}> */}
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
     <CardElement onChange = {handleChange}/>
    {/* disabled = {processing || disabled || succeeded || !stripe || !elements */}
     <button onClick = {makePayment} className = 'payment-btn' type = 'submit'>
         <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
     </button>
     {error && <div>{error}</div>}
 {/* </form> */}
</div>
        ) : ""}
      
        </>
    )
}