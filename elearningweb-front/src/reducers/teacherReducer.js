const initialState = {teacherCourses: [], message: "", notifications: []}
const teacherReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case 'GET_ALL_COURSE_OF_TEACHER':
            return {
                ...state,
                teacherCourses: payload,
            }
        case 'REMOVE_COURSE_OF_TEACHER':
            const index = state.teacherCourses.findIndex((item) => item.id === action.id);
            let newTeacherCourses = [...state.teacherCourses];
            if(index >= 0) {
                    newTeacherCourses.splice(index, 1);
            }  else {
                console.warn("Can not remove selected course of teacher!");
            }
            return {
                ...state,
                teacherCourses: newTeacherCourses,
            }
        case 'ADD_NEW_COURSE_OF_TEACHER':
            return {
                ...state,
               message: payload,
            }
        case 'UPDATE_COURSE_OF_TEACHER':
                const updatedIndex = state.teacherCourses.findIndex((item) => item.id === action.id);
                const copiedTeacherCourse = [...state.teacherCourses];
                if(updatedIndex >= 0) {
                        copiedTeacherCourse.splice(updatedIndex, 1, payload);
                } else {
                    console.warn("Can not update selected course!");
                }
                return {
                    ...state,
                    teacherCourses: copiedTeacherCourse,
                }
        case 'GET_ALL_NOTIFICATION_OF_TEACHER':
            return {
                ...state,
                notifications: payload,
            }
        case 'TEACHER_UPDATE_NOTIFICATION':
            const notiIndex = state.notifications.findIndex((item) => item.id === action.id);
            const copiedNotifications = [...state.notifications];
            if(notiIndex >= 0) {
                copiedNotifications.splice(notiIndex, 1, payload);
            } else {
                console.warn("Can not update selected course!");
            }
            return {
                ...state,
               notifications: copiedNotifications,
            }
        case 'TEACHER_CREATE_NOTIFICATION':
            return {
                ...state,
                notifications: [...state.notifications, payload]
            }
        default:
            return state;
    }

}
export default teacherReducer;