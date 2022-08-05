import axios from "axios";


const API_URL = "http://localhost:8084/student";
export const updateStudent = (id, data, token) => async() => {
    try {
    const res = await axios.put(API_URL + `/update/${id}`, data, {headers: {Authorization : 'Bearer ' + token}});
      
        return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }

}
export const createStudent = (data) => async(dispatch) => {
try {
    const res = await axios.post(API_URL + `/login/other`, data);
    dispatch({
        type: 'SET_USER',
        payload: res.data,
    })
    return Promise.resolve(res.data);
} catch(error) {
    return Promise.reject(error);
}
}

export const makePayment = (data) => async() => {
    try {
        

    } catch(error) {
        return Promise.reject(error);
    }
}





