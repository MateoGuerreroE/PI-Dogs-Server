const { getTemperaments } = require("../controller");

async function getAttitude(req, res) {
  try {
    let result = await getTemperaments();
    if (result === "Successfully added to DataBase") res.send(result);
    else res.status(403).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = getAttitude;
