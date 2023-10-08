const {
  getAllDogs,
  getDogsRace,
  getDogName,
  postDog,
} = require("../controllers");

const dogsRouter = require("express").Router();

dogsRouter.get("/", getAllDogs);
dogsRouter.get("/name", getDogName);
dogsRouter.get("/:idRaza", getDogsRace);
dogsRouter.post("/", postDog);

module.exports = dogsRouter;
