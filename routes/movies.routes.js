const express = require("express");
const routes = express.Router();
const moviesController = require("./../controllers/moviesController")

routes.get ("/",moviesController.allMovies)
routes.get ("/:id",moviesController.movieDetail)
routes.post("/",moviesController.addMovie)
routes.put("/:id",moviesController.updateMovie)
routes.delete("/:id",moviesController.removeMovie)

module.exports = routes;