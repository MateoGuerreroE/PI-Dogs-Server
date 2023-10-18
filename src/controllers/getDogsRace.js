require("dotenv").config();
const { Dog, Attitude } = require("../DB/db");
const axios = require("axios");
const { apiDataConverter } = require("../helpers");
const { API_KEY } = process.env;

async function getDogsRace(req, res) {
  const { idRaza } = req.params;
  try {
    let results = null;
    if (idRaza.includes("-")) {
      results = await Dog.findOne({ where: { id: idRaza }, include: Attitude });
      results.dataValues.temperament = results.Attitudes.map((att) => att.name);
    } else {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      results = data.find((dog) => dog.id == idRaza);
      results = apiDataConverter(results);
    }
    if (results) res.json(results);
    else res.status(404).json({ error: "Dog breed not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getDogsRace;
