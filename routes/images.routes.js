const express = require("express")
const routes = express.Router()

const imagesController = require("./../controllers/imagesController")
routes.get("/movies/:img",imagesController.movies)
routes.get("/characters/:img",imagesController.characters)

module.exports = routes