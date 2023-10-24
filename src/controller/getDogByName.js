require("dotenv").config();
const { Dog } = require("../DB/db");
const axios = require("axios");
const { apiDataConverter } = require("../helpers");
const { API_KEY } = process.env;

async function getDogByName(name) {
  try {
    let result = await Dog.findOne({ where: { name: name } });
    if (result) return result;
    else {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      result = data.filter((dog) => dog.name == name);
      if (result.length) {
        result = apiDataConverter(result[0]);
        return result;
      } else {
        return null;
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = getDogByName;
