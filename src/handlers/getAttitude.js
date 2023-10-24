const { getTemperaments } = require("../controller");

async function getAttitude(req, res) {
  try {
    let result = await getTemperaments();
    res.send(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = getAttitude;
