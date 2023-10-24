const getApiDogs = require("./getAllDogs/getApiDogs");
const getDBDogs = require("./getAllDogs/getDBDogs");
const getDogBreed = require("./getDogBreed");
const getDogByName = require("./getDogByName");
const getTemperaments = require("./getTemperaments");
const dogPosting = require("./postDog/dogPosting");
const tempRelation = require("./postDog/tempRelation");
const removeDog = require("./removeDog");

module.exports = {
  getDBDogs,
  getApiDogs,
  getTemperaments,
  getDogByName,
  getDogBreed,
  dogPosting,
  tempRelation,
  removeDog,
};
