import userApiService from "../service/userApiService";

const readFunc = async (req, res) => {
    try {
        let data = await userApiService.getAllUser();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.log(">>> Error:", error);
        
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: ''
        });
    }
}

const createFunc = (req, res) => {
    try {
        
    } catch (error) {
        console.log(">>> Error:", error);

        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: ''
        });
    }
}

const updateFunc = (req, res) => {
    try {
        
    } catch (error) {
        console.log(">>> Error:", error);

        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: ''
        });
    }
}

const deleteFunc = (req, res) => {
    try {
        
    } catch (error) {
        console.log(">>> Error:", error);

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