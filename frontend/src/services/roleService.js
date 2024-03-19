import axios from "../config/axios";

const getAllRole = (page, limit) => {
    return axios.get(`/api/v1/role/read?page=${page}&limit=${limit}`);
}

const createRoles = (roles) => {
    return axios.post('/api/v1/role/create', [...roles]);
}

const deleteRole = (role) => {
    return axios.delete('/api/v1/role/delete', {data: {id: role.id}});
} 

const fetchRolesByGroup = (groupId) => {
    return axios.get(`/api/v1/role/by-group/${groupId}`);
} 

export {
    getAllRole, createRoles, deleteRole, fetchRolesByGroup,
}