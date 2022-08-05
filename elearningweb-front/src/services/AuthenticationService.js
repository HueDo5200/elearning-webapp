import axios from 'axios';
const API_URL = "http://localhost:8084/auth";
const registerService = (username, email, password) => {
    return axios.post("http://localhost:8084/student/signup", {
        username, email, password
    });
}
const loginService = async(username, password) => {
    return axios.post(API_URL, {
        username, 
        password
    }).then((response) => {
        if(response.data.token) {
            localStorage.setItem("token", response.data.token);
          
            localStorage.setItem("user", response.data.user);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userImage", response.data.userImage);
            localStorage.setItem("role", response.data.role);
        }
        return response.data;
    })
}

const updateProfileImgService = (data, userId, role, token) => {
    switch(role) {
        case 'student':
            return axios.put(`http://localhost:8084/student/upload/profile-image/${userId}`, data,  {headers: {Authorization: 'Bearer ' + token}})
        case 'teacher':
            return axios.put(`http://localhost:8084/teacher/upload/profile-image/${userId}`, data,  {headers: {Authorization: 'Bearer ' + token}})
        case 'admin':
            return axios.put(`http://localhost:8084/admin/upload/profile-image/${userId}`, data,  {headers: {Authorization: 'Bearer ' + token}})

    }
}
const logoutService = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userImage");
    localStorage.removeItem("role");
};


export {
    registerService,
    loginService,
    logoutService,
   updateProfileImgService
}