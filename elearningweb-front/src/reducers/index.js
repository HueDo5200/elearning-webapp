import {combineReducers} from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import  courseReducer from './courseReducer';
import teacherReducer from './teacherReducer';
export const rootReducer = combineReducers({
   auth: authReducer,
   cart: cartReducer,
   course: courseReducer,
   teacherReducer: teacherReducer
})
