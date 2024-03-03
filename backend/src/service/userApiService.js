import db from '../models/index';

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
            offset, limit,
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

const createNewUser = async () => {
    try {

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
        await db.User.delete({
            where: {id}
        });
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
    getAllUser, getUserWithPagination, updateUser, createNewUser, deleteUser
}