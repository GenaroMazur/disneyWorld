const express = require("express");
const routes = express.Router();
const moviesController = require("./../controllers/moviesController")

routes.get ("/",moviesController.allMovies)
routes.post("/",moviesController.addMovie)


routes.get ("/:id",moviesController.movieDetail)
routes.put("/:id",moviesController.updateMovie)
routes.delete("/:id",moviesController.removeMovie)

module.exports = routes;