require("dotenv").config();
const { Dog, Attitude } = require("../DB/db");
const axios = require("axios");
const { apiDataConverter } = require("../helpers");
const { API_KEY } = process.env;

async function getDogBreed(id) {
  try {
    let result = null;
    if (id.includes("-")) {
      result = await Dog.findOne({ where: { id: id }, include: Attitude });
      // Must create this prop in order for info to be mapped the same way, and Attitudes get as external prop
      // containing an object for each attitude.
      result.dataValues.temperament = result.Attitudes.map((att) => att.name);
    } else {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      result = data.find((dog) => dog.id == id);
      if (result) {
        result = apiDataConverter(result);
      }
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = getDogBreed;
