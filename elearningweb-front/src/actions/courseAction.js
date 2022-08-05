import CourseService, { getMyCoursesService } from "../services/CourseService";
import axios from "axios";
import {
   GET_COURSE_BY_ID,
   GET_COURSE_BY_NAME,
   GET_MY_COURSES,
   GET_ALL_COURSES,
   UPDATE_COURSE,
   DELETE_COURSE,
   INSERT_COURSE,
   SEARCH_COURSES,
   GET_ALL_STUDENTS,
   GET_ALL_STUDENTS_OF_COURSES

} from "./types";
const API_URL = "http://localhost:8084/course";

export const getMyCourses = (username) => (dispatch) => {
 return axios.get(API_URL + "/all/student?username=" + username).then(
     (response) => {
         dispatch({
             type: GET_MY_COURSES,
             payload: response.data
         });
         return Promise.resolve();
     }, (error) => {
        console.log(error);
         return Promise.reject();
     }
 )
}

export const getAllCourses = () => async(dispatch) => {
  try {
        const res = await CourseService.getAll();
        dispatch({
            type: GET_ALL_COURSES,
            payload: res.data,
           
        })
        return Promise.resolve(res.data);
  } catch(error) {
      console.log(error);
      return Promise.reject(error);
  }
}

export const getAllUnpublishCourse = () => async(dispatch) => {
    try {
        const res = await CourseService.getAllUnpublishCourse();
        dispatch({
            type: 'GET_ALL_UNPUBLISH_COURSE',
            payload: res.data,
        })
    } catch(error) {
        console.log(error);
    }
}

export const insertCourse = (data) => async(dispatch) => {
    try {
            const res = await CourseService.create(data);
            dispatch({
                type: 'ADD_NEW_COURSE_OF_TEACHER',
                payload: res.data,
            })
            return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}
export const updateCourse = (id, data, token) => async(dispatch) => {
    try {
            const res = await CourseService.update(id, data, token);
            dispatch({
                type: 'UPDATE_COURSE_OF_TEACHER',
                payload: res.data
            });
            return Promise.resolve(res.data);

    } catch(error) {
        console.log(error);
        return Promise.reject(error);
    }
}
export const updateCourseStatus = (id,data, token) => async(dispatch) => {
    try {
        const res = await CourseService.updateCourseStatus(id, data, token);
        dispatch({
            type: 'UPDATE_UNPUBLISH_COURSE',
            payload: res.data,
        })
    } catch(error) {
        return Promise.reject(error);
    }
}
export const uploadPreviewVideo = (id, data) => async(dispatch) => {
    try {
        const res = await axios.put(`http://localhost:8084/course/upload/video/${id}`, data, {headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'}})
        const resData = res.data;
       
        dispatch({
            type: 'UPDATE_PREVIEW_VIDEO',
            payload: resData,
        })
    } catch(error) {
       
    }
}

export const uploadCourseImage = (id, data) => async(dispatch) => {
    try {
        const res = await CourseService.uploadCourseImage(id, data);
        dispatch({
            type: 'UPDATE_COURSE_OF_TEACHER',
            payload: res.data
        });
        return Promise.resolve(res.data);

} catch(error) {
    console.log(error);
    return Promise.reject(error);
}
}

export const deleteCourseVideo = (id, token) => async(dispatch) => {
    try {
        const res = await CourseService.deleteCourseVideo(id, token);
       
        dispatch({
            type: 'DELETE_COURSE_VIDEO',
            payload: res.data,
        });
        return Promise.resolve(res.data);

} catch(error) {
    console.log(error);
    return Promise.reject(error);
}
}

export const deleteCourse = (id, token) => async(dispatch) => {
    try {
        const res = await CourseService.delete(id, token);
        dispatch({
            type: 'DELETE_COURSE_OF_TEACHER',
            payload: {id: id},
        })
        return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}


export const getCourseById = (id) => async(dispatch) => {
    try {
            const res = await CourseService.get(id);
            dispatch({
              GET_COURSE_BY_ID,
              payload: res.data,
            })
            return Promise.resolve(res.data);
    } catch(error) {
        console.log(error);
        return Promise.reject(error);
    }
}

export const getCourseByName = (name) => async(dispatch) => {
    try {

        const res = await CourseService.findByName(name);
        dispatch({
            type: SEARCH_COURSES,
            payload: res.data,
        })
        console.log('GET COURSE ' + JSON.stringify(res.data));
        return Promise.resolve(res.data);
    } catch(error) {
        console.log(error);
        return Promise.reject(error);
        
    }
   
}
export const getAllStudentInCourse = (courseId) => async(dispatch) => {
    try {
        const res = await CourseService.getAllStudentOfCourse(courseId);
        dispatch({
                type: GET_ALL_STUDENTS_OF_COURSES,
                payload: res.data
        })
        
        return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
   
} 

export const getAllCourseOfTeacher = (teacherName) => async(dispatch) => {
    try {
    const res = await CourseService.getAllCourseOfTeacher(teacherName);
        dispatch({
            type: 'GET_ALL_COURSE_OF_TEACHER',
            payload: res.data,
        })
        return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}

export const getAllNotificationOfTeacher = (teacherName, courseId, token) => async(dispatch) => {
    try {
        const res = await CourseService.getAllNotificationOfTeacher(teacherName, courseId, token);
        dispatch({
            type: 'GET_ALL_NOTIFICATION_OF_TEACHER',
            payload: res.data,
        })
        return Promise.resolve(res.data);

    } catch(error) {
        return Promise.reject(error);
    }
}

export const getAllNotifications = (courseId, username, token) => async(dispatch)  => {
    try {
        const res = await CourseService.getAllNotifications(courseId, username, token);
        
        dispatch({
            type: 'GET_ALL_NOTIFICATIONS',
            payload: res.data,
        })
      
        return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}
export const getAvailableCourses = (username) => async(dispatch) => {
    try {
        const res = await CourseService.getAvailableCourses(username);
        dispatch({
            type: GET_ALL_COURSES,
            payload: res.data,
            item: {
                name: username,
            }
        })
       
return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}

export const updateNotification = (id, data, token) => async(dispatch) => {
    try {
        const res = await CourseService.updateNotification(id, data, token);
        dispatch({
            type: 'TEACHER_UPDATE_NOTIFICATION',
            payload: res.data,
        })
    return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}
export const createNotification = (data) => async(dispatch) => {
    try {
const res = await CourseService.createNotification(data);
dispatch({
    type: 'TEACHER_CREATE_NOTIFICATION',
    payload: res.data,
})
return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}

export const getAllDiscussionOfCourse = (courseId) => async(dispatch) => {
    try {
        const res = await CourseService.getAllDiscussionOfCourse(courseId);
        dispatch({
            type: 'GET_ALL_DISCUSSION_OF_COURSE',
            payload: res.data,
        })
        return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}

export const postAnswer = (data) => async(dispatch) => {
    try {
        const res = await  axios.post(`http://localhost:8084/course/answer/save`, data, {headers:{Authorization: 'Bearer ' + localStorage.getItem("token")}});
        return Promise.resolve(res.data);

    } catch(error) {
        return Promise.reject(error);
    }
}

