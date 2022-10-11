const express = require("express");
const routes = express.Router();

const mainController = require("./../controllers/mainController");
routes.get("/", mainController);

const authRoute = require("./auth.routes");
routes.use("/auth", authRoute);

const charactersRoute = require("./characters.routes");
routes.use("/characters", charactersRoute);

const moviesRoute = require("./movies.routes");
routes.use("/movies", moviesRoute);

const imagesRoutes = require("./images.routes")
routes.use("/image", imagesRoutes)

module.exports = routes;