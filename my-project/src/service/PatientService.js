import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/patient';

const getPatients = () => {
    return axios.get(REST_API_URL);
}

const addPatient = (newPatient) => {
    return axios.post(REST_API_URL, newPatient);
}

const deletePatient = (id) => {
    return axios.delete(`${REST_API_URL}/${id}`);
}

const getPatientID = (id) => {
    return axios.get(`${REST_API_URL}/${id}`);
}

const updatePatient = (id, updatedPatient) => {
    return axios.put(`${REST_API_URL}/${id}`, updatedPatient);
}
const getCount = () => {
    return axios.get(`${REST_API_URL}/count`);
}
const PatientService = {
    getPatients,
    addPatient,
    deletePatient,
    getPatientID,
    updatePatient,
    getCount,
}

export default PatientService;
