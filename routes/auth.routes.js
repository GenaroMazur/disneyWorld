const express = require("express");
const routes = express.Router();

const userController = require("./../controllers/userController");
const authUserMiddleware = require("./../middlewares/authUserMiddleware");
const authTokenMiddleware = require("./../middlewares/authTokenMiddleware")
routes.get("/login",authTokenMiddleware, userController.loginDefault);
routes.get("/register", userController.registerDefault);

routes.post("/login",authUserMiddleware,userController.loginPost);
routes.post("/register", userController.registerPost);

module.exports = routes;