import db from '../models/index';
import bcrypt from 'bcrypt';


const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

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
            EC: 1
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

module.exports = {
    registerNewUser
}