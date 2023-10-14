require("dotenv").config();
const { Dog, Attitude } = require("../DB/db");
const axios = require("axios");
const { API_KEY } = process.env;

async function getAllDogs(req, res) {
  try {
    const result1 = await Dog.findAll({
      include: [
        {
          model: Attitude,
          attributes: ["name", "id"],
        },
      ],
    });
    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    let result = [...result1, ...data];
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getAllDogs;
