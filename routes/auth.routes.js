const express = require("express");
const routes = express.Router();

const userController = require("./../controllers/userController");
const authUserMiddleware = require("./../middlewares/authUserMiddleware");
const authTokenMiddleware = require("./../middlewares/authTokenMiddleware");
const registerValidatorMiddleware = require("./../middlewares/registerValidatorMiddleware")
const registerAuthMiddleware = require("./../middlewares/registerAuthMiddleware")
routes.get("/login",userController.loginDefault);
routes.get("/register", userController.registerDefault);

routes.post("/login",authUserMiddleware,userController.loginPost);
routes.post("/register",registerValidatorMiddleware,registerAuthMiddleware, userController.registerPost);

module.exports = routes;