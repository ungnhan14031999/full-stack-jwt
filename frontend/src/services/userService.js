import axios from "axios";

const registerNewUser = (email, phone, userName, password) => {
    return axios.post('http://localhost:8000/api/v1/register', {
        email, phone, userName, password
    });
}

const loginUser = (valueLogin, password) => {
    return axios.post('http://localhost:8000/api/v1/login', {
        valueLogin, password
    });
}

const fetchAllUser = (page, limit) => {
    return axios.get(`http://localhost:8000/api/v1/user/read?page=${page}&limit=${limit}`);
}

export {
    registerNewUser, loginUser, fetchAllUser
}