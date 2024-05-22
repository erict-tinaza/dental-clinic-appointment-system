import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/user';

const getUser = () => {
    return axios.get(REST_API_URL, { withCredentials: true });
}

const addUser = (newUser) => {
    return axios.post(REST_API_URL, newUser);
}

const deleteUser = (id) => {
    return axios.delete(`${REST_API_URL}/${id}`);
}

const getUserId = (id) => {
    return axios.get(`${REST_API_URL}/${id}`);
}

const updateUser = (id, updatedUser) => {
    return axios.put(`${REST_API_URL}/${id}`, updatedUser);
}

const Service = {
    getUser,
    addUser,
    deleteUser,
    getUserId,
    updateUser
}

export default Service;
