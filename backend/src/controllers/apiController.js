import userService from '../service/userService';

const handleRegister = async (req, res) => {
    try {
        let {email, phone, userName, password} = req.body;

        if(!email || !phone || !userName || !password) {
            return res.status(200).json({
                EM: 'Missing required parameters',
                EC: -1,
                DT: ''
            });
        }

        if(password && password.length < 6) {
            return res.status(200).json({
                EM: 'Your password must have more than 6 letters',
                EC: -1,
                DT: ''
            });
        }

        let data = await userService.registerNewUser(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'error from server',
            EC: -1,
            DT: ''
        });
    }
}

module.exports = {
    handleRegister,
}