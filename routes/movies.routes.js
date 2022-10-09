const express = require("express");
const routes = express.Router();
const moviesController = require("./../controllers/moviesController")

const authStatusMiddleware = require("./../middlewares/authStatusMiddleware")
const authTokenMiddleware = require("./../middlewares/authTokenMiddleware")

routes.get ("/",moviesController.allMovies)
routes.post("/",authTokenMiddleware,authStatusMiddleware,moviesController.addMovie)


routes.get ("/:id",authTokenMiddleware,moviesController.movieDetail)
routes.put("/:id",authTokenMiddleware,authStatusMiddleware,moviesController.updateMovie)
routes.delete("/:id",authTokenMiddleware,authStatusMiddleware,moviesController.removeMovie)

module.exports = routes;