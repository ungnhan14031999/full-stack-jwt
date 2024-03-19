import express from "express";
import userController from "../controllers/userConttroller";
import roleController from "../controllers/roleController";
import groupController from "../controllers/groupController";
import {checkUserJWT, checkUserPermission} from '../middleware/JWTAction';

let router = express.Router();

// const testMiddleware = (req, res, next) => {
//     console.log("Calling a middleware");
    
//     next();
// }

// const checkUser = (req, res, next) => {
//     const nonSecurePaths = ['/register', '/login'];
//     if(nonSecurePaths.includes(req.path)) return next();

//     next();
// }

let initApiRoutes = (app) => {
    router.all('*', checkUserJWT, checkUserPermission,);

    router.post("/register", userController.handleRegister);
    router.post("/login", userController.handleLogin);
    router.post("/logout", userController.handleLogout);
    router.get("/account", userController.getUserAccount);

    // User routes
    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    // Roles routes
    router.get("/role/read", roleController.readFunc);
    router.post("/role/create", roleController.createFunc);
    router.put("/role/update", roleController.updateFunc);
    router.delete("/role/delete", roleController.deleteFunc);
    router.get("/role/by-group/:groupId", roleController.getRoleByGroup);

    // Group routes
    router.get("/group/read", groupController.readFunc);

    return app.use("/api/v1", router);
};

module.exports = initApiRoutes;
