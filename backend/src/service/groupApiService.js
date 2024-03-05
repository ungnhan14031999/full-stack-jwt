import db from "../models/index";

const getGroup = async () => {
    try {
        let data = await db.Group.findAll({
            order: [['description', 'ASC']]
        });

        return {
            EM: "Get groups success",
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log("Error", error);
        return {
            EM: "Error from service",
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getGroup
}