import express from "express";
import apiController from "../controllers/apiController";

let router = express.Router();

let initApiRoutes = (app) => {
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    return app.use("/api/v1", router);
};

module.exports = initApiRoutes;
