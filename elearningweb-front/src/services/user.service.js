import axios from 'axios';
import authHeader from './auth-header';
const API_URL = "http://localhost:8084";
const getContent = () => {
    return axios.get(API_URL + "/all");
}

const getUserBoard = () => {
    return axios.get(API_URL + "/user", {headers: authHeader()});
}
const getTeacherBoard = () => {
    return axios.get(API_URL + "/teacher", {headers: authHeader()});
}

export default {
    getContent,
    getUserBoard,
    getTeacherBoard
}

