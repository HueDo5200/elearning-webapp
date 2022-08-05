import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from './types';
import {loginService, registerService, logoutService, updateProfileImgService} from '../services/AuthenticationService';
import axios from 'axios';
export const register = (username, email, password) =>(dispatch) => {
    return registerService(username, email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data.message
            });
            
          
        }, (error) => {
            dispatch({
                type: REGISTER_FAIL,
                payload: error
            });
            
        }
    )
}

export const login = (username, password) =>async(dispatch) => {
    return loginService(username, password).then((data) => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });
       
        return Promise.resolve(data);
       
    }, (error) => {
        dispatch({
            type: LOGIN_FAIL,
            payload: error
        })
       
        return Promise.reject(error);
    })
}

export const logout = () => (dispatch) => {
    logoutService();
    dispatch({
        type: LOGOUT
    })

}

export const updatePassword = (userId, password, role, token) => async(dispatch) => {
    try {
        switch(role) {
            case 'teacher':
              const res = await axios.post(`http://localhost:8084/teacher/update/password/${userId}`, password, {headers: {Authorization: 'Bearer ' + token}});
                dispatch({
                    type: 'UPDATE_PASSWORD',
                    payload: res.data,
                })
                return Promise.resolve(res);
            case 'admin':
                const adminRes = await axios.post(`http://localhost:8084/admin/update/password/${userId}`, password, {headers: {Authorization: 'Bearer ' + token}});
                dispatch({
                    type: 'UPDATE_PASSWORD',
                    payload: adminRes.data
                })
                return Promise.resolve(adminRes.data);
            case 'student':
                 const studentRes = await axios.post(`http://localhost:8084/student/update/password/${userId}`, password, {headers: {Authorization: 'Bearer ' + token}});
                 dispatch({
                    type: 'UPDATE_PASSWORD',
                    payload: studentRes.data,
                })
                return Promise.resolve(studentRes.data);
        }
     
    } catch(error) {
        
    }

    


}
export const updateProfileImg = (data, userId, role, token) => async() => {
    try {
        const res = await updateProfileImgService(data, userId, role, token);
        return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
   
}