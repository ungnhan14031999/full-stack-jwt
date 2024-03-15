// import axios from "axios";
import axios from "../config/axios";

const getAllRole = () => {
    return axios.get('/api/v1/role/read');
}

const createRoles = (roles) => {
    return axios.post('/api/v1/role/create', [...roles]);
}

export {
    getAllRole, createRoles,
}