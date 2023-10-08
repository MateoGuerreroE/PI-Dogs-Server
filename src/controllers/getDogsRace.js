const { Dog } = require("../DB/db");
// const axios = require("axios"); // ONLY If using API

async function getDogsRace(req, res) {
  const { idRaza } = req.params;
  try {
    //? FOR DB
    const results = await Dog.findOne({ where: { id: idRaza } });
    if (results) res.json(results);
    else res.status(404).json({ error: "Dog breed not found" });
    //? FOR API
    // const { data } = await axios.get(
    //   `https://api.thedogapi.com/v1/breeds/${idRaza}`
    // );
    // res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getDogsRace;
