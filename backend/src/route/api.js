import express from "express";
import userController from "../controllers/userConttroller";
import groupController from "../controllers/groupController";
import {checkUserJWT, checkUserPermission} from '../middleware/JWTAction';

let router = express.Router();

// const testMiddleware = (req, res, next) => {
//     console.log("Calling a middleware");
    
//     next();
// }

// const checkUserLogin = (req, res, next) => {
//     const nonSecurePaths = ['/', '/register', '/login'];
//     if(nonSecurePaths.includes(req.path)) return next();

//     next();
// }

let initApiRoutes = (app) => {
    router.post("/register", userController.handleRegister);
    router.post("/login", userController.handleLogin);

    router.get("/user/read", checkUserJWT, checkUserPermission, userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    router.get("/group/read", groupController.readFunc);

    return app.use("/api/v1", router);
};

module.exports = initApiRoutes;
