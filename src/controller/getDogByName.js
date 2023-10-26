require("dotenv").config();
const { Dog, Attitude } = require("../DB/db");
const axios = require("axios");
const { apiDataConverter, dbDataConverter } = require("../helpers");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

async function getDogByName(name) {
  try {
    //* DB SEARCH FIRST
    let resultDB = await Dog.findAll({
      where: { name: { [Op.substring]: name } },
      include: Attitude,
    });
    if (resultDB.length) {
      resultDB = resultDB.map((result) => dbDataConverter(result));
    }
    //* API DOGS SEARCH
    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );

    let resultAPI = data.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );
    if (resultAPI.length) {
      resultAPI = resultAPI.map((result) => apiDataConverter(result));
    }
    const result = [...resultDB, ...resultAPI];
    if (result.length) return result;
    else return null;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = getDogByName;
