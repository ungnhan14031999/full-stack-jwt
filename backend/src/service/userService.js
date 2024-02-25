import bcrypt from 'bcrypt';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const creteNewUser = async (email, password, userName) => {
    let hashPassword = hashUserPassword(password);

    try {
        await db.User.create({ email, userName, password: hashPassword });
    } catch (error) {
        console.log(error);
    }
}

const getUserList = async () => {
    
    // test relationships
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ['id', 'userName', 'email'],
        include: { 
            model: db.Group, 
            attributes: ['id', 'name', 'description'], 
        },
        raw: true,
        nest: true
    });

    // let roles = await db.Group.findOne({
    //     where: { id: 1 },
    //     include: {model: db.Role},
    //     raw: true,
    //     nest: true
    // });

    // let checkRole = await db.Role.findAll({
    //     include: {
    //         model: db.Group, 
    //         where: { id : 1 }
    //     },
    //     raw: true,
    //     nest: true
    // });

    console.log(">>>check new users:", newUser);
    // console.log(">>>check new roles:", checkRole);



    try {
        let userList = [];
        userList = await db.User.findAll();

        return userList;
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: { id }
        });
    } catch (error) {
        console.log(error);
    }
}

const getUserById = async (id) => {
    try {
        let user = {};
        user = await db.User.findOne({
            where: { id },
            // raw: true,
        });

        return user;
    } catch (error) {
        console.log(error);
    }
}

const updateUserInfo = async (id, email, userName) => {
    try {
        await db.User.update(
            { email, userName }, 
            { where: {id} }
        );
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    creteNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}