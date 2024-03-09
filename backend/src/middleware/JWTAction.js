
import jwt from 'jsonwebtoken';

require("dotenv").config();

const creatJWT = () => {
    let payload = { name: 'Michi', age: 25 }
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
    let data = null;

    try {
        let decoded = jwt.verify(token, key);
        data = decoded
    } catch (error) {
        console.log(error);
    }

    return data;
}

module.exports = {
    creatJWT, verifyToken
}