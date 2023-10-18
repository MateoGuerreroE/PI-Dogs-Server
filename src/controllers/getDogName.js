require("dotenv").config();
const { Dog } = require("../DB/db");
const axios = require("axios");
const { camelCasing, apiDataConverter } = require("../helpers");
const { API_KEY } = process.env;

// Made It so If no data found on DB, search on API.

async function getDogName(req, res) {
  try {
    // README REQUESTED /name?="" instead of /?name="...", so wont be received per query.
    let nameToMatch = camelCasing(req.url);
    let result = await Dog.findOne({ where: { name: nameToMatch } });
    if (result) res.json(result);
    else {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      result = data.filter((dog) => dog.name == nameToMatch);
      if (result.length) {
        result = apiDataConverter(result[0]);
        res.json(result);
      } else res.status(404).json({ error: "Breed name not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getDogName;
