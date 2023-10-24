require("dotenv").config();
const { Attitude } = require("../DB/db");
const axios = require("axios");
const { attitudeValidator } = require("../helpers");
const { API_KEY } = process.env;

async function getTemperaments() {
  try {
    // This two lines will validate If attitudes already exist, so no double-posting on DB and also no need for axios
    let current = await Attitude.findAll();
    if (current.length)
      return "Attitudes already added to DB, creation process stopped, you can continue.";

    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    // Create array to store all atitudes from API
    let allAttitudes = [];
    // Create a local attitudes array from string, for each dog on result of API
    data.forEach((dog) => {
      if (dog.temperament) {
        let localAttitudes = dog.temperament.split(", ");
        // Then use recursive function to validate if already added to
        // all atitudes from API array
        attitudeValidator(localAttitudes, allAttitudes);
      }
    });
    // Order and convert all attitudes into an object so It can be added directly
    // with bulk create, otherwise won't comply with model
    attitudesAsObj = allAttitudes.sort().map((attitude) => {
      return { name: attitude };
    });
    await Attitude.bulkCreate(attitudesAsObj);
    return "Successfully added to DataBase";
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = getTemperaments;
