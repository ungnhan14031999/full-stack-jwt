import groupApiService from "../service/groupApiService";
import roleApiService from "../service/roleApiService";

const readFunc = async (req, res) => {
    try {
        let page = req.query.page;
        let limit = req.query.limit;

        if( page > 0 && limit > 0 ) {
            let data = await roleApiService.getRolesWithPagination(+page, +limit);

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        } else {
            let data = await roleApiService.getAllRole();

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        }
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: ''
        });
    }
}

const createFunc = async (req, res) => {
    try {
        let data = await roleApiService.createNewRoles(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: ''
        });
    }
}

const updateFunc = async (req, res) => {
    
}

const deleteFunc = async (req, res) => {
    try {
        let data = await roleApiService.deleteRole(req.body.id);
        
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: ''
        });
    }
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}