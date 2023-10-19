require("dotenv").config();
const { Dog, Attitude } = require("../DB/db");
const axios = require("axios");
const apiDataConverter = require("../helpers/apiDataConverter");
const { API_KEY } = process.env;

async function getAllDogs(req, res) {
  try {
    const rawResult = await Dog.findAll({
      include: [
        {
          model: Attitude,
          attributes: ["name", "id"],
        },
      ],
    });
    let result1 = rawResult.map((breed) => {
      const temperament = breed.Attitudes.map((att) => att.name);
      return {
        id: breed.id,
        name: breed.name,
        height: breed.height,
        weight: breed.weight,
        life_span: breed.life_span,
        image: breed.image,
        temperament: temperament,
        created: breed.created,
      };
    });

    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    let result2 = data.map((breed) => {
      return apiDataConverter(breed);
    });
    let result = [...result1.reverse(), ...result2];
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getAllDogs;
