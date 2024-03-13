import userApiService from "../service/userApiService";

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
                EC: -2,
                DT: ''
            });
        }

        let data = await userApiService.registerNewUser(req.body);

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

const handleLogin = async (req, res) => {
    try {
        let data = await userApiService.handleUserLogin(req.body);

        //set cookie
        if(data && data.DT && data.DT.access_token) {
            res.cookie('jwt', data.DT.access_token, {httpOnly: true, maxAge: 60 * 60 * 1000});
        }
        
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        return res.status(500).json({
            EM: "Error from server",
            EC: -1,
            DT: ''
        });
    }
}   

const handleLogout = (req, res) => {
    try {
        res.clearCookie("jwt");

        return res.status(200).json({
            EM: "Clear cookie done!",
            EC: 0,
            DT: ''
        });
    } catch (error) {
        return res.status(500).json({
            EM: "Error from server",
            EC: -1,
            DT: ''
        });
    }
}

const getUserAccount = async (req, res) => {
    return res.status(200).json({
        EM: 'Account',
        EC: 0,
        DT: {
            access_token: req.token,
            data: req.user.groupWithRoles,
            email: req.user.email,
            userName: req.user.userName
        }
    });
}

const readFunc = async (req, res) => {
    try {
        if(req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            let data = await userApiService.getUserWithPagination(+page, +limit);

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        } else {
            let data = await userApiService.getAllUser();

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        }
    } catch (error) {
        console.log(">>> Error:", error);
        
        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: ''
        });
    }
}

const createFunc = async (req, res) => {
    try {
        let {email, phone, password, group} = req.body;
        if (!email || !phone || !password || !group) {
            return res.status(200).json({
                EM: 'Missing required parameters',
                EC: -2,
                DT: '',
            });
        } else {
            let data = await userApiService.createNewUser(req.body);
            
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        }
    } catch (error) {
        console.log(">>> Error:", error);

        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: ''
        });
    }
}

const updateFunc = async (req, res) => {
    try {
        let {email, phone, group} = req.body;
        if (!email || !phone || !group) {
            return res.status(200).json({
                EM: 'Missing required parameters',
                EC: -2,
                DT: '',
            });
        } else {
            let data = await userApiService.updateUser(req.body);
            
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        }
    } catch (error) {
        console.log(">>> Error:", error);

        return res.status(500).json({
            EM: 'Error from server',
            EC: -1,
            DT: ''
        });
    }
}

const deleteFunc = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.body.id);

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

module.exports = {
    handleRegister, handleLogin, handleLogout, getUserAccount,
    readFunc, createFunc, updateFunc, deleteFunc
}