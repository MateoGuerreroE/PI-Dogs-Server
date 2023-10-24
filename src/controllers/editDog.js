const { Dog } = require("../DB/db");
const { validateUUID } = require("../helpers");

async function editDog(req, res) {
  const { id } = req.body;
  try {
    if (validateUUID(id)) {
      const [result] = await Dog.update(req.query, { where: { id: id } });
      if (result) {
        res.json({ message: "Successfully edited dog, click OK reload" });
      } else
        res.status(404).json({ message: `Dog with ID ${id} was not found` });
    } else {
      res
        .status(401)
        .json({ message: `The ID ${id} provided is not from a created dog.` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = editDog;
