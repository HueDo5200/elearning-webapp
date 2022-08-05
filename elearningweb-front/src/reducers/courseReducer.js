
import { FormControlUnstyledContext } from "@mui/core";
import {
   INSERT_COURSE,
UPDATE_COURSE,
DELETE_COURSE,
GET_MY_COURSES,
GET_ALL_COURSES,
GET_COURSE_BY_ID,
GET_COURSE_BY_NAME,
SEARCH_COURSES,
GET_ALL_STUDENTS_OF_COURSES

} from "../actions/types";

const initialState = {courses: [], notifications: [], searchedCourses: [], discussions: [], teacherCourses: [], unpublisedCourses: []};
 const courseReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case GET_MY_COURSES:
            return {
                ...state,
                courses: payload
            }
        case 'GET_ALL_COURSE_OF_TEACHER':
            return {
                ...state,
                teacherCourses: payload
            }
        case 'GET_ALL_UNPUBLISH_COURSE':
            return {
                ...state,
                unpublisedCourses: payload
            }
        case 'UPDATE_UNPUBLISH_COURSE':
            const updateIndex = state.unpublisedCourses.findIndex((item) => item.id === payload.id);
           
            let list = [...state.unpublisedCourses]; 
            if(updateIndex >= 0) {
                    list.splice(updateIndex, 1, payload);
            } else {
                console.warn("CAN NOT UPDATE");
            }
            return {
                ...state,
                unpublisedCourses: list,
            }   
       
        case 'ADD_NEW_COURSE_OF_TEACHER':
            return {
                ...state,
                teacherCourses: [...state.teacherCourses, payload]
                
            }
       
        case 'UPDATE_COURSE_OF_TEACHER':
            const index = state.teacherCourses.findIndex((item) => item.id === payload.id);
           
            let courseList = [...state.teacherCourses]; 
            if(index >= 0) {
                    courseList.splice(index, 1, payload);
            } else {
                console.warn("CAN NOT UPDATE");
            }
            return {
                ...state,
                teacherCourses: courseList,
            }  
        case 'UPDATE_PREVIEW_VIDEO':
            const vIndex = state.teacherCourses.findIndex((item) => item.id === payload.id);
           
            let vCourseList = [...state.teacherCourses]; 
            if(vIndex >= 0) {
                    vCourseList.splice(vIndex, 1, payload);
            } else {
                console.warn("CAN NOT UPDATE");
            }
            return {
                ...state,
                teacherCourses: vCourseList,
            }  
       
        case GET_ALL_COURSES:
           
            return {
                ...state,
                payload
            }
            case SEARCH_COURSES:
            
                const foundCourse = payload;
                console.log("FOUDN COURSE " + JSON.stringify(foundCourse));
                
    
                return {
                    ...state,
                    searchedCourses: foundCourse,
                }
               

        case 'DELETE_COURSE_OF_TEACHER':
            const courseIndex = state.teacherCourses.findIndex(
                (item) => item.id === payload.id
              );
              let newTeacherCourses = [...state.teacherCourses];
        
              if (courseIndex >= 0) {
                newTeacherCourses.splice(courseIndex, 1);
        
              } else {
                console.warn(
                  `Cant remove product (id: ${action.id})`
                )
              }
        
              return {
                ...state,
                teacherCourses: newTeacherCourses
              }
        case 'DELETE_COURSE_VIDEO':
            const deleteIndex = state.teacherCourses.findIndex(
                (item) => item.id === payload.id
              );
              console.log("payload id " + payload.id)
              let newTeacherCourses1 = [...state.teacherCourses];
            
              if (deleteIndex >= 0) {
                newTeacherCourses1.splice(deleteIndex, 1, payload);
                console.log("new teacher courses " + JSON.stringify(newTeacherCourses1));
              } else {
                console.warn(
                  `Cant update video`
                )
              }
        
              return {
                ...state,
                teacherCourses: newTeacherCourses1
              }
        case GET_ALL_STUDENTS_OF_COURSES:
           return {
               ...state,
               payload
           }
      
            
        case 'GET_ALL_NOTIFICATIONS':
            console.log("NOTIFICATION " + payload);
            return {
                ...state,
                notifications: payload
            }
        case 'GET_ALL_DISCUSSION_OF_COURSE': 
                return {
                    ...state,
                    discussions: payload 
                }
      

        default:
            return state;

    }
}
export default courseReducer;