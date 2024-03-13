import groupApiService from "../service/groupApiService";
import roleApiService from "../service/roleApiService";

const readFunc = async (req, res) => {

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
    
}

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}