require("dotenv").config();
const { Dog } = require("../DB/db");
const axios = require("axios");
const { API_KEY } = process.env;

async function getDogsRace(req, res) {
  const { idRaza } = req.params;
  try {
    //? FOR DB
    let results = null;
    if (idRaza.includes("-")) {
      results = await Dog.findOne({ where: { id: idRaza } });
    }
    if (results) res.json(results);
    else {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      const result = data.find((dog) => dog.id == idRaza);
      if (result) res.json(result);
      else res.status(404).json({ error: "Dog breed not found" });
    }
    //? FOR API
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getDogsRace;
