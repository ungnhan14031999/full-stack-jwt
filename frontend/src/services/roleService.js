// import axios from "axios";
import axios from "../config/axios";

const getAllRole = (page, limit) => {
    return axios.get(`/api/v1/role/read?page=${page}&limit=${limit}`);
}

const createRoles = (roles) => {
    return axios.post('/api/v1/role/create', [...roles]);
}

export {
    getAllRole, createRoles,
}