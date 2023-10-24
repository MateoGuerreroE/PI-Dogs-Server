const { Dog } = require("../DB/db");
const { validateUUID } = require("../helpers");

async function deleteDog(req, res) {
  try {
    const { id } = req.params;
    if (!validateUUID(id)) {
      res
        .status(401)
        .json({ message: "The ID provided is not from a created dog." });
    } else {
      const response = await Dog.destroy({ where: { id: id } });
      if (response) {
        return res.json({
          message: "Successfully deleted this dog, click OK to return home",
        });
      } else {
        res
          .status(404)
          .json({ message: "That dog ID was not found on the register." });
      }
    }
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
}

module.exports = deleteDog;
