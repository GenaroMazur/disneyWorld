const express = require("express");
const routes = express.Router();
const moviesController = require("./../controllers/moviesController")

routes.get ("/",moviesController.allMovies)

module.exports = routes;