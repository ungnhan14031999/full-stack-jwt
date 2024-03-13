// import axios from "axios";
import axios from "../config/axios";

const createRoles = (roles) => {
    return axios.post('/api/v1/role/create', [...roles]);
}

export {
    createRoles,
}