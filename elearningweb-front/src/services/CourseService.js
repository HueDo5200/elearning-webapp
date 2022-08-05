import http from "../http-common";

class CourseService {
   
    getAll() {
        return http.get("/course/all");
    }
    get(id) {
        return http.get(`/course/${id}`);
    }
    getAllStudentOfCourse(courseId) {
        return http.get(`/student/all/course/${courseId}`);
    }

    getAllUnpublishCourse() {
        return http.get(`/admin/course/unpublished/all`, {headers: {'Access-Control-Allow-Origin': '*'}});
    }

    getAllCourseOfTeacher(teacherName) {
        return http.get(`/teacher/all/course?teacherName=${teacherName}`);
    }
   findByName(name) {
       return http.get(`/course/all/find?name=${name}`);
   }

//    findMyCourse(username) {
//     return http.get(`/course/all/my?username=${username}`);
//    }
   findAllCourseOfStudent(username) {
       return http.get(`/course/all/student?username=${username}`);
   }
   update(id, data, token) {
       return http.put(`/course/update/${id}`, data,  {headers: {Authorization: 'Bearer ' + token}});
   }
   updateCourseStatus(id, data, token) {
       return http.put(`/course/update/course-status/${id}`,data,  {headers: {'Access-Control-Allow-Origin': '*', Authorization: 'Bearer ' + token}})
   }
   updatePreviewVideo(id, data) {
    return http.put(`/course/upload/preview-video/${id}`, data, {headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'}});
   }
   uploadCourseImage(id, data) {
       return http.put(`/course/${id}/upload`, data, {headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'}})
   }

   deleteCourseVideo(id, token) {
    return http.delete(`/course/${id}/delete/preview-video`, {headers: {Authorization: 'Bearer ' + token}})
   }
   updateNotification(id, data, token) {
       return http.put(`/notification/teacher/update/${id}`, data, {headers: {Authorization: 'Bearer ' + token}});
   }
   createNotification(data) {
       return http.post(`/notification/teacher/create`, data);
   }
   create(data) {
       return http.post(`/course/save`, data);
   }

   delete(id, token) {
       return http.delete(`/course/delete/${id}`,  {headers: {Authorization: 'Bearer ' + token}});
   }

   getAllNotifications(courseId, username, token) {
     
       return http.get(`/course/notification/${courseId}?username=${username}`, {headers: {Authorization: 'Bearer ' + token}})
   }

   getAllNotificationOfTeacher(teacherName, courseId, token) {
       return http.get(`/teacher/all/notifications/${courseId}?teacherName=${teacherName}`, {headers: {Authorization: 'Bearer ' + token}});
   }

   getAvailableCourses(username) {
       return http.get(`/course/all/available?username=` + username);
   }

   getAllDiscussionOfCourse(courseId) {
       return http.get(`/course/discussion/${courseId}`);
   }


}
export default new CourseService();




