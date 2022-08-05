import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from '../actions/types';
const user = localStorage.getItem("user");
const userRole = localStorage.getItem("role");
const initialState = user ? {isSignIned: true, user, message: "", success: "", role: userRole, image: ""} : {isSignIned: false, user: null, message: "", role: null, status: 0};
export default function authReducer(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
case REGISTER_SUCCESS:
    return {
        ...state, 
        isSignIned: false,
        message: payload
    };
    case REGISTER_FAIL:
        return {
            ...state,
            isSignIned: false
            
        }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isSignIned: true,
                user: payload.user,
                role: payload.role,


               
            }
    case LOGIN_FAIL:
        return {
            ...state,
            isSignIned: false,
            user: null,
            message: "Your username or password are not correct!",
        }
    case 'SET_MESSAGE':
        return {
            ...state,
            message: payload,
        }
    case 'SET_SUCCESS_MESSAGE':
        return {
            ...state,
            success: payload,
        }
    case 'REMOVE_SUCCESS_MESSAGE':
        return {
            ...state,
            success: '',
        }
    case 'REMOVE_MESSAGE': 
    return {
        ...state,
        message: '',
    }
    case LOGOUT:
        return {
            ...state,
            isSignIned: false,
            user: null
    
    }
    case 'SET_USER':
        return {
            ...state,
            user: payload.username
        }
    case 'SET_IMAGE':
        return {
            ...state,
            image: payload
        }
    case 'UPDATE_PASSWORD':
        return {
            ...state,
            status: payload,
        }
    default:
        return state;
    
}
}