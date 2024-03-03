import express from "express";
import apiController from "../controllers/apiController";
import userController from "../controllers/userConttroller";


let router = express.Router();

let initApiRoutes = (app) => {
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.updateFunc);

    return app.use("/api/v1", router);
};

module.exports = initApiRoutes;
