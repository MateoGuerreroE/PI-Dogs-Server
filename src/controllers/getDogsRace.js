const { Dog } = require("../DB/db");
const axios = require("axios");

async function getDogsRace(req, res) {
  const { idRaza } = req.params;
  try {
    //? FOR DB
    const results = await Dog.findOne({ where: { id: idRaza } });
    if (results) res.json(results);
    else {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds/${idRaza}`
      );
      if (data.name) res.json(data);
      else res.status(404).json({ error: "Dog breed not found" });
    }
    //? FOR API
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getDogsRace;
