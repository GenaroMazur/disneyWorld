const express = require("express");
const routes = express.Router();
const charactersController = require("./../controllers/charactersController")

const authTokenMiddleware = require("./../middlewares/authTokenMiddleware")
const authStatusMiddleware = require("./../middlewares/authStatusMiddleware")

routes.get("/", charactersController.allCharacters)
routes.post("/",authTokenMiddleware,authStatusMiddleware, charactersController.addCharacter)
routes.get("/:id",authTokenMiddleware, charactersController.characterDetail)
routes.put("/:id",authTokenMiddleware,authStatusMiddleware, charactersController.updateCharacter)
routes.delete("/:id",authTokenMiddleware,authStatusMiddleware, charactersController.deleteCharacter)

module.exports = routes;