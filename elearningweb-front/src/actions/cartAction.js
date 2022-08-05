import axios from "axios";
import { SAVE_CART,
ADD_TO_CART,
REMOVE_FROM_CART } from "./types";

const url = "http://localhost:8084/cart"
export const saveItemToCart = (data) => async(dispatch) => {
    try {
            const res = await axios.post(url + '/save', data);
           
           const resData = res.data;
           if(resData) {
            dispatch({
                type: 'INCREMENT_ITEM',
                payload: resData,
            })
           }
            
return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}

export const getAllCart = (data) => async(dispatch) => {
    try {

    } catch(error) {
        return Promise.reject(error);
    }
}
export const removeItemFromCart = (courseId, studentId) => async(dispatch) => {
    try {
        const res = await axios.delete(url + `/delete/${courseId}/${studentId}`);
        return Promise.resolve(res.data);

    } catch(error) {
        return Promise.reject(error);
    }
}