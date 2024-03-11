require("dotenv").config();
import jwt from 'jsonwebtoken';

const nonSecurePaths = ['/register', '/login'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;

    try {
        token = jwt.sign(payload, key);
    } catch (error) {
        console.log(error);
    }

    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }

    return decoded;
}

const checkUserJWT = (req, res, next) => {
    if(nonSecurePaths.includes(req.path)) return next();

    let cookies = req.cookies;
    if(cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);

        if (decoded) {
            req.user = decoded;

            next();
        } else {
            return res.status(401).json({
                EC: -1,
                EM: 'Not authenticated the user',
                DT: ''
            });
        }
    } else {
        return res.status(401).json({
            EC: -1,
            EM: 'Not authenticated the user',
            DT: ''
        });
    }
}

const checkUserPermission = (req, res, next) => {
    if(nonSecurePaths.includes(req.path) || req.path === '/account') return next();
    
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles;
        let currentUrl = req.path;

        if(!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                EM: `You don't permission to access this resource...`,
                DT: ''
            });
        }

        let canAccess = roles.some(item => item.url === currentUrl);

        if(canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                EM: `You don't permission to access this resource...`,
                DT: ''
            });
        }
    } else {
        return res.status(401).json({
            EC: -1,
            EM: 'Not authenticated the user',
            DT: ''
        });
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}