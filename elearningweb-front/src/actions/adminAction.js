import axios from "axios";
const url = 'http://localhost:8084';

export const updateAdminProfile = (id, data, token) => async() => {
    try {
        const res = await axios.put(url + `/admin/update/profile/${id}`, data,  {headers: {Authorization: 'Bearer ' + token}});
        return Promise.resolve(res.data);
    } catch(error) {
        return Promise.reject(error);
    }
}
