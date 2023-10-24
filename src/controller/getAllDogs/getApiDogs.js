require("dotenv").config();
const apiDataConverter = require("../../helpers/apiDataConverter");
const axios = require("axios");
const { API_KEY } = process.env;

async function getApiDogs() {
  try {
    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    let result = data.map((breed) => {
      return apiDataConverter(breed);
    });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = getApiDogs;
