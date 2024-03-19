import db from "../models";

const getRolesWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.Role.findAndCountAll({
            offset,
            limit,
            order: [['id', 'DESC']],
            raw: true,
        });

        let totalPage = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPage: totalPage,
            roles: rows,
        }

        return {
            EM: "Get role success",
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(">>> Error:", error);
        return {
            EM: "Something wrongs with services",
            EC: -1,
            DT: []
        }
    }
}

const getAllRole = async () => {
    try {
        let roles = await db.Role.findAll({
            raw: true
        });

        return {
            EM: `Get role data success`,
            EC: 0,
            DT: roles
        };
    } catch (error) {
        console.log('Error', error);
        return {
            EM: 'Error from service',
            EC: -2,
            DT: ''
        };
    }
}

const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        });
        const persists = roles.filter(({url: url1}) =>
            !currentRoles.some(({url: url2}) => url1 === url2)
        );

        if(persists.length === 0) {
            return {
                EM: 'Nothing to create...',
                EC: 0,
                DT: []
            };
        }
        
        await db.Role.bulkCreate(persists);

        return {
            EM: `Create roles succeeds: ${persists.length} role`,
            EC: 0,
            DT: []
        };
    } catch (error) {
        console.log('Error', error);
        return {
            EM: 'Error from service',
            EC: -2,
            DT: ''
        };
    }
}

const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id }
        });

        if (role) {
            await role.destroy();

            return {
                EM: "Delete role success!",
                EC: 0,
                DT: [],
            }
        } else {
            return {
                EM: "Role not exist",
                EC: -2,
                DT: []
            }
        }
    } catch (error) {
        console.log('Error', error);
        return {
            EM: 'Error from service',
            EC: -1,
            DT: ''
        };
    }
}

const getRoleByGroup = async (id) => {
    try {
        if(!id) {
            return {
                EM: "Not found roles",
                EC: 0,
                DT: []
            }
        }

        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ["id", "name", "description"],
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            }
        });

        return {
            EM: "Get roles by group success",
            EC: 0,
            DT: roles
        }
    } catch (error) {
        console.log('Error', error);
        return {
            EM: 'Error from service',
            EC: -1,
            DT: ''
        };
    }
}   

module.exports = {
    getAllRole, createNewRoles, deleteRole,
    getRolesWithPagination, getRoleByGroup,
}