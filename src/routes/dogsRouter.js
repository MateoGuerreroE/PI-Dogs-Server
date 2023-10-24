const {
  getAllDogs,
  getDogsRace,
  getDogName,
  postDog,
  deleteDog,
  editDog,
} = require("../controllers");

const dogsRouter = require("express").Router();

dogsRouter.get("/", getAllDogs);
dogsRouter.get("/name", getDogName);
dogsRouter.get("/:idRaza", getDogsRace);
dogsRouter.post("/", postDog);
dogsRouter.delete("/:id", deleteDog);
dogsRouter.put("/", editDog);

module.exports = dogsRouter;
