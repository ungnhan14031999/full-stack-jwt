import db from '../models/index';
import { Op } from 'sequelize';
import hashUserPassword from './hashUserPassword';

const checkEmailExist = async (email) => {
    let user = await db.User.findOne({
        where: { email }
    });
    
    if(user) {
        return true;
    }

    return false;
}

const checkPhoneNumberExist = async (phone) => {
    let user = await db.User.findOne({
        where: { phone }
    });

    if(user) {
        return true;
    }

    return false;
}

const registerNewUser = async (rawUserData) => {
    let {email, phone, password} = rawUserData;
    
    let isEmailExist = await checkEmailExist(email);
    if (isEmailExist === true) {
        return {
            EM: "The email is already exist",
            EC: 1
        }
    }

    let isPhoneNumberExist = await checkPhoneNumberExist(phone);
    if (isPhoneNumberExist === true) {
        return {
            EM: "The phone number is already exist",
            EC: 2
        }
    }

    let hasPassword = hashUserPassword.hashUserPassword(password);

    try {
        await db.User.create({
            ...rawUserData,
            password: hasPassword
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
                return {
                    EM: "Login success",
                    EC: 0,
                    DT: user
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
            attributes: ['id', 'userName', 'email', 'phone', 'sex'],
            include: { 
                model: db.Group, 
                attributes: ['name', 'description'], 
            },
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
    try {
        let hashPassword = hashUserPassword(data.password);

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
        let user = await db.User.findOne({
            wher: { id: data.id }
        });

        if (user) {
            user.save();
        } else {

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