const { getDBDogs, getApiDogs } = require("../controller");

async function getAllDogs(req, res) {
  try {
    let resultApi = await getApiDogs();
    let resultDB = await getDBDogs();

    const result = [...resultDB, ...resultApi];

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getAllDogs;
