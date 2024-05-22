import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/appointmenttype';


const getAppointmentTypes = () => {
    return axios.get(REST_API_URL);
}

const addAppointmentType = (newAppointmentType) => {
    return axios.post(REST_API_URL, newAppointmentType);
}

const deleteAppointmentType = (id) => {
    return axios.delete(`${REST_API_URL}/${id}`);
}

const getAppointmentTypeByID = (id) => {
    return axios.get(`${REST_API_URL}/${id}`);
}

const updateAppointmentType = (id, updatedAppointmentType) => {
    return axios.put(`${REST_API_URL}/${id}`, updatedAppointmentType);
}

const AppointmentTypeService = {
    getAppointmentTypes,
    addAppointmentType,
    deleteAppointmentType,
    getAppointmentTypeByID,
    updateAppointmentType
}

export default AppointmentTypeService;
