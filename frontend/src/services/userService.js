// import axios from "axios";
import axios from "../config/axios";

const registerNewUser = (email, phone, userName, password) => {
    return axios.post('/api/v1/register', {
        email, phone, userName, password
    });
}

const loginUser = (valueLogin, password) => {
    return axios.post('/api/v1/login', {
        valueLogin, password
    });
}

const logoutUser = () => {
    return axios.post('/api/v1/logout');
}

const fetchAllUser = (page, limit) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
}

const deleteUser = (user) => {
    return axios.delete('/api/v1/user/delete', {data: {id: user.id}});
}

const fetchGroup = () => {
    return axios.get('/api/v1/group/read');
}

const createNewUser = (userData) => {
    return axios.post('/api/v1/user/create', {...userData});
}

const updateCurrentUser = (userData) => {
    return axios.put('/api/v1/user/update', {...userData});
}

const getUserAccount = () => {
    return axios.get('/api/v1/account');
}

export {
    registerNewUser, loginUser, logoutUser, fetchAllUser, deleteUser,
    fetchGroup, createNewUser, updateCurrentUser, getUserAccount
}