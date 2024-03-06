import db from '../models/index';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import hashUserPassword from './hashUserPassword';

// const salt = bcrypt.genSaltSync(10);

// const hashUserPassword = (userPassword) => {
//     let hashPassword = bcrypt.hashSync(userPassword, salt);
//     return hashPassword;
// }

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

    let hasPassword = hashUserPassword(password);

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

const checkpassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
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
            let isCorrectPassword = checkpassword(rawData.password, user.password);

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

module.exports = {
    registerNewUser, handleUserLogin
}