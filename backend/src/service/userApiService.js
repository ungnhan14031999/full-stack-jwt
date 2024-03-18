require('dotenv').config();

import db from '../models/index';
import { Op } from 'sequelize';
import hashUserPassword from './hashUserPassword';
import { getGroupWithRoles } from "./JWTService";
import {createJWT} from "../middleware/JWTAction";

const checkEmailExist = async (email) => {
    let user = await db.User.findOne({
        where: { email }
    });
    
    if(user) {
        return {
            EM: "The email is already exist",
            EC: 1
        };
    }
}

const checkPhoneNumberExist = async (phone) => {
    let user = await db.User.findOne({
        where: { phone }
    });

    if(user) {
        return {
            EM: "The phone number is already exist",
            EC: 2
        };
    }
}

const registerNewUser = async (rawUserData) => {
    let {email, phone, password} = rawUserData;

    let isPhoneNumberExist = await checkPhoneNumberExist(phone);
    let isEmailExist = await checkEmailExist(email);

    if (isEmailExist) {
        return {
            EM: isEmailExist.EM,
            EC: isEmailExist.EC
        }
    }
    if (isPhoneNumberExist) {
        return {
            EM: isPhoneNumberExist.EM,
            EC: isPhoneNumberExist.EC
        }
    }

    let hasPassword = hashUserPassword.hashUserPassword(password);

    try {
        await db.User.create({
            ...rawUserData,
            password: hasPassword,
            groupId: 4
        });

        return {
            EM: "Created user successfully",
            EC: 0
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "Someting wrong in service",
            EC: -2
        }
    }
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    {email: rawData.valueLogin},
                    {phone: rawData.valueLogin},
                ]
            }
        });

        if (user) {
            let isCorrectPassword = hashUserPassword.checkUserPassword(rawData.password, user.password);

            if (isCorrectPassword === true) {
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    userName: user.userName,
                    groupWithRoles,
                }

                let token = createJWT(payload);

                return {
                    EM: "Login success",
                    EC: 0,
                    DT: {
                        access_token: token,
                        data: groupWithRoles,
                        email: user.email,
                        userName: user.userName
                    }
                }
            }
        } 

        return {
            EM: "Your email/phone number or password is incorrect!",
            EC: 2,
            DT: ''
        }
    } catch (error) {
        return {
            EM: 'Something wrong in service...',
            EC: 1,
        }
    }
}

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'userName', 'email', 'phone', 'sex'],
            include: { 
                model: db.Group, 
                attributes: ['name', 'description'], 
            },
        });

        if (users) {
            return {
                EM: "Get data success",
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: "Get data success",
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(">>> Error:", error);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: []
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            offset, 
            limit,
            attributes: ['id', 'userName', 'email', 'phone', 'sex', 'address'],
            include: { 
                model: db.Group, 
                attributes: ['name', 'description', 'id'], 
            },
            order: [['id', 'DESC']]
        });

        let totalPage = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPage,
            users: rows
        }

        return {
            EM: "Get data success",
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(">>> Error:", error);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    let isEmailExist = await checkEmailExist(data.email);
    let isPhoneNumberExist = await checkPhoneNumberExist(data.phone);
    
    if (isEmailExist) {
        return {
            EM: isEmailExist.EM,
            EC: isEmailExist.EC
        }
    }
    if (isPhoneNumberExist) {
        return {
            EM: isPhoneNumberExist.EM,
            EC: isPhoneNumberExist.EC
        }
    }

    try {
        let hashPassword = hashUserPassword.hashUserPassword(data.password);

        await db.User.create({...data, password: hashPassword});

        return {
            EM: "Create new user success",
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(">>> Error:", error);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: []
        }
    }
}

const updateUser = async (data) => {
    try {
        // Check valid groupId
        if (!data.groupId) {
            return {
                EM: "Error with emty Group Id",
                EC: 3,
                DT: 'group'
            }
        }

        let user = await db.User.findOne({
            where: { id: data.id },
        });

        if (user) {
            await user.update({
                userName: data.userName,
                phone: data.phone,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId
            });
            await user.save();

            return {
                EM: "Update user succeeds",
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: "User not found",
                EC: 2,
                DT: ''
            }
        }
    } catch (error) {
        console.log(">>> Error:", error);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: []
        }
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        });
        if (user) {
            await user.destroy();

            return {
                EM: "Delete user success!",
                EC: 0,
                DT: [],
            }
        } else {
            return {
                EM: "User not exist",
                EC: 2,
                DT: []
            }
        }
    } catch (error) {
        console.log(">>> Error:", error);
        return {
            EM: "Something wrongs with services",
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin, 
    getAllUser, getUserWithPagination, 
    updateUser, createNewUser, deleteUser
}