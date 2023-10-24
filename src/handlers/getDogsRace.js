const { getDogBreed } = require("../controller");

async function getDogsRace(req, res) {
  try {
    const { idRaza } = req.params;
    let result = await getDogBreed(idRaza);
    if (result) res.json(result);
    else res.status(404).json({ message: "Breed ID not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = getDogsRace;
