import groupApiService from "../service/groupApiService";

const readFunc = async (req, res) => {
    let data = await groupApiService.getGroup();

    try {
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.log("Error", error);
        return {
            EM: 'Error from server',
            EC: -1,
            DT: ''
        }
    }
}

module.exports = {
    readFunc,
}