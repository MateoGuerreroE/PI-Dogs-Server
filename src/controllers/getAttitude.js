require("dotenv").config();
const { Attitude } = require("../DB/db");
const axios = require("axios");
const { attitudeValidator } = require("../handlers");
const { API_KEY } = process.env;

async function getAttitude(req, res) {
  try {
    // Bring all dog breeds from API with apiKey for full info
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
    // This can return anything //! Returning now: Message of completition
    res.send("Successfully added to DataBase");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = getAttitude;
