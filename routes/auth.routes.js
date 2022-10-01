const express = require("express");
const routes = express.Router();

const userController = require("./../controllers/userController");

routes.get("/login", userController.loginDefault);
routes.get("/register", userController.registerDefault);

routes.post("/login",userController.loginPost);
routes.post("/register", userController.registerPost);

module.exports = routes;