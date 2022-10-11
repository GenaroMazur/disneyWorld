const express = require("express");
const routes = express.Router();
const charactersController = require("./../controllers/charactersController")

const multerMiddleware = require("./../middlewares/multerMiddleware")
const authTokenMiddleware = require("./../middlewares/authTokenMiddleware")
const authStatusMiddleware = require("./../middlewares/authStatusMiddleware")

routes.get("/", charactersController.allCharacters)
routes.post("/",
    multerMiddleware.characters().single("image"),
    authTokenMiddleware,
    authStatusMiddleware,
    charactersController.addCharacter)

routes.get("/:id",authTokenMiddleware, charactersController.characterDetail)
routes.put("/:id",
    multerMiddleware.characters().single("image"),
    authTokenMiddleware,
    authStatusMiddleware, 
    charactersController.updateCharacter)
    
routes.delete("/:id",authTokenMiddleware,authStatusMiddleware, charactersController.deleteCharacter)

module.exports = routes;