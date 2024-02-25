import express from "express";
import homeControler from "../controllers/homeControler";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeControler.getHomePage);
  router.get("/user", homeControler.handleUserPage);
  router.post("/user/create-user", homeControler.handleCreateNewUser);
  router.post("/delete-user/:id", homeControler.handleDeleteUser);
  router.get("/update-user/:id", homeControler.handleUpdateUserPage);
  router.post("/user/update-user", homeControler.handleUpdateUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
