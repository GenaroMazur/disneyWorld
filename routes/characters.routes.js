const express = require("express");
const routes = express.Router();
const charactersController = require("./../controllers/charactersController")

routes.get("/", charactersController.allCharacters)
routes.post("/", charactersController.addCharacter)
routes.get("/:id", charactersController.characterDetail)
routes.put("/:id", charactersController.updateCharacter)
routes.delete("/:id", charactersController.deleteCharacter)

module.exports = routes;