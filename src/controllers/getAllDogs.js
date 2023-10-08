const { Dog, Attitude } = require("../DB/db");

async function getAllDogs(req, res) {
  try {
    const result = await Dog.findAll({ include: Attitude });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getAllDogs;
