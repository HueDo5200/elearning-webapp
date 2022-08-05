import axios from "axios";
const url = 'http://localhost:8084';
export const createTeacher = (data) => async() => {
    try {
        const res = await axios.post(url + '/teacher/save', data);
        return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}

export const updateTeacher = (id, data, token) => async() => {
try {
    const res = await axios.put(url + `/teacher/admin/update/${id}`, data,  {headers: {Authorization: 'Bearer ' + token}});
    return Promise.resolve(res.data);

} catch(error) {
    return Promise.reject(error);
}
}
export const updateTeacherProfile = (data, token) => async() => {
    try {
        const res = await axios.put(url + `/teacher/update/profile`, data,  {headers: {Authorization: 'Bearer ' + token}});
        return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}
export const deleteTeacher = (id, token) => async() => {
    try {
        const res = await axios.delete(url + `/teacher/delete/${id}`, {headers: {Authorization: 'Bearer ' + token}});
        return Promise.resolve(res.data);
    
    } catch(error) {
        return Promise.reject(error);
    }
}

export const findTeacherByUsername = (username) => async() => {
    try {
        const res = await axios.get(url + `/teacher/find?teacherName=` + username);
        return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}

export const addNewLesson = (data) => async() => {
    try {
        const res = await axios.post('http://localhost:8084/course/lesson/save', data);
        return Promise.resolve(res.data);

    } catch(error) {
        return Promise.reject(error);
    }
}


export const updateLesson = (id, data, token) => async() => {
    try {
            const res = await axios.put(`http://localhost:8084/course/lesson/update/${id}`, data,  {headers: {Authorization: 'Bearer ' + token}});
            return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}
export const deleteLesson = (id, token) => async() => {
    try {
            const res = await axios.delete(`http://localhost:8084/course/lesson/${id}`,  {headers: {Authorization: 'Bearer ' + token}});
    } catch(error) {
        return Promise.reject(error);
    }
}

