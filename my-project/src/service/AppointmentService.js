import axios from 'axios';

const REST_API_URL = 'http://localhost:8080/appointment';

const getAppointments = () => {
    return axios.get(REST_API_URL);
}

const addAppointment = (newAppointment) => {
    return axios.post(REST_API_URL, newAppointment);
}

const deleteAppointment = (id) => {
    return axios.delete(`${REST_API_URL}/${id}`);
}

const getAppointmentByID = (id) => {
    return axios.get(`${REST_API_URL}/${id}`);
}

const updateAppointment = (id, updatedAppointment) => {
    return axios.put(`${REST_API_URL}/${id}`, updatedAppointment);
}

const getCount = () => {
    return axios.get(`${REST_API_URL}/count`);
}

// New method to get today's appointments
const getTodayAppointments = () => {
    return axios.get(`${REST_API_URL}/today`);
}

const AppointmentService = {
    getAppointments,
    addAppointment,
    deleteAppointment,
    getAppointmentByID,
    updateAppointment,
    getCount,
    getTodayAppointments // Export the new method
}

export default AppointmentService;
