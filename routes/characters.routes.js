const express = require("express");
const routes = express.Router();
const charactersController = require("./../controllers/charactersController")

routes.get("/", charactersController.allCharacters)
routes.get("/:id", charactersController.characterDetail)
routes.post("/:id", charactersController.addCharacter)
routes.put("/:id", charactersController.updateCharacter)
routes.delete("/:id", charactersController.deleteCharacter)

module.exports = routes;