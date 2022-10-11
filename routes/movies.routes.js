const express = require("express");
const routes = express.Router();
const moviesController = require("./../controllers/moviesController")

const multerMiddleware = require("./../middlewares/multerMiddleware") 
const authStatusMiddleware = require("./../middlewares/authStatusMiddleware")
const authTokenMiddleware = require("./../middlewares/authTokenMiddleware")

routes.get ("/",moviesController.allMovies)
routes.post("/",
    multerMiddleware.movies().single("image"),
    authTokenMiddleware,
    authStatusMiddleware,
    moviesController.addMovie)


routes.get ("/:id",authTokenMiddleware,moviesController.movieDetail)
routes.put("/:id",
    multerMiddleware.movies().single("image"),
    authTokenMiddleware,
    authStatusMiddleware,
    moviesController.updateMovie)
routes.delete("/:id",authTokenMiddleware,authStatusMiddleware,moviesController.removeMovie)

module.exports = routes;