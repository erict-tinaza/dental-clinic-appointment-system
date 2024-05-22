import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/dentist';

const getDentists = () => {
    return axios.get(REST_API_URL);
}

const addDentist = (newUser) => {
    return axios.post(REST_API_URL, newUser);
}

const deleteDentist = (id) => {
    return axios.delete(`${REST_API_URL}/${id}`);
}

const getDentistID = (id) => {
    return axios.get(`${REST_API_URL}/${id}`);
}

const updateDentist = (id, updatedUser) => {
    return axios.put(`${REST_API_URL}/${id}`, updatedUser);
}
const getCount = () => {
    return axios.get(`${REST_API_URL}/count`);
}

const DentistService = {
    getDentists,
    addDentist,
    deleteDentist,
    getDentistID,
    updateDentist,
    getCount
}
export default DentistService;
