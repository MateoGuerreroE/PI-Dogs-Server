require("dotenv").config();
const { Dog } = require("../DB/db");
const axios = require("axios");
const { API_KEY } = process.env;

// Made It so If no data found on DB, search on API.

async function getDogName(req, res) {
  try {
    //! Question
    //* TO ASK:
    // For this to receive by query the URL needs to be ?name=..., but required
    // on readme was  /dogs/name?="...", so I filter the breed needed by URL.

    // Taking only params from the URL and setting all to lowercase
    let nameToMatch = req.url // Receiving /name?=%22FirstWord%20SecondWord%22
      .toLowerCase()
      .replace(/%22/g, "") // Removes '%22' of word, leaves /name?=firstword%20secondword
      .slice(req.url.indexOf("=") + 1) // Takes from word after = index, so index + 1
      .split("%20") // Splits into array the two words ignoring '%20' string
      // this sets both words firts letter into capital letter
      .map((word) => {
        let result = word.charAt(0).toUpperCase() + word.slice(1);
        return result;
      }) // result will be [Firstword, Secondword];
      .join(" "); // joins with a space, leaving 'Firstword Secondword'

    //? Using DB

    let result = await Dog.findOne({ where: { name: nameToMatch } });
    if (result) res.json(result);
    else {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      result = data.filter((dog) => dog.name == nameToMatch);
      if (result.length) res.json(result[0]);
      else res.status(404).json({ error: "Breed name not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getDogName;
