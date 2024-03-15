import db from "../models";

const getAllRole = async () => {
    try {
        let roles = await db.Role.findAll({
            raw: true
        });

        if(roles && roles.length > 0) {
            return {
                EM: `Get role data success`,
                EC: 0,
                DT: roles
            };
        } else {
            return {
                EM: `Get role data success`,
                EC: 0,
                DT: []
            };
        }

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

module.exports = {
    getAllRole, createNewRoles,
}